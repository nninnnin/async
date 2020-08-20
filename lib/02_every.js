/**
 * Returns `true` if every element in `coll` satisfies an async test. If any
 * iteratee call returns `false`, the main `callback` is immediately called.
 *
 * 
 * 
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in parallel.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 *
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 *
 * 다른점은 true / false 라는 점?
 * 
 * async.every(['file1','file2','file3'], function(filePath, callback) {
 *.    // fs.acess는 비동기 함수라고 가정
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // if result is true then every file exists
 * });
 */


export default function every(coll, iteratee, callback) {
    var callCount = 0;
    var isDone = false;

    for (var i = 0; i < coll.length ; i++) {
      iteratee(coll[i], function (err, result) {
        if (isDone) return;

        if (err) {
          isDone = true;
          callback(err, result);
          return;
        }
        
        if (result == true) {
          callCount ++;
        } else {
          isDone = true;
          callback(err, false);
          return;
        }

        if (callCount === coll.length) {
          callback(err, true);
        }
      });
    }

    return;
}
