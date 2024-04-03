#!/bin/sh

# Get agent definition.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest/v1/brands.agents/get

# Agent name format is brands/<brand id>/agents/<agent id>
# Use listAgents.sh to obtain an agent name
AGENT_NAME="brands/<brand name>/agents/<agent id>"

# Alternatively, you can retrieve the agent information with just the agent id
AGENT_NAME="brands/-/agents/<agent id>"

curl -v "https://businesscommunications.googleapis.com/v1/$AGENT_NAME" \
-H "Content-Type: application/json" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json businesscommunications`" 