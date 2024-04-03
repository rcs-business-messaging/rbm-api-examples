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

// Load existing agents belonging to a brand
const brand = datastore.loadJsonData('brand');

businessCommunicationsApiHelper.listAgents(brand.name).then((response) => {
	console.log('Current agents are:');
	console.log(response.data);
	datastore.saveJsonData('agents', response.data.agents);
}).catch((err) => {
	console.log(err);
});

