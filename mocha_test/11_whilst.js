const async = require("../lib");
const expect = require("chai").expect;
let count = 0;

describe("whilst", function () {
  this.timeout(10000); // 비동기 시행을 최대로 기다리는 시간

  it("basics", function (done) {
    async.whilst(
      function () {
        return count < 5;
      },
      function (callback) {
        count++;
        setTimeout(function () {
          callback(null, count);
        }, 10);
      },
      function (err, n) {
        expect(err === null, err + " passed instead of 'null'");
        expect(n).to.eql(5);
        done();
      }
    );
  });

  it("error", function (done) {
    async.whilst(
      function () {
        return true;
      },
      function (callback) {
        count++;
        setTimeout(function () {
          if (count > 3) callback("error");
        }, 0);
      },
      function (err) {
        expect(err).to.equal("error");
        done();
      }
    );
  });
});
