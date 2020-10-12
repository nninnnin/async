const async = require("../lib");
const expect = require("chai").expect;
const assert = require("assert");

describe("each", function () { // test suite를 작성.
  // 원소 각각에 적용시킬 함수
  function eachIteratee(args, x, callback) {
    setTimeout(function () {
      args.push(x);
      callback();
    }, x * 25);
  }
  // it로 test 작성
  it("each", function (done) {
    const args = [];
    // 두번째 인자처럼 bind하면 첫번째 args는 고정된 채 두, 세번째 매개변수만 채워주면 실행되는 함수로 바뀐다. (즉 해당 함수에 할당되는 것은 이제 x, callback 인 것이다)
    async.each([1, 3, 2], eachIteratee.bind(this, args), function (err) {
      assert(err === null, err + " passed instead of 'null'");
      expect(args).to.eql([1, 2, 3]);
      done(); // 모든 비동기 시행이 완료되었음을 테스트 (it)에 알린다.
    });
  });

  it("each empty array - iteratee는 실행되지 않고, 바로 최종 콜백이 실행되어야 한다.", function (done) {
    async.each(
      [],
      function (x, callback) {
        assert(false, "iteratee should not be called");
        callback();
      },
      function (err) {
        if (err) throw err;
        assert(true, "should call callback");
      }
    );
    setTimeout(done, 25);
  });

  it("each error - 에러가 발생할 경우 최종 콜백에 에러 정보를 넘겨주고 실행시킨 후 모든 프로세스를 종료해야 한다.", function (done) {
    async.each(
      [1, 2, 3],
      function (x, callback) {
        // NOTE: Anything other than `undefined` is considered as an error.
        callback("error");
      },
      function (err) {
        expect(err).to.equal("error");
      }
    );
    setTimeout(done, 50);
  });
});
