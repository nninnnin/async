/*
 *
 * Your job is to implement a promisify function as below.
 *
 * Promisify function converts a normal callback-based function into a promise-based function.
 *
 * function doSomethingAsync (n, callback) {
 *   setTimeout(function () {
 *     if (n > 10) return callback("error!");
 *     callback(null, n * 10);
 *   }, 1000);
 * }
 *
 * const fn = promisify(doSomethingAsync);
 *
 * fn(6)
 *   .then(result => console.log(result)) // 60
 *   .catch(err => console.log(err));
 *
 * fn(10)
 *   .then(result => console.log(result))
 *   .catch(err => console.log(err)); // "error!"
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function promisify() {}
