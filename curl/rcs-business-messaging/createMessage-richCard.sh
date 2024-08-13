#!/bin/sh

# Create (send) an RBM message to a user.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/rest/v1/phones.agentMessages/create

AGENT_ID=""
MSISDN=""
MESSAGE_ID="1234566622a1"

curl -v POST "https://rcsbusinessmessaging.googleapis.com/v1/phones/$MSISDN/agentMessages?agentId=$AGENT_ID&messageId=$MESSAGE_ID" \
-H "Content-Type: application/json" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json rcsbusinessmessaging`" \
-d "{
  'contentMessage':{
    'richCard':{
      'standaloneCard':{
        'cardOrientation':'VERTICAL',
        'cardContent':{
          'title':'Hello, world!',
          'description':'RBM is awesome!',
          'suggestions':[
            {
              'reply':{
                'text':'Suggestion #1','postbackData':'suggestion_1'
              }
            },
            {
              'reply':{
                'text':'Suggestion #2','postbackData':'suggestion_2'
              }
            },
            {
              'action':{
                'text':'View map',
                'postbackData':'postback_data_1234',
                'viewLocationAction':{
                  'latLong':{
                    'latitude':37.4220188,
                    'longitude':-122.0844786
                  },
                  'label':'Googleplex'
                }
              }
            }
          ]
        }
      }
    }
  }
}"