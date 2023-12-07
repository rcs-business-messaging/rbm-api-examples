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
rbmApiHelper.setAgentId(config.agentId);


// A single capablity check.
//
// Will indicate whether the user is currently reachable by RBM and
// which features they support.
//
// You can only query your test numbers or numbers on the network where your
// agent is launched.
//
// See https://developers.google.com/business-communications/rcs-business-messaging/guides/build/capabilities#send_a_capability_check
//

rbmApiHelper.checkCapability(config.phoneNumber,
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
