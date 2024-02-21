# RCS Business Messaging: Kitchen Sink Demo

This sample RBM agent demonstrates how to use the RBM C# SDK
to send and receive messages to an RCS enabled device.

The Kitchen Sink demonstrates how to create most functionality within an RBM
agent.


## Prerequisites

You must have the following software installed on your development machine:

* .NET Framework v6.0 minimum

## Setup

Prepare credentials:

1. Open the [RBM Developer Console](https://business-communications.cloud.google.com/console/partner-console/])
with your RBM Platform Google account and create a new RBM agent.

2. When the agent is available, click the agent's card.

3. On the **Overview** page, node the value of **Agent ID**.

4. Click the **Partner account settings** icon in the top right.

5. Select **Service Account**.

6. Click **Create key** and locate the `.json ` service account key file that is downloaded.

## Partner-based agent id

Edit `KitchenSinkBot.cs` and set the RbmApiHelper constructor correctly
by providing the agend id you noted above.

```
this.rbmApiHelper = new RbmApiHelper(credentialsFileLocation, "MY AGENT ID");
```

## Where is Pub/Sub?

RBM no longer supports Pub/Sub so this code has been removed. This example does not
currently implement a webhook so is not fully functional. The code does provde a clear example
of how to use the DotNet helper library to send all RBM content.

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


## Run the sample

1. In a terminal, navigate to this sample's root directory.

2. Run the following commands:

```
   dotnet build
   donet run PATH_TO_SERVICE_ACCOUNT_KEY PHONE_NUMBER chat
```

## Updates

### Feb 21 2024

- updated library dependencies to latest versions
- now targeting .Net Framework v6
- removed Pub/Sub code and updated for RBM Partner-based model