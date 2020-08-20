/**
 * Returns a new array of all the values in `coll` which pass an async truth
 * test. This operation is performed in parallel, but the results array will be
 * in the same order as the original.
 * 
 * 순서대로! filter테스트를 통과한 녀석들만 존재하는 새로운 array를 리턴해라.
 *
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 *
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 *
 * async.filter(['file1','file2','file3'], function(filePath, callback) {
 *.    // fs.access는 비동기 함수라고 가정
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, results) {
 *     // results now equals an array of the existing files
 * });
 */


export default function filter(coll, iteratee, callback) {
  var result = [];
  var isDone = false;
  var callCount = 0;

  for (var i = 0; i < coll.length; i++) {
    iteratee(coll[i], (function () {
      var storedIndex = i;
      return function (err, results) {
        if (isDone) return;

        callCount++;
  
        if (err) {
          isDone = true;
          callback(err);
          return;
        }

        if (results == true) {
          result[storedIndex] = coll[storedIndex];
        }
        
        if (callCount === coll.length) {
          result = result.filter((el) => {
            return el != undefined;
          });
          callback(null, result);
        }
      }
    })(i));
  }
}
