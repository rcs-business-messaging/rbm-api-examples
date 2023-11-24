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

const params = {
	// Uploaded file id. If this uplod also contains a thumbnail, it will be used
	uploadedFileName: 'files/lpcg6f1tnYg1ryaQNho6hjka',
	// Uploaded thumbnail id. If this upload contains a thumbnail then it will be
	// used in preference to the one above.
	// uploadedThumbnailName: "files/lpchblt9boYTjT8ck6UGQ8uK",
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
