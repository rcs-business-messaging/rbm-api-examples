# RCS Business Messaging: Bulk Capability Check Tool

This sample demonstrates how to use the [RCS Business Messaging Java client library](https://github.com/rcs-business-messaging/rbm-api-examples/tree/master/java/rbm-api-helper)
for performing operations with the [RCS Business Messaging API](https://developers.google.com/business-communications/rcs-business-messaging/reference/rest)
to execute a bulk capability check against an input list of phone numbers.

The app divides the number of input mobile numbers between the number of threads (by default this is 10 threads). Each thread then makes
an RBM API call with up to 499 mobile numbers from its subset, looping until all its numbers have been sent. Resuts are gathered and
displayed visually and all reachable mobile numbers are written to the output file.

This application assumes that you're signed up with
[RCS Business Messaging](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/register-partner).

## Documentation

The documentation for the RCS Business Messaging API can be found [here](https://developers.google.com/business-communications/rcs-business-messaging/reference/rest).

## Prerequisite

You must have the following software installed on your machine:

* [Apache Maven](http://maven.apache.org) 3.3.9 or greater
* [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

## Before you begin

1.  Open the [RBM Developer Console](https://business-communications.cloud.google.com/console/partner-console/)
    with your RBM Platform Google account and create a new RBM agent.

2.  In the top bar, select the **Settings** icon.

3.  In the left navigation, click **Service account**.

4.  Click **Create key**. Your browser downloads a service account key for your agent.
    You need this key to make RBM API calls as your agent.

5. Copy the service account key and paste it into `rbm-java-cap-check/src/main/resourcesrbm-agent-service-account-credentials.json`.

## Partner-based model edits

For this sample, simply edit `src/main/java/com/google/rbm/capcheck/CapCheckExecutor.java'.

- search for `AGENTID` and set your agent id

## Execute the sample

1. In a terminal, navigate to this sample's root directory.

2. Run the following commands:

```
mvn compile
mvn exec:java -Dexec.args="INPUT_FILE OUTPUT_FILE NUM_OF_THREADS START_INDEX END_INDEX"
```

The `NUM_OF_THREADS`, `START_INDEX` and `END_INDEX` parameters are optional. By default, the `NUM_OF_THREADS` is set to 10,
but you can use this option to increase the value. The `START_INDEX` and `END_INDEX` parameters select a subset of
numbers from the `INPUT_FILE`.

## Sample configuration

Prior to running this script with a large amount of threads, you should adjust the default Java
memory allocation by setting the Maven run options with the following command:

```
export MAVEN_OPTS="-Xms1024m -Xmx3000m"
```

In our tests, this script using only a single thread can check the capability of 1,000,000 devices in about 2 minutes
running on a MacBook Pro with 2.8 GHz Quad-Core Intel Core i7 CPU and 16 GB of RAM. With the default of 10 threads,
this program can check 1,000,000 users in about 15 seconds.

## Learn more

To learn more about setting up RCS Business Messaging see the
[documentation](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/how-it-works).