/**
 * Calls the iteratee function n times, and accumulates results in the same manner you would use with map.
 * 
 * iteratee를 n번 호출하고, 해당 호출의 결과들을 니가 map에서 했던 방식과 같은 방식으로 적층?(저장) 해라. ( 기존 collection과 동일한 순서로 넣어준다 )
 *
 * 
 * @param {Number} n - The number of times to run the function.
 *
 * @param {Function} iteratee - The async function to call n times. Invoked with the iteration index and a callback: (n, next).
 *
 * @param {Function} callback - A callback which is called when all iteratee functions have finished, or an error occurs.
 * Results is an Array of the transformed items from the coll. Invoked with (err, results).
 *
 * 
 * 
 * // Pretend this is some complicated async factory
 * var createUser = function(id, callback) {
 *     callback(null, {
 *         id: 'user' + id
 *     });
 * };
 *
 * // generate 5 users
 * async.times(5, function(n, next) {
 *     createUser(n, function(err, user) {
 *         next(err, user);
 *     });
 * }, function(err, users) {
 *     // we should now have 5 users
 * });
 * 
 * 
 */


export default function times(n, iteratee, callback) {
  var result = [];
  var callCount = 0;

  iteratee(callCount, cb);
  
  function cb (err, results) {
    if (err) {
      callback(err);
      return;
    }

    callCount++;

    result.push(results);

    if (callCount === n) {
      callback(err, result);
    } else {
      iteratee(callCount, cb);
    }
  }
}
