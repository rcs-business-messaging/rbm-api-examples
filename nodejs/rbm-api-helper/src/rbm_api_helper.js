// Copyright 2021 Google LLC
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

const {google} = require('googleapis');
const {v4: uuidv4} = require('uuid');

const MISSING_INITIALIZATION =
	'You must first initialize this library by calling initRbmApi.';

// RBM API library reference object
let rbmApi = false;

// JWT cloud authentication reference object
let authClient = false;

// Agent id when using an agent created through the RBM Mgmt API
let agentId = null;

// wrapper object for interacting with the RBM API
const rbmApiHelper = {

	/**
	 * Set the Agend Id for API calls (needed when the agent was created
	 * with the RBM Mgmt API
	 * @param {string} aId Agent Id
	 */
	setAgentId: function(aId) {
		if (aId != null) agentId = aId;
	},

	/**
	 * Sends a synchronous capability check to the device.
	 * @param {string} msisdn The phone number in E.164 format.
	 * @param {function} callback Callback method for
	 * after the method is complete.
	 * @return {Promise} if callback is not provided.
	 */
	checkCapability: function(msisdn, callback) {
		if (!authClient) {
			throw MISSING_INITIALIZATION;
		} else {
			return checkCapability_(msisdn, authClient, callback);
		}
	},

	/**
	 * Checks the list of user devices for reachability of RBM.
	 * Maximum list size is 10,000.
	 * @param {array} msisdns List of phone numbers in E.164 format.
	 * @param {function} callback A callback function called at
	 * the completion of getUsers
	 * @return {Promise} if callback is not provided.
	 */
	getUsers: function(msisdns, callback) {
		if (!authClient) {
			throw MISSING_INITIALIZATION;
		} else {
			return getUsers_(msisdns, authClient, callback);
		}
	},

	/**
	 * Sends an invite to the msisdn to become a tester.
	 * @param {string} msisdn The phone number in E.164 format.
	 * @param {function} callback Callback method for
	 * after the method is complete.
	 */
	sendTesterInvite: function(msisdn, callback) {
		if (!authClient) {
			throw MISSING_INITIALIZATION;
		} else {
			sendTesterInvite_(msisdn, authClient, callback);
		}
	},

	/**
	 * Sends an is typing event back to the msisdn.
	 * @param {string} msisdn The phone number in E.164 format.
	 * @param {function} callback Callback method for
	 * after the method is complete.
	 */
	sendIsTypingMessage: function(msisdn, callback) {
		if (!authClient) {
			throw MISSING_INITIALIZATION;
		} else {
			sendIsTypingMessage_(msisdn, authClient, callback);
		}
	},

	/**
	 * Sends a read event back to the msisdn.
	 * @param {string} msisdn The phone number in E.164 format.
	 * @param {string} messageId The identifier for the message that was read.
	 * @param {function} callback Callback method for after
	 * the method is complete.
	 */
	sendReadMessage: function(msisdn, messageId, callback) {
		if (!authClient) {
			throw MISSING_INITIALIZATION;
		} else {
			sendReadMessage_(msisdn, messageId, authClient, callback);
		}
	},

	/**
	 * Revokes the given message from being sent to the user.
	 * @param {string} msisdn The phone number in E.164 format.
	 * @param {string} messageId The identifier for the message that was sent.
	 * @param {function} callback Function called once the message is revoked.
	 */
	revokeMessage: function(msisdn, messageId, callback) {
		if (!authClient) {
			throw MISSING_INITIALIZATION;
		} else {
			revokeMessage_(msisdn, messageId, authClient, callback);
		}
	},

	/**
	 * Sends the device an RBM message.
	 * @param {object} params The params for the api call.
	 * @param {string} params.messageText The message to
	 * send the user.
	 * @param {string} params.msisdn The phone number
	 * in E.164 format.
	 * @param {array} params.suggestions The suggested chip
	 * list of replies.
	 * @param {string} params.timeToLive (optional) Time that
	 * an RBM message can live in seconds - if it is not delivered
	 * in this period then the developer will be notified.
	 * Format is Ns e.g. "5s".
	 * @param {string} params.expireTime (optional) Time that the
	 * message should expire if not delivered. Defined as a UTC timestamp
	 * i.e. "2014-10-02T15:01:23Z"
	 * @param {function} callback Callback method for after
	 * the method is complete.
	 * @return {Promise} if callback is not provided.
	 */
	sendMessage: function(params, callback) {
		if (!authClient) {
			throw MISSING_INITIALIZATION;
		} else {
			return sendMessage_(params, authClient, callback);
		}
	},

	/**
	 * Sends the device a rich card over RCS.
	 * @param {object} params An object of parameters needed for a richcard.
	 * @param {string} params.messageText The message to
	 * send the user.
	 * @param {string} params.messageDescription The description
	 * text to use in the rich card.
	 * @param {string} params.msisdn The phone number
	 * in E.164 format.
	 * @param {string} params.imageUrl The public URL
	 * of the image for the rich card.
	 * @param {array} params.suggestions The suggested chip
	 * list of replies.
	 * @param {string} params.timeToLive (optional) Time that
	 * an RBM message can live in seconds - if it is not delivered
	 * in this period then the developer will be notified.
	 * Format is Ns e.g. "5s".
	 * @param {string} params.expireTime (optional) Time that the
	 * message should expire if not delivered. Defined as a UTC timestamp
	 * i.e. "2014-10-02T15:01:23Z"
	 * @param {function} callback Callback method for after
	 * the method is complete.
	 */
	sendRichCard: function(params, callback) {
		if (!authClient) {
			throw MISSING_INITIALIZATION;
		} else {
			sendRichCard_(params, authClient, callback);
		}
	},

	/**
	 * Sends the device a card carousel
	 * @param {object} params An object of parameters needed for a richcard.
	 * @param {string} params.cardWidth The width of a card.
	 * @param {string} params.cardContents An array of
	 * rich card objects.
	 * @param {string} params.msisdn The phone number
	 * in E.164 format.
	 * @param {string} params.timeToLive (optional) Time that
	 * an RBM message can live in seconds - if it is not delivered
	 * in this period then the developer will be notified.
	 * Format is Ns e.g. "5s".
	 * @param {string} params.expireTime (optional) Time that the
	 * message should expire if not delivered. Defined as a UTC timestamp
	 * i.e. "2014-10-02T15:01:23Z"
	 * @param {function} callback Callback method for after
	 * the method is complete.
	 */
	sendCarouselCard: function(params, callback) {
		if (!authClient) {
			throw MISSING_INITIALIZATION;
		} else {
			sendCarouselCard_(params, authClient, callback);
		}
	},

	/**
	 * Upload a file to the RBM Content Store.
	 * @param {object} params The params for the api call.
	 * @param {string} params.fileUrl URL to file to upload.
	 * @param {string} params.thumbnailUrl (optional) Thumbnail URL.
	 * @param {array} params.contentDescription (optional) Description.
	 * @param {function} callback Callback method for after
	 * the method is complete.
	 * @return {Promise} if callback is not provided.
	 */
	uploadFile(params, callback) {
		if (!authClient) {
			throw MISSING_INITIALIZATION;
		} else {
			return uploadFile_(params, authClient, callback);
		}
	},

	/**
	 * Initializes the RBM API and authentication credentials to
	 * communicate with the RBM platform.
	 * @param {object} serviceAccountJsonObject The JSON object
	 * for the service account key file.
	 * @param {string} region The regional API prefix.
	 */
	initRbmApi: function(serviceAccountJsonObject, region) {
		// get the RCS business messaging API file
		const rcsbusinessmessaging = require('./rcsbusinessmessaging/v1');

		// configure a JWT auth client
		authClient = new google.auth.JWT(
			serviceAccountJsonObject.client_email,
			null,
			serviceAccountJsonObject.private_key,
			['https://www.googleapis.com/auth/rcsbusinessmessaging']
		);

		// initialize the RBM API
		const options = {};

		if (region) {
			options.rootUrl = 'https://' + region + 'rcsbusinessmessaging.googleapis.com/';
		}

		rbmApi =
			new rcsbusinessmessaging.rcsbusinessmessaging_v1
				.Rcsbusinessmessaging(options, google);
	},
};

