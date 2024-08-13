#!/bin/sh

# Gets phone number capabilities.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/rest/v1/phones/getCapabilities

AGENT_ID=""
MSISDN="" 

curl -v "https://rcsbusinessmessaging.googleapis.com/v1/phones/$MSISDN/capabilities?agentId=$AGENT_ID&requestId=1234" \
-H "Content-Type: application/json" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json rcsbusinessmessaging`" 