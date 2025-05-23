# [Google's RCS Business Messaging: csharp Client](https://github.com/rcs-business-messaging/rbm-api-examples/tree/master/csharp/rbm-api-helper)

> **_NOTE:_** This client library is provided as a quick start to get you up and running with RBM. Once you get familiar with the basic functions in this library, we recommend that you unlock all the powerful capabilities of RBM via the RBM API directly.

[RCS Business Messaging](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/how-it-works) upgrades SMS with branding, rich media, interactivity,
and analytics. With RCS, businesses can bring branded, interactive mobile experiences, right to the native Android messaging app.

This document contains an [API reference](https://developers.google.com/business-communications/rcs-business-messaging/reference/rest), samples,
and other resources useful to developing csharp applications using the .NET framework. For additional help developing RCS Business Messaging applications, in Node.js and
other languages, see our [RCS Business Messages quickstart](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/first-agent)
guide.

## Documentation

The documentation for the RCS Business Messaging API can be found [here](https://developers.google.com/business-communications/rcs-business-messaging/reference/rest).

## Getting Started

### Install the .NET framework.

The simplest way to install the .NET framework is to use a [Microsoft installation script](https://dotnet.microsoft.com/en-us/download/dotnet/scripts).

### Build this library

If you want to build this library bby itself you can use this command:

```
dotnet build
```

## Partner-based RBM model

This helper library now supports the partner-based RBM model where there
is one Service Account for all agents that a developer creates. In this
model, the agent id must be sent with each API call. If your developer
account is set up for this model then you should add an additional parameter
to the constructor:

```csharp
using Google.RBM;

rbmApiHelper = new RbmApiHelper(credentialsFileLocation, "<MYAGENTID>");
```

## Legacy RBM model

If you are using the Servuice Account for a legacy agent then the agent id
is optional. You can initialise as above or you can use:

```csharp
using Google.RBM;

rbmApiHelper = new RbmApiHelper(credentialsFileLocation);
```

## Sample usage

Samples below assume a  library initialization as described above.

### Sending a text message

```csharp
rbmApiHelper.SendTextMessage("Hello World!", msisdn);
```

### Sending a text message with time to live

```csharp
rbmApiHelper.SendTextMessage("Hello World!", msisdn, "10s");
```

### Sending a text message with expiry time

```csharp
string expireTime = DateTime.Now.AddSeconds(10).ToUniversalTime()
  .ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fff'Z'");

rbmApiHelper.SendTextMessage("Hello World!", msisdn, expireTime:expireTime);
```
