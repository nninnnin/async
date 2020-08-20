const async = require("../lib");
const expect = require("chai").expect;

function filterIteratee(x, callback) {
  setTimeout(function () {
    callback(null, x % 2); // 짝수라면 false, 홀수라면 true
  }, x * 5);
}

describe("filter", function () {
  it("filter", function (done) {
    async.filter([3, 1, 2], filterIteratee, function (err, results) {
      expect(err).to.equal(null);
      expect(results).to.eql([3, 1]);
      done();
    });
  });

  it("filter - custom test to check the order of elems", function (done) {
    async.filter([3, 2, 1], filterIteratee, function (err, results) {
      expect(err).to.equal(null);
      expect(results).to.eql([3, 1]);
      done();
    });
  });

  it("filter original untouched - 원본 배열은 수정되지 않아야 한다.", function (done) {
    const a = [3, 1, 2];
    async.filter(
      a,
      function (x, callback) {
        callback(null, x % 2);
      },
      function (err, results) {
        expect(err).to.equal(null);
        expect(results).to.eql([3, 1]);
        expect(a).to.eql([3, 1, 2]);
        done();
      }
    );
  });

  it("filter error", function (done) {
    async.filter(
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
