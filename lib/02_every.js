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

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.

export default function every(coll, iteratee, callback) {
    var succeedCount = 0;
    var endCallback = false;

    for(var i = 0; i < coll.length ; i++){
      iteratee(coll[i], function(err, result){ // null, true
        // 1. 에러가 발생한 경우
        if (err !== null){
          var result = (result === false) ? false : result;
          endCallback = true;
          callback(err, result); // 최종콜백을 바로 호출
          return;
        // 2. 에러 없이 결과가 전달된 경우
        }else{
          // 이것도 두가지로 나누어진다
          if(result == true){ // 2-1. 결과가 원하는 것(true)인 경우
            succeedCount ++; // 1
          }
          else{               // 2-2. 결과가 원하는 것이 아닌 경우(false)
            // 바로 최종 콜백을 실행한다
            if(endCallback === false){
                callback(err, false); // 2가 들어왔을 때 이걸 실행한다
            }
            endCallback = true;
            return; 
          }
          // 2-1 이 실행되었다면 최종콜백 실행 여부를 확인해주어야 한다.
          if(succeedCount === coll.length){
            callback(err, true);
          }
        }
      })
    }
}
