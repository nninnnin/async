const async = require("../lib");
const expect = require("chai").expect;
const assert = require("assert");

describe("memoize", function () {
  it("memoize", (done) => {
    const call_order = [];

    const fn = function (arg1, arg2, callback) {
      setTimeout(() => {
        call_order.push(["fn", arg1, arg2]);
        callback(null, arg1 + arg2);
      }, 0);
    };

    const fn2 = async.memoize(fn);

    fn2(1, 2, (err, result) => { //  1,2 로 호출되었던 fn2 는 실행결과를 메모한다
      assert(err === null, err + " passed instead of 'null'");
      expect(result).to.equal(3);

      fn2(1, 2, (err2, result2) => { // 1,2 로 호출되었던 결과를 불러올 것이다
        expect(result2).to.equal(3);

        fn2(2, 2, (err3, result3) => { // 2,2 로 호출된 결과가 없으므로 새로 실행
          expect(result3).to.equal(4);
          expect(call_order).to.eql([ // 1,2 는 한번만 호출되었음을 확인 가능
            ["fn", 1, 2],
            ["fn", 2, 2],
          ]);
          done();
        });
      });
    });
  });
});
