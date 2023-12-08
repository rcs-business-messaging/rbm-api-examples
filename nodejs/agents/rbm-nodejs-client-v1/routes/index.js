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
const privateKeyFile =
  '../resources/rbm-agent-service-account-credentials.json';

// service account credentials for Pub/Sub
const privatekey = require(privateKeyFile);

// the name of the Pub/Sub pull subscription,
// replace with your subscription name
const subscriptionName = 'rbm-agent-subscription';

// reference to RBM API helper
const rbmApiHelper = require('@google/rcsbusinessmessaging');

rbmApiHelper.initRbmApi(privatekey);

// Set the agent ID if you are using the RBM Partner model
// i.e. (multiple agents per account)
// rbmApiHelper.setAgentId(AGENTID);

// initialize Pub/Sub for pull subscription listener
// this is how this agent will receive messages from the client
initPubsub();

/**
 * Invites the posted phone number as a tester for this agent.
 */
router.post('/inviteTester', function(req, res, next) {
  // get the phone number value
  const phoneNumber = req.body.phone_number;

  // initialize the conversation
  rbmApiHelper.sendTesterInvite(phoneNumber, function() {
    const message = 'Test invite has been sent.';

    res.redirect('/?message=' + message);
  });
});

/**
 * Sends the phone number a message asking what their favorite color is.
 */
router.post('/sendMessage', function(req, res, next) {
  // get the phone number value
  const phoneNumber = req.body.phone_number;

  const params = {
    messageText: 'What is your favorite color?',
    msisdn: phoneNumber,
  };

  // initialize the conversation
  rbmApiHelper.sendMessage(params,
      function() {
        const message = 'Conversation initiated.';

        res.redirect('/?message=' + message);
      });
});

/**
 * Callback for Pub/Sub webhook.
 * This is only needed for a push subscription.
 * Parses the message from Pub/Sub to get the user's
 * response and sends a follow-up response.
 */
router.post('/callback', function(req, res, next) {
  console.log('callback method');

  const requestBody = req.body;

  const encodedUserEvent = requestBody.message.data;

  console.log('encodedUserEvent: ' + encodedUserEvent);

  const userEventString = Buffer.from(encodedUserEvent, 'base64');
  const userEvent = JSON.parse(userEventString);

  console.log('userEventString: ' + userEventString);

  handleMessage(userEvent);

  res.sendStatus(200);
});

/**
 * Agent test page for registering as a test device and starting
 * the conversation with the agent.
 */
router.get('/', function(req, res, next) {
  let message = '';

  if (req.query.message) {
    message = req.query.message;
  }
  res.render('index', {title: 'First RBM Agent', message: message});
});

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

      if (message.toLowerCase() === 'stop') {
        // Any real agent must support this command
        // TODO: Client typed stop, agent should no longer
        // send messages to this msisdn
        console.log(msisdn + ' asked to stop agent messaging');
      } else {
        // let the user know we are typing
        rbmApiHelper.sendIsTypingMessage(msisdn, function() {
          const messageText = 'I like ' + message + ' too!';

          const params = {
            messageText: messageText,
            msisdn: msisdn,
          };

          // send a response to the user
          rbmApiHelper.sendMessage(params);
        });
      }
    }
  }
}

/**
 * Initializes a pull subscription message handler
 * to receive messages from Pub/Sub.
 */
function initPubsub() {
  const pubsub = new PubSub({
    projectId: privatekey.project_id,
    keyFilename: './resources/rbm-agent-service-account-credentials.json',
  });

  // references an existing subscription
  const subscription = pubsub.subscription(subscriptionName);

  // create an event handler to handle messages
  const messageHandler = (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);

    const userEvent = JSON.parse(message.data);

    handleMessage(userEvent);

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);
}

module.exports = router;
