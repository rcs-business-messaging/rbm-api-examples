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

// used for hashing user passwords
const bcrypt = require('bcrypt');

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

// Imports the Google Cloud client library
const {Datastore} = require('@google-cloud/datastore');
const datastorePrivatekey =
  require('../resources/datastore-service-account-credentials.json');

// Creates a client
const datastore = new Datastore({
  projectId: datastorePrivatekey.project_id,
  keyFilename: './resources/datastore-service-account-credentials.json',
});

/**
 * Creates a new user account within the datastore if needed.
 * Invites the device phone number as a tester for this agent.
 */
router.post('/register', function(req, res, next) {
  // get the phone number value
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);

  const userKey = datastore.key(['User', email]);

  // prepares the new user
  const user = {
    key: userKey,
    data: {
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    },
  };

  // retrieves the user by email
  getUser(email, function(matchingUser) {
    // check for matching users
    if (matchingUser) {
      res.json({
        'result': 'fail',
        'message': 'User is already registered.',
      });
    } else {
      // saves the new user information
      datastore
          .save(user)
          .then(() => {
            // invite the user to test the agent
            rbmApiHelper.sendTesterInvite(phoneNumber, function() {
              res.json({'result': 'ok'});
            });
          })
          .catch((err) => {
            res.json({
              'result': 'fail',
              'message': err,
            });
            console.error('ERROR:', err);
          });
    }
  });
});

/**
 * Logs the user out by updating the user's state
 * in the datastore and session.
 */
router.get('/logout', function(req, res, next) {
  req.session_state.loggedIn = false;

  const email = req.session_state.email;

  if (email != undefined) {
    getUser(email, function(matchingUser) {
      if (matchingUser) {
        matchingUser.loggedIn = false;
        matchingUser.fraud = false;

        // saves the user
        datastore.save(matchingUser);

        const messageText = 'You have been logged out of your account.';

        const params = {
          messageText: messageText,
          msisdn: matchingUser.phoneNumber,
        };

        // send the user a message letting them
        // know they have been logged out
        rbmApiHelper.sendMessage(params);
      }

      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

/**
 * Performs two-factor authentication to log the user in.
 */
router.post('/login', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // get the user based on the email provided
  getUser(email, function(matchingUser) {
    if (matchingUser) {
      // make sure the password matches
      if (!bcrypt.compareSync(password, matchingUser.password)) {
        res.json({
          'result': 'fail',
          'message': 'Sorry, but your email and password ' +
                        'do not match your login credentials.',
        });
      } else {
        matchingUser.loggedIn = false;
        matchingUser.fraud = false;

        // saves the user
        datastore.save(matchingUser);

        // get the saved user's phone number
        const phoneNumber = matchingUser.phoneNumber;

        // prepare the RBM api JSON payload
        const suggestions = [
          {
            reply: {
              text: 'Confirm',
              postbackData: 'confirm:' + email,
            },
          },
          {
            reply: {
              text: 'Report Fraud',
              postbackData: 'fraud:' + email,
            },
          },
        ];

        const messageText = 'Tap "Confirm" to verify your login.' +
                    '\n\nIf you did not initiate this login request ' +
                    'initiate this login request, please report this ' +
                    'as fraudalent.';

        const params = {
          messageText: messageText,
          msisdn: phoneNumber,
          suggestions: suggestions,
        };

        // send the user the two-factor message
        rbmApiHelper.sendMessage(params,
            function() {
              res.json({
                'result': 'ok',
              });
            });
      }
    } else {
      res.json({
        'result': 'fail',
      });
    }
  });
});

/**
 * Login page simulation for 2FA demo agent.
 */
router.get('/', function(req, res, next) {
  let message = '';

  if (req.query.message) {
    message = req.query.message;
  }

  res.render('index', {title: '2FA RBM Agent', message: message});
});

/**
 * 2FA confirmation page. This will display a waiting message and instruct
 * the user to check their device for confirmation.
 */
router.get('/confirm', function(req, res, next) {
  const email = req.query.email;

  res.render('two_factor_waiting', {
    title: '2FA Confirmation Screen', email: email,
  });
});

router.get('/sms_code', function(req, res, next) {
  res.render('two_factor_sms', {title: '2FA SMS Confirmation Screen'});
});

/**
 * 2FA logged in page. Displayed after the user is successfully
 * logged into their account.
 */
router.get('/success', function(req, res, next) {
  const loggedIn = req.session_state.loggedIn;

  // if the user is logged in, render the logged in state
  if (loggedIn) {
    res.render('logged_in', {title: '2FA Logged In Screen'});
  } else { // user is not logged in, go back to login page
    res.redirect('/');
  }
});

/**
 * This is called by the UI to check the current state
 * of the user. Of they are logged in, a positive result
 * will be returned and the user will be transfered to
 * the login page.
*/
router.get('/checkLogin', function(req, res, next) {
  const email = req.query.email;

  getUser(email, function(matchingUser) {
    if (matchingUser.loggedIn == undefined) {
      // still waiting for the user's 2FA response
      res.json({
        'result': 'waiting',
      });
    } else if (matchingUser.loggedIn) {
      req.session_state.loggedIn = true;
      req.session_state.email = email;

      // if the user is logged in, return success
      res.json({
        'result': 'ok',
      });
    } else if (!matchingUser.loggedIn) {
      req.session_state.loggedIn = false;

      if (matchingUser.fraud != undefined && matchingUser.fraud) {
        // if the user is logged in, return success
        res.json({
          'result': 'fail',
        });
      } else {
        res.json({
          'result': 'waiting',
        });
      }
    }
  });
});

/**
 * Checks the datastore for the user based on the email.
 * @param {string} email The email of the user.
 * @param {function} callback The function to call
 * after the user is found.
 */
function getUser(email, callback) {
  const key = datastore.key(['User', email]);

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
    let message = getMessageBody(userEvent);

    // get the message id
    const messageId = userEvent.messageId;

    // check to see that we have a message to process
    if (message) {
      // send a read receipt
      rbmApiHelper.sendReadMessage(msisdn, messageId);

      // let the user know we are typing
      rbmApiHelper.sendIsTypingMessage(msisdn, function() {
        let email = '';

        if (message.indexOf(':') > 0) {
          const messagePieces = message.split(':');

          message = messagePieces[0];
          email = messagePieces[1];
        }

        let loggedIn = false;
        let fraudalent = false;

        // send a response to the user based on their input
        if (message == 'confirm') {
          messageText = 'Thank you. You will be automatically ' +
                        'logged into the website now. Have a great day!';

          loggedIn = true;
          fraudalent = false;
        } else { // send the user a fraud alert
          messageText = 'Thank you for reporting this. We will ' +
                        'lock take appropriate actions to stop this ' +
                        'malicious behavior.';

          loggedIn = false;
          fraudalent = true;
        }

        if (email) {
          getUser(email, function(matchingUser) {
            if (matchingUser) {
              matchingUser.loggedIn = loggedIn;
              matchingUser.fraud = fraudalent;

              // saves the user
              datastore.save(matchingUser);
            }

            const params = {
              messageText: messageText,
              msisdn: msisdn,
            };

            // send the reply to the user
            rbmApiHelper.sendMessage(params);
          });
        }
      });
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

    // "Ack" (acknowledge receipt of) the message
    message.ack();

    handleMessage(userEvent);
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);
}

module.exports = router;
