var array = [1, 1, '1', '1'];

function unique(array) {
  // res用来存储结果
  var res = [];

  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {

    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {  // 判断array跟res比较是否是唯一的，等于代表不是唯一的，不等于代表是唯一的
        break;
      }
    }
    // 如果array[i]是唯一的，那么执行完循环，j等于resLen证明没有执行过break，没有执行过break也就意味着没有重复
    if (j === resLen) {
      res.push(array[i])
    }

    

  }

  return res;
}

console.log(unique(array)); // [1, "1"]