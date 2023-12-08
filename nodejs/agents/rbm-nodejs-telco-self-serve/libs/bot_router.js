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

// location of service account credentials file
const privatekey =
    require('../resources/rbm-agent-service-account-credentials.json');

// reference to RBM API helper
co = require('@google/rcsbusinessmessaging');

rbmApiHelper.initRbmApi(privatekey);

// Set the agent ID if you are using the RBM Partner model
// i.e. (multiple agents per account)
// rbmApiHelper.setAgentId(AGENTID);

// reference to the telco bot for XYZ group
const xyzBot = require('./xyz_bot');

// reference to postback constants used for message routing
const constants = require('./constants');

/**
 * This router parses client responses and uses that to determine
 * the state of the conversation and trigger the next message from
 * the xyzBot RBM agent.
 */
const botRouter = {
  /**
     * Uses the event received by the pull subscription to route the
     * response to the correct handler to generate the next message
     * in the flow.
     * @param {object} userEvent The JSON object of a message
     * received by the pull subscription.
     */
  handleMessage: function(userEvent) {
    if (userEvent.senderPhoneNumber != undefined) {
      // get the sender's phone number
      const msisdn = userEvent.senderPhoneNumber;

      // parse the response text
      const message = this.getMessageBody(userEvent);

      // get the message id
      const messageId = userEvent.messageId;

      // check to see that we have a message to process
      if (message) {
        // send a read receipt
        rbmApiHelper.sendReadMessage(msisdn, messageId);

        if (message.toLowerCase() === constants.RESTART_AGENT) {
          xyzBot.sendInitialWaitTime(msisdn);
        } else if (message.indexOf(constants.SERVICE_SUGGESTION) === 0) {
          xyzBot.sendServiceOptions(msisdn, message);
        } else if (message.indexOf(constants.SERVICE_INTERNET) === 0) {
          this.handleInternetResponse(message, msisdn);
        } else if (message.indexOf(constants.SERVICE_TV) === 0) {
          this.handleTVResponse(message, msisdn);
        } else if (message.indexOf(constants.SERVICE_LANDLINE) === 0) {
          this.handleLandlineResponse(message, msisdn);
        } else if (message.indexOf(constants.SERVICE_MOBILE) === 0) {
          this.handleMobileResponse(message, msisdn);
        } else if (message.indexOf(constants.CREATE_SERVICE) === 0) {
          xyzBot.sendTalkToLiveAgent(msisdn);
        } else if (message.indexOf(constants.FIBRE_UPGRADE) === 0) {
          this.handleFibreUpgrade(message, msisdn);
        } else if (message.indexOf(constants.TV_UPGRADE) === 0) {
          this.handleTVUpgrade(message, msisdn);
        } else if (message.indexOf('binary-') === 0) {
          this.handleBinaryChoice(message, msisdn);
        } else if (message.indexOf('rating_') === 0) {
          xyzBot.sendThankYou(message, msisdn);
        } else if (message.indexOf(constants.IGNORE_RESPONSE) === 0) {
          xyzBot.sendLiveAgentCheck(msisdn);
        } else if (message.indexOf(constants.SUGGESTION_MAIN_MENU) === 0) {
          xyzBot.sendMainMenu(msisdn);
        }
      } else {
        console.log('unhandled message');
      }
    }
  },

  /**
     * Handler for all yes/no decisions.
     * @param {string} message The postback data from the client.
     * @param {string} msisdn The phone number in E.164 format.
     */
  handleBinaryChoice: function(message, msisdn) {
    if (message.indexOf(constants.YES_UPGRADE_RESPONSE) === 0) {
      xyzBot.sendUpgradeConfirmed(msisdn);
    } else if (message.indexOf(constants.NO_UPGRADE_RESPONSE) === 0) {
      xyzBot.sendUpgradeCancelled(msisdn);
    } else if (message.indexOf(constants.NO_HELP_RESPONSE) === 0) {
      xyzBot.sendLiveAgentCheck(msisdn);
    } else if (message.indexOf(constants.YES_MORE_HELP_RESPONSE) === 0) {
      // send main menu again
      xyzBot.sendUpdatedWaitTime(msisdn);
    } else if (message.indexOf(constants.NO_LIVE_RESPONSE) === 0) {
      xyzBot.sendRemoveQueueResponse(msisdn);
    } else if (message.indexOf(constants.YES_LIVE_RESPONSE) === 0) {
      // send update about queue position
      xyzBot.sendUpdatedWaitTime(msisdn);
    } else if (message.indexOf(constants.YES_CHECK_QUEUE_RESPONSE) === 0) {
      xyzBot.sendUpdatedWaitTime(msisdn);
    }
  },

  /**
     * Handler for responses from the Internet sub menu options.
     * These include starting service, upgrading existing services,
     * other and viewing a bill.
     * @param {string} message The postback data from the client.
     * @param {string} msisdn The phone number in E.164 format.
     */
  handleInternetResponse: function(message, msisdn) {
    console.log('handleInternetResponse');

    if (message.indexOf(constants.SUGGESTION_START_SERVICE) >= 0) {
      xyzBot.startInternetServiceResponse(msisdn);
    } else if (message.indexOf(constants.SUGGESTION_CHANGE_SERVICE) >= 0) {
      xyzBot.changeInternetServiceResponse(msisdn);
    } else if (message.indexOf(constants.SUGGESTION_OTHER) >= 0) {
      xyzBot.sendTalkToLiveAgent(msisdn);
    } else if (message.indexOf(constants.SUGGESTION_VIEW_BILL) >= 0) {
      xyzBot.sendBillInfo(msisdn, message);
    }
  },

  /**
     * Handler for responses from the TV sub menu options.
     * These include starting service, upgrading existing services,
     * other and viewing a bill.
     * @param {string} message The postback data from the client.
     * @param {string} msisdn The phone number in E.164 format.
     */
  handleTVResponse: function(message, msisdn) {
    console.log('handleTVResponse ' + message);

    if (message.indexOf(constants.SUGGESTION_START_SERVICE) >= 0) {
      xyzBot.startTVServiceResponse(msisdn);
    } else if (message.indexOf(constants.SUGGESTION_CHANGE_SERVICE) >= 0) {
      xyzBot.changeTVServiceResponse(msisdn);
    } else if (message.indexOf(constants.SUGGESTION_OTHER) >= 0) {
      xyzBot.sendTalkToLiveAgent(msisdn);
    } else if (message.indexOf(constants.SUGGESTION_VIEW_BILL) >= 0) {
      xyzBot.sendBillInfo(msisdn, message);
    }
  },

  /**
     * Handler for responses from the landline sub menu options.
     * These include starting service, upgrading existing services,
     * other and viewing a bill.
     * @param {string} message The postback data from the client.
     * @param {string} msisdn The phone number in E.164 format.
     */
  handleLandlineResponse: function(message, msisdn) {
    console.log('handleLandlineResponse ' + message);

    if (message.indexOf(constants.SUGGESTION_START_SERVICE) >= 0) {
      xyzBot.startLandlineServiceResponse(msisdn);
    } else if (message.indexOf(constants.SUGGESTION_OTHER) >= 0) {
      xyzBot.sendTalkToLiveAgent(msisdn);
    } else if (message.indexOf(constants.SUGGESTION_VIEW_BILL) >= 0) {
      xyzBot.sendBillInfo(msisdn, message);
    }
  },

  /**
     * Handler for responses from the mobile sub menu options.
     * These include starting service, upgrading existing services,
     * other and viewing a bill.
     * @param {string} message The postback data from the client.
     * @param {string} msisdn The phone number in E.164 format.
     */
  handleMobileResponse: function(message, msisdn) {
    console.log('handleMobileResponse ' + message);

    if (message.indexOf(constants.SUGGESTION_START_SERVICE) >= 0) {
      xyzBot.startMobileServiceResponse(msisdn);
    } else if (message.indexOf(constants.SUGGESTION_OTHER) >= 0) {
      xyzBot.sendTalkToLiveAgent(msisdn);
    } else if (message.indexOf(constants.SUGGESTION_VIEW_BILL) >= 0) {
      xyzBot.sendBillInfo(msisdn, message);
    }
  },

  /**
     * Handler for responses to upgrade the client's TV subscription.
     * The message response is based on the selected upgrade.
     * @param {string} message The postback data from the client.
     * @param {string} msisdn The phone number in E.164 format.
    */
  handleTVUpgrade: function(message, msisdn) {
    let messageText = '';
    if (message === constants.TV_UPGRADE_ENTERTAINMENT) {
      messageText = 'You selected the entertainment plan for $10.00 a month. ' +
                'Are you sure you want to upgrade?';
    } else if (message === constants.TV_UPGRADE_MAX_HD) {
      messageText = 'You selected the Max HD plan for $18.50 a month. ' +
                'Are you sure you want to upgrade?';
    } else if (message === constants.TV_UPGRADE_MAX) {
      messageText = 'You selected the Max plan for $21.00 a month. ' +
                'Are you sure you want to upgrade?';
    }

    xyzBot.sendUpgradeConfirmation(msisdn, messageText);
  },

  /**
     * Handler for responses to upgrade the client's fibre subscription.
     * The message response is based on the selected upgrade.
     * @param {string} message The postback data from the client.
     * @param {string} msisdn The phone number in E.164 format.
    */
  handleFibreUpgrade: function(message, msisdn) {
    let messageText = '';
    if (message === constants.FIBRE_UPGRADE_PLUS) {
      messageText = 'You selected the fiber plus plan for $54.99 a month. ' +
                'Are you sure you want to upgrade?';
    } else if (message === constants.FIBRE_UPGRADE_UNLIMITED) {
      messageText = 'You selected the unlimited fibre plan for ' +
        ' $52.49 a month. Are you sure you want to upgrade?';
    } else if (message === constants.FIBRE_UPGRADE) {
      messageText = 'You selected the superfast fibre plan for ' +
        ' $37.49 a month. Are you sure you want to upgrade?';
    }

    xyzBot.sendUpgradeConfirmation(msisdn, messageText);
  },

  /**
     * Parses the userEvent object to get the response body.
     * This can be plaintext or part of a suggested response.
     * @param {object} userEvent The JSON object of a message
     * received by the pull subscription.
     * @return {string} The body of the message, false if not found.
     */
  getMessageBody: function(userEvent) {
    if (userEvent.text != undefined) {
      return userEvent.text;
    } else if (userEvent.suggestionResponse != undefined) {
      return userEvent.suggestionResponse.postbackData;
    }

    return false;
  },
};

module.exports = botRouter;
