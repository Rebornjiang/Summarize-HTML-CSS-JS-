var a ={

  name : "Cherry",
  fn : function (a,b) {
      console.log( a + b)
      console.log(this.name)
  }
}

var b = a.fn;   //取到fn函数名字 --》函数名仅仅是指是包含指针的变量 ，现在将指针赋值给了b
// b 也就指向了 function (a,b) {console.log( a + b) console.log(this.name) } 这个函数
      
  
b.apply(a,[1,2])    



// fn.apply(第一个参数,第二个参数)
//  fn第一个参数是更改函数内部的this的指向，
// 第二个参数是一个数组，将数组的元素单独当作参数传递给fn这个函数的


// fn.call(第一个参数，第二个参数,第三个参数。。。。)
// fn第一个参数是更改函数fn内部this的指向的。
// 第二个参数--n个参数  是提供给到fn这个函数的参数的。


// apply与call的区别 
// apply第二个参数接受的是 给fn函数提供多个参数的数组。
// call 第二个参数--n个参数  接受的是给fn函数提共若干个参数的列表