/**
 * Uses the RBM API to perform a synchronous capability check.
 * @param {string} msisdns The phone number in E.164 format.
 * @param {object} authClient The authorization client for Google services
 * @param {function} callback A callback function called at
 * the completion of getUsers
 * @return {Promise} if callback is not provided.
 */
function getUsers_(msisdns, authClient, callback) {
	// set the params
	const params = {
		auth: authClient,
		resource: {
			users: msisdns,
		},
	};

	if (agentId != null) params.agentId = agentId;

	if (callback == undefined) {
		return new Promise((resolve, reject) => {
			rbmApi.users.batchGet(params, {}, function(error, response) {
				error ? reject(error) : resolve(response);
			});
		});
	} else {
		rbmApi.users.batchGet(params, {}, function(err, response) {
			if (callback != undefined) {
				callback(response, err);
			}
		});
	}
}

/**
 * Uses the RBM API to perform a synchronous capability check.
 * @param {string} msisdn The phone number in E.164 format.
 * @param {object} authClient The authorization client for Google services
 * @param {function} callback Callback method for
 * after the method is complete.
 * @return {Promise} if callback is not provided.
 */
function checkCapability_(msisdn, authClient, callback) {
	const requestId = uuidv4();

	// set the params
	const params = {
		name: 'phones/' + msisdn,
		requestId: requestId,
		auth: authClient,
	};

	if (agentId != null) params.agentId = agentId;

	if (callback == undefined) {
		return new Promise((resolve, reject) => {
			rbmApi.phones.getCapabilities(params, {}, function(error, response) {
				error ? reject(error) : resolve(response);
			});
		});
	} else {
		rbmApi.phones.getCapabilities(params, {}, function(err, response) {
			// prints the RBM capabilities of the phone
			console.log(response);

			if (callback != undefined) {
				callback(response, err);
			}
		});
	}
}

