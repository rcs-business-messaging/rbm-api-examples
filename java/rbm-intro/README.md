# RCS Business Messaging: Intro client

This sample RBM agent demonstrates how to use the RBM Java SDK to
perform some basic RBM communications using the Jaba RbmApiHelper library.

## Prerequisites

You must have the following software installed on your development machine:

* [Apache Maven](http://maven.apache.org) 3.3.9 or greater

## Setup

1.  Open the RBM Developer Console (https://business-communications.cloud.google.com/console/partner-console/)
    with your RBM Platform Google account and create a new RBM agent.

2.  In the top bar, select the **Settings** icon.

3.  In the left navigation, click **Service account**.

4.  Click **Create key**. Your browser downloads a service account key for your agent.
    You need this key to make RBM API calls as your agent.

Now paste the JSON into `src/main/resources/rbm-agent-service-account-credentials.json`.

5.  Ensure you have invited your test number to become a tester of your agent (in the
    RBM Developer Console).

## Setup

It is necessary to provide RBM with the agendId you are using when making RBM api calls.

For this sample, simply edit `src/main/java/com/google/rbm/samples/RbmIntro.java'.

- search for `AGENTID` and set your agent id.
- search for `MSISDN` and set the phone number of your test device.

## Compile end execute

1. In a terminal, navigate to this sample's root directory.

3. Run the following commands:

```
   mvn compile
   mvn exec:java
```

