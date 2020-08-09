const async = require("../lib");
const expect = require("chai").expect;
const assert = require("assert");

describe.skip("map", function () {
  function mapIteratee(call_order, x, callback) {
    setTimeout(function () {
      call_order.push(x);
      callback(null, x * 2);
    }, x * 25);
  }

  it("basic", function (done) {
    const call_order = [];
    async.map([1, 3, 2], mapIteratee.bind(this, call_order), function (
      err,
      results
    ) {
      assert(err === null, err + " passed instead of 'null'");
      expect(call_order).to.eql([1, 2, 3]);
      expect(results).to.eql([2, 6, 4]);
      done();
    });
  });

  it("map original untouched - 원본 배열은 수정되어서는 안된다.", function (done) {
    const a = [1, 2, 3];
    async.map(
      a,
      function (x, callback) {
        callback(null, x * 2);
      },
      function (err, results) {
        expect(results).to.eql([2, 4, 6]);
        expect(a).to.eql([1, 2, 3]);
        done();
      }
    );
  });

  it("map error", function (done) {
    async.map(
      [1, 2, 3],
      function (x, callback) {
        callback("error");
      },
      function (err) {
        expect(err).to.equal("error");
      }
    );
    setTimeout(done, 50);
  });
});
