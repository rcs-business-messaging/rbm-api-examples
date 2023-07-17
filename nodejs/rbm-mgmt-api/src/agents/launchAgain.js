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

const config = require('../../config');
const datastore = require('../support/datastore');

// Load existing agent previously created by agents/create.js'
const agent = datastore.loadJsonData('agent');

// To launch an agent to further carriers, we need to first obtain the existing
// launch information and extend it with the new carrier(s).
businessCommunicationsApiHelper.getAgentLaunch(agent.name).then((response) => {
	const existingLaunch = response.data.rcsBusinessMessaging;

	// Now we add the new carrier to the existing launch
	existingLaunch.launchDetails[config.launchCarrier2] = null;

	// And we submit the launch again
	businessCommunicationsApiHelper.launchAgent(agent.name, existingLaunch)
		.then((response) => {
			console.log('Launch details are:');
			console.log(JSON.stringify(response.data, null, 2));
		}).catch((err) => {
			console.log(err);
		});
}).catch((err) => {
	console.log(err);
});