/**
 * Uses the RBM API to send an invite to become a tester.
 * @param {string} msisdn The phone number in E.164 format.
 * @param {object} authClient The authorization client for Google services
 * @param {function} callback Callback method for
 * after the method is complete.
 */
function sendTesterInvite_(msisdn, authClient, callback) {
	// set the params
	const params = {parent: 'phones/' + msisdn, auth: authClient};

	if (agentId != null) params.agentId = agentId;

	// send a tester request
	rbmApi.phones.testers.create(params, {}, function(err, response) {
		console.log(response);

		if (callback != undefined) {
			callback(response, err);
		}
	});
}

/**
 * Uses the RBM API to send an IS_TYPING event to the msisdn.
 * @param {string} msisdn The phone number in E.164 format.
 * @param {google.auth.JWT} authClient The authenticated cloud client.
 * @param {function} callback Callback method for
 * after the method is complete.
 */
function sendIsTypingMessage_(msisdn, authClient, callback) {
	// generate a random message id for this event
	const eventId = uuidv4();

	// create the JSON message payload to send
	const options = {
		eventType: 'IS_TYPING',
	};

	// setup the parameters for the API call
	const params = {
		parent: 'phones/' + msisdn,
		eventId: eventId,
		auth: authClient,
		resource: options, // POST body
	};

	if (agentId != null) params.agentId = agentId;

	// send the client the message
	rbmApi.phones.agentEvents.create(params, options, function(err, response) {
		if (callback != undefined) {
			callback(response, err);
		}
	});
}

/**
 * Uses the RMB API to send a READ event to the msisdn.
 * @param {string} msisdn The phone number in E.164 format.
 * @param {string} messageId The identifier for the message that was read.
 * @param {google.auth.JWT} authClient The authenticated cloud client.
 * @param {function} callback Callback method for after the method is complete.
 */
function sendReadMessage_(msisdn, messageId, authClient, callback) {
	// generate a random message id for this event
	const eventId = uuidv4();

	// create the JSON message payload to send
	const options = {
		eventType: 'READ',
		messageId: messageId,
	};

	// setup the parameters for the API call
	const params = {
		parent: 'phones/' + msisdn,
		eventId: eventId,
		auth: authClient,
		resource: options, // POST body
	};

	if (agentId != null) params.agentId = agentId;

	// send the client the message
	rbmApi.phones.agentEvents.create(params, options, function(err, response) {
		if (callback != undefined) {
			callback(response, err);
		}
	});
}

