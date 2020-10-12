/*

  < Parameters >
  // 배열
  @collection {Array}
    - A collection to iterate over
  
  // 각각에 실행할 비동기 시행을 담은 함수
  @iteratee {AsyncFunction}
    - An async function to apply to each item in collection. Invoked with (item, callback).
      The array index is NOT passed to the iteratee.

  // 모든 비동기시행이 끝났을 때 호출될 함수
  @callback {function<optional>}
    - A callback which is called when all iteratee functions have finished, or an error occurs.
      Invoked with (error).

  < Example >

  const files = [ "file1", "file2", "file3", "file4", "file5" ];

  async.each(
    files, 
    function(file, callback) {
      if( file.length > 32 ) {
        callback('파일명이 너무 길어서 안됩니다!'); // 에러 처리
      } else {
        // 파일 처리 - 비동기. 일단 그냥 3초 미루고 실행하는..
        setTimeout(function () {
          console.log('파일 처리 성공적으로 완료!');
          callback();
        }, 3000);
      }
    }, 
    function(err) { // 모든 비동기 처리가 완료되었을 때 호출될 함수
      // if any of the file processing produced an error, err would equal that error
      if( err ) {
        // One of the iterations produced an error.
        // All processing will now stop.
        // 하나라도 에러가 나면 올 스탑이다.
        console.log('A file failed to process');
      } else {
        // 모두 성공적으로 비동기처리가 이루어졌을 경우..
        console.log('All files have been processed successfully');
      }
    });

 */
<<<<<<< HEAD
export default function each(list, iteratee, finalCallback) {
=======
export default function each(list, iteratee, callback) {
  var succeedCount = 0;
  // 먼저 list에 각각 callback을 적용시켜야
  for(var i = 0; i < list.length; i++){
    iteratee(list[i], function(err){
      if (err != undefined){
        callback(err);
        return;
      }
      // iteratee가 성공했을 때
      succeedCount ++;
      // 모든 비동기 시행이 완료되었을 때
      if (succeedCount === list.length){
        callback(null);
      }
    });
  }

>>>>>>> b56f8e3... first commit
  
}
