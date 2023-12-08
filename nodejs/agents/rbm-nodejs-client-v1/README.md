# RCS Business Messaging: Your first agent

This sample RBM agent demonstrates how to use the RBM Node.js SDK to
send and receive messages to an RCS-enabled device.

## Prerequisites

You need the following software installed on your development machine:

* [Node.js](https://nodejs.org/en/) version 8 or above

## Setup

Set up the RBM agent:

1. Open the RBM Developer Console (https://business-communications.cloud.google.com/console/partner-console/)
with your RBM Platform Google account and create a new RBM agent.

2. When the agent is available, click the agent's card.

3. In the left navigation, click **Service account**.

4. Click **Create key**, then click **Create**. Your browser downloads a service account key for
your agent. You need this key to make RBM API calls as your agent.

5. Now add the JSON into `resouces/rbm-agent-service-account-credentials.json`.


## Run the sample

1. In a terminal, navigate to this sample's root directory.

2. Run the following commands:

```
    npm install
    npm start
```

3. In a browser, navigate to http://localhost:7777/.

4. Invite your device as a tester.

5. After accepting the invite, initiate a chat with your device.