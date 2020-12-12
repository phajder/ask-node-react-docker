const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const app = require('../src/app');

chai.use(require('chai-http'));

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Root unit tests', () => {
    describe('#GET /api', () => {
        it('should get Hello world!', done => {
            chai.request(app).get('/api').end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('Object');
                expect(res.body.text).to.equal('Hello world!');
                done(); 
            });
        })
    });
});