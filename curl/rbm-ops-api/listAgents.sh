#!/bin/sh

# Retrieve the list of RBM agents submitted for launch to this carrier.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest/v1/brands.agents/list

curl -v "https://businesscommunications.googleapis.com/v1/brands/-/agents" \
-H "Content-Type: application/json" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json businesscommunications`" 