# RCS Business Messaging: Product Ratings

This sample RBM agent demonstrates how to create a product rating
experience for RCS-enabled devices.

It also makes use of the Google Cloud Datastore feature to maintain
the user's preferences. You will need to setup a project to use Datastore.

## Prerequisites

You must have the following software installed on your development machine:

* [Google Cloud SDK](https://cloud.google.com/sdk/) (aka gcloud)
* [Node.js](https://nodejs.org/en/) - version 8 or above

You also need to set up a Google Cloud project with Google Firestore (Datastore) enabled

1.  Open the Google Cloud Console (https://console.cloud.google.com/).

2.  Create a new project.

3.  Go to the Datastore landing page (https://console.cloud.google.com/datastore/welcome).

4.  Select Native mode and then region, then **Create Database**.

5.  Go to Service Accounts (https://console.cloud.google.com/iam-admin/serviceaccounts)

6.  Create a Service Account with `Cloud Datastore User` permissions

7.  Create a key file for this service account

8.  Copy the contents of the key file into `resources/datastore-service-account-credentials.json`

## Setup

1. Open the RBM Developer Console (https://business-communications.cloud.google.com/console/partner-console/)
with your RBM Platform Google account and create a new RBM agent.

2. When the agent is available, click the agent's card.

3. In the left navigation, click **Service account**.

4.  Click **Create key**, then click **Create**. Your browser downloads a service
    account key for
your agent. You need this key to make RBM API calls as your agent.

5.  Copy service account key to `resources/rbm-agent-service-account-credentials.json`.

## Run the sample

1. In a terminal, navigate to this sample's root directory.

2. Run the following commands:

    npm install
    npm start

3. In a browser, navigate to http://localhost:7777/.

4. Invite your device as a tester.

5. After accepting the invite, initiate a chat with your device.