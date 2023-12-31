# RCS Business Messaging: Telco self serve demo

This sample RBM agent demonstrates how an agent can deflect a
user away from live support to a self-serve experience.

The user starts in a live support queue, but is prompted to self-serve by
choosing the service (TV, Internet, Landline, Mobile) they are
interested in discussing. They can then start, upgrade and view bills
for the associated service. If they opt out of live support, they are
prompted to fill out a quick survey indicating their satisfaction level.


## Prerequisites

You must have the following software installed on your development machine:

* [Google Cloud SDK](https://cloud.google.com/sdk/) (aka gcloud)
* [Node.js](https://nodejs.org/en/) - version 8 or above


## Setup

1. Open the RBM Developer Console (https://business-communications.cloud.google.com/console/partner-console/)
with your RBM Platform Google account and create a new RBM agent.

2. When the agent is available, click the agent's card.

3. In the left navigation, click **Service account**.

4. Click **Create key**, then click **Create**. Your browser downloads a service account key for
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