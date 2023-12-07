# [Google's RCS Business Messaging: Node.js Client](https://github.com/rcs-business-messaging/rbm-api-examples/tree/master/nodejs/rbm-api-helper)

[RCS Business Messaging](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/how-it-works) upgrades SMS with branding, rich media, interactivity, and analytics. With RCS, businesses can bring branded, interactive mobile experiences, right to the native Android messaging app.

This document contains an [API reference](https://developers.google.com/business-communications/rcs-business-messaging/reference/rest), samples, and other resources useful to developing Node.js applications.
For additional help developing RCS Business Messaging applications, in Node.js and other languages, see our
[RCS Business Messages quickstart](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/first-agent) guide.

## Documentation

The documentation for the RCS Business Messaging API can be found [here](https://developers.google.com/business-communications/rcs-business-messaging/reference/rest).

## Quickstart

### Before you begin

1.  [Register with RCS Business Messaging](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/register-partner).

### Using the client library

```javascript
const SERVICE_ACCOUNT_PUBLIC_KEY = 'REPLACE_ME';

// Get the RCS Business Messaging client library helper
const rbmApiHelper = require('@google/rcsbusinessmessaging');

rbmApiHelper.initRbmApi(SERVICE_ACCOUNT_PUBLIC_KEY);

/**
 * Posts a message of "Hello, World!" to the RCS Business Messaging API.
 *
 * @param {string} phoneNumber An RCS-enabled device.
 */
async function sendMessage(phoneNumber) {
  rbmApiHelper.sendMessage({
    messageText: 'Hello, World!',
    msisdn: phoneNumber
  });
}

sendMessage('valid-rcs-enabled-phone-number');
```

## Partner-based RBM model

This helper library now supports the partner-based RBM model where there
is one Service Account for all agents that a developer creates. In this
model, the agent id must be sent with each API call. If your developer
account is set up for this model then you should add an additional call
when initialising the library:

```javascript
const SERVICE_ACCOUNT_PUBLIC_KEY = 'REPLACE_ME';

// Get the RCS Business Messaging client library helper
const rbmApiHelper = require('@google/rcsbusinessmessaging');

rbmApiHelper.initRbmApi(SERVICE_ACCOUNT_PUBLIC_KEY);
rbmApiHelper.setAgentId('myrbmagent'); // my agent id was myrbmagent@rbm.goog
```

## Sample usage

Samples below assume a similar library initialization as shown in the [Using the client library](https://github.com/rcs-business-messaging/rbm-api-examples/tree/master/nodejs/rbm-api-helper#using-the-client-library) section.

### Sending a text message

```javascript
// Create the payload for sending a message of "Hello, World!"
rbmApiHelper.sendMessage({
  messageText: 'Hello, World!',
  msisdn: phoneNumber
});
```

### Sending a text message with suggested replies and actions

```javascript
// Create the payload for sending a message of "Hello, World!" along with
// a suggested reply and two suggested actions
rbmApiHelper.sendMessage({
  messageText: 'Hello, World!',
  msisdn: phoneNumber,
  suggestions: [
      {
        reply: {
          text: 'Sample Chip',
          postbackData: 'sample_chip',
        },
      },
      {
        action: {
          text: 'URL Action',
          postbackData: 'url_action',
          openUrlAction: {
            url: 'https://www.google.com',
          },
        },
      },
      {
        action: {
          text: 'Dial Action',
          postbackData: 'dial_action',
          dialAction: {
            phoneNumber: '+12223334444',
          },
        },
      },
    ]
  }
);
```

### Sending a rich card

```javascript
// Create the payload for sending a rich card
rbmApiHelper.sendRichCard({
  messageText: 'Hello, world!',
  messageDescription: 'RBM is awesome!',
  msisdn: phoneNumber,
  suggestions: [
    {
      reply: {
         'text': 'Suggestion #1',
         'postbackData': 'suggestion_1',
      },
    },
    {
      reply: {
         'text': 'Suggestion #2',
         'postbackData': 'suggestion_2',
      },
    },
  ],
  imageUrl: 'http://www.google.com/logos/doodles/2015/googles-new-logo-5078286822539264.3-hp2x.gif',
  height: 'TALL',
});
```

### Sending a carousel

```javascript
// Create the payload for sending a carousel
rbmApiHelper.sendCarouselCard({
  msisdn: phoneNumber,
  cardContents: [
    {
      title: 'Card #1',
      description: 'The description for card #1',
      suggestions: [
         {
            reply: {
               text: 'Card #1',
               postbackData: 'card_1',
            }
         }
      ],
      media: {
         height: 'MEDIUM',
         contentInfo: {
            fileUrl: 'https://storage.googleapis.com/kitchen-sink-sample-images/cute-dog.jpg',
            forceRefresh: false,
         },
      },
    },
    {
      title: 'Card #2',
      description: 'The description for card #2',
      suggestions: [
         {
            reply: {
               text: 'Card #2',
               postbackData: 'card_2',
            }
         }
      ],
      media: {
         height: 'MEDIUM',
         contentInfo: {
            fileUrl: 'https://storage.googleapis.com/kitchen-sink-sample-images/elephant.jpg',
            forceRefresh: false,
         },
      },
    },
});
```

## Versioning

This library follows [Semantic Versioning](http://semver.org/).

This library is considered to be **General Availability (GA)**. This means it
is stable; the code surface will not change in backwards-incompatible ways
unless absolutely necessary (e.g. because of critical security issues) or with
an extensive deprecation period. Issues and requests against **GA** libraries
are addressed with the highest priority.

## Contributing

Contributions welcome! See the [Contributing Guide](https://github.com/rcs-business-messaging/rbm-api-examples/blob/master/CONTRIBUTING.md).

## License

Apache Version 2.0

See [LICENSE](https://github.com/rcs-business-messaging/rbm-api-examples/blob/master/LICENSE)