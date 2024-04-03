// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
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

console.time('createBrand');
businessCommunicationsApiHelper.createBrand(config.brandDisplayName)
	.then((response) => {
		console.log('The new brand is:');
		console.log(response.data);
		datastore.saveJsonData('brand', response.data);
	}).catch((err) => {
		console.log(err);
	}).finally((response) => {
		console.timeEnd('createBrand');
	});
