// 同步形式的异步编程的终极解决方案
//              !!!!此用法是基于Promise的
// 1.两个关键字
// async 是修饰符，用来修饰函数的。  例如  async function fn() {}
// await 等待Promise对象执行完成将其执行的
//  此关键字只能够用在async修饰的函数中 await 后面跟一个Promise对象
// 通过try catch(err) {} 能够处理失败的回调函数


const fs = require('fs')

function fn() {
  return new Promise( (resolve,reject) => {

    fs.readFile('./data1.txt', (err,data) => {
      reject(data.toString())
    })

  })
}

async function test() {
  
  const result = await fn();
  // await在这里的含义时 等这个promise对象执行完成之后，在执行成功的resolve的内容 
  // 从await 代码往下都是 resolve的内容  获取resolve参数时通过接受 await 关键字 + promise对象 
  // 的返回值的。
  console.log(result)
}

test()