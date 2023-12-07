/**
 * Copyright 2023 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const bodyParser = require('body-parser');
const crypto = require('crypto');
const express = require('express');
const {SessionsClient} = require('@google-cloud/dialogflow-cx');

const dialogflowHelper = require('./dialogflowHelper');
const rbmApiHelper = require('@google/rcsbusinessmessaging');
const privateKeyFile =
	'../resources/rbm-agent-service-account-credentials.json';
const privateKey = require(privateKeyFile);

rbmApiHelper.initRbmApi(privateKey);


const app = express();
const sessionsClient = new SessionsClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// load configuration file
const config = require('../resources/config.json');

const listener = app.listen(process.env.PORT, function() {
	console.log('Your RBM integration server is listening on port ' +
        listener.address().port);
});


app.post('/', async function(req, res) {
	const requestBody = req.body;

	// RBM webhook validation as described at
	// https://developers.google.com/business-communications/rcs-business-messaging/guides/integrate/pubsub#push-setup
	if ((requestBody.hasOwnProperty('clientToken')) &&
        (requestBody.hasOwnProperty('secret'))) {
		// This is an RBM webhook validation request.
		// Check we received the token we were expecting
		if (requestBody.clientToken == config.rbm.webhookToken) {
			res.status(200).send(`secret: ${requestBody.secret}`);
		} else {
			res.sendStatus(403);
		}

		return;
	}

	// Inbound RBM webhook message validation and processing. See
	// https://developers.google.com/business-communications/rcs-business-messaging/guides/integrate/pubsub#verify_incoming_messages
	if ((requestBody.hasOwnProperty('message')) &&
        (requestBody.message.hasOwnProperty('data'))) {
		// Validate the received hash to ensure the message came from Google RBM
		const userEventString = Buffer.from(requestBody.message.data, 'base64');
		const hmac = crypto.createHmac('sha512', config.rbm.webhookToken);
		const data = hmac.update(userEventString);
		const genHash = data.digest('base64');
		const headerHash = req.header('X-Goog-Signature');

		if (headerHash == genHash) {
			const rbmEvent = JSON.parse(userEventString);

			processRbmEvent(rbmEvent);
		}

		// We always return a 200 at this point so the message is acknowledge
		// and not queued for redelivery
		res.sendStatus(200);
	}
});


process.on('SIGTERM', () => {
	listener.close(() => {
		console.log('Closing http server.');
		process.exit(0);
	});
});


function processRbmEvent(rbmEvent) {
	// We will ignore non user events. Actual user messages do not have
	// an eventType
	if ((rbmEvent.senderPhoneNumber != undefined) &&
        (rbmEvent.eventType == undefined)) {
		const messageId = rbmEvent.messageId;
		const msisdn = rbmEvent.senderPhoneNumber;

		// send a read receipt
		rbmApiHelper.sendReadMessage(msisdn, messageId);

		if (rbmEvent.text) {
			rbmApiHelper.sendIsTypingMessage(msisdn);
			invokeDialogflow(msisdn, rbmEvent.text);
			return;
		}
		if (rbmEvent.userFile) {
			// nothing for now
		}
		if (rbmEvent.location) {
			// nothing for now
		}
		rbmApiHelper.sendMessage({
			msisdn: msisdn,
			messageText: 'I am sorry, I can\'t understand that at the moment',
		});
	}
}


// Process an inbound message from an RBM user.
// We will pass it into the Dialogflow model and return the reponse
function invokeDialogflow(msisdn, input) {
	const sessionId = msisdn;
	const sessionPath = sessionsClient.projectLocationAgentSessionPath(
		config.dialogflow.projectId,
		config.dialogflow.location,
		config.dialogflow.agentId,
		sessionId,
	);

	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				text: input,
			},
			languageCode: config.dialogflow.languageCode,
		},
		queryParams: {
			channel: "RBM"
		}
	};

	sessionsClient.detectIntent(request).then(([response]) => {
		handleDialogflowResponse(msisdn, response);
	}).catch((err) => {
		rbmApiHelper.sendMessage({
			msisdn: msisdn,
			messageText: `This is an unexpected exception. Details ` +
                `provided here for debugging: ${err}`,
		});
	});
}


function handleDialogflowResponse(msisdn, response) {
	for (const message of response.queryResult.responseMessages) {
		const m = dialogflowHelper.parseStruct(message);

		// Initially only supporting text reponses
		if (m.message == 'text') {
			const p = {
				msisdn: msisdn,
				messageText: m.text.text[0],
			};

			rbmApiHelper.sendMessage(p);
		}

		if ((m.message == 'payload') && (m.payload.rbm)) {
			const rbm = m.payload.rbm;
			const p = rbm.params;

			console.log(p);
			p.msisdn = msisdn;

			if ((rbm.type == "fileTransfer") 
				|| (rbm.type == "suggestedActions")
				|| (rbm.type == "suggestedReplies"))
			{
				rbmApiHelper.sendMessage(p);
			}

			if (rbm.type == "richCard") {
				rbmApiHelper.sendRichCard(p);
			}
		}
	}
}


// Use PubSub rather than the webhook when not deployed in Google Cloud.
// This is to allow local development and testing.
if (process.env.GOOGLE_CLOUD_PROJECT == undefined) {
	const {PubSub} = require('@google-cloud/pubsub');

	const pubsub = new PubSub({
		projectId: privateKey.project_id,
		keyFilename: './resources/rbm-agent-service-account-credentials.json',
	});

	// references an existing subscription
	const subscription = pubsub.subscription('rbm-agent-subscription');

	// create an event handler to handle messages
	const messageHandler = (message) => {
		const userEvent = JSON.parse(message.data);
		processRbmEvent(userEvent);

		message.ack();
	};

	// Listen for new messages until timeout is hit
	subscription.on('message', messageHandler);
}
