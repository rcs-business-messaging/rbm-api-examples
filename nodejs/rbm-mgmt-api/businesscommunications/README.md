# Google Business Communications API

The files in this folder are generated from the Google Business Communications discovery URL.

You can regenerate the files in a new folder as follows:

```
git clone https://github.com/googleapis/google-api-nodejs-client
cd google-api-nodejs-client/
npm install
npm run build-tools
node build/src/generator/generator.js 'https://businesscommunications.googleapis.com/$discovery/rest?version=v1&key={key}&labels=RBM_PARTNERS' \
    --include-private false --use-cache false
cd src/apis/businesscommunications/
npm install
```

Output will be in the build folder.