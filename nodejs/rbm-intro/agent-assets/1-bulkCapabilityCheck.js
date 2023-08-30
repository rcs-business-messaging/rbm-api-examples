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

// A bulk capablity check.
//
// Will indicate whether accounts are RCS users on Jibe Cloud. You can
// perform this check on ANY MSISDN(s) you have - it does not need to be
// a test number or on a network where your agent is launched.
//
// See https://developers.google.com/business-communications/rcs-business-messaging/guides/build/capabilities#bulk_capability_checks
//
const phoneNumbers = [config.phoneNumber];

// Perform a bulk capability check
rbmApiHelper.getUsers(phoneNumbers,
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