/**
 * Uses the RMB API to stop the message from being delivered to msisdn.
 * @param {string} msisdn The phone number in E.164 format.
 * @param {string} messageId The identifier for the message that was sent.
 * @param {google.auth.JWT} authClient The authenticated cloud client.
 * @param {function} callback Callback method for after the method is complete.
 */
function revokeMessage_(msisdn, messageId, authClient, callback) {
	// setup the parameters for the API call
	const params = {
		name: 'phones/' + msisdn + '/agentMessages/' + messageId,
		auth: authClient,
	};

	if (agentId != null) params.agentId = agentId;

	// remove the message from the delivery queue
	rbmApi.phones.agentMessages.delete(params, {}, function(err, response) {
		if (callback != undefined) {
			callback(response, err);
		}
	});
}

/**
 * Sends the device a rich card over RCS.
 * @param {object} params An object of parameters needed for a richcard.
 * @param {google.auth.JWT} authClient The authenticated cloud client.
 * @param {function} callback Callback method for after
 * the method is complete.
 */
function sendRichCard_(params, authClient, callback) {
	let messageText = '';
	if (params.messageText != undefined) {
		messageText = params.messageText;
	}

	let messageDescription = '';
	if (params.messageDescription != undefined) {
		messageDescription = params.messageDescription;
	}

	// msisdn to send the message to
	const msisdn = params.msisdn;

	// generate a random message id for this message
	const messageId = uuidv4();

	// create the JSON message payload to send
	const options = {
		contentMessage: {
			richCard: {
				standaloneCard: {
					cardOrientation: 'VERTICAL',
					cardContent: {
						title: messageText,
						description: messageDescription,
					},
				},
			},
		},
	};

	if (params.cardOrientation != undefined) {
		options.contentMessage.richCard.standaloneCard.cardOrientation =
			params.cardOrientation;
	}

	if (params.thumbnailImageAlignment != undefined) {
		options.contentMessage.richCard.standaloneCard.thumbnailImageAlignment =
			params.thumbnailImageAlignment;
	}

	if (params.imageUrl != undefined) {
		let forceRefresh = false;
		let height = 'TALL';

		if (params.forceRefresh != undefined) {
			forceRefresh = params.forceRefresh;
		}

		if (params.height != undefined) {
			height = params.height;
		}

		options.contentMessage.richCard.standaloneCard.cardContent.media = {
			height: height,
			contentInfo: {
				fileUrl: params.imageUrl,
				forceRefresh: forceRefresh,
			},
		};

		if (params.thumbnailUrl != undefined) {
			options.contentMessage.richCard.standaloneCard.cardContent
				.media.contentInfo.thumbnailUrl = params.thumbnailUrl;
		}
	}

	// add suggested replies if they exist
	if (params.suggestions != undefined &&
		params.suggestions.length != null &&
		params.suggestions.length > 0) {
		options.contentMessage.richCard.standaloneCard.cardContent.suggestions =
			params.suggestions;
	}

	// setup the parameters for the API call
	const apiParams = {
		parent: 'phones/' + msisdn,
		messageId: messageId,
		auth: authClient,
		resource: options, // POST body
	};

	if (params.timeToLive != undefined) {
		options.ttl = params.timeToLive;
	} else {
		// add expireTime if available
		if (params.expireTime != undefined) {
			options.expireTime = params.expireTime;
		}
	}

	if (agentId != null) apiParams.agentId = agentId;

	// send the client the message
	rbmApi.phones.agentMessages.create(apiParams,
		options, function(err, response) {
			console.dir(err);
			if (callback != undefined) {
				callback(response, err);
			}
		});
}

/**
 * Sends the device a rich card over RCS.
 * @param {object} params An object of parameters needed for a carousel.
 * @param {google.auth.JWT} authClient The authenticated cloud client.
 * @param {function} callback Callback method for after
 * the method is complete.
 */
