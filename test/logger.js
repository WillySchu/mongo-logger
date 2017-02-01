'use strict';

const expect = require('chai').expect;
const monk = require('monk')('localhost');
const MongoLogger = require('../logger.js');

describe('MongoLogger', () => {
  describe('instantiation', () => {
    it('will throw errors if not supplied any arguments', () => {
      expect(() => {new MongoLogger()}).to.throw(TypeError);
    })

    it('will throw errors if supplied incorrect arguments', () => {
      expect(() => {new MongoLogger(false)}).to.throw(TypeError);
    })

    it('will set the correct values', () => {
      const ml = new MongoLogger(monk, 'logs', 50);
      expect(ml.db).to.deep.equal(monk.get('logs'));
      expect(ml.level).to.equal(50);

      const ml2 = new MongoLogger(monk, 's');
      expect(ml2.db).to.deep.equal(monk.get('s'));
      expect(ml2.level).to.deep.equal(Infinity);
    })
  })

  describe('setLevel method', () => {
    it('will throw an error if the wrong argument is passed', () => {
      const ml = new MongoLogger(monk, 's');
      expect(() => {ml.setLevel()}).to.throw(TypeError);
      expect(() => {ml.setLevel(monk)}).to.throw(TypeError);
      expect(() => {ml.setLevel(monk, false)}).to.throw(TypeError);
    })

    it('will change the level', () => {
      const ml = new MongoLogger(monk, 'logs');
      expect(ml.level).to.equal(Infinity);
      ml.setLevel(50);
      expect(ml.level).to.equal(50);
    })
  })

  describe('l method', () => {
    it('will correctly attempt to log a string input', (done) => {
      const db = {};
      db.insert = obj => {
        return new Promise((resolve, reject) => {
          const ret = JSON.parse(JSON.stringify(obj));
          expect(ret.db).to.equal(undefined);
          expect(ret.message).to.equal('hello');
          expect(ret.level).to.equal(50)
          done();
        }).catch(done)
      }
      const ml = new MongoLogger(db);
      ml.l('hello', 50);
    })

    it('will correctly attempt to log an object input', (done) => {
      const db ={};
      db.insert = obj => {
        return new Promise((resolve, reject) => {
          const ret = JSON.parse(JSON.stringify(obj));
          expect(ret.db).to.equal(undefined);
          expect(ret.message).to.equal(undefined);
          expect(ret.a).to.equal('a');
          expect(ret.b).to.equal(true);
          expect(ret.level).to.equal(40);
          done();
        }).catch(done)
      }
      const ml = new MongoLogger(db);
      ml.l({a: 'a', b: true}, 40);
    })
  })

  describe('debug method', () => {
    // @TODO
  })

  describe('info method', () => {
    // @TODO
  })

  describe('warn method', () => {
    // @TODO
  })

  describe('error method', () => {
    // @TODO
  })

  describe('fatal method', () => {
    // @TODO
  })
})
