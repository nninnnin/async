/**
 * 
 * Repeatedly call iteratee, while test returns true. Calls callback when stopped, or an error occurs.
 *
 * 성공 할 때 까지, 혹은 에러가 날 때 까지 비동기 함수를 실행하라.
 * 
 * @param {Function} test - synchronous truth test to perform before each execution of iteratee.
 * Invoked with ().
 *
 * @param {Function} iteratee - An async function which is called each time test passes.
 * Invoked with (callback).
 *
 * @param {Function} callback(optional) - A callback which is called after the test function has failed and repeated execution of iteratee has stopped. callback will be passed an error and any arguments passed to the final iteratee's callback. Invoked with (err, [results]);
 * @returns undefined
 *
 * var count = 0;
 * async.whilst(
 *     function() { return count < 5; },
 *     function(callback) {
 *         count++;
 *         setTimeout(function() {
 *             callback(null, count);
 *         }, 1000);
 *     },
 *     function (err, n) {
 *         // 5 seconds have passed, n = 5
 *     }
 * );
 */


export default function whilst(test, iteratee, callback) {
  iteratee(cb);

  function cb (err, results) {
    if (err) {
      return callback(err);
    }
    
    if (test()) {
      iteratee(cb);
    } else {
      callback(err, results);
    }
  }
}
