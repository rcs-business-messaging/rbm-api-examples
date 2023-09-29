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
const rbmApiHelper = require('../../rbm-api-helper/src/rbm_api_helper');
const privateKey =
	require('../resources/rbm-agent-service-account-credentials.json');

rbmApiHelper.initRbmApi(privateKey);
rbmApiHelper.setAgentId(config.agentId);

// Images for the carousel cards
const card1Image = 'https://storage.googleapis.com/kitchen-sink-sample-images/cute-dog.jpg';
const card2Image = 'https://storage.googleapis.com/kitchen-sink-sample-images/elephant.jpg';

const cardContents = [
	{
		title: 'Card #1',
		description: 'The description for card #1',
		suggestions: [
			{
				reply: {
					text: 'Card #1',
					postbackData: 'card_1',
				},
			},
		],
		media: {
			height: 'MEDIUM',
			contentInfo: {
				fileUrl: card1Image,
				forceRefresh: false,
			},
		},
	},
	{
		title: 'Card #2',
		description: 'The description for card #2',
		suggestions: [
			{
				reply: {
					text: 'Card #2',
					postbackData: 'card_2',
				},
			},
		],
		media: {
			height: 'MEDIUM',
			contentInfo: {
				fileUrl: card2Image,
				forceRefresh: false,
			},
		},
	},
];

// Definition of carousel card
const params = {
	msisdn: config.phoneNumber,
	cardContents: cardContents,
	// timeToLive: '10s',
};

// Send the device the carousel card defined above
rbmApiHelper.sendCarouselCard(params, function(response, err) {
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
