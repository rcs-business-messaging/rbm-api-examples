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

'use strict';

const fs = require('fs');
const {io} = require('socket.io-client');
const {v4: uuidv4} = require('uuid');


const URL_PROD = 'https://rbm-webhook-server.appspot.com/';
const URL_TEST = 'http://localhost:3000/';


class RbmWebhookClient {
	constructor(callback, test) {
		if (!callback) {
			throw new TypeError('callback is mandatory');
		}

		let token = '';
		let url = URL_PROD;
		if (test) url = URL_TEST;
		let verified = false;

		if (fs.existsSync('token.txt')) {
			token = fs.readFileSync('token.txt').toString();
			verified = true;
		} else {
			token = uuidv4();
			log('WEBHOOK NOT YET VERIFIED');
			log(`Your webhook for this RBM agent is ${url}callback/${token}`);
			log('Set this as your agent-level webhook in the RBM developer ' +
				'console and verify.');
		}

		url += token;
		const socket = io(url);

		socket.on('connect', () => {
			log(`Connected to server ${url}`);
			if (verified) log('Receiving notifications.');
		});

		socket.on('verified', (token) => {
			fs.writeFileSync('token.txt', token);
			log('Webhook is now verified.');
			log('Receiving notifications.');
		});

		socket.on('notification', (msg) => {
			callback(msg);
		});

		socket.on('disconnect', () => {
			log('Disconnected from server - no messages being received.');
		});
	}
};


function log(msg) {
	console.log(`RbmWebhookClient: ${msg}`);
}

module.exports = RbmWebhookClient;
