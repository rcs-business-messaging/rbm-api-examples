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

const crypto = require('crypto');
const express = require('express');
const router = new express.Router();

// location of service account credentials file
const privateKeyFile =
  '../resources/rbm-agent-service-account-credentials.json';

const privatekey = require(privateKeyFile);

const config = require('../resources/config');

// reference to RBM API helper
const rbmApiHelper = require('@google/rcsbusinessmessaging');

rbmApiHelper.initRbmApi(privatekey);
rbmApiHelper.setAgentId(config.agentId);


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
 * Callback webhook.
 */
router.post('/callback', function(req, res, next) {
  const requestBody = req.body;

  // RBM webhook validation as described at
  // https://developers.google.com/business-communications/rcs-business-messaging/guides/integrate/webhooks#configure_an_agent_webhook
  if ((requestBody.hasOwnProperty('clientToken')) &&
        (requestBody.hasOwnProperty('secret'))) {
    // This is an RBM webhook validation request.
    // Check we received the token we were expecting
    if (requestBody.clientToken == config.webhookToken) {
      res.status(200).send(`secret: ${requestBody.secret}`);
    } else {
      res.sendStatus(403);
    }

    return;
  }

  // Inbound RBM webhook message validation and processing. See
  // https://developers.google.com/business-communications/rcs-business-messaging/guides/integrate/webhooks#verify_incoming_messages
  if ((requestBody.hasOwnProperty('message')) &&
  (requestBody.message.hasOwnProperty('data'))) {
    // Validate the received hash to ensure the message came from Google RBM
    const userEventString = Buffer.from(requestBody.message.data, 'base64');
    const hmac = crypto.createHmac('sha512', config.webhookToken);
    const data = hmac.update(userEventString);
    const genHash = data.digest('base64');
    const headerHash = req.header('X-Goog-Signature');

    if (headerHash == genHash) {
      const rbmEvent = JSON.parse(userEventString);

      handleMessage(rbmEvent);
    }
  }

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

module.exports = router;
