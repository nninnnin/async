/*
 *
 * Basically same as 06_reduce, but promise-based function.
 *
 * NOTE: Usually, extending native prototype object is not a good idea.
 * 
 * 보통은 네이티브 프로토타입을 상속해서 확장하는 방법은 추천하지 않는다..
 * 
 * 
 * 리듀스를 떠올려보면, 순서대로 함수를 실행해야 하고, 따라서 콜백이 끝났을 때 그 결과를 가지고 콜백 안에서 다음 콜백을 실행하는 것을 반복하다 원하는 조건에서 final callback을 실행하여 마무리하는 방식으로 풀었다.
 * 
 * 
 * 그렇다면 Promise reduce에서는 어떤 것이 달라지는가?
 *
 * 
 * // 비동기 함수를 실행하는 promise를 반환한다
 * function doAsync (n) {
 *   return new Promise(function (resolve, reject) {
 *     setTimeout(function () {
 *       if (n > 10) return reject("error");
 *       resolve(n + 10);
 *     }, n * 100);
 *   });
 * }
 *
 * // 
 * 
 * Promise.reduce([1, 2, 3], function (acc, number) {
 *   return doAsync(number).then(result => {
 *     return acc + (result - 10);
 *   });
 * }, 0).then(finalResult => {
 *   console.log(finalResult); // 6
 * });
 * 
 * 
 */

 
Promise.reduce = function (list, asyncIterator, initialValue) {
  return new Promise(function (resolve, reject) {
    var i = 0;

    function callIterator (acc) {
      var result = asyncIterator(acc, list[i]);

      i++;
      result.then((res) => {
        if (i === list.length) {
          resolve(res);
        } else {
          callIterator(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
    };

    if (!initialValue && initialValue !== 0) {
      initialValue = list[0];
      i++;
    }

    callIterator(initialValue);
  });
};
