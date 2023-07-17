# Node.js samples for using the RBM Management API

These Node.js code samples are provided as examples of how to use the 
RBM Management API from javascript.

The RBM Management API is exposed as extensions to Google's Business 
Communications API. These extensions are currently available to early access partners
for testing and feedback.

Further reading is available at:

- [RCS Business Messaging](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/how-it-works)
- [Business Communications API - early access](https://developers.google.com/business-communications/rcs-business-messaging/early-access/rbm-mgmt-api)

## Getting started

Read the file in `./resources/` - place your Service Account key into this folder.

`npm install`

Run an example e.g.

`node src/brands/create.js`

## Getting started

The full workflow to launch an RBM Agent via this API is:

- create a brand
- create an agent in the brand
- submit the agent for verification
- submit the agent for launch towards a carrier

Note that you do not need to wait for verification to be approved before you can
proceed to launch your agent. (The separate verification step will be removed for
General Availability).

## Differences to console-created agents

API-created agents are built on a different data model to those created in the RBM
Developer Console. Work is ongoing to resolve the differences that this causes for
General Availability. Be aware that:

- There is one Web Hook for all API-created agents.
- All API-created agents use the same Service Account.
- Although the developer console will allow you to add agent level webhooks,
  these will not be used.
- Because agents use the Service Account, you need to add an `agendId` parameter 
  when calling the RBM API for API-created agents.

e.g.

```
https://rcsbusinessmessaging.googleapis.com/v1/phones/+447766250000/agentMessages?messageId=48dbbb25-600e-4e3b-b42b-515ec678a003&agentId=my_new_agent_zydvm5pf_agent
```

## How stable is the API?

Although in EAP, the API has been used live by a number of partners in their commercial
services. The API is ready for production use.
 
## Generated API stub

`businesscommunications/` contains an API client stub generated from the Business
Communications API discovery document using the generator tool in the
[Google APIs Node.js Client](https://www.npmjs.com/package/googleapis) package.

During the early-access phase of this initiative, the extensions to the Business 
Communications API are restricted to onboarded test partners. In order to access
a discovery document containing these extensions you will need to do the following:

- Create an API key in the Google Cloud Project that has been granted access to
  the early-access API.
- use the key in the discovery URL:

`https://businesscommunications.googleapis.com/$discovery/rest?version=v1&key={API key}&labels=RBM_PARTNERS`
