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

const datastore = require('../support/datastore');

// Load existing brand previous created with brands/create.js'
const brand = datastore.loadJsonData('brand');

// Create an agent in the first brand (if one exists)
const brandId = brand.name;

// See https://developers.google.com/business-communications/rcs-business-messaging/early-access/reference/business-communications/rest/v1/brands.agents#rcsbusinessmessagingagent
const newAgentDetails = {
	displayName: 'Relaunch test',
	name: brandId + '/agents/',
	rcsBusinessMessagingAgent: {
		description: 'This is the agent description that will be displayed in ' +
			'the Agent info tab in Messages',
		logoUri: 'https://agent-logos.storage.googleapis.com/_/kt90w53vzw2QSxK6PG1uCeJf',
		heroUri: 'https://agent-logos.storage.googleapis.com/_/kt90vzob74GQcfeHoEQbVRTP',
		phoneNumbers: [
			{
				phoneNumber: {
					number: '+12223334444',
				},
				label: 'Call support',
			},
		],
		// emails and websites are optional
		privacy: {
			'uri': 'https://policies.google.com/privacy',
			'label': 'Our privacy policy',
		},
		termsConditions: {
			'uri': 'https://policies.google.com/terms',
			'label': 'Our Terms and Conditions',
		},
		color: '#0B78D0',

		// Agent billing type: 'CONVERSATIONAL', 'SINGLE_MESSAGE', 'BASIC_MESSAGE'
		billingConfig: {billingCategory: 'BASIC_MESSAGE'},

		// Agent use case: 'MULTI_USE', 'TRANSACTIONAL', 'PROMOTIONAL', 'OTP'
		agentUseCase: 'MULTI_USE',

		// Hosting region: 'NORTH_AMERICA', 'EUROPE', 'ASIA_PACIFIC'
		hostingRegion: 'EUROPE',
	},
};

businessCommunicationsApiHelper.createAgent(brandId, newAgentDetails)
	.then((response) => {
		console.log('New agent is:');
		console.log(response.data);
		datastore.saveJsonData('agent', response.data);
	}
	).catch((err) => {
		console.log(err);
	});
