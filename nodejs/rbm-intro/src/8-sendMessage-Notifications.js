// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the License);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an AS IS BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const util = require('util');
const config = require('./config');
const rbmApiHelper = require('@google/rcsbusinessmessaging');
const RbmWebhookClient = require('@google/rbmwebhookclient');

// location of service account credentials file
const privateKeyFile =
	'../resources/rbm-agent-service-account-credentials.json';

// service account credentials for Pub/Sub
const privatekey = require(privateKeyFile);


function handleMessage(userEvent) {
	console.log('Notification:');
	console.log(
		util.inspect(userEvent, {showHidden: false, depth: null, colors: true}));
		
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


function getMessageBody(userEvent) {
	if (userEvent.text != undefined) {
		return userEvent.text;
	} else if (userEvent.suggestionResponse != undefined) {
		return userEvent.suggestionResponse.postbackData;
	}

	return false;
}


// Start listening for notifications.
new RbmWebhookClient(handleMessage);

rbmApiHelper.initRbmApi(privatekey);
rbmApiHelper.setAgentId(config.agentId);

const params = {
	messageText: 'Hello, world!',
	msisdn: config.phoneNumber,
};

rbmApiHelper.sendMessage(params,
	function(response, err) {
		if (err !== undefined) {
			console.log(
				util.inspect(err, {showHidden: false, depth: null, colors: true}));
		}
		if (response !== undefined) {
			console.log(
				util.inspect(response, {showHidden: false, depth: null, colors: true}));
		}
	}
);
