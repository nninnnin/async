const async = require("../lib");
const expect = require("chai").expect;

describe("every", function () {
  it("true", function (done) {
    async.every(
      [1, 2, 3],
      function (x, callback) {
        setTimeout(function () {
          callback(null, true);
        }, 0);
      },
      function (err, result) {
        expect(err).to.equal(null);
        expect(result).to.equal(true);
        done();
      }
    );
  });

  it("false", function (done) {
    async.every(
      [1, 2, 3],
      function (x, callback) {
        setTimeout(function () {
          callback(null, x % 2); // '홀수라면 true, 짝수라면 false'
        }, 0);
      },
      function (err, result) {
        expect(err).to.equal(null);
        expect(result).to.equal(false);
        done();
      }
    );
  });

  it("early return - 중간에 false값을 받았다면, 최종 콜백이 실행되어야 한다. 그리고 최종 콜백은 다시 실행되어서는 안된다.", function (done) {
    const call_order = [];
    async.every(
      [1, 2, 3],
      function (x, callback) {
        setTimeout(function () {
          call_order.push(x);
          callback(null, x === 1);
        }, x * 5); // 5초, 10초, 15초 = 도합 25초
      },
      function () {
        call_order.push("callback");
      }
    );
    setTimeout(function () {
      expect(call_order).to.eql([1, 2, "callback", 3]);
      done();
    }, 25);
  });

  it("error", function (done) {
    async.every(
      [1, 2, 3],
      function (x, callback) {
        setTimeout(function () {
          callback("error"); // 바로 에러. result는 없다
        }, 0);
      },
      function (err, result) { // 최종콜백
        expect(err).to.equal("error");
        expect(result).to.not.exist; // use to detect `undefined` or `null`
        done(); // 왜 얘는 여러번 호출되는거야?
      }
    );
  });
});
