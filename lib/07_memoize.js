/**
 * Caches the results of an async function. 
 * 
 * When creating a hash to store function results against, 
 * the callback is omitted from the hash and an optional hash function can be used.
 * 
 * 
 * 
 * 
 * 비동기 함수의 실행결과를 캐싱해라.
 * 함수의 실행결과를 저장하려고 할 때, 콜백은 무시된다
 * 
 * 
 *  If no hash function is specified, the first argument is used as a hash key, which may work reasonably if it is a string or a data type that converts to a distinct string. 
 *  
 * 만약 해쉬펑션이 정의되어있지 않다면 첫번째 매개변수는 해쉬키로서 사용되고, 그 해쉬키는 특정한 string으로 변환할 수 있는 string 또는 data type으로 사용된다.(?)
 * 
 * 
 * Note that objects and arrays will not behave reasonably. 
 * Neither will cases where the other arguments are significant. 
 * In such cases, specify your own hash function.
 *
 * 
 * The cache of results is exposed as the memo property of the function returned by memoize.
 * 
 *
 *
 * @param {Function} fn - The async function to proxy and cache results from.
 *
 * @param {Function} hasher - An optional function for generating a custom hash for storing results. It has all the arguments applied to it
 * apart from the callback, and must be synchronous.
 * 
 * 결과를 저장하기 위한 해시를 생성하는 함수 (옵셔널)
 * 콜백을 제외한 모든 매개변수를 갖는다
 *
 * @returns a memoized version of fn
 *
 * var slow_fn = function(name, callback) {
 *     // do something
 *     callback(null, result);
 * };
 * var fn = async.memoize(slow_fn);
 *
 * // fn can now be used as if it were slow_fn
 * fn('some name', function() {
 *     // callback
 * });
 */

export default function memoize(fn, hasher) {
  var memo = {};
  
  return function (...args) {
    var cb = args.pop();
    var key = hasher ? hasher(...args) : args.join('-');

    if (memo.hasOwnProperty(key)) {
      cb(null, memo[key]);
    } else { 
      fn.apply(
        this,
        [...args].concat(
          function (err, results) {
            memo[key] = results;
            cb(err, results);
          }
        )
      );
    }

  }
}
