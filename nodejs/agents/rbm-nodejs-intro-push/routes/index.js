// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const crypto = require('crypto');
const express = require('express');
const router = new express.Router();

// reference to RBM API helper
const rbmApiHelper = require('@google/rcsbusinessmessaging');

// location of service account credentials file
const privateKeyFile =
    '../resources/rbm-agent-service-account-credentials.json';

// service account credentials for Pub/Sub
const privatekey = require(privateKeyFile);


rbmApiHelper.initRbmApi(privatekey);


/**
 * Sends the phone number a message asking what their favorite color is.
 */
router.get('/startConversation', function(req, res, next) {
	// get the phone number value
	let phoneNumber = '';

	if (req.query.phone_number) {
		phoneNumber = req.query.phone_number;
	}

	const params = {
		messageText: 'Here is a simple message.',
		msisdn: phoneNumber,
	};

	rbmApiHelper.sendMessage(params,
		function(response, err) {
			const json = {};

			if (err) {
				console.log(err);
				json.status = err.code;

				switch (err.code) {
				case 400:
					json.message = 'Please check the phone number format.';
					break;
				case 403:
					json.message = phoneNumber + ' is not a tester and this agent is ' +
						'not yet launched on your network. Add you test number in the ' +
						'RBM Developer Console.';
					break;
				case 404:
					json.message = phoneNumber +
							' is not enabled for RCS on the Jibe Cloud platform.';
					break;
				default:
					json.message = 'Unknown error: ' + err.code;
				}

				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(json));
			} else {
				json.response = 'ok';
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(json));
			}
		});
});

/**
 * Callback for Pub/Sub webhook.
 * This is only needed for a push subscription.
 * Parses the message from Pub/Sub to get the user's
 * response and sends a follow-up response.
 */
router.post('/callback', function(req, res, next) {
	// This is the verification token from the RBM developer console
	const CLIENT_TOKEN = '1234556';

	console.log('Webhook callback');

	const requestBody = req.body;

	if ((requestBody.hasOwnProperty('clientToken')) &&
		(requestBody.hasOwnProperty('secret'))) {
		console.log('RBM webhook verification request');

		// Confirm that the clientToken is the one we are seeing in the RBM console
		if (requestBody.clientToken == CLIENT_TOKEN) {
			console.log('Tokens match, returning secret');
			res.status(200).send('secret: ' + requestBody.secret);
		} else {
			// Client tokens did not match - sending permission denied
			console.log('Tokens do not match');
			res.sendStatus(403);
		}
	} else {
		if ((requestBody.hasOwnProperty('message')) &&
			(requestBody.message.hasOwnProperty('data'))) {
			// Validate the received hash to ensure the message came from Google RBM
			const userEventString = Buffer.from(requestBody.message.data, 'base64');
			const hmac = crypto.createHmac('sha512', CLIENT_TOKEN);
			const data = hmac.update(userEventString);
			const genHash = data.digest('base64');
			const headerHash = req.header('X-Goog-Signature');

			if (headerHash == genHash) {
				const userEvent = JSON.parse(userEventString);

				console.log('userEventString: ' + userEventString);
				handleMessage(userEvent);
			} else {
				console.log('hash mismatch - ignoring message');
			}
		}

		res.sendStatus(200);
	}
});

/**
 * Agent test page for starting
 * the conversation with the agent.
 */
router.get('/', function(req, res, next) {
	let message = '';

	if (req.query.message) {
		message = req.query.message;
	}
	res.render('index', {title: 'RBM Push Notification Demo', message: message});
});


/**
 * Parses the userEvent object to get the response body.
 * This can be plaintext or part of a suggested response.
 * @param {object} userEvent The JSON object of a message
 * received by the pull subscription.
 * @return {string} The body of the message, false if not found.
 */
function getMessageBody(userEvent) {
	if (userEvent.text != undefined) {
		return userEvent.text;
	} else if (userEvent.suggestionResponse != undefined) {
		return userEvent.suggestionResponse.postbackData;
	}

	return false;
}

/**
 * Uses the event received by the pull subscription to send a
 * response to the client's device.
 * @param {object} userEvent The JSON object of a message
 * received by the pull subscription.
 */
function handleMessage(userEvent) {
	if (userEvent.senderPhoneNumber != undefined) {
		// get the sender's phone number
		const msisdn = userEvent.senderPhoneNumber;

		// parse the response text
		const message = getMessageBody(userEvent);

		// get the message id
		const messageId = userEvent.messageId;

		// check to see that we have a message to process
		if (message) {
			// send a read receipt
			rbmApiHelper.sendReadMessage(msisdn, messageId);
		}
	}
}


module.exports = router;
