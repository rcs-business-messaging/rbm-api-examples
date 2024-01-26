# RBM sample code - push notifications
The node.js files here demonstrate how to use RBM push notifications.

The application is contained in an express web server and instructions are provided 
to deploy it to Google Cloud App Engine. The application exposes one web page where
a mobile number can be entered and an RBM message sent to the user. A second URL
provides the callback wich the RBM platform will call with notifications.

You can read more in our [online Developer Documentation]
(https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/how-it-works).

## Setting the samples up
In the [RBM Developer Console](https://business-communications.cloud.google.com/console/partner-console/):

- Create your agent 
- Upload the assets in `agent-assets/`
- Create a service account key and download the JSON file
- Invite your RBM-enabled test phone (and accept the invite on your device)

Now add the JSON into `resouces/rbm-agent-service-account-credentials.json`.

## Running locally

Install dependencies:

``
npm install
``

Run the web server:

``
npm start
``

You can now connect to the application by pointing your browser at

http://localhost:8111/


## Deploy to App Engine

Select the correct target project:

```
gcloud config set project <project name>
```

Deploy the app:

```
gcloud app deploy
```

The output of this last command will show you the URL to your app.

## Setup webhook notifications

In the [RBM Developer Console](https://business-communications.cloud.google.com/console/partner-console/):

-   Select your agent
-   Go to **Integrations**
-   Set the webhook using the URL you saw when you deployed to GCP. The webhook URL will be `https://<GCP app FQDN>/callback`
-   The app is hardcoded in `routes/index.js` to use a webhook verification code of `1234556` - you can either use this 
    in the developer console or change the value in the code and redeploy.
-   Now you can verify your webhook.
