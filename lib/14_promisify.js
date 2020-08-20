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

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function promisify(func) {
  // promisify는 함수를 리턴한다
  // 해당 함수에 func에 걸맞는 인자를 담아 실행하면 promise를 리턴하고,
  // 해당 promise에는 우리 원래 실행하려고 하던 func를 실행하도록 한다

  return function(...args){ // 얘가 fn
    return new Promise(function(resolve, reject){
      var cb = function(err, results){
        if (err !== null){
          return reject(err);
        }
        else{
          return resolve(results);
        }
      }

      func.apply(this, [...args].concat(cb));
    });
  }
}
