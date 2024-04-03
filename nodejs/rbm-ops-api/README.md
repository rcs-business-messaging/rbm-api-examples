# RBM Operations API - node.js examples

The RBM Operations API provides a programmatic interface to the
features available in the RBM Admin Console which a carrier uses
to review, approve and launch RBM Agents on their network.

This API allows these features to be integrated into a carriers
existing systems.

The RBM carrier features are exposed through the existing
[Business Communications API](https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest).

These curl examples show how to use this API to implement the
RBM operations a carrier can expect to perform.

## Getting Started

Before you can use this API you need to create a Google Cloud project
and ask Google to provide access to a specific RBM carrier. You will
need to provide evidence that you have contractual authority to act
on behalf of the carrier. The onboarding process can be found on the
[RBM Developer Site](https://developers.google.com/business-communications/rcs-business-messaging/guides/management-api/overview).

Once you have followed the onboarding steps:

- create a Service Account in your Google Cloud project.
- create a JSON key for this Service Account.

Now add the contents of your downloaded JSON key file to
`./resources/businesscommunications-service-account-credentials.json`.

You can now execute the node samples e.g.

```
node src/listAgents.js
```