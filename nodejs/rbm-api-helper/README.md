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

### Adding a dependency

Add the following to the dependencies section in your `package.json `:

```
"dependencies": {
  ...
  "@google/rcsbusinessmessaging": "^1.0.10"
  ...
},
```

We recommend you use the latest version available
in the [npm repository](https://www.npmjs.com/package/@google/rcsbusinessmessaging).

## Sample usage

Samples below assume a similar library initialization as shown in the [Using the client library](https://github.com/rcs-business-messaging/rbm-api-examples/tree/master/nodejs/rbm-api-helper#using-the-client-library) section.

### Initialisation
You initialise the library by providing your service account key and agentId.

```javascript
const SERVICE_ACCOUNT_PUBLIC_KEY = 'REPLACE_ME';

// Get the RCS Business Messaging client library helper
const rbmApiHelper = require('@google/rcsbusinessmessaging');

rbmApiHelper.initRbmApi(SERVICE_ACCOUNT_PUBLIC_KEY);
rbmApiHelper.setAgentId('myrbmagent'); // my agent id was myrbmagent@rbm.goog
```

Since release 1.0.8, you can optionally initialise the library to use a
specific regional endpoint. This may provide improved performance depending
on the geographic location of your code.

```javascript
rbmApiHelper.initRbmApi(privateKey);

// The RBM API can now be initialised to use a specific regional
// entry point.
// rbmApiHelper.initRbmApi(privateKey, rbmApiHelper.REGION_APAC);
// rbmApiHelper.initRbmApi(privateKey, rbmApiHelper.REGION_EU);
// rbmApiHelper.initRbmApi(privateKey, rbmApiHelper.REGION_US);
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

### Sending a message with a Time to Live
Sending an RBM message which will be cancelled if the time to live is reached
before it is delivered. Added in release 1.0.3.

```javascript
const params = {
  messageText: 'This message will expire!',
  msisdn: config.phoneNumber,
  // allow 10 seconds for message delivery
  timeToLive: '10s',
};

rbmApiHelper.sendMessage(params,
  function(response, err) {
    if (err !== undefined) {
      console.log(
        util.inspect(err, {showHidden: false, depth: null, colors: true}));
    }
    if (response !== undefined) {
      console.log(
        util.inspect(response, {showHidden: false, depth: null, colors: true}));
    }
  }
);
```

### Sending a message with an expiry time
Sending an RBM message which will be cancelled if the expiry time is reached
before it is delivered. Added in release 1.0.3.

```javascript
// Calculate UTC time in zulu format 20 seconds from now
const d = new Date();

d.setSeconds(d.getSeconds()+20);

const params = {
  messageText: 'This message will expire!',
  msisdn: config.phoneNumber,
  expireTime: d.toISOString()
};

rbmApiHelper.sendMessage(params,
  function(response, err) {
    if (err !== undefined) {
      console.log(
        util.inspect(err, {showHidden: false, depth: null, colors: true}));
    }
    if (response !== undefined) {
      console.log(
        util.inspect(response, {showHidden: false, depth: null, colors: true}));
    }
  }
);
```

### Uploading a file to the RBM Content Store
Support for file uploading added in release 1.0.6.

```javascript
const params = {
  fileUrl: 'https://storage.googleapis.com/kitchen-sink-sample-images/cute-dog.jpg',
  thumbnailUrl: 'https://storage.googleapis.com/kitchen-sink-sample-images/elephant.jpg',
  // contentDescription: string
};

rbmApiHelper.uploadFile(params,
  function(response, err) {
    if (err !== undefined) {
      console.log(
        util.inspect(err, {showHidden: false, depth: null, colors: true}));
    }
    if (response !== undefined) {
      console.log(
        util.inspect(response, {showHidden: false, depth: null, colors: true}));
    }
  }
);
```

### Sending a previously uploaded file
Support added in release 1.0.6.

```javascript
const params = {
  // Uploaded file id. If this uplod also contains a thumbnail, it will be used
  uploadedFileName: 'files/lpcg6f1tnYg1ryaQNho6hjka',
  // Uploaded thumbnail id. If this upload contains a thumbnail then it will be
  // used in preference to the one above.
  // uploadedThumbnailName: "files/lpchblt9boYTjT8ck6UGQ8uK",
  msisdn: config.phoneNumber,
};

rbmApiHelper.sendMessage(params,
  function(response, err) {
    if (err !== undefined) {
      console.log(
        util.inspect(err, {showHidden: false, depth: null, colors: true}));
    }
    if (response !== undefined) {
      console.log(
      util.inspect(response, {showHidden: false, depth: null, colors: true}));
    }
  }
);
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

## Known issues

On recent versions of node.js you may see this deprecation warning:

```
(node:23043) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

This is due to a dependency in the underlying `googleapis` library. This will be resolved
when the team responsible for this library ship an updated release.