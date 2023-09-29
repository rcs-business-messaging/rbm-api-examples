# Copyright 2018 Google Inc. All rights reserved.

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""This is a sample RBM agent shows how to send and receive a message
with the RBM REST API
"""

# [START app]
from flask import Flask

from google.cloud import pubsub
from google.oauth2 import service_account

import argparse
import datetime
import time
import json
import constants

from rcs_business_messaging import rbm_service
from rcs_business_messaging import messages
from rcs_business_messaging import agent_config

app = Flask(__name__, static_url_path='')
app.config['DEBUG'] = True

def callback(message):
    """
    Not used in this example, but can be used if you wish to
    configure your agent with a push subscription rather than
    pull.
    """

    app.logger.info('callback')

    print(type(message.data))
    print(message.data)

    # Load the request body string into a JSON
    request_body = json.loads(message.data)
    message.ack()

    if 'clientToken' in request_body:
        return json.dumps({'secret': request_body['secret']}), 200

    if 'senderPhoneNumber' in request_body:
        msisdn = request_body['senderPhoneNumber']

        # Extract the text from userEvent
        user_response_text = rbm_service.get_user_response_text(request_body)

        print(user_response_text)

        # Make sure we received a valid response
        if user_response_text is not None:
            user_response_text = user_response_text.lower()

            if user_response_text == 'stop':
                # Any real agent must support this command
                # TODO: Client typed stop, agent should no longer send messages to this msisdn
                print(msisdn + ' asked to stop agent messaging')
            else:
                # Immediately mark the message as read, then send IS_TYPING
                rbm_service.send_read_for_user_event_and_is_typing_if_message(request_body)

                # Respond to the user
                message_response = messages.TextMessage('I like ' + user_response_text + ' too!')
                messages.MessageCluster().append_message(message_response).send_to_msisdn(msisdn)

def main():
    parser = argparse.ArgumentParser()

    # Required arguments to run sample
    parser.add_argument('-p', action='store',
        required=True, dest='msisdn', help = 'Phone number in E.164 format')
    parser.add_argument('-m', action='store',
        required=True, dest='agent_mode', help = 'Use "invite" to send test invite, otherwise "chat"')

    args = parser.parse_args()

    if 'invite' in args.agent_mode:
        rbm_service.invite_tester(args.msisdn)

        print('Tester invite sent to ' + args.msisdn)
    else:
        msisdn = args.msisdn

        message_text = messages.TextMessage('What is your favorite color?')

        # Send user an opening message to start the conversation
        messages.MessageCluster().append_message(message_text).send_to_msisdn(msisdn)

        # Send a message with a 10 second expiry
        # messages.MessageCluster().append_message(message_text).send_to_msisdn(msisdn, '10s')

        # Send a message with a specified expiry time of 20 seconds from now
        # d = datetime.datetime.utcnow() + datetime.timedelta(0, 20)
        # timeToStop = d.strftime('%Y-%m-%dT%H:%M:%SZ')
        # messages.MessageCluster().append_message(message_text).send_to_msisdn(msisdn, expireTime=timeToStop)

        # Create cloud credentials based on key file
        cred = service_account.Credentials.from_service_account_file(agent_config.PATH_TO_SERVICE_ACCOUNT)

        scoped_credentials = cred.with_scopes(
            ['https://www.googleapis.com/auth/cloud-platform'])

        # Setup a Pub/Sub client passing in our GCP credentials
        subscriber = pubsub.SubscriberClient(credentials=scoped_credentials)

        # Construct the subscription path based on the project id and subscription name
        subscription_path = subscriber.subscription_path(constants.PROJECT_ID,
            constants.PUB_SUB_SUBSCRIPTION_NAME)

        # Setup a subscription to the RBM Pub/Sub subscription we created
        # This is where RBM messages will get sent when users response
        subscription = subscriber.subscribe(subscription_path, callback=callback);

        # The subscriber is non-blocking, so we must keep the main thread from
        # exiting to allow it to process messages in the background.
        print('Listening for messages on {}'.format(subscription_path))
        while True:
            time.sleep(60)

if __name__ == '__main__':
    main()
# [END app]
