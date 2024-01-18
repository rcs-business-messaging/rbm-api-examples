# RCS Business Messaging: Your first agent

This sample RBM agent demonstrates how to use the RBM Java SDK to
send and receive messages to an RCS-enabled device.

## Prerequisites

You must have the following software installed on your development machine:

* [Apache Maven](http://maven.apache.org) 3.3.9 or greater

## Setup

1. Open the RBM Developer Console (https://business-communications.cloud.google.com/console/partner-console/)
with your RBM Platform Google account and create a new RBM agent.

2. When the agent is available, click the agent's card.

3. In the left navigation, click **Service account**.

4. Click **Create key**, then click **Create**. Your browser downloads a service account key for
your agent. You need this key to make RBM API calls as your agent.

5. Rename the service account key "rbm-agent-service-account-credentials.json" and move it
into the "rbm-java-client-v1/src/main/resources" directory.

## Partner-based RBM Model

In 2024 we introduced a new, partner-based RBM model. This allows all of a 
developers agents to use the same Service Account key and simplifes deployment at scale.

You will know if you are using this model because you will receive errors in response to RBM
API calls simmilar to this:

```
{
  "code": 403,
  "errors": [
    {
      "domain": "global",
      "message": "There was an error looking up the RBM agent that corresponds to the Google Cloud Platform (GCP) project you're authenticating with. This may be a transient error, in which case a retry can help. Otherwise, please ensure you have previously registered an RBM agent that corresponds with the correct GCP project, and that you are properly authenticating with this project.",
      "reason": "forbidden"
    }
  ],
  "message": "There was an error looking up the RBM agent that corresponds to the Google Cloud Platform (GCP) project you're authenticating with. This may be a transient error, in which case a retry can help. Otherwise, please ensure you have previously registered an RBM agent that corresponds with the correct GCP project, and that you are properly authenticating with this project.",
  "status": "PERMISSION_DENIED"
}
```

In this case, it is necessary to provide RBM with the agendId you are using when making RBM api calls.

For this sample, simply edit `src/main/java/com/google/rbm/samples/FirstAgent.java'.

- search for `AGENTID` and set your agent id
- search for `PARTNERMODEL` and set this to `true`

Pull subscriptions are also not supported in the partner-based model. You will see that Pub/Sub
initiation is disabled and you will not see delivery and read notifications.

## Set up your test device

1. Install the RBM helper library: navigate to `../../rbm-api-helper` and follow the
   instructions in `README.md`.

2. In a terminal, navigate to this sample's root directory.

3. Run the following commands:

```
   mvn compile
   mvn exec:java -Dexec.args="TEST_DEVICE_PHONE_NUMBER invite"
```

The "invite" text at the end of this command will send TEST_DEVICE_PHONE_NUMBER an invite to
become a tester for your agent.

## Run the sample

1. In a terminal, navigate to this sample's root directory.

2. Run the following commands:

```
   mvn exec:java -Dexec.args="TEST_DEVICE_PHONE_NUMBER chat"
```