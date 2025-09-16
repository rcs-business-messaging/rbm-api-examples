# Business Communications API

This library provides a Java implementation for calling the Google
[Business Communications API](https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest).

## Maven usage

If you need to build a Java application that uses this library directly then we
recommend you use the latest version available in the Maven repositories. Add
the following to you `pom.xml`:

```
<dependency>
  <groupId>com.google.rbm</groupId>
  <artifactId>businesscommunications</artifactId>
  <version>1.0.5</version>
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

1.0.5

-   Regenerated to include Business Communications API definitions as of Sept
    5 2025.
-   Product renaming to RCS for Business.
-   New tester API support to add and delete testers, list testers and retrieve
    the status of a tester invite.