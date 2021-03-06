/**
 * Returns the first value in coll that passes an async truth test.
 * 
 * truth test를 통과하는 가장 첫번째 값을 리턴하라.
 * 
 * The iteratee is applied in parallel, meaning the first iteratee to return true will fire the detect callback with that result.
 * 
 * 순서와 상관 없이, 가장 먼저 true를 반환하는 값이 결과가 된다.
 * 
 * That means the result might not be the first item in the original coll (in terms of order) that passes the test.
 * 
 * 위와 같은 이야기
 * 
 * If order within the original coll is important, then look at detectSeries.
 * 
 * detectSeries 라는 것도 있다고 한다.
 *
 * 
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in coll.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 *
 * @param {Function} [callback] - A callback which is called as soon as any iteratee returns true, or after all the iteratee functions have finished.
 * Result will be the first item in the array that passes the truth test (iteratee) or the value undefined if none passed. Invoked with (err, result).
 *
 * 
 * 
 * async.detect(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // result now equals the first file in the list that exists
 * });
 * 
 * 
 */


export default function detect(coll, iteratee, callback) {
  var isDone = false;
  var callCount = 0;

  for (var i = 0 ; i < coll.length ; i++) {
    iteratee(coll[i], (function (i) {
      var storedIndex = i;
      return function (err, results) {
        if (isDone) return;
        
        if (err) {
          isDone = true;
          callback(err);
          return;
        }

        callCount++;
  
        if (results == true) {
          isDone = true;
          callback(err, coll[storedIndex]);
          return;
        }
  
        if (callCount === coll.length) {
          callback(err, undefined);
        }
      }
    })(i));
  }
}
