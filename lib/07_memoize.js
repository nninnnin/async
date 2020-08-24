/**
 * Caches the results of an async function.
 *
 * The cache of results is exposed as the memo property of the function returned by memoize.
 *
 * @param {Function} fn - The async function to proxy and cache results from.
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
export default function memoize() {}
