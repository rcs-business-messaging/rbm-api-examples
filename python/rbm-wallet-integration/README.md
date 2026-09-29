# RCS Business Messaging: Wallet Integration

This project demonstrates how to integrate Google Wallet with RCS Business
Messaging (RBM) using the RBM Python SDK. It acts as an RBM agent that uses a
webhook to receive user messages and send responses.

## Prerequisites

You must have the following software installed on your development machine:

* [Python][python] - version 3 or above
* [Google Cloud SDK (gcloud)][gcloud]

## Setting up the Agent

1. Open the [RBM Developer Console][rbm-console] with your RBM Platform Google
   account and create a new RBM agent.
2. Under the agent settings, navigate to **Service account** and click
   **Create key**.
3. Download the JSON file, rename it to
   `rbm-agent-service-account-credentials.json`, and place it in the
   `resources/` folder (create the folder if it doesn't exist).
4. Invite your RBM-enabled test phone to the agent and accept the invite on
   your device.

## Deploying to Google Cloud Platform (GCP)

To receive messages from users, you need to expose this application via a
public URL. The easiest way is to deploy it to GCP App Engine.

1. Ensure your `gcloud` CLI is initialized and authenticated:
   ```bash
   gcloud init
   gcloud auth application-default login
   ```
2. Create a GCP project if you don't have one and set it as your active project:
   ```bash
   gcloud config set project [YOUR_PROJECT_ID]
   ```
3. Deploy the application to App Engine (this assumes an `app.yaml` file
   exists in your project):
   ```bash
   gcloud app deploy
   ```
4. Once deployed, note down the URL of your App Engine application (e.g.,
   `https://[YOUR_PROJECT_ID].appspot.com`).

## Configuring the RBM Webhook

1. Go back to your agent in the [RBM Developer Console][rbm-console].
2. Navigate to the **Integrations** or **Webhook** section.
3. Enter your deployed App Engine URL with the webhook endpoint (e.g.,
   `https://[YOUR_PROJECT_ID].appspot.com/callback`) as the webhook URL.
4. Set the **Client Token** to a secure secret string of your choice.
5. In your application's settings, ensure the same client token is configured
   so your app can verify incoming requests from Google.
6. Click **Verify** in the RBM Console to finalize the connection.

## Executing Locally

If you wish to test locally before deploying:

1. Create a virtual environment and install dependencies:
   ```bash
   python3 -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```
2. Run the application:
   ```bash
   python main.py
   ```
   *(Note: To test the webhook locally, you will need a tool like
   [ngrok][ngrok] to expose your local port to the internet, and then update
   the RBM console with the ngrok URL).*

[python]: https://www.python.org/downloads/
[gcloud]: https://cloud.google.com/sdk/docs/install
[rbm-console]:
  https://business-communications.cloud.google.com/console/partner-console
[ngrok]: https://ngrok.com/
