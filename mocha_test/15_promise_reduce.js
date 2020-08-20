const assert = require("assert");

describe("promise reduce", function () {
  this.timeout(30000);

  function addTenAsync (n) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (n > 10) return reject("error");
        resolve(n + 10);
      }, n * 100);
    });
  }

  it("return type", function () {
    const result = Promise.reduce([1, 2, 3], () => new Promise(() => {}));

    assert(result instanceof Promise, "should return a promise");
  });

  it("base case 1", async function () {
    return Promise.reduce([1, 2, 3], function (acc, number) {
      return addTenAsync(number).then(result => {
        return acc + (result - 10);
      });
    }, 0).then(finalResult => {
      assert(finalResult === 6, "should reduce to the final result");
    });
  });

  it("base case 2 without initial value", async function () {
    return Promise.reduce([3, 0, 2, 5], function (acc, number) {
      return addTenAsync(number).then(result => {
        return acc + result;
      });
    }).then(finalResult => {
      assert(finalResult === 40, "should reduce to the final result");
    });
  });

  it("error", async function () {
    return Promise.reduce([1, 2, 20, 5, 0], function (acc, number) {
      return addTenAsync(number).then(result => {
        return acc + result;
      });
    }).then(() => {
      assert(false, "should not be called at all");
    }).catch(err => {
      assert(err === "error", "error should be passed");
    });
  });
});
