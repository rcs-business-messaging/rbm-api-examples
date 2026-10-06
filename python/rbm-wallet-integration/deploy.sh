#!/bin/bash
# Deploy RBM Wallet Integration

if [ -z "$1" ]; then
  echo "Error: Missing GCP Project ID."
  echo "Usage: ./deploy.sh <GCP_PROJECT_ID>"
  echo "Note: Make sure your .env file is populated with your AGENT_ID before deploying!"
  exit 1
fi

export GCP_PROJECT_ID=$1

echo "Deploying RBM Wallet Integration to project: $GCP_PROJECT_ID"
if gcloud app deploy app.yaml --project=$GCP_PROJECT_ID --quiet; then
  echo "Deployment successful."
else
  echo "Deployment failed."
  exit 1
fi
