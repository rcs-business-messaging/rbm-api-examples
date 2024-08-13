#!/bin/sh

# Invite a tester.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/rest/v1/phones.testers/create
AGENT_ID=""
MSISDN=""

curl -v -X POST "https://rcsbusinessmessaging.googleapis.com/v1/phones/$MSISDN/testers?agentId=$AGENT_ID" \
-H "Content-Type: application/json" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json rcsbusinessmessaging`" \
-d "{
  'inviteStatus': 'PENDING'
}"