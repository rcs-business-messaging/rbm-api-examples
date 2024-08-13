AGENT_ID="<set here>"

curl -v -X POST "https://rcsbusinessmessaging.googleapis.com/v1/files?agentId=$AGENT_ID" \
-H "Content-Type: application/json" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json rcsbusinessmessaging`" \
-d "{
    'fileUrl': 'https://storage.googleapis.com/kitchen-sink-sample-images/cute-dog.jpg',
    'thumbnailUrl': 'https://storage.googleapis.com/kitchen-sink-sample-images/elephant.jpg'
}"