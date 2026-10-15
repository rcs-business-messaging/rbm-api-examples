# Business Communications API - Java

RCS for Business uses the
[Business Communications API](https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest)
for two separate sets of operations:

-   For developers: to create RCS for Business agents, manage assets and submit
    agents for approval. These are known as
    [RBM Management API](https://developers.google.com/business-communications/rcs-business-messaging/guides/management-api/overview)
    functions.
-   For carriers: to approve, reject and suspend RCS for Business agents
    submitted to their network. These are know as
    [RBM Operations API](https://developers.google.com/business-communications/rcs-business-messaging/carriers/operations-api/get-started)
    features.

## Maven usage

If you need to build a Java application that uses this library directly then we
recommend you use the latest version available in the Maven repositories. Add
the following to you `pom.xml`:

```
<dependency>
  <groupId>com.google.rbm</groupId>
  <artifactId>businesscommunications</artifactId>
  <version>1.07</version>
</dependency>
```

Update for the latest version - visit
[Maven Central](https://central.sonatype.com/artifact/com.google.rbm/businesscommunications/overview).

## Local usage

You can build and install a local version with:

```
mvn install
```

## Change log

1.07

-   Regenerated stubs to include attachments.create endpoint for verification document upload.
-   Added acting_party query parameter to updateLaunch.
-   Added SuggestionDisplay parameter in RCS C# stubs and samples.
-   Updated Java/C# management flow samples to support document upload.

1.0.6

-   Regenerated to include Business Communications API definitions as of Jan
    8 2026.
-   Renaming from RBM to RCS for Business.
-   Includes new
    [Tester API](https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest/v1/testers).
-   Principal entity required for launching in India to comply with local
    regulations.

1.0.5

-   Regenerated to include Business Communications API definitions as of Sept
    5 2025.
-   Product renaming to RCS for Business.
-   New tester API support to add and delete testers, list testers and retrieve
    the status of a tester invite.

