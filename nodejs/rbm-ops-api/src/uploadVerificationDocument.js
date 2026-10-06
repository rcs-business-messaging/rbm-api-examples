// Copyright 2026 Google LLC
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

// Upload verification document (PDF) to the Business Communications API.
// See https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest/v1/brands.agents.attachments/create

'use strict';

const fs = require('fs');
const path = require('path');
const businessCommunicationsApiHelper =
    require('@google/rbm-businesscommunications');

const privateKey =
	require('../resources/businesscommunications-service-account-credentials.json');

businessCommunicationsApiHelper.initBusinessCommunucationsApi(privateKey);

const agentName = 'brands/<brand id>/agents/<agent id>';
const pdfPath = '<path-to-verification-document>';
const attachmentOperationSource = 'VERIFICATION_PAGE';

if (!fs.existsSync(pdfPath)) {
	console.log('Error: PDF file does not exist at ' + pdfPath);
	console.log('Please place a verification PDF document at ' + pdfPath + ' and run again.');
	process.exit(1);
}

const fileBuffer = fs.readFileSync(pdfPath);

businessCommunicationsApiHelper.uploadVerificationDocument(agentName, fileBuffer, attachmentOperationSource).then((response) => {
	console.log('Upload success! Created attachment details:');
	console.log(response.data);
}).catch((err) => {
	console.log('Upload failed:');
	console.log(err);
});
