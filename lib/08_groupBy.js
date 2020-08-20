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

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function groupBy(coll, iteratee, callback) {
  var result = {};
  var count = 0;
  var isDone = false;

  // 가지치기 - coll이 빈 배열일 때, 빈 객체를 반환한다.
  if(coll.length === 0 && isDone === false){
    isDone = true;
    callback(null,{});
    return;
  };

  for (var i = 0; i < coll.length ; i++){
    iteratee(coll[i], (function(i){
      // free variable
      var storedIndex = i;

      // return closure
      return function(err, results){ // user.age 가 전달된다
        count++;

        // 에러가 발생했을 때
        if(err !== null && isDone === false){
          isDone = true;
          callback(err);
          return;
        }
  
        // 이미 같은 age를 가진 user가 result에 존재할 때
        if (result.hasOwnProperty(results)){
          result[results].push(coll[storedIndex]); // 여기에 저장된 i값 가져오는 클로저 사용해야.
        }
        // 존재하지 않을 때
        else{ 
          result[results] = [ coll[storedIndex] ]; // 여기도 마찬가지
        }
        
  
        // 모든 원소에 대해 콜백이 실행되었을 때 최종콜백 호출
        if (count === coll.length && isDone === false){
          console.log(result);
          isDone = true;
          callback(err, result);
          return;
        }
      }
    })(i));
  }
}
