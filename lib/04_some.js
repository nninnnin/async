/**
 * Returns `true` if at least one element in the `coll` satisfies an async test.
 * If any iteratee call returns `true`, the main `callback` is immediately
 * called.
 * 
 * 하나라도 비동기 테스트를 통과한다면 true를 리턴해라
 * 어떤 원소냐에 관계없이 하나라도 비동기 테스트를 통과하는 즉시 최종콜백함수를 호출한다
 * 
 * 
 *
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in parallel.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 *
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 *
 * async.some(['file1','file2','file3'], function(filePath, callback) {
 *     setTimeout(filePath, function(err) {
 *         callback(null, !err)
 *     }, 2000);
 * }, function(err, result) {
 *     // if result is true then at least one of the files exists
 * });
 */

export default function some(coll, iteratee, callback) {
  var isDone = false;
  var callCount = 0;

  for (var i = 0; i<coll.length ; i++) {
    iteratee(coll[i], function (err, result) {
      if (isDone) return;

      callCount ++;

      if (err) {
        isDone = true;
        callback(err);
        return;
      }

      if (result === true) {
        isDone = true;
        callback(err, true);
        return;
      }

      if (callCount === coll.length) {
        callback(err, false);
      }
    })
  }
}
