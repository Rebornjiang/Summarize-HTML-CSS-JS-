## ES6语法

### 变量声明的方式
1. let 声明变量
  - 不能够重复进行变量声明
  - 声明的变量会形成一个作用域（之前的if语句的{}这个不算是一个作用域，如果用let声明的变量就形成了一个作用域）
2. const 声明变量
  - 一经声明不能够更改
  - 不能够重复进行变量声明
  - 也会形成一个作用域
  - 通过const声明的变量不能够不进行任何赋值

### 对象的简写&对象的解构赋值
1. 对象属性与值的简写
  - 如果对象的key 与这个key对应的value是一样的话可以简写为一个key（value必须是个变量）
  ``` 
  let name = 'reborn';
  let obj = {
    name:name // es5中写法
    name // es6中的写法
  }
  ```
2. 对象的解构赋值 
  - 如果想要声明的变量名与对象中的变量名相同的话，可以采取解构赋值的形式来进行声明变量。
  ``` 
    let obj = {
      name:'reborn',
      age:18
    }
    //es5中声明的方式
    let name = obj.name
    let age = obj.age

    //es6中声明的方式
    let {name,age} = obj //此操作相当于上面那种操作
    

  ```

### 数组的解构赋值
 - 如果想将数组中的值赋值给变量也可以采取数组的解构赋值(数组的解构赋值是要按照顺序)
 ``` 
  let arr = [1,2,3,4]
  let [num1,num2,num3,num4] = arr
  // 这样会得到 num1 = 1 ; num2 = 2; num3 = 3; num4 = 4;

 ```
### 箭头函数
 - 匿名函数可以简写为箭头函数 () => {}
 ```
  //原来的写法
  let fn = function() {
    console.log(1111)
  }

  // es6中的写法
  let fn = () => {
    
  }
 ```
 - 箭头函数再次简写的情况
   - 1.如果形参只有一个的话，可以将小括号进行省略
   - 2.如果函数执行体只有一句话的话，可以将花括号进行省略
   - 3.如果函数执行体只有一句话并且前面还是有return的话，可以将return与花括号一同省略

 - 箭头函数执行体中的this指向 会沿着作用域链进行向上查找this 的  指向，直到找着为止。 


### 使用变量作为对象中属性
 - 在以前，对象中的属性不能够是 变量 现在可以将变量作为对象的属性只需要加一个[已经声明的变量名]

### 对象的继承新方法(扩展运算符。。。的应用)
 - 在一个b对象中使用 ...a对象 ，b对象就拥有了a对象所有的属性和方法

###  扩展运算符的应用
 - 1.在对象中使用
 - 2.在传参的时候使用
 ``` 
  let arr = [1,2,3,4]
  function sum(a,b,c,d) {
    return a + b + c + d
  }

  let res = sum(...arr) // res为10 
 ```
 扩展运算符将数组解析拆开为 1，2，3，4传递给sum函数


### class关键字
 - class可以说是对构造函数的创建实例的另一种写法，相比于构造函数的写法，这种写法的优点为两点
  - 解构更加清晰与一体，不需要单独在为Person的原型添加方法

 ```
  // es5中创建一类事物的写法，需要将属性与方法分开添加
  function Person (name,age) {
    this.name = name
    this.age = age

  }
  Person.prototype = saiHi() {
    console.log(你好，this.name)
  }

  // es6中的class写法
  class Person {
    constructor() {
      this.name = name
      this.age = age
    }
    class关键字会将里里面的saiHi方法自动添加到Person的原型上去
    saiHi() {
      console.log(你好，this.name)
    }

    //除此之外 还可以在class内部直接为Person添加静态成员，只需要static关键字
    static saiHello () {
      console.log(Person构造函数的属性和方法)
    }

  }



 ```
- class的继承
 - class继承非常的简单 只需要借助 extends 与super（）
 ```
  class Person {

    constructor() {
      this.name = 'reborn'
      this.age = 19
    }

    saiHi() {
      console.log('你好')
    }
  }

  //现在有一个student的类想要继承person的属性与方法
  class Student extends Person {
    constructor() {
      super()
      this.tall = 1.8
    }

  }


 ```

### 模板字符串
 - 允许在字符串中使用变量了
``` 
  let name = 'reborn'

  let str = "我是${name}"  // 我是reborn
  
```