# [Google's RCS Business Messaging: Java Client](https://github.com/rcs-business-messaging/rbm-api-examples/tree/master/java/rbm-api-helper)

[RCS Business Messaging](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/how-it-works) upgrades SMS with branding, rich media, interactivity,
and analytics. With RCS, businesses can bring branded, interactive mobile experiences, right to the native Android messaging app.

This document contains an [API reference](https://developers.google.com/business-communications/rcs-business-messaging/reference/rest), samples,
and other resources useful to developing Java applications. For additional help developing RCS Business Messaging applications, in Node.js and
other languages, see our [RCS Business Messages quickstart](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/first-agent)
guide.

## Documentation

The documentation for the RCS Business Messaging API can be found [here](https://developers.google.com/business-communications/rcs-business-messaging/reference/rest).

## Getting Started


### Install the API library

Navigate to `./rcs-business-messaging` and follow the instructions to install the RBM API library into your local Maven repo. You can work with this library
directly but using our helper library will simplify things.

### Install into your local repository

Execute the following command to build and install the helper library into your local Maven repository: 

```
mvn install
```

### Explore the Java samples

Explore the Java samples in `../agents` to see how the helper library is used.

### Before you begin

1.  [Register with RCS Business Messaging](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/register-partner).

## Sample usage

Some examples of using the helper library:

### Initialisation

```java
import com.google.rbm.RbmApiHelper;

rbmApiHelper = new RbmApiHelper();
```

### Registering a tester

```java
try {
  rbmApiHelper.registerTester(msisdn);
} catch (Exception e) {
  e.printStackTrace();
}
```

### Sending a message

```java
try {
  rbmApiHelper.sendTextMessage("What is your favorite color?", msisdn);
} catch (IOException e) {
  e.printStackTrace();
}
```

## Partner-based RBM model

This helper library now supports the partner-based RBM model where there
is one Service Account for all agents that a developer creates. In this
model, the agent id must be sent with each API call. If your developer
account is set up for this model then you should add an additional call
when initialising the library:

```java
import com.google.rbm.RbmApiHelper;

rbmApiHelper = new RbmApiHelper();
rbmApiHelper.setAgentId("myagentid");
```

## Versioning

This library follows [Semantic Versioning](http://semver.org/).

This library is considered to be **General Availability (GA)**. This means it
is stable; the code surface will not change in backwards-incompatible ways
unless absolutely necessary (e.g. because of critical security issues) or with
an extensive deprecation period. Issues and requests against **GA** libraries
are addressed with the highest priority.

## Contributing

Contributions welcome! See the [Contributing Guide](https://github.com/rcs-business-messaging/rbm-api-examples/blob/master/CONTRIBUTING.md).

## License

Apache Version 2.0

See [LICENSE](https://github.com/rcs-business-messaging/rbm-api-examples/blob/master/LICENSE)