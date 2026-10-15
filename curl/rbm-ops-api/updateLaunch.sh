#!/bin/sh

# Update an agents launch status.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest/v1/brands.agents/updateLaunch

# Agent name format is brands/<brand id>/agents/<agent id>
# Use listAgents.sh to obtain an agent name

BRAND_ID=""
AGENT_ID=""
ACTING_PARTY=""

# Alternatively, you can retrieve the agent verification information with just the agent id
# by setting BRAND_ID = '-'

curl -v -X PATCH "https://businesscommunications.googleapis.com/v1/brands/$BRAND_ID/agents/$AGENT_ID/launch${ACTING_PARTY:+?acting_party=$ACTING_PARTY}" \
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