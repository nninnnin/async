/*
 *
 * Your job is to implement a promisify function as below.
 * 
 * `promisify` 를 구현해라
 *
 * Promisify function converts a normal callback-based function into a promise-based function.
 * 
 * Promisify 함수는 평범한 콜백 기반 함수를 프로미스 기반 함수로 변환시키는 역할을 한다.
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
 * 
 * 
 */


export default function promisify(func) {
  return function (...args) {
    return new Promise(function (resolve, reject) {
      func(...args.concat(cb));

      function cb (err, results) {
        if (err) return reject(err);
        resolve(results);
      }
    });
  }
}
