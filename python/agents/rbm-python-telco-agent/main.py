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

"""This is a sample RBM agent that demonstrates how a telecommuncation
company could interact with their customers.
"""

# [START app]
import json
import base64
import datetime

from flask import Flask
from flask import render_template
from flask import request

import telco_bot

from rcs_business_messaging import rbm_service

app = Flask(__name__, static_url_path='')
app.config['DEBUG'] = True

@app.route('/callback', methods=['POST'])
def callback():
  """
  Google Pub/Sub callback URL. Processes messages sent from user.
  """

  # load the request body string into a JSON
  request_body = request.json

  app.logger.debug('request_body: %s', json.dumps(request_body))

  if 'clientToken' in request_body:
    return json.dumps({'secret': request_body['secret']}), 200

  # obtain the data field from the message field of
  # the pubsub push, which is the encoded user event
  encoded_user_event = request_body['message']['data']

  app.logger.debug('encoded_user_event: ' + encoded_user_event)

  # decode the encoded user event and load it into a JSON
  user_event_string = base64.b64decode(encoded_user_event)
  user_event = json.loads(user_event_string)

  app.logger.debug('*** USER EVENT ***')
  app.logger.debug(json.dumps(user_event))

  if 'senderPhoneNumber' in user_event:
    msisdn = user_event['senderPhoneNumber']

    # extract the text from userEvent
    user_response_text = rbm_service.get_user_response_text(user_event)

    # pass request to the telco bot handler
    if user_response_text is not None:
      telco_bot.handle_message(msisdn, request_body, user_response_text)

  return ''

@app.route('/startConversation', methods=['GET'])
def start_conversation():
  """
  Initiates the bot conversation with the passed in phone number.
  """

  msisdn = request.args.get('phone_number')

  response = {}

  # initiate the conversation
  # resp = telco_bot.send_greeting(msisdn)
  resp = telco_bot.send_welcome(msisdn)
  
  if resp.status == 200:
    response['result'] = 'ok'
  else:
    response['result'] = 'failed'
    response['message'] = 'Error code ' + str(resp.status)
    if resp.status == 404:
      response['message'] = msisdn + ' is not enabled for RCS on the Jibe Cloud platform.'
    if resp.status == 403:
      response['message'] = msisdn + ' is on a carrier where this agent is not yet launched.'
        
  return json.dumps(response)

@app.route('/register', methods=['GET'])
def register():
  """
  Sends the msisdn a request to become a registered tester.
  """

  msisdn = request.args.get('phone_number')

  response = {}

  invite_response = rbm_service.invite_tester(msisdn)

  if invite_response.status == 200:
    response['result'] = 'ok'
  else:
    response['result'] = 'failed'
    response['message'] = invite_response.reason

  return json.dumps(response)

@app.route('/', methods=['GET'])
def index():
  """
  Shows the triggering page for the bot.
  """

  return render_template('index.html')

@app.route('/exampleBill', methods=['GET'])
def bill():
  """
  Shows the example bill page.
  """

  # get the start and end date for the bill
  start_date = datetime.datetime.fromtimestamp(int(request.args.get('start')))
  end_date = datetime.datetime.fromtimestamp(int(request.args.get('end')))

  # convert the bill dates to a nice format
  start_date = start_date.strftime('%m/%d/%Y')
  end_date = end_date.strftime('%m/%d/%Y')

  return render_template('example_bill.html',
    start_date=start_date, end_date=end_date)

if __name__ == '__main__':
  app.run(host='127.0.0.1', port=8080, debug=True)
