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

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function some(coll, iteratee, callback) {
  // 먼저 생각하고 코드를 작성하자
  var finalCallbackCalled = false;
  var count = 0;

  for(var i = 0; i<coll.length ; i++){
    iteratee(coll[i], function(err, result){
      count ++; // 카운트 위치에 유의! 해당 카운트가 콜백함수가 호출되었을 때가 아니라 반복문을 돌면서 비동기 시행을 할 때 (지금 위치의 바깥) 에 존재하게 되면 우리가 원하는 대로 '마지막 콜백 시행' 에 예상한 count 값을 받아낼 수 없다. 

      // 에러가 발생했다면 그냥 바로 에러를 리턴한다
      if(finalCallbackCalled === false && err !== null){
        finalCallbackCalled = true;
        callback(err);
        return;
      }

      // 하나라도 성공했다면 그냥 바로 최종콜백을 실행한다
      if(finalCallbackCalled === false && result === true){
        finalCallbackCalled = true;
        callback(err,true);
        return;
      }

      // 에러도, 성공도 아니고 모든 원소에 대해 테스트하였으나 하나도 성공하지 못한 경우
      if(finalCallbackCalled === false && count === coll.length){
        finalCallbackCalled = true;
        callback(err,false);
        return;
      }
    })
  }
}
