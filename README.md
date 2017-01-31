# mongo-logger

> A node logging package to write logs to MongoDB

[![Build Status](https://travis-ci.org/metricstory/mongo-logger.svg?branch=master)](https://travis-ci.org/metricstory/mongo-logger)

## Install
```
$ npm install mongo-logger
```
## Documentation

```js
var MongoLogger = require('mongo-logger');
```

The MongoLogger constructor takes a valid monk collection, for instance:

```js
monk = require('monk');
db = monk('http://url.here/');
db.get('logs');
```

Then you can instantiate a new MongoLogger instance:

```js
var log = new MongoLogger(db);

log.error('SOMETHING HAS GONE HORRIBLY WRONG!')
```
