parse-spec
========

Testing framework for Parse.com API migration

# Build

```js
$ npm run build
```

# Configuration

Write below information into `config/api.json`

```
{
  "app_name": <Your Application Name>,
  "endpoint": <Endpoint to be tested>,
  "parse_endpoint": "https://api.parse.com/1/",
  "app_id": <Your Application ID>,
  "restapi_key": <Your Application REST API Key>,
  "master_key": <Your Application Master Key>,
  "classes": [
    // Classe records stored in your Parse.com application
  ]
}
```

# Usage

First trace Parse.com API and migrated API.

```
$ npm run trace
```

Next verify API by comparing trace files.

```
$ npm run verify
```



