# Copyright 2023 Google Inc. All rights reserved.

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""This module is an RPM chat bot for a generic Telco Bot, the XYZ Group."""

import datetime
import time

from flask import Flask

from rcs_business_messaging import messages
from rcs_business_messaging import rbm_service

app = Flask(__name__)
app.config['DEBUG'] = True

def handle_message(msisdn, request_body, user_response_text):
  """
  Handler for user responses.

  Args:
        msisdn (str): The user phone number in
          E.164 format, e.g. +12223334444.
        request_body (str): The JSON body sent from Pub/Sub.
        user_response_text (str): The response from the user
          as a string.
  """

  clean_response_text = user_response_text.lower()

  # Immediately mark the message as read, then send IS_TYPING
  rbm_service.send_read_for_user_event_and_is_typing_if_message(request_body)

  if not ignore_response(clean_response_text):
    # check for known intent and respond accordingly
    if clean_response_text == 'yes':
      send_rcs_options(msisdn)
    elif clean_response_text == 'no':
      send_followup(msisdn, [], 'No problem. Is there anything else I can help you with?')
    elif clean_response_text == 'start_agent':
      send_followup(msisdn, [], 'Here are the services we can help you with:')
    elif clean_response_text in ['image', 'video', 'text']:
      send_rcs_message(msisdn, clean_response_text)
    elif clean_response_text == 'balance':
      send_current_balance(msisdn)
    elif clean_response_text == 'bill':
      send_current_bill(msisdn)
    elif clean_response_text == 'upgrades':
      send_upgrades(msisdn)
    elif clean_response_text in ['start', 'menu', 'restart']:
      send_greeting(msisdn)
  else:
    app.logger.debug('ignore response')

def send_rcs_options(msisdn, text='Great! Pick a feature to explore.'):
  """
  Sends the user a chip list to explore RCS features.

  Args:
        msisdn (str): The user phone number in
          E.164 format, e.g. +12223334444.
        text (str): The text to send the user.
  """
  suggested_responses = get_default_rcs_features()

  send_plain_text(msisdn, text, suggested_responses)

def send_rcs_message(msisdn, user_response_text):
  """
  Based on the user response, sends an example of RCS functionality.

  Args:
        msisdn (str): The user phone number in
          E.164 format, e.g. +12223334444.
        user_response_text (str): The response from the user.
  """
  suggested_responses = get_default_rcs_features()

  if user_response_text == 'text':
    text = 'Hey there, this is a text message. Check out the typing indicators!'
    send_plain_text(msisdn, text)
  elif user_response_text == 'image':
    text = 'Here\'s a cool image to check out:'
    send_plain_text(msisdn, text, suggested_responses)

    image_url = 'https://storage.googleapis.com/xyz-group-images/cute-dog.jpg'
    send_rich_card(msisdn, None, None, image_url, [])
  elif user_response_text == 'video':
    text = 'Here\'s a cool video to check out:'
    send_plain_text(msisdn, text, suggested_responses)

    video_url = 'https://storage.googleapis.com/xyz-group-images/sample-video.mp4'
    thumbnail_url = 'https://storage.googleapis.com/xyz-group-images/sample-video-thumbnail.jpg'
    send_rich_card(msisdn, None, None, video_url, [], thumbnail_url)

  send_rcs_options(msisdn, 'Check out another feature?')

def send_upgrades(msisdn):
  """
  Sends upgrade options as a carousel of three devices.

  Args:
        msisdn (str): The user phone number in
          E.164 format, e.g. +12223334444.
  """

  text = 'Check out your upgrade options:'
  resp = send_plain_text(msisdn, text)
  
  if resp.status != 200:
    app.logger.info(resp)
    return resp  

  # create suggested actions for carousel items
  pixel_suggestions = [
      messages.OpenUrlAction('View Details', 'reply:pixel2',
                             'https://store.google.com/us/category/phones')
  ]

  motorola_suggestions = [
      messages.OpenUrlAction('View Details', 'reply:motorola',
                             'https://www.motorola.com/us/smartphones')
  ]

  samsung_suggestions = [
      messages.OpenUrlAction('View Details', 'reply:samsung',
                             'https://www.samsung.com/my/smartphones/')
  ]

  # send carousel of several devices
  card_contents = []
  card_contents.append(messages.CardContent('GOOGLE PIXEL',
                                            None,
                                            'https://storage.googleapis.com/xyz-group-images/pixel2.jpg',
                                            'MEDIUM',
                                            pixel_suggestions))

  card_contents.append(messages.CardContent('MOTOROLA',
                                            None,
                                            'https://storage.googleapis.com/xyz-group-images/motorola_phone.jpg',
                                            'MEDIUM',
                                            motorola_suggestions))

  card_contents.append(messages.CardContent('SAMSUNG',
                                            None,
                                            'https://storage.googleapis.com/xyz-group-images/samsung.jpg',
                                            'MEDIUM',
                                            samsung_suggestions))

  # send the upgrades in a carousel
  carousel_card = messages.CarouselCard('MEDIUM', card_contents)
  cluster = messages.MessageCluster().append_message(carousel_card)
  cluster.send_to_msisdn(msisdn)

  send_followup(msisdn, 'reply:upgrades')

def send_current_bill(msisdn):
  """
  Creates a fake bill and sends the information to the user.

  Args:
        msisdn (str): The user phone number in
          E.164 format, e.g. +12223334444.
  """

  # base the bill date on first of the current month
  today = datetime.date.today()
  first_of_month = today.replace(day=1)
  last_month = first_of_month - datetime.timedelta(days=30)

  start_date = str(int(time.mktime(last_month.timetuple())))
  end_date = str(int(time.mktime(first_of_month.timetuple())))

  # url for fake bill
  url = 'https://xyz-telcom-group.appspot.com/exampleBill?start=' + start_date + "&end=" + end_date

  suggestions = [
      messages.OpenUrlAction(
          'Pay Bill',
          'reply:pay_bill',
          url)
  ]

  # generate a fake bill to show, this would normally look up user information in a backend
  message_text = ('Details for your statement with reference services. ' +
                  'The amount is $100 for the billing period starting in ' +
                  last_month.strftime('%m/%d/%Y') + ' ending ' +
                  first_of_month.strftime('%m/%d/%Y') + '.')

  send_plain_text(msisdn, message_text)

  # generate fake billing services for demo purposes
  title = 'SERVICES BILL: $100'
  description = ('From ' + last_month.strftime('%m/%d/%Y') + ' to ' +
                 first_of_month.strftime('%m/%d/%Y') + '\n' +
                 '- Extra consumption $5\n' +
                 '- Taxes: $10\n' +
                 '- Monthly fee: $10\n' +
                 '- Consumption: $6\n' +
                 '- International costs: $4\n' +
                 '- Television: $20\n' +
                 '- Last bill penalty: $45')

  send_rich_card(msisdn, title, description, None, suggestions)

  # follow up with suggestions to keep conversation going
  send_followup(msisdn, 'reply:bill')

def send_current_balance(msisdn):
  """
  Sends the user a fake account balance for the month.

  Args:
        msisdn (str): The user phone number in
          E.164 format, e.g. +12223334444.
  """

  today = datetime.date.today()

  # create a fake start date for the balance period
  start_date = today - datetime.timedelta(days=14)
  start_date_as_string = start_date.strftime('%m/%d/%Y')

  # calculate an end date for period 16 days from now
  end_date = today + datetime.timedelta(days=16)
  end_date_as_string = end_date.strftime('%m/%d/%Y')

  image_url = 'https://storage.googleapis.com/xyz-group-images/data-plan-usage.jpeg'
  text = 'Data consumption'
  description = ('- Period ' + start_date_as_string + ' until today\n' +
                 '- Bundle 842 MB of 4 GB\n' +
                 '- Valid until ' + end_date_as_string + '\n' +
                 '- Remaining: 16 days left')

  send_rich_card(msisdn, text, description, image_url, None)

  send_followup(msisdn, 'reply:balance')

def ignore_response(response_text):
  """
  Checks to see if we should ignore the passed in response.
  This is helpful for ignoring suggestion actions that do
  not require a response from the agent.

  Args:
        response_text (str): The last response from the user.

   Returns:
           A :boolean: True if we should ignore this response.
  """

  return response_text in ['install_app', 'tos', 'view_more_bill', 'pay_bill']

def send_greeting(msisdn):
  """
  Sends the default welcome message to kickstart the RBM chat agent.

  Args:
        msisdn (str): The user phone number in
          E.164 format, e.g. +12223334444.
  """

  text = ('Hi there. Welcome to the XYZ Group Telco Demo.\n\nOn XYZ Group you ' +
          'can chat with friends using Rich Communication Services (RCS). RCS ' +
          'allows users to do everything they already do with SMS and MMS but ' +
          'also enables them to send high quality images, videos, see delivery ' +
          'and typing indicators, and much more.\n\nWould you like to explore ' +
          'some of these features now?')

  suggested_responses = [
    messages.SuggestedReply('Yes', 'reply:yes'),
    messages.SuggestedReply('No', 'reply:no')
  ]

  return send_plain_text(msisdn, text, suggested_responses)
  

def send_followup(msisdn,
                  ignore_suggestion=[],
                  text='Is there anything else I can help you with?'):
  """
  Sends a follow up message to prompt the user with other services.

  Args:
        msisdn (str): The user phone number in
          E.164 format, e.g. +12223334444.
        ignore_suggestion (str): The postback data for an element to
          ignore in the response being sent.
        text (str): The string to be used in the message sent to the user.
  """

  suggested_responses = get_default_suggestions(ignore_suggestion)

  send_plain_text(msisdn, text, suggested_responses)

def get_default_suggestions(ignore_suggestion=None):
  """
  Creates a list of suggestions for the user to follow.

  Args:
        ignore_suggestion (str): A suggestion that should not be
          part of the returned list.

   Returns:
           A :list: of replies and actions the user can take.
  """

  app_url = 'https://play.google.com/store/apps/details?id=com.google.android.apps.messaging'
  tos_url = 'https://play.google.com/intl/en_us/about/play-terms.html'

  all_suggestions = [
      messages.SuggestedReply('Check Balance', 'reply:balance'),
      messages.SuggestedReply('View Upgrades', 'reply:upgrades'),
      messages.SuggestedReply('Billing Information', 'reply:bill'),
      messages.OpenUrlAction('Install App',
                             'reply:install_app',
                             app_url),
      messages.OpenUrlAction('Terms of Service',
                             'reply:tos',
                             tos_url)
  ]

  if ignore_suggestion is None:
    return all_suggestions

  filtered_suggestions = []

  for suggestion in all_suggestions:
    if suggestion._postback_data != ignore_suggestion:
      filtered_suggestions.append(suggestion)

  return filtered_suggestions

def get_default_rcs_features(ignore_suggestion=None):
  """
  Gets the default RCS features as a chip list
  of suggested replies. A suggested reply postback can be
  passed in to filter the returned list.

  Args:
        ignore_suggestion (str): The postback data for a reply
          to remove from the returned values.
  Returns:
       A :list: An array of SuggestedReply objects.
  """

  all_suggestions = [
      messages.SuggestedReply('Send Image', 'reply:image'),
      messages.SuggestedReply('Send Video', 'reply:video'),
      messages.SuggestedReply('Send Text', 'reply:text'),
      messages.SuggestedReply('View Services', 'reply:start_agent')
  ]

  if ignore_suggestion is None:
    return all_suggestions

  filtered_suggestions = []

  for suggestion in all_suggestions:
    if suggestion._postback_data != ignore_suggestion:
      filtered_suggestions.append(suggestion)

  return filtered_suggestions

def send_rich_card(msisdn, title, description, image_url, rc_suggestions, thumbnail_url=None):
  """
  Sends a rich card to the user.

  Args:
        msisdn (str): The user phone number in
          E.164 format, e.g. +12223334444.
        title (str): The title for the card.
        description (str): The description for the card.
        image_url (str): The image to use.
        rc_suggestions (list): Suggestions for the card.
        thumbnail_url (str): A thumbnail representation
          of the card image.
  """

  rich_card = messages.StandaloneCard('VERTICAL',
                                      title,
                                      description,
                                      rc_suggestions,
                                      image_url,
                                      thumbnail_url,
                                      None,
                                      'MEDIUM')

  cluster = messages.MessageCluster().append_message(rich_card)
  cluster.send_to_msisdn(msisdn)

def send_plain_text(msisdn, text, suggestions=[]):
  """
  Sends a plain text response to the user.

  Args:
        msisdn (str): The user phone number in
          E.164 format, e.g. +12223334444.
        text (str): The text to send the cliet.
        suggestions (str): Optional chiplist of suggestions.
  """

  text_msg = messages.TextMessage(text)
  cluster = messages.MessageCluster().append_message(text_msg)

  for suggestion in suggestions:
    cluster.append_suggestion_chip(suggestion)

  return cluster.send_to_msisdn(msisdn)
  

def send_welcome(msisdn):
  resp = rbm_service.make_cap_request(msisdn)
  
  if resp.status == 200:
    resp = send_greeting(msisdn)

  return resp
