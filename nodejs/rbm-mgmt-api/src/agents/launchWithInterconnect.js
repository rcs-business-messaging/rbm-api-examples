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
    require('@google/rbm-businesscommunications');

const privateKey =
	require('../../resources/businesscommunications-service-account-credentials.json');

businessCommunicationsApiHelper.initBusinessCommunucationsApi(privateKey);

const config = require('../../config');
const datastore = require('../support/datastore');

// Load existing agent previously created by agents/create.js'
const agent = datastore.loadJsonData('agent');

const agentLaunch = {
	questionnaire: {
		contacts: [
			{
				name: 'Ian',
				title: 'The Boss',
				email: 'someone@somewhere.com',
			},
		],
		optinDescription: 'Users accepted our terms of service online.',
		triggerDescription: 'We are reaching preregistered users',
		interactionsDescription: 'This agent does not do much.',
		optoutDescription: 'Reply stop and we stop.',
		agentAccessInstructions: 'This is a a simple agent that ' +
			'reaches registered users.',
		videoUris: [
			'https://www.google.com/a/video',
		],
		screenshotUris: [
			'https://www.google.com/a/screenshot',
		],

	},

	// This is an interconnect launch - where one carrier approves the agent
	// across multiple carriers in the same country.
	// - in each country there are primary carriers who can approve agents
	//   to deliver to other carriers in that country
	// - you should only list one primary carrier per country
	// - you may list multiple primary carriers as long as they are for separate countries
	// - you will receive a 400 with error message if these rules are not met
	interconnectLaunchDetails: {
		'/v1/regions/primary-carrier-country1': {},
		'/v1/regions/primary-carrier-country2': {},
	},
};

businessCommunicationsApiHelper.launchAgent(agent.name, agentLaunch)
	.then((response) => {
		console.log('Launch details are:');
		console.log(JSON.stringify(response.data, null, 2));
	}).catch((err) => {
		console.log(err);
	});
