# Business Communications API: RBM Ops API Samples

Code in this folder demonstrate using key features of the Business Communications API
when used by a carrier for 'RBM Operations API' services.

Mode details can be found in our [online documentation]
(https://developers.google.com/business-communications/rcs-business-messaging/carriers/operations-api/overview)

## Prerequisites

You must have the following software installed on your development machine:

-  JDK 1.8 or greater
-  [Apache Maven](http://maven.apache.org) 3.5.2 or greater

## Setup: Obtaining your Service Account Key

Follow the steps in the documentation above to create a GCP project and
ask Google to allow it access to perform RBM Ops API operations for your
carrier.

Create a service account key in your GCP project.

Add this service account key JSON to `src/main/resourcesrbm-agent-service-account-credentials.json`.

## Running the code samples

1. In a terminal, navigate to this sample's root directory.

2. Compile the samples:

```
   mvn compile
```

3. Run the samples

```
mvn exec:java 
```

Currently this will retrieve a list of all the RBM agents submitted to your carrier.