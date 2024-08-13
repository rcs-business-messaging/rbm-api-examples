#!/bin/sh

# Gets the RCS-enabled phone numbers for a list of users.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/rest/v1/users/batchGet

AGENT_ID=""
MSISDN=""

curl -v -X POST "https://rcsbusinessmessaging.googleapis.com/v1/users:batchGet" \
-H "Content-Type: application/json" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json rcsbusinessmessaging`" \
-d "{
  'users': [
    '$MSISDN'
  ],
  'agentId': '$AGENT_ID'
}"