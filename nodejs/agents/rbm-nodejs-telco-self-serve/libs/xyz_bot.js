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

//

// location of service account credentials file
const privatekey =
  require('../resources/rbm-agent-service-account-credentials.json');

// reference to RBM API helper
const rbmApiHelper = require('@google/rcsbusinessmessaging');

rbmApiHelper.initRbmApi(privatekey);

// Set the agent ID if you are using the RBM Partner model
// i.e. (multiple agents per account)
// rbmApiHelper.setAgentId(AGENTID);

// reference to postback constants
const constants = require('./constants');

/**
 * Handles all bot to client communications.
 * The bot demonstrates how to deflect a user from
 * live support into a self-service RBM agent.
 */
const bot = {
  /**
     * Sends the client an image of the approx. wait time.
     * @param {string} msisdn The phone number in E.164 format.
     * @return {Promise} A promise for execution of the RBM api call.
     */
  sendInitialWaitTime: function(msisdn) {
    // URL to an image displaying the approximate wait time
    const imageUrl = 'https://storage.googleapis.com/xyz-group-images/approx-wait-time.001.jpeg';

    const messageText = 'Welcome to XYZ Group.';
    const messageDescription = 'You are 5th in line. Expected wait time = ' +
        '9 minutes. We will message you when it is your turn.\n\nIn the ' +
        ' meantime, would you like to tell us what are you here for?';

    const params = {
      imageUrl: imageUrl,
      msisdn: msisdn,
      messageText: messageText,
      messageDescription: messageDescription,
      suggestions: this.getMainMenu(),
    };

    // send a rich card with the main option menu
    return new Promise(function(resolve, reject) {
      rbmApiHelper.sendRichCard(params,
          function(response, err) {
            if (err == null) {
              resolve();
            } else {
              reject(err);
            }
          });
    });
  },

  /**
     * Sends the client an image of the approx. wait time.
     * @param {string} msisdn The phone number in E.164 format.
     * @return {Promise} A promise for execution of the RBM api call.
     */
  sendUpdatedWaitTime: function(msisdn) {
    // URL to an image displaying the approximate wait time
    const imageUrl = 'https://storage.googleapis.com/xyz-group-images/wait-time-5-minutes.jpeg';

    const messageText = null;
    const messageDescription = 'You are now 3rd in line. Expected wait ' +
        'time = 5 minutes. We will message you when it is your turn.\n\n ' +
        'In the meantime, can I help you with anything?';

    const params = {
      imageUrl: imageUrl,
      msisdn: msisdn,
      messageText: messageText,
      messageDescription: messageDescription,
      suggestions: this.getMainMenu(),
    };

    // send a rich card with the main option menu
    return new Promise(function(resolve, reject) {
      rbmApiHelper.sendRichCard(params,
          function(response, err) {
            if (err == null) {
              resolve();
            } else {
              reject(err);
            }
          });
    });
  },

  getMainMenu: function() {
    return [
      {
        reply: {
          text: 'TV',
          postbackData: constants.SUGGESTION_TV,
        },
      },
      {
        reply: {
          text: 'Internet',
          postbackData: constants.SUGGESTION_INTERNET,
        },
      },
      {
        reply: {
          text: 'Landline',
          postbackData: constants.SUGGESTION_LANDLINE,
        },
      },
      {
        reply: {
          text: 'Mobile',
          postbackData: constants.SUGGESTION_MOBILE,
        },
      },
    ];
  },

  sendMainMenu: function(msisdn) {
    const messageText = 'Main XYZ Group Agent Menu:';
    const messageDescription = 'What are you interested in?';

    const params = {
      msisdn: msisdn,
      messageText: messageText,
      messageDescription: messageDescription,
      suggestions: this.getMainMenu(),
    };

    // send a rich card with the main option menu
    rbmApiHelper.sendRichCard(params);
  },

  sendTalkToLiveAgent: function(msisdn) {
    const isTypingRequest = this.sendIsTypingMessage(msisdn);

    const messageText = 'Thank you for the information. We will help you ' +
            'as soon as one of our agents are free.\n\nWould you like to ' +
            'check your queue status?';

    const suggestions = [
      {
        reply: {
          text: 'Yes',
          postbackData: constants.YES_CHECK_QUEUE_RESPONSE,
        },
      },
      {
        reply: {
          text: 'No',
          postbackData: constants.NO_CHECK_QUEUE_RESPONSE,
        },
      },
    ];

    const params = {
      messageText: messageText,
      msisdn: msisdn,
      suggestions: suggestions,
    };

    isTypingRequest.then(function() {
      rbmApiHelper.sendMessage(params);
    });
  },

  sendUpgradeCancelled: function(msisdn) {
    const isTypingRequest = this.sendIsTypingMessage(msisdn);

    const messageText = 'No problem. We have cancelled the upgrade.\n\n' +
            'Would you like to see the main menu again?';

    const suggestions = [
      {
        reply: {
          text: 'Yes',
          postbackData: constants.YES_MORE_HELP_RESPONSE,
        },
      },
      {
        reply: {
          text: 'No',
          postbackData: constants.NO_HELP_RESPONSE,
        },
      },
    ];

    const params = {
      messageText: messageText,
      msisdn: msisdn,
      suggestions: suggestions,
    };

    isTypingRequest.then(function() {
      rbmApiHelper.sendMessage(params);
    });
  },

  sendThankYou: function(message, msisdn) {
    let messageText = null;

    if (message === constants.RATING_OF_4 ||
        message === constants.RATING_OF_5) {
      messageText = 'Thank you for the feedback. Have a nice day!';
    } else {
      messageText = 'We are sorry that we fell short today. ' +
                'We will use your feedback to improve our system.';
    }

    const isTypingRequest = this.sendIsTypingMessage(msisdn);

    const params = {
      messageText: messageText,
      msisdn: msisdn,
    };

    isTypingRequest.then(function() {
      rbmApiHelper.sendMessage(params);
    });
  },

  sendRemoveQueueResponse: function(msisdn) {
    const messageText = 'Fantastic, We are happy that we could help. ' +
        'You have been removed from the queue.\n\nIf you have a moment ' +
        ', how would you rate your experience?';

    const suggestions = [
      {
        reply: {
          text: '😡',
          postbackData: constants.RATING_OF_1,
        },
      },
      {
        reply: {
          text: '😞',
          postbackData: constants.RATING_OF_2,
        },
      },
      {
        reply: {
          text: '😐',
          postbackData: constants.RATING_OF_3,
        },
      },
      {
        reply: {
          text: '😊',
          postbackData: constants.RATING_OF_4,
        },
      },
      {
        reply: {
          text: '😃',
          postbackData: constants.RATING_OF_5,
        },
      },
      {
        reply: {
          text: 'Not Interested',
          postbackData: constants.IGNORE_RATING,
        },
      },
    ];

    const isTypingRequest = this.sendIsTypingMessage(msisdn);

    const params = {
      messageText: messageText,
      msisdn: msisdn,
      suggestions: suggestions,
    };

    isTypingRequest.then(function() {
      rbmApiHelper.sendMessage(params);
    });
  },

  sendLiveAgentCheck: function(msisdn) {
    const messageText = 'Great! Do you still need to speak with a live person?';

    const isTypingRequest = this.sendIsTypingMessage(msisdn);

    const suggestions = [
      {
        reply: {
          text: 'Yes',
          postbackData: constants.YES_LIVE_RESPONSE,
        },
      },
      {
        reply: {
          text: 'No',
          postbackData: constants.NO_LIVE_RESPONSE,
        },
      },
    ];

    const params = {
      messageText: messageText,
      msisdn: msisdn,
      suggestions: suggestions,
    };

    isTypingRequest.then(function() {
      rbmApiHelper.sendMessage(params);
    });
  },

  sendUpgradeConfirmed: function(msisdn) {
    const messageText = 'Excellent! We will automatically transfer your ' +
        'current term of agreement. You will be able to start using your ' +
        'plan as soon as you receive confirmation of the plan change. Your ' +
        ' billing will start next bill cycle.\n\nIs there anything else I ' +
        'can help you with?';

    const isTypingRequest = this.sendIsTypingMessage(msisdn);

    const suggestions = [
      {
        reply: {
          text: 'Yes',
          postbackData: constants.YES_MORE_HELP_RESPONSE,
        },
      },
      {
        reply: {
          text: 'No',
          postbackData: constants.NO_HELP_RESPONSE,
        },
      },
    ];

    const params = {
      messageText: messageText,
      msisdn: msisdn,
      suggestions: suggestions,
    };

    isTypingRequest.then(function() {
      rbmApiHelper.sendMessage(params);
    });
  },

  // /**
  //  * Handler for responses from the Internet sub menu options.
  //  * These include starting service, upgrading existing services,
  //  * other and viewing a bill.
  //  */
  // handleInternetResponse: function(message, msisdn) {
  //     console.log('handleInternetResponse');

  //     if (message.indexOf(SUGGESTION_START_SERVICE) >= 0) {
  //         this.startInternetServiceResponse(msisdn);
  //     }
  //     else if (message.indexOf(SUGGESTION_CHANGE_SERVICE) >= 0) {
  //         this.changeInternetServiceResponse(msisdn);
  //     }
  //     else if (message.indexOf(SUGGESTION_OTHER) >= 0) {
  //         this.sendTalkToLiveAgent(msisdn);
  //     }
  //     else if (message.indexOf(SUGGESTION_VIEW_BILL) >= 0) {
  //         this.sendBillInfo(msisdn, message);
  //     }
  // },

  // /**
  //  * Handler for responses from the TV sub menu options.
  //  * These include starting service, upgrading existing services,
  //  * other and viewing a bill.
  //  */
  // handleTVResponse: function(message, msisdn) {
  //     console.log('handleTVResponse ' + message);

  //     if (message.indexOf(SUGGESTION_START_SERVICE) >= 0) {
  //         this.startTVServiceResponse(msisdn);
  //     }
  //     else if (message.indexOf(SUGGESTION_CHANGE_SERVICE) >= 0) {
  //         this.changeTVServiceResponse(msisdn);
  //     }
  //     else if (message.indexOf(SUGGESTION_OTHER) >= 0) {
  //         this.sendTalkToLiveAgent(msisdn);
  //     }
  //     else if (message.indexOf(SUGGESTION_VIEW_BILL) >= 0) {
  //         this.sendBillInfo(msisdn, message);
  //     }
  // },

  // /**
  //  * Handler for responses from the landline sub menu options.
  //  * These include starting service, upgrading existing services,
  //  * other and viewing a bill.
  //  */
  // handleLandlineResponse: function(message, msisdn) {
  //     console.log('handleLandlineResponse ' + message);

  //     if (message.indexOf(SUGGESTION_START_SERVICE) >= 0) {
  //        this.startLandlineServiceResponse(msisdn);
  //     }
  //     else if (message.indexOf(SUGGESTION_OTHER) >= 0) {
  //         this.sendTalkToLiveAgent(msisdn);
  //     }
  //     else if (message.indexOf(SUGGESTION_VIEW_BILL) >= 0) {
  //         this.sendBillInfo(msisdn, message);
  //     }
  // },

  // /**
  //  * Handler for responses from the mobile sub menu options.
  //  * These include starting service, upgrading existing services,
  //  * other and viewing a bill.
  //  */
  // handleMobileResponse: function(message, msisdn) {
  //     console.log('handleMobileResponse ' + message);

  //     if (message.indexOf(SUGGESTION_START_SERVICE) >= 0) {
  //          this.startMobileServiceResponse(msisdn);
  //     }
  //     else if (message.indexOf(SUGGESTION_OTHER) >= 0) {
  //         this.sendTalkToLiveAgent(msisdn);
  //     }
  //     else if (message.indexOf(SUGGESTION_VIEW_BILL) >= 0) {
  //         this.sendBillInfo(msisdn, message);
  //     }
  // },

  sendBillInfo: function(msisdn, message) {
    console.log('sendBillInfo ' + message);

    let messageText = 'Service Bill: $63.49';

    const messageDescription = 'From June 5, 2018 to July 5, 2018\n\n' +
            'Television: $10 .00\n' +
            'Broadband: $45.49\n' +
            'Mobile: $8.00';

    let params = {
      msisdn: msisdn,
      messageText: messageText,
      messageDescription: messageDescription,
    };

    // have to get the service category to attach to the suggestions
    const serviceCategory = message.replace(constants.SUGGESTION_VIEW_BILL, '');

    let suggestions = null;

    // check the category so we can ignore changing service for phones
    if (serviceCategory === constants.SERVICE_LANDLINE ||
            serviceCategory === constants.SERVICE_MOBILE) {
      suggestions = this.getServiceSuggestions(
          serviceCategory, serviceCategory + constants.SUGGESTION_CHANGE_SERVICE);
    } else {
      suggestions = this.getServiceSuggestions(serviceCategory);
    }

    rbmApiHelper.sendRichCard(params, function() {
      messageText = 'What else can I help with?';

      params = {
        msisdn: msisdn,
        messageText: messageText,
        suggestions: suggestions,
      };

      rbmApiHelper.sendMessage(params);
    });
  },

  // handleTVUpgrade: function(message, msisdn) {
  //     let messageText = '';
  //     if (message === TV_UPGRADE_ENTERTAINMENT) {
  //         messageText = 'You selected the entertainment plan for $10,00 a month. ' +
  //             'Are you sure you want to upgrade?';
  //     }
  //     else if (message === TV_UPGRADE_MAX_HD) {
  //         messageText = 'You selected the Max HD plan for $18.50 a month. ' +
  //             'Are you sure you want to upgrade?';
  //     }
  //     else if (message === TV_UPGRADE_MAX) {
  //         messageText = 'You selected the Max plan for $21.00 a month. ' +
  //             'Are you sure you want to upgrade?';
  //     }

  //     this.sendUpgradeConfirmation(msisdn, messageText);
  // },

  // handleFibreUpgrade: function(message, msisdn) {
  //     let messageText = '';
  //     if (message === FIBRE_UPGRADE_PLUS) {
  //         messageText = 'You selected the fiber plus plan for $54.99 a month. ' +
  //             'Are you sure you want to upgrade?';
  //     }
  //     else if (message === FIBRE_UPGRADE_UNLIMITED) {
  //         messageText = 'You selected the unlimited fibre plan for $52.49 a month. ' +
  //             'Are you sure you want to upgrade?';
  //     }
  //     else if (message === FIBRE_UPGRADE) {
  //         messageText = 'You selected the superfast fibre plan for $37.49 a month. ' +
  //             'Are you sure you want to upgrade?';
  //     }

  //     this.sendUpgradeConfirmation(msisdn, messageText);
  // },

  sendUpgradeConfirmation: function(msisdn, messageText) {
    const isTypingRequest = this.sendIsTypingMessage(msisdn);

    const suggestions = [
      {
        reply: {
          text: 'Yes',
          postbackData: constants.YES_UPGRADE_RESPONSE,
        },
      },
      {
        reply: {
          text: 'No',
          postbackData: constants.NO_UPGRADE_RESPONSE,
        },
      },
    ];

    const params = {
      messageText: messageText,
      msisdn: msisdn,
      suggestions: suggestions,
    };

    isTypingRequest.then(function() {
      rbmApiHelper.sendMessage(params);
    });
  },

  /**
     * Sends the user a list of service options for the given category.
     * These include creating service, upgrading, viewing the bill,
     * other, and an option to return to the main menu.
     * @param {string} msisdn The phone number in E.164 format.
     * @param {string} serviceCategory The category selected by the user.
     */
  sendServiceOptions: function(msisdn, serviceCategory) {
    console.log('sendServiceOptions ' + serviceCategory);

    if (serviceCategory === constants.SUGGESTION_TV) {
      serviceCategory = constants.SERVICE_TV;
    } else if (serviceCategory === constants.SUGGESTION_INTERNET) {
      serviceCategory = constants.SERVICE_INTERNET;
    } else if (serviceCategory === constants.SUGGESTION_LANDLINE) {
      serviceCategory = constants.SERVICE_LANDLINE;
    } else if (serviceCategory === constants.SUGGESTION_MOBILE) {
      serviceCategory = constants.SERVICE_MOBILE;
    }

    const messageText = 'Great! What are you looking to do?';

    const isTypingRequest = this.sendIsTypingMessage(msisdn);

    let suggestions = null;

    if (serviceCategory === constants.SERVICE_LANDLINE ||
            serviceCategory === constants.SERVICE_MOBILE) {
      suggestions = this.getServiceSuggestions(
          serviceCategory, serviceCategory + constants.SUGGESTION_CHANGE_SERVICE);
    } else {
      suggestions = this.getServiceSuggestions(serviceCategory);
    }

    const params = {
      messageText: messageText,
      msisdn: msisdn,
      suggestions: suggestions,
    };

    isTypingRequest.then(function() {
      rbmApiHelper.sendMessage(params);
    });
  },

  startMobileServiceResponse: function(msisdn) {
    // show carousel of deals
    const cardContents = [
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/mobile-sim-plans.001.jpeg'),
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/mobile-sim-plans.002.jpeg'),
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/mobile-sim-plans.003.jpeg'),
    ];

    const messageText = 'Get a jiggle on and grab a SIM plan that suits you:';

    this.sendSerivceOffersList(msisdn, messageText, cardContents);
  },

  startLandlineServiceResponse: function(msisdn) {
    // show carousel of deals
    const cardContents = [
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/landline-deals.001.jpeg'),
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/landline-deals.002.jpeg'),
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/landline-deals.003.jpeg'),
    ];

    const messageText = 'Check out the landline packages and deals:';

    this.sendSerivceOffersList(msisdn, messageText, cardContents);
  },

  changeTVServiceResponse: function(msisdn) {
    // show carousel of deals
    const cardContents = [
      this.getCarouselCard('Upgrade Plan',
          constants.TV_UPGRADE_ENTERTAINMENT,
          'https://storage.googleapis.com/xyz-group-images/tv-upgrades.001.jpeg'),
      this.getCarouselCard('Upgrade Plan',
          constants.TV_UPGRADE_MAX_HD,
          'https://storage.googleapis.com/xyz-group-images/tv-upgrades.002.jpeg'),
      this.getCarouselCard('Upgrade Plan',
          constants.TV_UPGRADE_MAX,
          'https://storage.googleapis.com/xyz-group-images/tv-upgrades.003.jpeg'),
    ];

    const messageText = 'You are currently on the essential TV plan, paying $7.00 a month. ' +
            'This plan gives you access to 80 channels.\n\nCheck out your upgrade options below:';

    this.sendSerivceOffersList(msisdn, messageText, cardContents);
  },

  startTVServiceResponse: function(msisdn) {
    // show carousel of deals
    const cardContents = [
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/tv-services.001.jpeg'),
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/tv-services.002.jpeg'),
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/tv-services.003.jpeg'),
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/tv-services.004.jpeg'),
    ];

    const messageText = 'Great entertainment with recordable set top box. Check out the deals:';

    this.sendSerivceOffersList(msisdn, messageText, cardContents);
  },

  changeInternetServiceResponse: function(msisdn) {
    console.log('changeInternetServiceResponse');

    const cardContents = [
      this.getCarouselCard('Upgrade Plan',
          constants.FIBRE_UPGRADE_PLUS,
          'https://storage.googleapis.com/xyz-group-images/broadband-upgrades.001.jpeg',
          'Perfect for streaming, gaming, watching and downloading in HD on multiple devices.'),
      this.getCarouselCard('Upgrade Plan',
          constants.FIBRE_UPGRADE_UNLIMITED,
          'https://storage.googleapis.com/xyz-group-images/broadband-upgrades.002.jpeg',
          'Superfast fibre broadband that’s great for streaming and catch-up TV.'),
      this.getCarouselCard('Upgrade Plan',
          constants.FIBRE_UPGRADE,
          'https://storage.googleapis.com/xyz-group-images/broadband-upgrades.003.jpeg',
          'Fast fibre broadband so you can do more online.'),
    ];

    const messageText = 'You are currently on the broadband unlimited plan, paying $45.49 a month. ' +
            'This plan has an average speed of 10MB.\n\nCheck out your upgrade options below:';

    this.sendSerivceOffersList(msisdn, messageText, cardContents);
  },

  startInternetServiceResponse: function(msisdn) {
    console.log('startInternetServiceResponse');

    const cardContents = [
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/fibre-deals.1.jpeg',
          'Great value fibre broadband with unlimited usage.'),
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/fibre-deals.2.jpeg',
          'Superfast fibre broadband that’s great for streaming and catch-up TV.'),
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/fibre-deals.3.jpeg',
          'Perfect for streaming, gaming, watching and downloading in HD on multiple devices.'),
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/fibre-deals.4.jpeg',
          'Perfect for streaming, gaming, watching and downloading in HD on multiple devices.'),
      this.getCarouselCard('Choose Plan',
          constants.CREATE_SERVICE,
          'https://storage.googleapis.com/xyz-group-images/fibre-deals.5.jpeg',
          'Essential broadband for browsing and emailing.'),
    ];

    const messageText = 'Check out our brand new, great value, unlimited fibre deals:';

    this.sendSerivceOffersList(msisdn, messageText, cardContents);
  },

  getServiceSuggestions: function(serviceCategory, ignoreSuggestion) {
    const allSuggestions = [
      {
        reply: {
          text: 'Start Service',
          postbackData: serviceCategory + constants.SUGGESTION_START_SERVICE,
        },
      },
      {
        reply: {
          text: 'Change Service',
          postbackData: serviceCategory + constants.SUGGESTION_CHANGE_SERVICE,
        },
      },
      {
        reply: {
          text: 'View Bill',
          postbackData: serviceCategory + constants.SUGGESTION_VIEW_BILL,
        },
      },
      {
        reply: {
          text: 'Other',
          postbackData: serviceCategory + constants.SUGGESTION_OTHER,
        },
      },
      {
        reply: {
          text: 'Main Menu',
          postbackData: constants.SUGGESTION_MAIN_MENU,
        },
      },
    ];

    if (ignoreSuggestion == undefined) {
      return allSuggestions;
    }

    console.log('ignore ' + ignoreSuggestion);

    const filteredSuggestions = [];
    for (let i = 0; i < allSuggestions.length; i++) {
      if (allSuggestions[i].reply.postbackData != ignoreSuggestion) {
        filteredSuggestions.push(allSuggestions[i]);
      }
    }

    return filteredSuggestions;
  },

  getCarouselCard: function(suggestionText, suggestionPosback, imageUrl, description) {
    const card = {
      suggestions: [
        {
          reply: {
            text: suggestionText,
            postbackData: suggestionPosback,
          },
        },
      ],
      media: {
        height: 'MEDIUM',
        contentInfo: {
          fileUrl: imageUrl,
          forceRefresh: false,
        },
      },
    };

    if (description != undefined) {
      card.description = description;
    }

    return card;
  },

  sendSerivceOffersList: function(msisdn, messageText, cardContents) {
    const suggestions = [
      {
        reply: {
          text: 'Not Interested',
          postbackData: constants.IGNORE_RESPONSE,
        },
      },
    ];

    const isTypingRequest = this.sendIsTypingMessage(msisdn);

    isTypingRequest.then(function() {
      let params = {
        msisdn: msisdn,
        messageText: messageText,
      };

      rbmApiHelper.sendMessage(params, function() {
        params = {
          msisdn: msisdn,
          cardContents: cardContents,
          suggestions: suggestions,
        };

        rbmApiHelper.sendCarouselCard(params);
      });
    });
  },

  /**
     * Let's the user know that the agent is about to respond.
     * @param {string} msisdn The phone number in E.164 format.
     * @return {Promise} A promise for execution of the RBM api call.
     */
  sendIsTypingMessage: function(msisdn) {
    return new Promise(function(resolve, reject) {
      rbmApiHelper.sendIsTypingMessage(msisdn, function(response) {
        resolve();
      });
    });
  },

  /**
     * Parses the userEvent object to get the response body.
     * This can be plaintext or part of a suggested response.
     * @param {object} userEvent The JSON object of a message
     * received by the pull subscription.
     * @return {string} The body of the message, false if not found.
     */
  // getMessageBody: function(userEvent) {
  //     if (userEvent.text != undefined) {
  //         return userEvent.text;
  //     } else if (userEvent.suggestionResponse != undefined) {
  //         return userEvent.suggestionResponse.postbackData;
  //     }

  //     return false;
  // },
};

module.exports = bot;
