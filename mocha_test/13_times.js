const async = require("../lib");
const expect = require("chai").expect;
const assert = require("assert");

describe("times", function () {
  const createUser = function (id, callback) {
    callback(null, {
      id: "user" + id,
    });
  };

  it("basic", function (done) {
    async.times(
      5,
      function (n, next) {
        createUser(n, function (err, user) {
          next(err, user);
        });
      },
      function (err, users) {
        assert(err === null, err + " passed instead of 'null'");
        expect(users).to.eql([
          { id: "user0" },
          { id: "user1" },
          { id: "user2" },
          { id: "user3" },
          { id: "user4" },
        ]);
        done();
      }
    );
  });
});
