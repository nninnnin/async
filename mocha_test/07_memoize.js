const async = require("../lib");
const expect = require("chai").expect;
const assert = require("assert");

describe.skip("memoize", function () {
  it("memoize", (done) => {
    const call_order = [];

    const fn = function (arg1, arg2, callback) {
      setTimeout(() => {
        call_order.push(["fn", arg1, arg2]);
        callback(null, arg1 + arg2);
      }, 0);
    };

    const fn2 = async.memoize(fn);

    fn2(1, 2, (err, result) => {
      assert(err === null, err + " passed instead of 'null'");
      expect(result).to.equal(3);

      fn2(1, 2, (err2, result2) => {
        expect(result2).to.equal(3);

        fn2(2, 2, (err3, result3) => {
          expect(result3).to.equal(4);
          expect(call_order).to.eql([
            ["fn", 1, 2],
            ["fn", 2, 2],
          ]);
          done();
        });
      });
    });
  });
});
