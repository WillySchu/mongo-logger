# mongo-logger

> A node logging package to write logs to MongoDB

> [![Build Status](https://travis-ci.org/metricstory/mongo-logger.svg?branch=master)](https://travis-ci.org/metricstory/mongo-logger)

## Install
```
$ npm install mongo-logger
```
## Documentation

### Quick Start

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

### Advanced

The MongoLogger object has a level property that can be changed to control which logs are saved to mongo. By default this is set to all. The MongoLogger class constructor can take a third parameter that changes the default logging level upon instantiation.

```js
var MongoLogger = require('mongo-logger');
var log = new MongoLogger('localhost', 'logs', 'info')
```

In this case these logs will be saved to mongo:

```js
log.info('Some stuff here');
log.warn('Something fishy here');
```

But this will not:

```js
log.debug('Some debug log');
```

The log level can be changed after instantiation by use of the setLevel method:

```js
log.setLevel('error');
```

Now these will be saved in mongo:

```js
log.error('SOMETHING IS WRONG!');
log.fatal('AAAAAAHHH!');
```

But these will not:

```js
log.warn('Uh oh');
log.info('Something informative');
```
