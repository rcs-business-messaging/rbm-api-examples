'use strict';
// Copyright 2022 Google LLC
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

// set the private key to the service account file
const privatekey = require(__dirname +
	'/../resources/businesscommunications-service-account-credentials.json');

// Business Communications API library reference object
let bizCommsApi = false;

// JWT cloud authentication reference object
let authClient = false;

// wrapper object for interacting with the Business Communications API
const businessCommunicationsApiHelper = {

	/**
     * List all the brands available to the user.
     * @return {Promise} Resolves on request completion.
	 * result.data contains list of brands.
     */
	listBrands: function() {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				bizCommsApi.brands.list(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},


	/**
     * Create a new brand.
	 * @param {string} brandName Brand display name
     * @return {Promise} Resolves on request completion.
	 * result.data contains new brand data.
     */
	createBrand: function(brandName) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.resource = {
					displayName: brandName,
				};
				bizCommsApi.brands.create(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},


	/**
     * Get brand information.
	 * @param {string} name The brand identifier
     * @return {Promise} Resolves on request completion.
	 * result.data contains the brand details.
     */
	getBrand: function(name) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name;
				bizCommsApi.brands.get(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Delete a brand.
	 * @param {string} name The brand identifier
     * @return {Promise} Resolves on request completion.
	 * result contain sfull response
     */
	deleteBrand: function(name) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name;
				bizCommsApi.brands.delete(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Update a brand.
	 * @param {string} name The brand identifier
	 * @param {string} newDisplayName New display name
     * @return {Promise} Resolves on request completion.
	 * result.data contains the updated brand
     */
	patchBrand: function(name, newDisplayName) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name;
				params.updateMask = 'displayName';
				params.resource = {
					displayName: newDisplayName,
				};
				bizCommsApi.brands.patch(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * List all the regions available for launches.
     * @return {Promise} Resolves on request completion.
	 * result.data contains list of regions.
     */
	listRegions: function() {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				bizCommsApi.regions.list(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * List all the agents this partner has created.
	 * @param {string} parentBrand The parent brand id
     * @return {Promise} Resolves on request completion.
	 * result.data contains list of agents.
     */
	listAgents: function(parentBrand) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.parent = parentBrand;
				bizCommsApi.brands.agents.list(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Get agent information.
	 * @param {string} name The agent identifier
     * @return {Promise} Resolves on request completion.
	 * result.data contains the agent details.
     */
	getAgent: function(name) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name;
				bizCommsApi.brands.agents.get(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Create agent.
	 * @param {string} parentBrand The parent brand id
	 * @param {object} agentInfo New agent definition
     * @return {Promise} Resolves on request completion.
	 * result.data contains the new agent details.
     */
	createAgent: function(parentBrand, agentInfo) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.parent = parentBrand;
				params.resource = agentInfo;
				bizCommsApi.brands.agents.create(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Delete an agent.
	 * @param {string} name The agent identifier
     * @return {Promise} Resolves on request completion.
	 * result contains full response
     */
	 deleteAgent: function(name) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name;
				bizCommsApi.brands.agents.delete(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Verify an agent.
	 * @param {string} name The agent id
	 * @param {object} verificationContact Verification contact information
     * @return {Promise} Resolves on request completion.
	 * result.data contains the agent verification info with 
	 * verificationState = 'VERIFICATION_STATE_UNVERIFIED'.
     */
	 verifyAgent: function(name, verificationContact) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name;
				params.resource = {
					agentVerificationContact: verificationContact
				};
				bizCommsApi.brands.agents.requestVerification(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Retrieve agent verification status.
	 * @param {string} name The agent id
     * @return {Promise} Resolves on request completion.
	 * result.data contains the agent verification info with 
	 * verificationState = 'VERIFICATION_STATE_UNVERIFIED'.
     */
	 getAgentVerification: function(name) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name + '/verification';
				bizCommsApi.brands.agents.getVerification(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Launch an agent.
	 * @param {string} name The agent id
	 * @param {object} agentLaunch Launch information
     * @return {Promise} Resolves on request completion.
	 * result.data contains the agent verification info with 
	 * verificationState = 'VERIFICATION_STATE_UNVERIFIED'.
     */
	 launchAgent: function(name, agentLaunch) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name;
				params.resource = {
					agentLaunch: {
						rcsBusinessMessaging: agentLaunch
					}
				};
				bizCommsApi.brands.agents.requestLaunch(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Update an agent launch.
	 * @param {string} name The agent id
	 * @param {object} mask The update mask 
	 * @param {object} updatedLaunch Updated launch information
     * @return {Promise} Resolves on request completion.
	 * result.data contains the updated agent launch info.
     */
	 updateLaunch: function(name, updateMask, updatedLaunch) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name + '/launch';
				params.updateMask = updateMask;
				params.resource = {
				//	agent_launch: {
				//	name:name,
						rcsBusinessMessaging: updatedLaunch
				//	}
				};
				bizCommsApi.brands.agents.updateLaunch(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Retrieve agent launch status.
	 * @param {string} name The agent id
     * @return {Promise} Resolves on request completion.
	 * result.data contains the agent verification info with 
	 * verificationState = 'VERIFICATION_STATE_UNVERIFIED'.
     */
	getAgentLaunch: function(name) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name + '/launch';
				bizCommsApi.brands.agents.getLaunch(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Create an agent webhook integraton.
	 * @param {string} name The agent id
	 * @param {string} url Webhook URL
	 * @param {string} verificationToken Token passed to webhook to verify it
     * @return {Promise} Resolves on request completion.
	 * result.data contains 
     */
	 createWebhookIntegration: function(name, url, verificationToken) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.parent = name;
				params.resource = {
					agentWebhookIntegration: {
						webhookUri: url,
						verification_token: verificationToken
					}
				};
				bizCommsApi.brands.agents.integrations.create(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * List agent integration points.
	 * @param {string} name The agent id
     * @return {Promise} Resolves on request completion.
	 * result.data contains the array of current integrations
     */
	 listAgentIntegrations: function(name) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.parent = name;
				bizCommsApi.brands.agents.integrations.list(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Delete an integration point from an agent.
	 * @param {string} name The agent id
     * @return {Promise} Resolves on request completion.
	 * result.data contains empty object
     */
	 deleteAgentIntegration: function(name) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name;
				bizCommsApi.brands.agents.integrations.delete(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Get agent integration details.
	 * @param {string} name The integration id
     * @return {Promise} Resolves on request completion.
	 * result.data contains integration details
     */
	getAgentIntegration: function(name) {
		return new Promise((resolve, reject) => {
			this.initBusinessCommunucationsApi().then((params) => {
				params.name = name;
				bizCommsApi.brands.agents.integrations.get(params, {}, function(err, response) {
					err ? reject(err) : resolve(response);
				});
			});
		});
	},

	/**
     * Initializes the Business Communications API and authentication
     * credentials to communicate with the RBM platform.
     * @param {function} callback Callback method for after
     * the method is complete.
	 * @return {Promise} Resolves on request completion.
     */
	initBusinessCommunucationsApi: function() {
		return new Promise((resolve, reject) => {
			if (authClient) {
				resolve({auth: authClient});
				return;
			}

			// get the GoogleAPI library
			const {google} = require('googleapis');

			// set the scope that we need for Business Communications
			const scopes = [
				'https://www.googleapis.com/auth/businesscommunications',
			];

			// get the Business Communications API file
			const businesscommunucations =
				require(__dirname + '/../businesscommunications/v1');

			// configure a JWT auth client
			authClient = new google.auth.JWT(
				privatekey.client_email,
				null,
				privatekey.private_key,
				scopes
			);

			// initialize the Business Communications API
			bizCommsApi = new businesscommunucations.businesscommunications_v1
				.Businesscommunications({}, google);

			// authenticate request
			authClient.authorize(function(err, tokens) {
				if (err) {
					reject(err);
				} else {
					console.log('Successfully connected!');
					resolve({auth: authClient});
				}
			});
		});
	},
};

module.exports = businessCommunicationsApiHelper;
