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
const privateKey =
	require('../resources/rbm-agent-service-account-credentials.json');

rbmApiHelper.initRbmApi(privateKey);

// The RBM API can now be initialised to use a specific regional
// entry point.
// rbmApiHelper.initRbmApi(privateKey, rbmApiHelper.REGION_APAC);
// rbmApiHelper.initRbmApi(privateKey, rbmApiHelper.REGION_EU);
// rbmApiHelper.initRbmApi(privateKey, rbmApiHelper.REGION_US);


rbmApiHelper.setAgentId(config.agentId);

const params = {
	messageText: 'Hello, world https://news.bbc.co.uk/',
	msisdn: config.phoneNumber,
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
