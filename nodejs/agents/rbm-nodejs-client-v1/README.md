# RCS Business Messaging: Your first agent

This sample RBM agent demonstrates how to use the RBM Node.js SDK to
send and receive messages to an RCS-enabled device.

## Prerequisites

You need the following software installed on your development machine:

* [Node.js](https://nodejs.org/en/) version 20git status or above

## Setup

1.  Open the RBM Developer Console (https://business-communications.cloud.google.com/console/partner-console/)
    with your RBM Platform Google account and create a new RBM agent.

2.  In the top bar, select the **Settings** icon.

3.  In the left navigation, click **Service account**.

4.  Click **Create key**. Your browser downloads a service account key for your agent.
    You need this key to make RBM API calls as your agent.

Now add the JSON into `resouces/rbm-agent-service-account-credentials.json`.

Edit `resources/config.js`

-   add your agent id (the part before `@rbm.goog`).

These examples make use of the `rbm-api-helper` code that is packaged as source in this
repository and that is [published to NPM](https://www.npmjs.com/package/@google/rcsbusinessmessaging).


## Run the sample

1. In a terminal, navigate to this sample's root directory.

2. Run the following commands:

```
    npm install
    npm start
```

3. In a browser, navigate to http://localhost:7711/.

4. Invite your device as a tester.

5. After accepting the invite, initiate a chat with your device.


## Deploying to App Engine

You can create a Google Cloud project and deploy to App Engine:

```
gcloud config set project <project id>
gcloud app deploy
```

Note the `target url` - this with the `/callback` suffix is your webhook URL to set
in the agent configuration. The token to use is the value you set in `resources/config.js` above.