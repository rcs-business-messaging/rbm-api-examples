'use strict';
// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, '__esModule', {value: true});
exports.rcsbusinessmessaging_v1 = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
 
const googleapis_common_1 = require('googleapis-common');
let rcsbusinessmessaging_v1;
(function(rcsbusinessmessaging_v1) {
	/**
     * RCS Business Messaging API
     *
     *
     *
     * @example
     * const {google} = require('googleapis');
     * const rcsbusinessmessaging = google.rcsbusinessmessaging('v1');
     *
     * @namespace rcsbusinessmessaging
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Rcsbusinessmessaging
     */
	class Rcsbusinessmessaging {
		constructor(options, google) {
			this.context = {
				_options: options || {},
				google,
			};
			this.files = new Resource$Files(this.context);
			this.phones = new Resource$Phones(this.context);
			this.users = new Resource$Users(this.context);
		}
	}
	rcsbusinessmessaging_v1.Rcsbusinessmessaging = Rcsbusinessmessaging;
	class Resource$Files {
		constructor(context) {
			this.context = context;
		}
		create(paramsOrCallback, optionsOrCallback, callback) {
			let params = (paramsOrCallback || {});
			let options = (optionsOrCallback || {});
			if (typeof paramsOrCallback === 'function') {
				callback = paramsOrCallback;
				params = {};
				options = {};
			}
			if (typeof optionsOrCallback === 'function') {
				callback = optionsOrCallback;
				options = {};
			}
			const rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
			const parameters = {
				options: Object.assign({
					url: (rootUrl + '/v1/files').replace(/([^:]\/)\/+/g, '$1'),
					method: 'POST',
				}, options),
				params,
				mediaUrl: (rootUrl + '/upload/v1/files').replace(/([^:]\/)\/+/g, '$1'),
				requiredParams: [],
				pathParams: [],
				context: this.context,
			};
			if (callback) {
				googleapis_common_1.createAPIRequest(parameters, callback);
			} else {
				return googleapis_common_1.createAPIRequest(parameters);
			}
		}
	}
	rcsbusinessmessaging_v1.Resource$Files = Resource$Files;
	class Resource$Phones {
		constructor(context) {
			this.context = context;
			this.agentEvents = new Resource$Phones$Agentevents(this.context);
			this.agentMessages = new Resource$Phones$Agentmessages(this.context);
			this.capability = new Resource$Phones$Capability(this.context);
			this.dialogflowMessages = new Resource$Phones$Dialogflowmessages(this.context);
			this.testers = new Resource$Phones$Testers(this.context);
		}
		getCapabilities(paramsOrCallback, optionsOrCallback, callback) {
			let params = (paramsOrCallback ||
                {});
			let options = (optionsOrCallback || {});
			if (typeof paramsOrCallback === 'function') {
				callback = paramsOrCallback;
				params = {};
				options = {};
			}
			if (typeof optionsOrCallback === 'function') {
				callback = optionsOrCallback;
				options = {};
			}
			const rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
			const parameters = {
				options: Object.assign({
					url: (rootUrl + '/v1/{+name}/capabilities').replace(/([^:]\/)\/+/g, '$1'),
					method: 'GET',
				}, options),
				params,
				requiredParams: ['name'],
				pathParams: ['name'],
				context: this.context,
			};
			if (callback) {
				googleapis_common_1.createAPIRequest(parameters, callback);
			} else {
				return googleapis_common_1.createAPIRequest(parameters);
			}
		}
	}
	rcsbusinessmessaging_v1.Resource$Phones = Resource$Phones;
	class Resource$Phones$Agentevents {
		constructor(context) {
			this.context = context;
		}
		create(paramsOrCallback, optionsOrCallback, callback) {
			let params = (paramsOrCallback ||
                {});
			let options = (optionsOrCallback || {});
			if (typeof paramsOrCallback === 'function') {
				callback = paramsOrCallback;
				params = {};
				options = {};
			}
			if (typeof optionsOrCallback === 'function') {
				callback = optionsOrCallback;
				options = {};
			}
			const rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
			const parameters = {
				options: Object.assign({
					url: (rootUrl + '/v1/{+parent}/agentEvents').replace(/([^:]\/)\/+/g, '$1'),
					method: 'POST',
				}, options),
				params,
				requiredParams: ['parent'],
				pathParams: ['parent'],
				context: this.context,
			};
			if (callback) {
				googleapis_common_1.createAPIRequest(parameters, callback);
			} else {
				return googleapis_common_1.createAPIRequest(parameters);
			}
		}
	}
	rcsbusinessmessaging_v1.Resource$Phones$Agentevents = Resource$Phones$Agentevents;
	class Resource$Phones$Agentmessages {
		constructor(context) {
			this.context = context;
		}
		create(paramsOrCallback, optionsOrCallback, callback) {
			let params = (paramsOrCallback ||
                {});
			let options = (optionsOrCallback || {});
			if (typeof paramsOrCallback === 'function') {
				callback = paramsOrCallback;
				params = {};
				options = {};
			}
			if (typeof optionsOrCallback === 'function') {
				callback = optionsOrCallback;
				options = {};
			}
			const rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
			const parameters = {
				options: Object.assign({
					url: (rootUrl + '/v1/{+parent}/agentMessages').replace(/([^:]\/)\/+/g, '$1'),
					method: 'POST',
				}, options),
				params,
				requiredParams: ['parent'],
				pathParams: ['parent'],
				context: this.context,
			};
			if (callback) {
				googleapis_common_1.createAPIRequest(parameters, callback);
			} else {
				return googleapis_common_1.createAPIRequest(parameters);
			}
		}
		delete(paramsOrCallback, optionsOrCallback, callback) {
			let params = (paramsOrCallback ||
                {});
			let options = (optionsOrCallback || {});
			if (typeof paramsOrCallback === 'function') {
				callback = paramsOrCallback;
				params = {};
				options = {};
			}
			if (typeof optionsOrCallback === 'function') {
				callback = optionsOrCallback;
				options = {};
			}
			const rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
			const parameters = {
				options: Object.assign({
					url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
					method: 'DELETE',
				}, options),
				params,
				requiredParams: ['name'],
				pathParams: ['name'],
				context: this.context,
			};
			if (callback) {
				googleapis_common_1.createAPIRequest(parameters, callback);
			} else {
				return googleapis_common_1.createAPIRequest(parameters);
			}
		}
	}
	rcsbusinessmessaging_v1.Resource$Phones$Agentmessages = Resource$Phones$Agentmessages;
	class Resource$Phones$Capability {
		constructor(context) {
			this.context = context;
		}
		requestCapabilityCallback(paramsOrCallback, optionsOrCallback, callback) {
			let params = (paramsOrCallback ||
                {});
			let options = (optionsOrCallback || {});
			if (typeof paramsOrCallback === 'function') {
				callback = paramsOrCallback;
				params = {};
				options = {};
			}
			if (typeof optionsOrCallback === 'function') {
				callback = optionsOrCallback;
				options = {};
			}
			const rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
			const parameters = {
				options: Object.assign({
					url: (rootUrl + '/v1/{+name}/capability:requestCapabilityCallback').replace(/([^:]\/)\/+/g, '$1'),
					method: 'POST',
				}, options),
				params,
				requiredParams: ['name'],
				pathParams: ['name'],
				context: this.context,
			};
			if (callback) {
				googleapis_common_1.createAPIRequest(parameters, callback);
			} else {
				return googleapis_common_1.createAPIRequest(parameters);
			}
		}
	}
	rcsbusinessmessaging_v1.Resource$Phones$Capability = Resource$Phones$Capability;
	class Resource$Phones$Dialogflowmessages {
		constructor(context) {
			this.context = context;
		}
		create(paramsOrCallback, optionsOrCallback, callback) {
			let params = (paramsOrCallback ||
                {});
			let options = (optionsOrCallback || {});
			if (typeof paramsOrCallback === 'function') {
				callback = paramsOrCallback;
				params = {};
				options = {};
			}
			if (typeof optionsOrCallback === 'function') {
				callback = optionsOrCallback;
				options = {};
			}
			const rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
			const parameters = {
				options: Object.assign({
					url: (rootUrl + '/v1/{+parent}/dialogflowMessages').replace(/([^:]\/)\/+/g, '$1'),
					method: 'POST',
				}, options),
				params,
				requiredParams: ['parent'],
				pathParams: ['parent'],
				context: this.context,
			};
			if (callback) {
				googleapis_common_1.createAPIRequest(parameters, callback);
			} else {
				return googleapis_common_1.createAPIRequest(parameters);
			}
		}
	}
	rcsbusinessmessaging_v1.Resource$Phones$Dialogflowmessages = Resource$Phones$Dialogflowmessages;
	class Resource$Phones$Testers {
		constructor(context) {
			this.context = context;
		}
		create(paramsOrCallback, optionsOrCallback, callback) {
			let params = (paramsOrCallback ||
                {});
			let options = (optionsOrCallback || {});
			if (typeof paramsOrCallback === 'function') {
				callback = paramsOrCallback;
				params = {};
				options = {};
			}
			if (typeof optionsOrCallback === 'function') {
				callback = optionsOrCallback;
				options = {};
			}
			const rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
			const parameters = {
				options: Object.assign({
					url: (rootUrl + '/v1/{+parent}/testers').replace(/([^:]\/)\/+/g, '$1'),
					method: 'POST',
				}, options),
				params,
				requiredParams: ['parent'],
				pathParams: ['parent'],
				context: this.context,
			};
			if (callback) {
				googleapis_common_1.createAPIRequest(parameters, callback);
			} else {
				return googleapis_common_1.createAPIRequest(parameters);
			}
		}
	}
	rcsbusinessmessaging_v1.Resource$Phones$Testers = Resource$Phones$Testers;
	class Resource$Users {
		constructor(context) {
			this.context = context;
		}
		batchGet(paramsOrCallback, optionsOrCallback, callback) {
			let params = (paramsOrCallback || {});
			let options = (optionsOrCallback || {});
			if (typeof paramsOrCallback === 'function') {
				callback = paramsOrCallback;
				params = {};
				options = {};
			}
			if (typeof optionsOrCallback === 'function') {
				callback = optionsOrCallback;
				options = {};
			}
			const rootUrl = options.rootUrl || 'https://rcsbusinessmessaging.googleapis.com/';
			const parameters = {
				options: Object.assign({
					url: (rootUrl + '/v1/users:batchGet').replace(/([^:]\/)\/+/g, '$1'),
					method: 'POST',
				}, options),
				params,
				requiredParams: [],
				pathParams: [],
				context: this.context,
			};
			if (callback) {
				googleapis_common_1.createAPIRequest(parameters, callback);
			} else {
				return googleapis_common_1.createAPIRequest(parameters);
			}
		}
	}
	rcsbusinessmessaging_v1.Resource$Users = Resource$Users;
})(rcsbusinessmessaging_v1 = exports.rcsbusinessmessaging_v1 || (exports.rcsbusinessmessaging_v1 = {}));
// # sourceMappingURL=v1.js.map
