# RCS Business Messaging API

This library provides a Java implementation for calling the Google RCS 
Business Messages API. and is used by the RBM Helper Library.

Usually you will not need to work with this library directly. 

The code has been generated using the
[Google APIS Client Generator](https://github.com/google/apis-client-generator).

## Maven usage

If you need to build a Java application that uses this library
directly then we recommend you use the latest version available
in the Maven repositories. Add the following to you `pom.xml`:

```
<dependency>
  <groupId>com.google.rbm</groupId>
  <artifactId>rcsbusinessmessaging</artifactId>
  <version>1.0.0</version>
</dependency>
```

(Update for the latest version).


## Overriding the service URL

The default library behaviour is to use the global API entry point which is
`https://rcsbusinessmessaging.googleapis.com/`. For optimal performance,
our recommendation is to use the regional API entry point closest to where your
code is located. These entry points are:

- **Europe**: `https://europe-rcsbusinessmessaging.googleapis.com/`
- **US**: `https://us-rcsbusinessmessaging.googleapis.com/`
- **APAC**: `https://asia-rcsbusinessmessaging.googleapis.com/`

The entry point can be set at library initialisation time like this:

```
String apiUrl = "https://asia-rcsbusinessmessaging.googleapis.com/";

try {
  HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
  GsonFactory gsonFactory = GsonFactory.getDefaultInstance();

  // create instance of the RBM API
  builder = new RCSBusinessMessaging
    .Builder(httpTransport, gsonFactory, null)
    .setApplicationName(((ServiceAccountCredentials) credentials).getProjectId());

  // set the API credentials and endpoint
  builder.setHttpRequestInitializer(new HttpCredentialsAdapter(credentials));
  builder.setRootUrl(apiUrl);
} catch(Exception e) {
  logger.log(Level.SEVERE, EXCEPTION_WAS_THROWN, e);
}
```

## Local usage

You can build and install a local version with:

```
mvn install
```


