'use strict';

const expect = require('chai').expect;
const MongoLog = require('../log.js');

describe('MongoLog', () => {
  describe('instantiation', () => {
    it('will throw errors if not supplied any arguments', () => {
      expect(() => {new MongoLog()}).to.throw(TypeError);
    })

    it('will throw errors if supplied incorrect arguments', () => {
      expect(() => {new MongoLog('hello')}).to.throw(TypeError);
    })

    it('will have the correct values with string log', () => {
      const ml = new MongoLog({a: 'a'}, 'log', 40)
      expect(ml.db).to.deep.equal({a: 'a'});
      expect(ml.message).to.equal('log');
      expect(ml.level).to.equal(40);
    })

    it('will have the correct values with object log', () => {
      const ml = new MongoLog({a: 'b'}, {m: 'hello', l: 'goodbye'}, 25);
      expect(ml.db).to.deep.equal({a: 'b'});
      expect(ml.m).to.equal('hello');
      expect(ml.l).to.equal('goodbye');
      expect(ml.level).to.equal(25);
    })

    it('will throw an error if attempting to overwrite keys', () => {
      expect(() => {new MongoLog({}, {level: 'hello'})}).to.throw(TypeError);
      expect(() => {new MongoLog({}, {db: 'hello'})}).to.throw(TypeError);
    })
  })

  describe('saving', () => {
    it('will correctly call the db.insert function on save', (done) => {
      const db = {};
      db.insert = obj => {
        return new Promise((resolve, reject) => {
          const ret = JSON.parse(JSON.stringify(obj));
          expect(ret.db).to.equal(undefined);
          expect(ret.message).to.equal('hello');
          expect(ret.level).to.equal(30);
          done();
        })
      }
      const ml = new MongoLog(db, 'hello');
      ml.save().finally(done);
    })
  })

  describe('getObj method', () => {
    it('will return the correct object', () => {
      const ml = new MongoLog({}, 'hello');
      const obj = ml.getObj();
      expect(obj.level).to.equal(30);
      expect(obj.message).to.equal('hello');
      expect(obj.db).to.equal(undefined);
    })
  })
})
