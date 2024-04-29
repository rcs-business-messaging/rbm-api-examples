#!/bin/sh

# Get agent verification information.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest/v1/brands.agents/getVerification

BRAND_ID=""
AGENT_ID=""

# Alternatively, you can retrieve the agent verification information with just the agent id
# by setting BRAND_ID = '-'

curl -v "https://businesscommunications.googleapis.com/v1/brands/$BRAND_ID/agents/$AGENT_ID/verification" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json businesscommunications`" 