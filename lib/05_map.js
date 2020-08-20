/**
 * Produces a new collection of values by mapping each value in `coll` through
 * the `iteratee` function. The `iteratee` is called with an item from `coll`
 * and a callback for when it has finished processing. Each of these callback
 * takes 2 arguments: an `error`, and the transformed item from `coll`. If
 * `iteratee` passes an error to its callback, the main `callback` (for the
 * `map` function) is immediately called with the error.
 * 
 * 중간에 에러가 나오면 바로 최종콜백을 실행.
 *
 * Note, that since this function applies the `iteratee` to each item in
 * parallel, there is no guarantee that the `iteratee` functions will complete
 * in order. However, the results array will be in the same order as the
 * original `coll`.
 *
 * // 비동기 시행결과의 순서를 보장할 수 없으므로, 시행 순서대로 순서를 맞춘 결과를 리턴하라. (원본 coll과 같게)
 * 
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 *
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an Array of the
 * transformed items from the `coll`. Invoked with (err, results).
 *
 * // fs.stat은 비동기 함수라고 가정
 * async.map(['file1','file2','file3'], fs.stat, function(err, results) {
 *     // results is now an array of stats for each file
 * });
 */

export default function map(coll, iteratee, callback) {
  var isDone = false;
  var callCount = 0;
  var mappedCollection = [];

  for (var i = 0; i < coll.length ; i++) {
    iteratee(coll[i], (function () {
      var storedIndex = i;

      return function (err, results) {
        if (isDone) return;

        if (err) {
          isDone = true;
          callback(err);
          return;
        }

        mappedCollection[storedIndex] = results;
        callCount++;

        if (callCount === coll.length) {
          callback(err, mappedCollection);
        }
      }
    })(i));
  }

}
