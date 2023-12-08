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

// reference to XYZ Group chat bot
const xyzBot = require('../libs/xyz_bot');

// reference to the router for parsing client responses
// and routing to the next interaction with the bot
const botRouter = require('../libs/bot_router');

// initialize Pub/Sub for pull subscription listener
// this is how this agent will receive messages from the client
initPubsub();

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

  // create a reference to send wait time notification
  const waitTimeImageRequest = xyzBot.sendInitialWaitTime(msisdn);

  // send the user the approx. wait time
  waitTimeImageRequest.then(function(result) {
    res.json({'result': 'ok'});
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
 * Initializes a pull subscription message handler
 * to receive messages from Pub/Sub.
 */
function initPubsub() {
  console.log('initPubsub');

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

    botRouter.handleMessage(userEvent);

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);

  console.log('initPubsub done');
}

module.exports = router;
