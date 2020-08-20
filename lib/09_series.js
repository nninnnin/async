/**
 * 
 * 
 * Run the functions in the `tasks` collection in series, each one running once the previous function has completed. 
 * 
 * tasks 에 들어있는 함수들을 '순서대로' 실행해라. 이전 함수의 실행이 완료되었을 때, 다음 함수를 실행해야 한다.
 * 
 * If any functions in the series pass an error to its callback, no more functions are run, and `callback` is immediately called with the value of the error. 
 * 
 * 만일 그 중 하나가 에러를 리턴하면 바로 최종 콜백을 에러와 함께 실행한다.
 * 
 * Otherwise, `callback` receives an array of results when `tasks` have completed.
 *
 * 정상적으로 진행되었다면 결과물들을 담은 배열을 리턴한다.
 * 
 * 
 * @param {Array} tasks - A collection containing
 * [async functions]{@link AsyncFunction} to run in series.
 * Each function can complete with any number of optional `result` values.
 *
 * @param {Function} [callback] - An optional callback to run once all the functions have completed. 
 * This function gets a results array (or object) containing all the result arguments passed to the `task` callbacks. Invoked with (err, result).
 *
 * 
 * async.series([
 *     function(callback) {
 *         // do some stuff ...
 *         callback(null, 'one');
 *     },
 *     function(callback) {
 *         // do some more stuff ...
 *         callback(null, 'two');
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // results is now equal to ['one', 'two']
 * });
 *
 * 
 */


// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function series(tasks, callback) { 
  // 함수 간의 실행 순서를 보장해야 한다...
  // 리듀스 풀 때처럼 재귀로 풀어보자

  var result = [];
  var isDone = false;
  var callCount = 0;

  function callTask(i, callback){
    var task = tasks[i];
    task(function(err, ...args){ // task callback
      callCount++;

      // 에러가 났다면 바로 최종콜백 호출
      if (err !== null && isDone === false){
        isDone = true;
        callback(err);
        return;
      }

      if ( args.length > 1 ){
        result.push(args);
      }else{
        result.push(...args);
      }

      if (callCount === tasks.length && isDone === false){
        isDone = true;
        callback(err, result);
        return;
      }
      else{
        i++;
        callTask(i, callback);
      }
    });
  }

  if(tasks.length === 0 && isDone === false){
    isDone = true;
    return callback(null, []);
  }

  callTask(0, callback);
}
