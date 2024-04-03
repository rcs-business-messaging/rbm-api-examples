# Node.js samples for using the RBM Management API

These Node.js code samples are provided as examples of how to use the 
RBM Management API from javascript.

The RBM Management API is exposed as extensions to Google's Business 
Communications API. A [helper library](https://github.com/rcs-business-messaging/rbm-api-examples/tree/master/nodejs/rbm-businesscommunications-api-helper)
is provided to make calling the parts of the API useful for RBM easier.

Further reading is available at:

- [RCS Business Messaging](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/how-it-works)
- [RBM Management API](https://developers.google.com/business-communications/rcs-business-messaging/guides/management-api/overview)

## Getting started

Read the file in `./resources/` - place your Service Account key into this folder.

`npm install`

Run an example e.g.

`node src/brands/create.js`

## Getting started

The full workflow to launch an RBM Agent via this API is:

- create a brand.
- create an agent in the brand.
- submit the agent for verification.
- submit the agent for launch towards a carrier.

Note that you do not need to wait for verification to be approved before you can
proceed to launch your agent.

**Deleting agents** - security changes mean that developers can no longer delete
agents they have created. Contact [RBM Support](mailto:rbm-support@google.com)
for assistance.