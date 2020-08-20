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


export default function series(tasks, callback) { 
  var result = [];
  var callCount = 0;

  if (tasks.length === 0) {
    return callback(null, []);
  }

  callTask(0, callback);

  function callTask (taskIndex, callback) {
    var task = tasks[taskIndex];
    task(taskCallback);

    function taskCallback (err, ...args) {
      if (err) {
        callback(err);
        return;
      }

      callCount++;

      if (args.length > 1) {
        result.push(args);
      } else {
        result.push(...args);
      }

      if (callCount === tasks.length) {
        callback(err, result);
      } else {
        taskIndex++;
        callTask(taskIndex, callback);
      }
      
    }
  }
}
