/**
 * Returns a new object, where each value corresponds to an array of items, from coll, that returned the corresponding key.
 * 
 * 
 * 
 * That is, the keys of the object correspond to the values passed to the iteratee callback.
 * 
 * 
 *
 * Note: Since this function applies the iteratee to each item in parallel, 
 * there is no guarantee that the iteratee functions will complete in order. 
 * 
 * However, the values for each key in the result will be in the same order as the original coll.
 * 
 * For Objects, the values will roughly be in the order of the original Objects' keys (but this can vary across JavaScript engines.
 *
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {Function} iteratee - An async function to apply to each item in coll.
 * The iteratee should complete with a key to group the value under. Invoked with (value, callback).
 * 
 *
 * @param {Function} [callback] - A callback which is called when all iteratee functions have finished, or an error occurs.
 * Result is an Object whoses properties are arrays of values which returned the corresponding key.
 *
 * async.groupBy(['userId1', 'userId2', 'userId3'], function(userId, callback) {
 *     db.findById(userId, function(err, user) {
 *         if (err) return callback(err);
 *         return callback(null, user.age);
 * });
 * }, function(err, result) {
 *     // result is object containing the userIds grouped by age
 *     // e.g. { 30: ['userId1', 'userId3'], 42: ['userId2']};
 * });
 */

export default function groupBy(coll, iteratee, callback) {
  var result = {};
  var callCount = 0;
  var isDone = false;

  if (coll.length === 0) {
    isDone = true;
    callback(null, {});
    return;
  };

  for (var i = 0; i < coll.length ; i++) {
    iteratee(coll[i], (function (i) {
      var storedIndex = i;
      return function (err, results) {
        if (isDone) return;

        if (err) {
          isDone = true;
          callback(err);
          return;
        }
  
        if (result.hasOwnProperty(results)) {
          result[results].push(coll[storedIndex]);
        } else { 
          result[results] = [ coll[storedIndex] ];
        }

        callCount++;
        
        if (callCount === coll.length) {
          callback(err, result);
        }
      }
    })(i));
  }
}
