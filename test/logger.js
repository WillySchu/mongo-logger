const expect = require('chai').expect;
const MongoLogger = require('../logger.js');

describe('MongoLogger', () => {
  describe('instantiation', () => {
    it('will throw errors if not supplied any arguments', () => {
      expect(() => {new MongoLogger()}).to.throw(TypeError);
    })

    it('will throw errors if supplied incorrect arguments', () => {
      expect(() => {new MongoLogger('yoyo')}).to.throw(TypeError);
    })

    it('will set the correct values', () => {
      ml = new MongoLogger({a: 'a'}, 50);
      expect(ml.db).to.deep.equal({a: 'a'});
      expect(ml.level).to.equal(50);

      ml2 = new MongoLogger({a: 's'});
      expect(ml2.db).to.deep.equal({a: 's'});
      expect(ml2.level).to.deep.equal(30);
    })
  })
})
