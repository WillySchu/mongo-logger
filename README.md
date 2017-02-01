# mongo-logger

> A node logging package to write logs to MongoDB

> [![Build Status](https://travis-ci.org/metricstory/mongo-logger.svg?branch=master)](https://travis-ci.org/metricstory/mongo-logger)

## Install
```
$ npm install mongo-logger
```
## Documentation

```js
var MongoLogger = require('mongo-logger');
```

The MongoLogger constructor can take a valid monk collection, for instance:

```js
monk = require('monk');
db = monk('http://url.here/');

var log = new MongoLogger(db, 'logs');
```

Or it can simply take a URI to connect to, for instance:

```js
var log = new MongoLogger('http://url.here/', 'logs');
```

Now you can log to mongo!

```js
log.debug('Some stuff here');

log.error('SOMETHING HAS GONE HORRIBLY WRONG!');
```
