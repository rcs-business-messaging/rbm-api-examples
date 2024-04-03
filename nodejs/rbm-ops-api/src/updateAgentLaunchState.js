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

// Update an agents launch status.
// See https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest/v1/brands.agents/updateLaunch

'use strict';

const businessCommunicationsApiHelper =
    require('@google/rbm-businesscommunications');

const privateKey =
	require('../resources/businesscommunications-service-account-credentials.json');

businessCommunicationsApiHelper.initBusinessCommunucationsApi(privateKey);

const agentId = '<agent Id>';

businessCommunicationsApiHelper
	.updateAgentLaunchState(agentId, 'LAUNCH_STATE_LAUNCHED').then((response) => {
		console.log('Updated launch details are:');
		console.log(JSON.stringify(response.data, null, 2));
	});
