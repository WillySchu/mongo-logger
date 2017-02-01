'use strict';

const monk = require('monk');

// default available logging levels
const OFF = 0
const FATAL = 10
const ERROR = 20
const WARN = 30
const INFO = 40
const DEBUG = 50
const ALL = Infinity

const levels = {
  off: 0,
  fatal: 10,
  error: 20,
  warn: 30,
  info: 40,
  debug: 50,
  all: Infinity
}

const MongoLog = require('./log.js');

class MongoLogger {
  /**
   * Creates a MongoLogger Object with a provided monk collection object
   * @param Monk Collection Object or Monk Object or String
   * @param optional String name of collection to connect to
   * @param optional Number logger level
   * @returns MongoLogger Object
   */
  constructor(db, collection, level) {
    // Check for monk object and collection string
    if (db instanceof monk) {
      if (typeof collection === 'string') {
        this.db = db.get(collection);
      } else {
        throw new TypeError(`Invalid argument ${collection}`);
      }
    // Check for monk collection (or any other object with an insert method)
    } else if (typeof db === 'object' && typeof db.insert === 'function') {
      this.db = db;
    // Check for database uri and collection string
    } else if (typeof db === 'string') {
      if (typeof collection === 'string') {
        this.db = monk(db).get(collection);
      } else {
        throw new TypeError(`Invalid argument ${collection}`)
      }
    } else {
      throw new TypeError(`Invalid argument: ${db}`)
    }

    if (typeof level === 'number') {
      this.level = level;
    } else {
      this.level = ALL;
    }

    this.levels = levels
  }

  /**
   * An internal method used by the other logging methods to create and
   * save a MongoLog Object to mongo if there is an error it will attempt
   * once to log the error itself
   * @param String or Object to be passed to MongoLog
   */
  l(val, level) {
    const ml = new MongoLog(this.db, val, level);
    ml.save().catch(e => {
      const el = new MongoLog(this.db, e, FATAL)
      el.save()
    })
  }

  /**
   * Use to modify the logger level of the MongoLogger Object
   * @param Number new logger level
   * @returns Number level
   */
  setLevel(level) {
    if (typeof level === 'number') {
      this.level = level;
    } else if (typeof level === 'string' && typeof this.levels[level] === 'number') {
      this.level = this.levels[level];
    } else {
      throw new TypeError(`Invalid argument: ${level}`);
    }
    return this.level;
  }

  /**
   * Logs to mongo if logger level is at or above debug
   * @param String or Object value(s) to be logged
   */
  debug(val) {
    if (this.level >= DEBUG) {
      this.l(val, DEBUG)
    }
  }

  /**
   * Logs to mongo if logger level is at or above info
   * @param String or Object value(s) to be logged
   */
  info(val) {
    if (this.level >= INFO) {
      this.l(val, INFO)
    }
  }

  /**
   * Logs to mongo if logger level is at or above warn
   * @param String or Object value(s) to be logged
   */
  warn(val) {
    if (this.level >= WARN) {
      this.l(val, WARN)
    }
  }

  /**
   * Logs to mongo if logger level is at or above error
   * @param String or Object value(s) to be logged
   */
  error(val) {
    if (this.level >= ERROR) {
      this.l(val, ERROR)
    }
  }

  /**
   * Logs to mongo if logger level is at or above fatal
   * @param String or Object value(s) to be logged
   */
  fatal(val) {
    if (this.level >= FATAL) {
      this.l(val, FATAL)
    }
  }
}

module.exports = MongoLogger;
