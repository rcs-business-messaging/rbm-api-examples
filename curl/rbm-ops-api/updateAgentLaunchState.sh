#!/bin/sh

# Update an agents launch status.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest/v1/brands.agents/updateLaunch

# Agent name format is brands/<brand id>/agents/<agent id>
# Use listAgents.sh to obtain an agent name
AGENT_NAME="brands/<brand name>/agents/<agent id>"

# Alternatively, you can retrieve the agent information with just the agent id
AGENT_NAME="brands/-/agents/<agent id>"

curl -v -X PATCH "https://businesscommunications.googleapis.com/v1/$AGENT_NAME/launch" \
-H "Content-Type: application/json" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json businesscommunications`" \
-d "{
  'rcsBusinessMessaging': {
    'launchDetails': {
      '': {
        'launchState': 'LAUNCH_STATE_LAUNCHED',
      }
    }
  }
}"