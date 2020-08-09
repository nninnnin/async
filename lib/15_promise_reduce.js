/*
 *
 * Basically same as 06_reduce, but promise-based function.
 *
 * NOTE: Usually, extending native prototype object is not a good idea.
 *
 * function doAsync (n) {
 *   return new Promise(function (resolve, reject) {
 *     setTimeout(function () {
 *       if (n > 10) return reject("error");
 *       resolve(n + 10);
 *     }, n * 100);
 *   });
 * }
 *
 * Promise.reduce([1, 2, 3], function (acc, number) {
 *   return doAsync(number).then(result => {
 *     return acc + (result - 10);
 *   });
 * }, 0).then(finalResult => {
 *   console.log(finalResult); // 6
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
Promise.reduce = function (list, asyncIterator, initialValue) {};
