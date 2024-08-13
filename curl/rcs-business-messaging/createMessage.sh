#!/bin/sh

# Create (send) an RBM message to a user.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/rest/v1/phones.agentMessages/create

AGENT_ID=""
MSISDN=""
MESSAGE_ID="123456661"

curl -v -X POST "https://rcsbusinessmessaging.googleapis.com/v1/phones/$MSISDN/agentMessages?agentId=$AGENT_ID&messageId=$MESSAGE_ID" \
-H "Content-Type: application/json" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json rcsbusinessmessaging`" \
-d "{
  'contentMessage': {
    'text': 'Hello World'
  }
}"