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

const suggestions = [
	{
		action: {
			text: 'Call',
			postbackData: 'postback_data_1234',
			dialAction: {
				phoneNumber: '+15556667777',
			},
		},
	},
	{
		action: {
			text: 'View map',
			postbackData: 'postback_data_1234',
			viewLocationAction: {
				latLong: {
					latitude: 37.4220188,
					longitude: -122.0844786,
				},
				label: 'Googleplex',
			},
		},
	},
	{
		action: {
			text: 'Share your location',
			postbackData: 'postback_data_1234',
			shareLocationAction: {
			},
		},
	},
	{
		action: {
			text: 'Open Google',
			postbackData: 'postback_data_1234',
			openUrlAction: {
				url: 'https://www.google.com',
			},
		},
	},
	{
		action: {
			text: 'Save to calendar',
			postbackData: 'postback_data_1234',
			createCalendarEventAction: {
				startTime: '2020-06-30T19:00:00Z',
				endTime: '2020-06-30T20:00:00Z',
				title: 'My calendar event',
				description: 'Description of the calendar event',
			},
		},
	},
];


const params = {
	messageText: 'Hello, world!',
	msisdn: config.phoneNumber,
	suggestions: suggestions,
	// timeToLive: '10s',
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
