#!/bin/sh

# Retrieve the list of RBM agents submitted for launch to this carrier.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest/v1/brands.agents/list

# use this to retrieve all agents
curl -v "https://businesscommunications.googleapis.com/v1/brands/-/agents" \
-H "Content-Type: application/json" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json businesscommunications`" 

# use this to set the page size and receive the first page back
# curl -v "https://businesscommunications.googleapis.com/v1/brands/-/agents?pageSize=10" \

# use this to retrive the next page using the token returned in the previous one
# curl -v "https://businesscommunications.googleapis.com/v1/brands/-/agents?pageToken=XXXX" \