# RBM sample code
The node.js files here provide simple working examples of the
main RBM API concepts. You can read more in our [online Developer Documentation](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/how-it-works).

## Setting the samples up
In the [RBM Developer Console](https://business-communications.cloud.google.com/console/partner-console):

- Create your agent 
- Upload the assets in `agent-assets/`
- Create a service account key and download the JSON file
- Invite your RBM-enabled test phone (and accept the invite on your device)

Now add the JSON into `resouces/rbm-agent-service-account-credentials.json`.

Add your test phone number to `src/config.js`

These examples make use of the `rbm-api-helper` code that is packaged as source in this
repository. Before you run these examples, you will need to install the dependencies
that code requires:

```
cd ../rbm-api-helper
npm install
```

Now return to this folder andcf 
+ install the dependencies for these samples:

``
npm install
``

Run the first sample:

``
node src/0-capabilityCheck.js
``

You should find that your test phone is reported as online. You can now
proceed with the other samples.