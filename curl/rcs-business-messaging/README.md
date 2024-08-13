# RBM API - cURL examples

These cURL samples demonstrate using the RBM API.

## Prerequisites

These scripts use the `oauth2l` tool to generate the authorization
header from your Service Account key. You will need to install this
tool from the [oauth2l GitHub site](https://github.com/google/oauth2l).

## Getting Started

You need to obtain a JSON Service Account key from your RBM developer account.

Now add the contents of your downloaded JSON key file to
`./serviceAccount.json`.

You can now execute the curl scripts.

## Notes

The curl scripts are written for a unix-based system - they are written
as Bourne shell (`sh`) scripts. You will need to adapt these for
Windows environments.

The version of curl or oauth2l you have installed may take slightly
different parameters - use these scripts as a guide and adapt as needed.