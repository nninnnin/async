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

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function memoize(fn, hasher) {
  // returns the memoized version of `fn`

  // 메모아이즈 한다는 말은..
  var memo = {};
  
  return function(...args){ // 얘가 fn2
    // 뒤에서 callback 함수 잘라내기
    var [cb] = args.splice(args.length - 1, 1)
    var key = hasher ? hasher(...args) : args[0];
    var result;
    
    // 메모가 존재할 때
    if (memo.hasOwnProperty(key)){ 
      result = memo[key];
      cb(null, result);
    // 존재하지 않을 때
    } else{ 
      fn.apply(this, [...args].concat(function(err, result){
        result = result; // fn의 실행결과로 받아온 result를 추후 반환할 변수 result 에 넣어준다

        // 실행 결과를 메모
        memo[key] = result;

        // 이후 fn2에 넘겨진 콜백 cb를 실행한다
        cb(err,result);
      }));
    }
  }
}