function sendCarouselCard_(params, authClient, callback) {
	let cardWidth = 'MEDIUM';
	if (params.cardWidth != undefined) {
		cardWidth = params.cardWidth;
	}

	const cardContents = params.cardContents;

	// msisdn to send the message to
	const msisdn = params.msisdn;

	// generate a random message id for this message
	const messageId = uuidv4();

	// create the JSON message payload to send
	const options = {
		contentMessage: {
			richCard: {
				carouselCard: {
					cardWidth: cardWidth,
					cardContents: cardContents,
				},
			},
		},
	};

	// setup the parameters for the API call
	const apiParams = {
		parent: 'phones/' + msisdn,
		messageId: messageId,
		auth: authClient,
		resource: options, // POST body
	};

	if (params.timeToLive != undefined) {
		options.ttl = params.timeToLive;
	} else {
		// add expireTime if available
		if (params.expireTime != undefined) {
			options.expireTime = params.expireTime;
		}
	}

	if (agentId != null) apiParams.agentId = agentId;

	// send the client the message
	rbmApi.phones.agentMessages.create(apiParams,
		options, function(err, response) {
			if (callback != undefined) {
				callback(response, err);
			}
		});
}

/**
 * Uses the RBM API to send the device an RBM message.
 * @param {object} params An object of parameters needed for messaging.
 * @param {google.auth.JWT} authClient The authenticated cloud client.
 * @param {function} callback Callback method for after the method is complete.
 * @return {Promise} if callback is not provided.
 */
function sendMessage_(params, authClient, callback) {
	// generate a random message id for this message
	const messageId = uuidv4();

	// get the message text and msisdn from the parameters
	const messageText = params.messageText;
	const msisdn = params.msisdn;

	// create the JSON message payload to send
	const options = {
		contentMessage: {},
	};

	// add text if it exists
	if (messageText != undefined) {
		options.contentMessage.text = messageText;
	}

	// add suggested replies if they exist
	if (params.suggestions != undefined &&
		params.suggestions.length != null &&
		params.suggestions.length > 0) {
		options.contentMessage.suggestions = params.suggestions;
	}

	// add an image if a media item exists
	if (params.fileUrl != undefined) {
		options.contentMessage.contentInfo = {
			fileUrl: params.fileUrl,
		};
		if (params.thumbnailUrl != undefined) {
			options.contentMessage.contentInfo.thumbnailUrl = params.thumbnailUrl;
		}
		if (params.forceRefresh != undefined) {
			options.contentMessage.contentInfo.forceRefresh = params.forceRefresh;
		}
	} else if (params.uploadedFileName != undefined) {
		options.contentMessage.uploadedRbmFile = {
			fileName: params.uploadedFileName,
		};
		if (params.uploadedThumbnailName != undefined) {
			options.contentMessage.uploadedRbmFile.thumbnailName =
				params.uploadedThumbnailName;
		}
	}

	// setup the parameters for the API call
	const apiParams = {
		parent: 'phones/' + msisdn,
		messageId: messageId,
		auth: authClient,
		resource: options, // POST body
	};

	if (params.timeToLive != undefined) {
		options.ttl = params.timeToLive;
	} else {
		// add expireTime if available
		if (params.expireTime != undefined) {
			options.expireTime = params.expireTime;
		}
	}

	if (agentId != null) apiParams.agentId = agentId;

	// send the client the message
	if (callback == undefined) {
		return new Promise((resolve, reject) => {
			rbmApi.phones.agentMessages.create(apiParams,
				options, function(error, response) {
					error ? reject(error) : resolve(response);
				});
		});
	} else {
		rbmApi.phones.agentMessages.create(apiParams, options,
			function(err, response) {
				if (callback != undefined) {
					callback(response, err);
				}
			});
	}
}

/**
 * Upload a file to the RBM Content Store.
 * @param {object} params An object of parameters needed for messaging.
 * @param {google.auth.JWT} authClient The authenticated cloud client.
 * @param {function} callback Callback method for after the method is complete.
 * @return {Promise} if callback is not provided.
 */
function uploadFile_(params, authClient, callback) {
	const apiParams = {
		auth: authClient,
		resource: params,
	};

	if (agentId != null) apiParams.agentId = agentId;

	// send the client the message
	if (callback == undefined) {
		return new Promise((resolve, reject) => {
			rbmApi.files.create(apiParams,
				function(error, response) {
					error ? reject(error) : resolve(response);
				});
		});
	} else {
		rbmApi.files.create(apiParams,
			function(err, response) {
				if (callback != undefined) {
					callback(response, err);
				}
			});
	}
}

rbmApiHelper.REGION_US = 'us-';
rbmApiHelper.REGION_EU = 'europe-';
rbmApiHelper.REGION_APAC = 'asia-';

module.exports = rbmApiHelper;


