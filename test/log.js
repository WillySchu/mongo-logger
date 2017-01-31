expect = require('chai').expect;
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
      ml = new MongoLog({a: 'a'}, 'log', 40)
      expect(ml.db).to.deep.equal({a: 'a'});
      expect(ml.message).to.equal('log');
      expect(ml.level).to.equal(40);
    })

    it('will have the correct values with object log', () => {
      ml = new MongoLog({a: 'b'}, {m: 'hello', l: 'goodbye'}, 25);
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
})
