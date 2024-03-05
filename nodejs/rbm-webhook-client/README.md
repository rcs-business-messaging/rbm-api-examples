# RBM Webhook Client - Node.js

The RBM Partner-based Model supports Webhooks which makes local 
development and testing hard. Changing code and deploying to a public
web server takes time and slows development.

The RBM Webhook Client is a development library that allows you to 
develop and test your code locally. The client library connects to
a hosted server using [Socket.IO](https://socket.io/). You configure
your **agent-level webhook** to point to our service and your agent
will then receive notifications.

## Limitations

This library is made available for development and test only. You must use
webhooks for your production deployment. Our implementation consumes
and disguards any notifications when your agent code is not running so if you
try to use it in production, you will soon find that you miss many messages.

## Setup

Include this in the dependencies section of your `package.json` file:

```
"@google/rbmwebhookclient": "^1.0.0",
```

Regularly check [npm](https://www.npmjs.com/package/@google/rbmwebhookclient)
for the latest version.

In your code you simply add:

```
const RbmWebhookClient = require('@google/rbmwebhookclient');

// Receives RBM notifications
function eventHandler(msg) {
  console.log(msg);
}

new RbmWebhookClient(eventHandler);
```

## Operation

When you first run your code you will see lines like this in your console or application log:

```
RbmWebhookClient: WEBHOOK NOT YET VERIFIED
RbmWebhookClient: Your webhook for this RBM agent is https://rbm-webhook-server.appspot.com/callback/<uuid>
RbmWebhookClient: Set this as your agent-level webhook in the RBM developer console and verify.
```

-   Go to the [RBM Developer Console](https://business-communications.cloud.google.com/console/partner-console/).
-   Select your agent, then **Integrations** and **Webhook**.
-   Set the webhook to the URL displayed.
-   Set the token to the UUID at the end of the URL.
-   Select **Verify**.

You will see the following message in your console or application log: 

```
RbmWebhookClient: Webhook is now verified.
```

You are now receiving notifications while your application is running.

Your UUID is stored in `token.txt`. Now when you start your applicaton you 
will see:

```
RbmWebhookClient: Connected to server https://rbm-webhook-server.appspot.com/<uuid>
RbmWebhookClient: Receiving notifications.
```