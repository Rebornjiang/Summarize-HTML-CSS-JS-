#javaScript作用域相关的知识

</br>
</br>
## js词法作用域(静态作用域)与动态作用域
</br>
### 什么叫做作用域
作用域是指程序源代码中定义变量的区域。规定了如何查找变量。

### 词法作用域与动态作用域的区别
词法作用域：函数的作用域在函数定义的时候就决定了。
动态作用域：函数的作用域是在函数调用的时候才决定的。

```
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

// 结果是 ??? res = 1
```
解析：因为js采用的是词法作用域，所以函数的作用域在函数创建的时候就已经确认了。
     当函数创建的时候，foo就会将  包含函数的作用域复制添加到  foo函数的[[scope]]属性中，
     等函数调用的时候，会创建执行上下文，并且复制foo函数的scope属性创建其自己的作用域。
     并将自己的活动对象推到作用域的前端。

</br>     
## js执行上下文(execution context) 又称为  执行环境

Q:在js中代码的执行是一段段的执行的，段又是怎么划分的？
A:是按照函数来进行划分的
</br>
Q:那js遇见一段代码的时候是怎么执行的？
A: js在遇见一段代码的时候会创建 执行上下文 来进行准备工作
</br>

Q:js中常常会有很多函数，也就会创建很多执行上下文，那又是如何进行管理的？
A: JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文

###执行上下文栈

当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 globalContext 表示它，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以 ECStack 最底部永远有个 globalContext：
```
  ECStack = [
      globalContext
  ];

```

下面代码是如何执行的？
```
function fun3() {
  console.log('fun3')
}

function fun2() {
  fun3();
}

function fun1() {
  fun2();
}

fun1();

```

分析如下：
1. js执行的时候最先遇到就是全局的执行上下文，于是将全局上下文 ECStack.push(globalContext)
``` ECStack = [globalContext] ```
2. 之后遇见了fun1() ，然后创建fun1的执行上下文并将其添加如栈 ECStack.push(fun1Context)
```
ECstack = [
  fun1Context,
  globalConetxt
]
```
3. 然后又遇见了fun2函数，然后创建fun2函数的执行上下文，并将其添加入栈 
ECStack.push(fun2Context)
```
ECstack = [
  fun2Context,
  fun1Context,
  globalConetxt
]
```
4. 然后又遇见了fun3函数，然后创建fun3函数的执行上下文，并将其添加入栈 
ECStack.push(fun3Context)
```
ECstack = [
  fun3Context,
  fun2Context,
  fun1Context,
  globalConetxt
]

```
5. 然后当fun3执行完毕之后，将fun3弹出栈 ECStack.pop()
6. 然后当fun2执行完毕之后，将fun2弹出栈 ECStack.pop()
7. 然后当fun1执行完毕之后，将fun1弹出栈 ECStack.pop()

## 变量对象

每个执行上下文都有一个与之关联的变量对象，这个变量对象存储着这个执行上下文（执行环境）中的所有
变量和函数。我们无法访问，但是解析器在处理数据的时候会访问他。

在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。
活动对象和变量对象其实是一个东西，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。

活动对象是在进入函数上下文时刻被创建的，活动对象一开始只包含了arguments属性（全局执行上下文没有这个属性）


###函数执行的过程
1. 首先开始创建执行上下文
2. 执行上下文的代码分为两个阶段进行处理： 先分析 和 后执行

- 第一阶段 分析时 会将执行上下文的所有变量和函数，并形参 进行初始化 。
```

例子：
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}
foo(1);



//伪代码如下
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}


```
- 第二阶段
```
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}


```



