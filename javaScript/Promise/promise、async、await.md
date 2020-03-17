# 浅析promise、async、await

## promise 

### promise的诞生原因

- 因为js是单线程，一次性只能够处理一个任务。如果遇到读取文件，请求网络资源等情况，会容易就造成代码堵塞。这也就导致了js必须是异步执行，来解决代码堵塞的问题。
- 什么是异步操作那？简单说就是一个任务分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。执行的第二个阶段--回调函数callback
- 回调函数一多，就导致代码 "横向发展" 形成的 "回调地狱" 的情形
- promise的诞生原因就是为了解决代码的"横向发展"形成的"回调地狱"的情形。
- promise不是新的语法功能，而是一种新的写法，实现同步形式的异步操作。

### promise的立即执行
```
  let p1 = new Promise(function(resolve,reject) {
    console.log('Promise的立即执行性,这里的代码会立即进行执行') // 第一阶段
    resolve('success') // 第二阶段
  })
```
在创建（new）Promise时，作为Promise参数传入的函数是会被立即执行的，只是其中执行的代码可以是异步代码

### promise的三种状态

1. pending  Promise刚创建完成时，处于pending状态；
2. resolved 当Promise中的函数参数执行了resolve后，Promise由pending状态变成resolved状态；
3. rejected Promise中的函数执行的是reject的话，此时的状态就是rejected状态

*** 第一阶段的代码都是 pending状态  第二阶段的代码才是 resolved或是rejected***

### promise状态的不可逆性
一旦又pending状态更改为 resolved或是 rejected 将不会再在更改状态

```
var p1 = new Promise(function(resolve, reject){
  resolve("success1");
  resolve("success2");
});

p1.then(function(value){
  console.log(value);
});

// success1 
```
### promise 的链式调用

每一个后面的then都会获取到前一个 then 的返回值
如果是基本数据类型就会获取到 基本数据类型 传递给到 后一个then 的 res
如果前一个then 返回的是一个 promise对象的话 继续获取到promise对象成功的 回调函数 

*基本的数据类型*
```
let p1 = new Promise( function(resolve,reject) {
  resolve(1')
} )

p1.then( res => {
  console.log( res )
  return res * 2
}).then ( res => {
  console.log(res) // 2
})
```

*返回的是一个promise对象的话*
```
readFile('./data1.txt')
  .then(res => {
    console.log(res)  //这里是data1中的内容
    return readFile('./data2.txt') 
  })
  .then( res => {
    console.log(res) //这里是data2中的内容
    return readFile('./data3.txt')
  })
  .then( res => {
    console.log(res)  //这里是data3中的内容
    return readFile('./data4.txt')
  })
  .then( res => {
    console.log(res)  //这里是data4中的内容
  })

```

### Promise then() 回调异步性

```

var p = new Promise(function(resolve, reject){
  resolve("success");
});

p.then(function(value){
  console.log(value);
});

console.log("which one is called first ?");



```

### 6.promise中的异常

```
var p1 = new Promise( function(resolve,reject){
  foo.bar();
  resolve( 1 );	  
});

p1.then(
  function(value){
    console.log('p1 then value: ' + value);
  },
  function(err){
    console.log('p1 then err: ' + err); 
    // 此时err会执行，接受的是报错信息ReferenceError: foo is not defined 
  }
).then(function(value) {
  console.log( value ) // undefined
},function(err) {
  console.log(err)
})

```
如果promise中的第一阶段的代码报错的话，此后catch获取的值就为 报错信息。后续的then()将会继续执行


## async & await 

同步形式的异步编程的终极解决方案
1. async 是修饰符，用来修饰函数的,async 表示函数里有异步操作。  例如  async function fn() {}
2. await 等待Promise对象执行完成将其执行的 ，await 表示紧跟在后面的表达式需要等待结果。
此关键字只能够用在async修饰的函数中 await 后面跟一个Promise对象
通过try catch(err) {} 能够处理失败的回调函数

```
function fn() {
  return new Promise( (resolve,reject) => {

    fs.readFile('./data1.txt', (err,data) => {
      reject(data.toString())
    })

  })
}
//此函数内部又异步操作
async function test() {
  var res = await fn()
  //下面是fn执行完之后在处理的代码 ，也就是第二阶段
}

```
