// Copyright 2018 Google LLC
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

const express = require('express');
const router = new express.Router();

const {PubSub} = require('@google-cloud/pubsub');

// location of service account credentials file
const rbmPrivateKeyFile =
    '../resources/rbm-agent-service-account-credentials.json';

const datastorePrivateKeyFile =
    '../resources/datastore-service-account-credentials.json';

// service account credentials for Pub/Sub
const rbmPrivatekey = require(rbmPrivateKeyFile);

const datastorePrivatekey = require(datastorePrivateKeyFile);

// Imports the Google Cloud client library
const {Datastore} = require('@google-cloud/datastore');

// Creates a client
const datastore = new Datastore({
  projectId: datastorePrivatekey.project_id,
  keyFilename: './resources/datastore-service-account-credentials.json',
});

// the name of the Pub/Sub pull subscription,
// replace with your subscription name
const subscriptionName = 'rbm-agent-subscription';

// reference to RBM API helper
const rbmApiHelper = require('@google/rcsbusinessmessaging');

rbmApiHelper.initRbmApi(rbmPrivatekey);

// Set the agent ID if you are using the RBM Partner model
// i.e. (multiple agents per account)
// rbmApiHelper.setAgentId(AGENTID);

// initialize Pub/Sub for pull subscription listener
// this is how this agent will receive messages from the client
initPubsub();

// define postback results from product review ratings
const RATING_OF_1 = 'rating_of_1';
const RATING_OF_2 = 'rating_of_2';
const RATING_OF_3 = 'rating_of_3';
const RATING_OF_4 = 'rating_of_4';
const RATING_OF_5 = 'rating_of_5';

const IGNORE_RATING = 'ignore';

/**
 * Invites the device phone number as a tester for this agent.
 */
router.get('/register', function(req, res, next) {
  // get the phone number value
  const phoneNumber = req.query.phone_number;

  // send the passed in phone number a tester invite
  rbmApiHelper.sendTesterInvite(phoneNumber, function() {
    res.json({'result': 'ok'});
  });
});

/**
 * Sends the user information about the product they purchased.
 */
router.get('/startConversation', function(req, res, next) {
  // get the phone number value
  const msisdn = req.query.phone_number;

  const userKey = datastore.key(['User', msisdn]);

  // prepares the new user
  const user = {
    key: userKey,
    data: {
      msisdn: msisdn,
      rating: false,
    },
  };

  // saves the user, this is for tracking context of conversation
  datastore.save(user);

  const messageText = 'You recently purchased the Dual Pine Canopy ' +
            'Reclaimed Wood Coffee Table. We would really love your ' +
            'feedback.\n\nNot interested? No problem, type STOP and ' +
            'we will not message you again.';

  const params = {
    messageText: messageText,
    msisdn: msisdn,
  };

  // remind the user about the item they purchased
  rbmApiHelper.sendMessage(params,
      function(response, err) {
        // create a reference to send a picture of the image
        const productImageRequest = sendProductImage(msisdn);

        // create a reference to send a product rating prompt
        const productRatingRequest = sendProductRatingPrompt(msisdn);

        // send the user the product review messages
        productImageRequest.then((result) => {
          productRatingRequest.then((ratingResult) => {
            res.json({'result': 'ok'});
          });
        });
      });
});

/**
 * Launch page for the demo.
 */
router.get('/', function(req, res, next) {
  let message = '';

  if (req.query.message) {
    message = req.query.message;
  }

  res.render('index', {message: message});
});

/**
 * Sends the client a prompt to give a start rating for
 * a coffee table they recently purchased.
 * @param {string} msisdn The phone number in E.164 format.
 * @return {Promise} A promise for execution of the RBM api call.
 */
function sendProductRatingPrompt(msisdn) {
  // define a list of suggested replies
  const suggestions = [
    {
      reply: {
        text: '😡',
        postbackData: RATING_OF_1,
      },
    },
    {
      reply: {
        text: '😞',
        postbackData: RATING_OF_2,
      },
    },
    {
      reply: {
        text: '😐',
        postbackData: RATING_OF_3,
      },
    },
    {
      reply: {
        text: '😊',
        postbackData: RATING_OF_4,
      },
    },
    {
      reply: {
        text: '😃',
        postbackData: RATING_OF_5,
      },
    },
    {
      reply: {
        text: 'Not Interested',
        postbackData: IGNORE_RATING,
      },
    },
  ];

  const messageText = 'Please rate your new coffee table with an ' +
            'emoji below and we\'ll send you $20 in rewards!';

  const params = {
    messageText: messageText,
    msisdn: msisdn,
    suggestions: suggestions,
  };

  return new Promise(function(resolve, reject) {
    rbmApiHelper.sendMessage(params,
        function(response) {
          if (response != null) {
            resolve();
          } else {
            reject(response);
          }
        });
  });
}

/**
 * Sends the client an image of the product they purchased.
 * @param {string} msisdn The phone number in E.164 format.
 * @return {Promise} A promise for execution of the RBM api call.
 */
function sendProductImage(msisdn) {
  // URL to an image of the product that was purchased
  const furnitureImageUrl = 'https://storage.googleapis.com/ggs-furniture-emporium.appspot.com/furniture_table.jpg';

  const params = {
    imageUrl: furnitureImageUrl,
    msisdn: msisdn,
  };

  // send a rich card with an image of the product
  return new Promise(function(resolve, reject) {
    try {
      rbmApiHelper.sendRichCard(params,
          function(response) {
            if (response != null) {
              resolve();
            } else {
              reject(response);
            }
          });
    } catch (e) {
      console.log(e);
    }
  });
}

/**
 * Uses the event received by the pull subscription to send a
 * response to the client's device.
 * @param {object} userEvent The JSON object of a message
 * received by the pull subscription.
 */
