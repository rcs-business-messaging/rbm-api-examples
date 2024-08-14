# RBM sample code
The node.js files here provide simple working examples of the
main RBM API concepts. You can read more in our [online Developer Documentation](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/how-it-works).

## Setting the samples up

1.  Open the RBM Developer Console (https://business-communications.cloud.google.com/console/partner-console/)
    with your RBM Platform Google account and create a new RBM agent.

2.  Upload the assets in `agent-assets/`

2.  In the top bar, select the **Settings** icon.

3.  In the left navigation, click **Service account**.

4.  Click **Create key**. Your browser downloads a service account key for your agent.
    You need this key to make RBM API calls as your agent.

Now add the JSON into `resouces/rbm-agent-service-account-credentials.json`.

Edit `src/config.js`

-   add your test phone number.
-   add your agent id (the part before `@rbm.goog`).

These examples make use of the `rbm-api-helper` code that is packaged as source in this
repository and that is [published to NPM](https://www.npmjs.com/package/@google/rcsbusinessmessaging).


``
npm install
``

Run the first sample:

``
node src/0-capabilityCheck.js
``

You should find that your test phone is reported as online. You can now
proceed with the other samples.

## Known issues

On recent versions of node.js you may see this deprecation warning:

```
(node:23043) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

This is due to a dependency in the underlying `googleapis` library. This will be resolved
when the team responsible for this library ship an updated release.