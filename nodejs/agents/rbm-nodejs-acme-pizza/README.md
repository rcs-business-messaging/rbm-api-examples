# RCS Business Messaging: ACME Pizza Demo

This sample RBM agent demonstrates how to use the RBM Node.js SDK and Google Pub/Sub to
send a simple marketing offer to a user.

This sample is setup to work with Firebase.

## Prerequisites

You must have the following software installed on your development machine:

* [Node.js](https://nodejs.org/en/) - version 8 or above

## Setup

1. Open the RBM Developer Console (https://business-communications.cloud.google.com/console/partner-console/)
with your RBM Platform Google account and create a new RBM agent.

2. When the agent is available, click the agent's card.

3. In the left navigation, click **Service account**.

4. Click **Create key**, then click **Create**. Your browser downloads a service account key for
your agent. You need this key to make RBM API calls as your agent.

5.  Copy service account key to `resources/rbm-agent-service-account-credentials.json`.

### Create Google Cloud Project

You will need to create a Google Cloud project which will be enabled for firebase.

1.  Visit https://console.cloud.google.com/.

2.  Create a new project.

### Setup Firebase

1. In your browser, navigate to https://console.firebase.google.com/

2. Click Add project

3. In the Project name input box, find the Google Cloud project you created in
the prior step and select it.

4. Click Create project

Your Google Cloud project is now enabled for Firebase.

## Run the sample

1. In a terminal, navigate to rbm-nodejs-acme-pizza/functions/.

2. Run: `npm install`

3. Install the Firebase CLI by running: `npm install -g firebase-tools`

4. Login to your Google account with: `firebase login`

5. cd to the root directory `rbm-nodejs-acme-pizza/`

6. Setup your project for Firebase with: `firebase use [Project ID]`

7. To run locally enter: `firebase serve` functions,hosting

8. In a browser, navigate to http://localhost:5000/.

9. Click "Need access to the demo?" and enter your test devices to invite yourself as a tester.

10. After accepting the invite, initiate a chat with your device.