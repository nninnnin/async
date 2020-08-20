/**
 * Calls the iteratee function n times, and accumulates results in the same manner you would use with map.
 * 
 * iteratee를 n번 호출하고, 해당 호출의 결과들을 니가 map에서 했던 방식과 같은 방식으로 적층?(저장) 해라. ( 기존 collection과 동일한 순서로 넣어준다 )
 *
 * 
 * @param {Number} n - The number of times to run the function.
 *
 * @param {Function} iteratee - The async function to call n times. Invoked with the iteration index and a callback: (n, next).
 *
 * @param {Function} callback - A callback which is called when all iteratee functions have finished, or an error occurs.
 * Results is an Array of the transformed items from the coll. Invoked with (err, results).
 *
 * 
 * 
 * // Pretend this is some complicated async factory
 * var createUser = function(id, callback) {
 *     callback(null, {
 *         id: 'user' + id
 *     });
 * };
 *
 * // generate 5 users
 * async.times(5, function(n, next) {
 *     createUser(n, function(err, user) {
 *         next(err, user);
 *     });
 * }, function(err, users) {
 *     // we should now have 5 users
 * });
 * 
 * 
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function times(n, iteratee, callback) {
  var result = [];
  var isDone = false;
  var callCount = 0;
  
  var cb = function(err, results){
      callCount++;

      // 에러가 날 경우
      if(err !== null && isDone === false){
        isDone = true;
        callback(err);
        return;
      }

      result.push(results);

      // 모든 시행을 마친 경우
      if (callCount === n && isDone === false){
        isDone = true;
        callback(err, result);
        return;
      }
      else{// 아니라면 재귀시행
        iteratee(callCount, cb);
      }
    };

  iteratee(callCount, cb);
}
