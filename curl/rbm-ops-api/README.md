# RBM Operations API - curl examples

The RBM Operations API provides a programmatic interface to the
features available in the RBM Admin Console which a carrier uses
to review, approve and launch RBM Agents on their network.

This API allows these features to be integrated into a carriers
existing systems.

The RBM carrier features are exposed through the existing
[Business Communications API](https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest).

These curl examples show how to use this API to implement the
RBM operations a carrier can expect to perform.

## Prerequisites

These scripts use the `oauth2l` tool to generate the authorization
header from your Service Account key. You will need to install this
tool from the [oauth2l GitHub site](https://github.com/google/oauth2l).

## Getting Started

Before you can use this API you need to create a Google Cloud project
and ask Google to provide access to a specific RBM carrier. You will
need to provide evidence that you have contractual authority to act
on behalf of the carrier. The onboarding process can be found on the
[RBM Developer Site](https://developers.google.com/business-communications/rcs-business-messaging/carriers/operations-api/overview).

Once you have followed the onboarding steps:

- create a Service Account in your Google Cloud project.
- create a JSON key for this Service Account.

Now add the contents of your downloaded JSON key file to
`./serviceAccount.json`.

You can now execute the curl scripts.

## Notes

The curl scripts are written for a unix-based system - they are written
as Bourne shell (`sh`) scripts. You will need to adapt these for
Windows environments.

The version of curl or oauth2l you have installed may take slightly
different parameters - use these scripts as a guide and adapt as needed.