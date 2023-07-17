// Copyright 2023 Google LLC
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

const businessCommunicationsApiHelper =
	require('../../libs/businesscommunications_api_helper');

const datastore = require('../support/datastore');

// Load existing agent previously created by agents/create.js'
const agent = datastore.loadJsonData('agent');

const url = 'https://myrbmserviceendpoint/callback';

const token = '123456';

// Create a webhook integration and add it to our agent
// The token value will be sent to the webhook which should
// check the token value it receives and return 200 OK if
// it matches the value supplied here.
//
// See details of webhook verification at https://developers.google.com/business-communications/rcs-business-messaging/guides/integrate/pubsub#push-setup
//
businessCommunicationsApiHelper
	.createWebhookIntegration(agent.name, url, token)
	.then((response) => {
		console.log(JSON.stringify(response.data, null, 2));
	}).catch((err) => {
		// returns 503 if the webhook URL is not reachable
		// returns 400 if URL is not https://
		// returns 400 if a webhook is already set
		console.log(err);
	});
