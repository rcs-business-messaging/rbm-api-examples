# RCS Business Messaging: Your First Agent

This sample RBM agent demonstrates how to use the RBM C# SDK to
send messages to an RCS-enabled device. In this simple example, we do
not receive notifications from the user which would require a webhook.

## Prerequisites

You must have the following software installed on your development machine:

* .NET Framework v6.0 minimum

## Setup

Prepare credentials:

1. Open the [RBM Developer Console](https://business-communications.cloud.google.com/console/partner-console/])
with your RBM Platform Google account and create a new RBM agent.

2. When the agent is available, click the agent's card.

3. In the left navigation, click **Service account**.

4. Click **Create key**, then click **Create**. Your browser downloads a service account key for
your agent. Note the location of the service account key file. You need this key to make RBM API
calls as your agent.

## Set up your test device

1. In a terminal, navigate to this sample's root directory.

2. Run the following commands:

```
   dotnet build
   dotnet run PATH_TO_SERVICE_ACCOUNT_KEY PHONE_NUMBER invite
```

Replace the `PATH_TO_SERVICE_ACCOUNT_KEY` with the location of the service account key
file you downloaded.

The "invite" text at the end of this command sends `PHONE_NUMBER` an invite to
become a tester for your agent.

## Partner-based or legacy RBM model

You will need to edit `FirstAgent.cs` and set the RbmApiHelper constructor correctly
by providing the agend id if you are using the Partner-based model.


## Run the sample

1. In a terminal, navigate to this sample's root directory.

2. Run the following commands:

```
   dotnet build
   donet run PATH_TO_SERVICE_ACCOUNT_KEY PROJECT_ID PHONE_NUMBER chat
```
