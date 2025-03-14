# RCS Business Messaging: A Telco Agent

This sample RBM agent demonstrates how to use the RBM Python SDK to
create a simple telecommunications RBM agent.

## Prerequisites

You must have the following software installed on your development machine:

* [Python](https://www.python.org/downloads/) - version 3 or above
* [virtualenv](https://virtualenv.pypa.io/en/stable/installation/)

## Setting the demo up
In the [RBM Developer Console](https://business-communications.cloud.google.com/console/partner-console):

- Create your agent 
- Upload the assets in `agent-assets/`
- Create a service account key and download the JSON file
- Update the `AGENT_ID` parameter in `constants.py` (the part before @rbm.goog)
- Invite your RBM-enabled test phone (and accept the invite on your device)

Now add the JSON into `resouces/rbm-agent-service-account-credentials.json`.

## Executing locally
Create a python environment and install dependencies:

```
python3 -m venv env
source env/bin/activate
python -m pip install -r requirements.txt
python -m pip install -t . ../../rbm-api-helper
```

Execute the container in a gunicorn web container with this command:

```
gunicorn -b :8000 main:app
```

This creates a web application listening on port ```8000```. Use a different 
port as required. Be aware that your ap will need to be reachable from the 
Internet in order for the RBM webhook to deliver notifications.

## Deploying to Google Cloud

1. In a terminal, navigate to this sample's root directory.

2. Run the following gcloud command:

`gcloud config set project YOUR-GCP-PROJECT-ID`

Replace `YOUR-GCP-PROJECT-ID` with your project's ID.

3. Run the following command to install the RBM helper API library:

`python -m pip install -t . ../../rbm-api-helper`

4. Run the following to deploy the code:

`gcloud app deploy --quiet`

5. Navigate to https://YOUR-GCP-PROJECT-ID.appspot.com


## Set the agent webhook

1. Return to the RBM Developer Console, in the left navigation, click **Integrations**.

2. Click Edit subscription and configure a push subscription with a
URL of https://YOUR-GCP-PROJECT-ID.appspot.com/callback
