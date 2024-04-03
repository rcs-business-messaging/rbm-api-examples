# Business Communications Helper for RBM - node.js

[RCS Business Messaging](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/how-it-works)
makes use of the [Business Communications API](https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest) to manage RBM agents. Developers can create RBM agents and submit them to
carriers for approval and launch. Carriers can use the API to manage RBM agents on their network.

This library provides a simplification of RBM-related operations for node.js Javascript developers.

## Documentation

The documentation for the Business Communications API can be found [here](https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest).

## Quickstart

### Before you begin

[Register with RCS Business Messaging](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/register-partner).

If you wish to perform carrier operations such as approving agents you will need to contact [RBM Support](mailto:rbm-support@google.com) to have your account configured to access a specific carriers data.

### Adding a dependency

Add the following to the dependencies section in your `package.json `:

```
"dependencies": {
  ...
  "@google/rbm-businesscommunications": "1.0"
  ...
},
```

We recommend you use the latest version available
in the [npm repository](https://www.npmjs.com/package/@google/rbm-businesscommunications).

### Initialisation
You initialise the library by providing your service account key and agentId.

```javascript
const businessCommunicationsApiHelper =
  require('@google/rbm-businesscommunications');

const privateKey =
	require('../resources/businesscommunications-service-account-credentials.json');

businessCommunicationsApiHelper.initBusinessCommunucationsApi(privateKey);
```

### Example usage

Refer to the [RBM Management API](https://github.com/rcs-business-messaging/rbm-api-examples/tree/master/nodejs/rbm-mgmt-api)
and [RBM Operations API](https://github.com/rcs-business-messaging/rbm-api-examples/tree/master/nodejs/rbm-ops-api) examples.