function handleMessage(userEvent) {
  if (userEvent.senderPhoneNumber != undefined) {
    // get the sender's phone number
    const msisdn = userEvent.senderPhoneNumber;

    // parse the response text
    const message = getMessageBody(userEvent);

    // get the message id
    const messageId = userEvent.messageId;

    // check to see that we have a message to process
    if (message) {
      // send a read receipt
      rbmApiHelper.sendReadMessage(msisdn, messageId);

      // check for ratings
      if (message.indexOf('rating_') >= 0) {
        handleProductRating(msisdn, message);
      } else if (message == IGNORE_RATING) {
        handleNoRating(msisdn);
      } else {
        getUser(msisdn, function(matchingUser) {
          // check for review response using user object for context
          if (matchingUser && matchingUser.rating) {
            handleProductReview(msisdn);
          } else { // resend product rating prompt
            sendProductRatingPrompt(msisdn);
          }
        });
      }
    } else {
      console.log('unhandled message');
    }
  }
}

/**
 * Sends the user an acknowledgement that
 * we won't ask for feedback again.
 * @param {string} msisdn The phone number in E.164 format.
 */
function handleNoRating(msisdn) {
  const messageText = 'Ok, no problem. Thank you for the purchase!';

  const isTypingRequest = sendIsTypingMessage(msisdn);

  const params = {
    messageText: messageText,
    msisdn: msisdn,
  };

  isTypingRequest.then(function() {
    rbmApiHelper.sendMessage(params);
  });
}

/**
 * Sends the user a thank you for supplying feedback.
 * @param {string} msisdn The phone number in E.164 format.
 */
function handleProductReview(msisdn) {
  const messageText = 'Thank you for the feedback. We have credited ' +
        'your account with $20 towards your next purchase.';

  const isTypingRequest = sendIsTypingMessage(msisdn);

  const params = {
    messageText: messageText,
    msisdn: msisdn,
  };

  isTypingRequest.then(function() {
    rbmApiHelper.sendMessage(params);
  });

  // reset the user's state
  getUser(msisdn, function(matchingUser) {
    matchingUser.rating = false;

    // saves the user
    datastore.save(matchingUser);
  });
}

/**
 * Based on the rating, sends a message to the user
 * prompting for further feedback.
 * @param {string} msisdn The phone number in E.164 format.
 * @param {string} message The message received from the user.
 */
function handleProductRating(msisdn, message) {
  let messageText = null;

  if (message === RATING_OF_1 || message === RATING_OF_2) {
    messageText = 'We are sorry that you and your table weren\'t a ' +
            'perfect match. We must have fell short in some capacity.\n\n' +
            'Please write back to us and let us know where we went wrong.';
  } else if (message === RATING_OF_3) {
    messageText = 'Thank you for sending us your rating. If you ' +
            'have a moment, please write to us and let us know what ' +
            'could have been better about your experience or furniture.';
  } else if (message === RATING_OF_4 || message === RATING_OF_5) {
    messageText = 'Fantastic! We are happy that you like your coffee ' +
            'table.\n\nPlease write back with a brief message describing why ' +
            'you love your table.';
  }

  const isTypingRequest = sendIsTypingMessage(msisdn);

  const params = {
    messageText: messageText,
    msisdn: msisdn,
  };

  isTypingRequest.then(function() {
    console.log('inside is typing');
    rbmApiHelper.sendMessage(params,
        function(response) {
          //  console.log(response);
        });
  });

  // update the user's state
  getUser(msisdn, function(matchingUser) {
    matchingUser.rating = true;

    // saves the user
    datastore.save(matchingUser);
  });
}

/**
 * Let's the user know that the agent is about to respond.
 * @param {string} msisdn The phone number in E.164 format.
 * @return {Promise} A promise for execution of the RBM api call.
 */
function sendIsTypingMessage(msisdn) {
  return new Promise(function(resolve, reject) {
    rbmApiHelper.sendIsTypingMessage(msisdn, function(response) {
      resolve();
    });
  });
}

/**
 * Checks the datastore for the matching user.
 * @param {string} msisdn The phone number in E.164 format.
 * @param {function} callback The function to call with the results.
 */
function getUser(msisdn, callback) {
  const key = datastore.key(['User', msisdn]);

  datastore.get(key).then((results) => {
    const matchingUser = results[0];

    if (matchingUser != undefined) {
      callback(matchingUser);
    } else {
      callback(false);
    }
  });
}

/**
 * Parses the userEvent object to get the response body.
 * This can be plaintext or part of a suggested response.
 * @param {object} userEvent The JSON object of a message
 * received by the pull subscription.
 * @return {string} The body of the message, false if not found.
 */
function getMessageBody(userEvent) {
  if (userEvent.text != undefined) {
    return userEvent.text;
  } else if (userEvent.suggestionResponse != undefined) {
    return userEvent.suggestionResponse.postbackData;
  }

  return false;
}

/**
 * Initializes a pull subscription message handler
 * to receive messages from Pub/Sub.
 */
function initPubsub() {
  console.log('initPubsub');

  const pubsub = new PubSub({
    projectId: rbmPrivatekey.project_id,
    keyFilename: './resources/rbm-agent-service-account-credentials.json',
  });

  // references an existing subscription
  const subscription = pubsub.subscription(subscriptionName);

  // create an event handler to handle messages
  const messageHandler = (message) => {
    // console.log(`Received message ${message.id}:`);
    // console.log(`\tData: ${message.data}`);
    // console.log(`\tAttributes: ${message.attributes}`);

    const userEvent = JSON.parse(message.data);

    handleMessage(userEvent);

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);

  console.log('initPubsub done');
}

module.exports = router;
