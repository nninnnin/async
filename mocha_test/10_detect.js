const async = require("../lib");
const expect = require("chai").expect;

function detectIteratee(x, callback) {
  setTimeout(function () {
    callback(null, x % 2); // 홀수가 true
  }, (10 - x) * 10); // x 값이 클수록 빨리 콜백이 실행된다!
}

describe("detect", function () {
  it("detect - truth 테스트를 통과한 첫번째 값만 즉시 반환한다.", function (done) {
    async.detect([1, 2, 5], detectIteratee, function (err, results) {
      expect(err).to.equal(null);
      expect(results).to.eql(5);
      done();
    });
  });

  it("detect undefined - 찾는 값이 없으면 끝까지 iterate하고 undefined를 반환한다.", function (done) {
    async.detect([2, 4, 6], detectIteratee, function (err, results) {
      expect(err).to.equal(null);
      expect(results).to.eql(undefined);
      done();
    });
  });

  it("detect error", function (done) {
    async.detect(
      [3, 1, 2],
      function (x, callback) {
        callback("error");
      },
      function (err, results) {
        expect(err).to.equal("error");
        expect(results).to.not.exist;
        done();
      }
    );
  });
});
