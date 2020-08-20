/**
 * Calls the asynchronous function fn with a callback parameter that allows it to call itself again, in series, indefinitely.
 * 
 * 무한정으로 그 자신을 호출해라 - 단 순서대로.
 * 
 * If an error is passed to the callback then errback is called with the error, and execution stops, otherwise it will never be
 * called.
 * 
 * 에러가 난다면 실행은 멈추고 errback함수를 호출하겠지만 아니라면 errback은 실행되지 않을 것.
 *
 * 
 * @param {Function} fn - an async function to call repeatedly. Invoked with (next).
 *
 * @param {Function} errback(optional) - when fn passes an error to it's callback, this function will be called, and execution
 * stops. Invoked with (err).
 *
 * 
 * async.forever(
 *     function(next) {
 *         // next is suitable for passing to things that need a callback(err [, whatever]);
 *         // it will result in this function being called again.
 *     },
 *     function(err) {
 *         // if next is called with a value in its first parameter, it will appear
 *         // in here as 'err', and execution will stop.
 *     }
 * );
 * 
 * 
 */


export default function forever(fn, errback) {
  var isDone = false;

  function cb(err, ...args){
    if (isDone) return;

    if (err) {
      isDone = true;
      return errback(err);
    }

    fn(cb);
  };

  fn(cb);

}
