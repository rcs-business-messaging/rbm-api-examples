#!/bin/sh

# Upload verification document (PDF) to the Business Communications API.
# See https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest/v1/brands.agents.attachments/create

# Agent name format is brands/<brand id>/agents/<agent id>
BRAND_ID=""
AGENT_ID=""
PDF_FILE="<path-to-verification-document>"
ATTACHMENT_SOURCE="VERIFICATION_PAGE"

if [ ! -f "$PDF_FILE" ]; then
    echo "Error: PDF file does not exist at $PDF_FILE"
    echo "Please place a verification PDF document at $PDF_FILE and run again."
    exit 1
fi

curl -v -X POST "https://businesscommunications.googleapis.com/upload/v1/brands/$BRAND_ID/agents/$AGENT_ID/attachments?uploadType=media&attachmentOperationSource=$ATTACHMENT_SOURCE" \
-H "Content-Type: application/pdf" \
-H "User-Agent: curl/business-messaging" \
-H "`oauth2l header --json serviceAccount.json businesscommunications`" \
--data-binary "@$PDF_FILE"
