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

module.exports = Object.freeze({
  // define postback results for service review
  RATING_OF_1: 'rating_of_1',
  RATING_OF_2: 'rating_of_2',
  RATING_OF_3: 'rating_of_3',
  RATING_OF_4: 'rating_of_4',
  RATING_OF_5: 'rating_of_5',

  // command to restart the agent experience
  RESTART_AGENT: 'start',

  IGNORE_RATING: 'ignore_rating',

  // define postback results for suggestions
  IGNORE_RESPONSE: 'ignore',

  // postback responses for fibre upgrade confirmation
  YES_UPGRADE_RESPONSE: 'binary-yes-upgrade',
  NO_UPGRADE_RESPONSE: 'binary-no-upgrade',

  // postback responses for still need help
  YES_MORE_HELP_RESPONSE: 'binary-yes-help',
  NO_HELP_RESPONSE: 'binary-no-help',

  // postback responses for still need a live agent
  YES_LIVE_RESPONSE: 'binary-yes-live',
  NO_LIVE_RESPONSE: 'binary-no-live',

  // substring match for any service item
  SERVICE_SUGGESTION: '/service',

  // main menu postback responses
  SUGGESTION_TV: '/service/tv/',
  SUGGESTION_INTERNET: '/service/internet/',
  SUGGESTION_LANDLINE: '/service/landline/',
  SUGGESTION_MOBILE: '/service/mobile/',

  SERVICE_INTERNET: '/internet/',
  SERVICE_TV: '/tv-service/',
  SERVICE_LANDLINE: '/landline-service/',
  SERVICE_MOBILE: '/mobile-service/',

  // chiplist postback responses for internet service
  SUGGESTION_START_SERVICE: 'start-service',
  SUGGESTION_CHANGE_SERVICE: 'change-service',
  SUGGESTION_VIEW_BILL: 'view-bill',
  SUGGESTION_OTHER: 'other',

  SUGGESTION_MAIN_MENU: 'main-menu',

  // postback responses for broadband upgrade options
  FIBRE_UPGRADE_PLUS: 'fibre-upgrade-plus',
  FIBRE_UPGRADE_UNLIMITED: 'fibre-upgrade-unlimited',
  FIBRE_UPGRADE: 'fibre-upgrade',

  // postback responses for TV upgrade options
  TV_UPGRADE: 'tv-upgrade',
  TV_UPGRADE_ENTERTAINMENT: 'tv-upgrade-entertainment',
  TV_UPGRADE_MAX_HD: 'tv-upgrade-max-hd',
  TV_UPGRADE_MAX: 'tv-upgrade-max',

  CREATE_SERVICE: 'create-service',

  // postback values for whether the user wants to recheck their queue status
  YES_CHECK_QUEUE_RESPONSE: 'binary-yes-check-queue',
  NO_CHECK_QUEUE_RESPONSE: 'binary-no-check-queue',
});
