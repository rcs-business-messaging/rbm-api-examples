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
const rbmApiHelper = require('@google/rcsbusinessmessaging');
const privateKey =
	require('../resources/rbm-agent-service-account-credentials.json');

rbmApiHelper.initRbmApi(privateKey);

// Upload the file to Google's RBM content store first
const params = {
	fileUrl: 'https://storage.googleapis.com/kitchen-sink-sample-images/cute-dog.jpg',
	thumbnailUrl: 'https://storage.googleapis.com/kitchen-sink-sample-images/elephant.jpg',
	// contentDescription: string
};


rbmApiHelper.uploadFile(params,
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
