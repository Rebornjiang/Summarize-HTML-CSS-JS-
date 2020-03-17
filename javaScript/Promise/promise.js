//promise 承诺 一定会调用
//promise 的诞生
// promise是为了解决异步操作形成的回调地狱的问题，实现同步形式的异步操作。


//一个基本的promise例子
// const p = new Promise( (resolve,reject) => {
//   setTimeout(function() {
//     // resolve('执行成功的回调函数')

//     reject('执行失败的回调函数')

//   },2000)
// })

// p.then(res => {
//   console.log(res)
// })
// .catch( res => {
//   console.log(res)
// })

// ==================使用promise 的例子==================================================
const fs = require('fs');
//  ========================= 以下是回调地狱出现的例子=========================
// fs.readFile('./data1.txt',(err,data) => {
//   console.log(data.toString())

//   fs.readFile('./data2.txt',(err,data) => {
//     console.log(data.toString())

//     fs.readFile('./data3.txt',(err,data) => {
//       console.log(data.toString())

//       fs.readFile('./data4.txt',(err,data) => {
//         console.log(data.toString())
//       })
//     })
//   })
// })

// =               = = === ============= 以下使用promise来解决
// 需求是按照要求打印 1，2，3，4

//1.先封装一个方法

function readFile(path) {
  return new Promise((resolve, reject) => {
    

    fs.readFile(path, (err, data) => {
      a()
      if (err) {
        reject(data);
        return;
      }

      resolve(data.toString())

    })

  })
}

//每一个后面的then都会获取到前一个 then 的返回值
// 如果是基本数据类型就会获取到 基本数据类型 传递给到 后一个then 的 res
// 如果前一个then 返回的是一个 promise对象的话 继续获取给对象成功的 回调函数
readFile('./data1.txt')
  .then(res => {
    console.log(res)
    // return readFile('./data2.txt')
  },res => {
    console.log(err)
  })
  

  // ===============promise 两张常用的方法与状态====================================

  //一 promise 一共有三种状态
  // 1.pedding promise执行的是回调函数是需要时间的，这段时间成为promise的pedding状态
  // 2.resolved 是执行成功的状态   
  // 3.rejected  是执行失败的状态
 
// 总结：resolved 和rejected 都是从pedding状态转换成的 。这种转换时不可逆的

// 二， promise的常用的方法
// 2.1 all方法  等全部promise操作都执行完毕在执行什么操作

// Promise.all([
//    数组中传入promise对象
//  
// ]).then (res => {

//  此时的 res 拿到的时 上面数组中的 promise 对象所执行的全部结果
// })


//2.2 race方法，只要有一个promise执行完毕  再执行某些操作（.then里面执行）

// Promise.race(
//   [
//     数组中传入promise对象
//   ]
// ).then( res => {
//   此时的res拿到最快执行的promise对象
// })