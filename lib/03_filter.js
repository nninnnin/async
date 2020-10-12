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

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function filter(coll, iteratee, callback) {
  var result = [];
  var finalCallbackCalled = false;
  var callCount = 0;
  var elems = [];

  for (var i = 0; i < coll.length; i++){
    // 내가 하려는 것은
    // 각 시점의 i값을 저장하고,
    // 나중에 콜백에서 해당 시점의 i를 사용할 수 있게 하는 것
    
    // 함수 안에 값을 저장해두고, 콜백에 해당 함수를 전달하자!

    iteratee(coll[i], (function(){
      var fv = i;
      return function(err, results){ // 5초 이후 실행
        callCount++;
  
        // 에러가 난 경우 바로 에러를 전달하며 최종콜백을 실행한다.
        if(err !== null && finalCallbackCalled === false){
          finalCallbackCalled = true;
          callback(err); 
          return;
        }
        // filter를 통과한 경우 해당 원소를 result에 추가해준다
        if(results == true){
          result[fv] = coll[fv];
        }
        // 왜 이게 실행되지 않았을까?
        if (callCount === coll.length && finalCallbackCalled === false){
          finalCallbackCalled = true;
          callback(null, result);
          return;
        }
      }
    })(i));
  }
}
