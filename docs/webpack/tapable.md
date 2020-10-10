# Tapable

* `webpack` 本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是 [Tapable](https://www.npmjs.com/package/tapable)。

* `webpack` 中最核心的负责编译的 `Compiler` 和负责创建 `bundle` 的 `Compilation` 都是 `Tapable` 的实例，继承 `Tapable` 。

* `Tap` 的中文是水龙的意思。正像水龙头流出的水一样，像一条从上往下的流水线。 在这个过程中可以订阅 `Tapable` 的钩子函数，来完成不同的任务。

**`Tapable` 是一个用于事件发布订阅执行的插件架构。 `webpack` 的钩子的机制如下：**

1.  **创建** - `webpack` 在其内部对象上创建各种钩子。

2.  **注册** -  插件将自己的方法注册到对应的钩子函数上，交给 `webpack` 。

3.  **调用** - `webpack` 在编译过程中，会适当的触发响应的钩子函数， 因此也就触发了插件的方法。

  ## 安装

``` sh
npm install --save tapable
 ```

  ## 使用

`Tapable` 库暴露了很多 `Hook` （钩子）类，为插件提供挂载的钩子。每个钩子可以注册多个观察者，然后这些观察者的执行循序依赖钩子的类型。

  

``` js
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require("tapable");
```

## 钩子分类

<!-- (https://my-wechat.mdnice.com/wechat.jpg) -->

#### 按类型分类分为四种：BasicHook、Bail、Waterfall、Loop。

| 类型       | 说明 |   
| :--------- | :-- |
| Basic   |  不关心函数的返回值，每个函数将会被依次调用。 |  
| Bail   |  熔断式：不关心函数的返回值，只要函数的返回值不为 `undefiend` , 侧跳过之后的监听函数。 |  
| Waterfall |  瀑布式： 上一个函的返回值交给下一个函数使用。 | 
| Loop |  循环式：如果该函数的返回值为 `true` , 该函数继续执行。 否则退出循环。  | 

#### 按同步和异步分类分为两种：同步 `Sync` 和 异步 `Async` 。

## 同步钩子

### SyncHook

* 同步钩子，不关心函数的返回值，每个函数将会被依次调用。

* 所有的构造函数都接收一个可选参数，参数是一个参数名字符串数组。

* 参数的名字可以任意填写， 但是参数的长度必须要跟实际接收的参数个数保持一致。

* 在实例化时，传入数组的个数有用，值没有。

* 回调函数不接收参数可以传递空数组。

* 在执行 `call` 时，参数的个数和实例化时个数保持一致。

* 回调执行的顺序跟注册的顺序有关， 先注册，先执行。

```js{15-17}
const { SyncHook } = require('tapable')
const syncHook = new SyncHook(['name', "age"])
syncHook.tap("A", (name, age) => {
    console.log("A", name, age)
})
syncHook.tap("B", (name, age) => {
    console.log("B", name, age)
})
syncHook.tap("C", (name, age) => {
    console.log("C", name, age)
})
syncHook.call("xiaoming", '18')
// 输出结果
// A xiaoming 18 
// B xiaoming 18
// C xiaoming 18
``` 

### SyncBailHook

* 同步钩子

* `SyncBailHook` 的注册的函数也是按按照注册顺序执行。

*  函数的返回值非 `undefiend` ,将会停止后续函数的调用。

```js{9}
const { SyncBailHook } = require('tapable')
const syncHook = new SyncBailHook(['name', "age"])
syncHook.tap("A", (name, age) => {
    console.log("A", name, age)
})
syncHook.tap("B", (name, age) => {
    console.log("B", name, age)
    return true  // 返回值不为undefiend, 将跳过执行
})
syncHook.tap("C", (name, age) => {
    console.log("C", name, age)
})
syncHook.call("xiaoming", '18')
// 输出结果
// A xiaoming 18
// B xiaoming 18
```

### SyncWaterfallHook

* 同步钩子

* `SyncWaterfallHook` 表示如果上一个函调函数不为 `undefiend` , 则可以作为下一个回调的函数的第一个参数。

* 回调函数接受的参数来自上一个函数的结果。

* 调用 `call` 传入的第一个参数，会被上一个函数的非 `undefiend` 结果替换。

* 当调用函数返回非 `undefiend` , 不会停止调用栈的调用。

```js{17-19}
const { SyncWaterfallHook } = require('tapable')
const syncHook = new SyncWaterfallHook(['name', "age"])
syncHook.tap("A", (name, age) => {
    console.log("A", name, age)
    return name + "A"
})
syncHook.tap("B", (name, age) => {
    console.log("B", name, age)
    return name + "B"
})

syncHook.tap("C", (name, age) => {
    console.log("C", name, age)
})

syncHook.call("xiaoming", '18')
// 输出结果
// A xiaoming 18
// B xiaomingA 18
// C xiaomingAB 18
``` 

### SyncLoopHook

* 同步钩子。

* SyncLoopHook,同步遇到某个不返回 `undefined` 的监听函数，就重复执行。

```js{14-22}
const { SyncLoopHook } = require('tapable')
const syncHook = new SyncLoopHook()
let conter = 0
syncHook.tap("A", () => {
    console.log(conter, "A")
    return conter++ < 2 ? true : undefined
})
syncHook.tap("B", () => {
    console.log(conter, "B")
    return conter++ < 6 ? true : undefined
})
syncHook.call()
// 输入结果
// 0 'A'
// 1 'A'
// 2 'A'
// 3 'B'
// 4 'A'
// 5 'B'
// 6 'A'
// 7 'B'
```

## 异步钩子

**注册调用异步钩子有两种方式：**

* 回调函数方式

    - `tapAsync` 注册， 每个回调函数最后一个参数为执行完成的回调函数 `done` 。

    - `callAsync` 调用。

* promise 方式

    - `tapPromise` 注册， 需要每个回调函数返回一个 `Promise` 对象。

    - `promise` 调用。

### AsyncParallelHook

* 异步并行钩子。

* 多个回调函数式并行执行。

**回调方式**

```js{26-32}
const { AsyncParallelHook } = require('tapable')
const syncHook = new AsyncParallelHook(['name'])
syncHook.tapAsync("A", (name, done) => {
    setTimeout(() => {
        console.log('A', name)
        done()
    }, 2000)
})

syncHook.tapAsync("B", (name, done) => {
    setTimeout(() => {
        console.log('B', name)
        done()
    }, 3000)
})

syncHook.tapAsync("C", (name, done) => {
    setTimeout(() => {
        console.log('C', name)
        done()
    }, 1000)
})

syncHook.callAsync("xiaoming", (err)=>{
    console.log(err,"err")
})
// 输出结果
// C xiaoming
// undefined 'err'
// A xiaoming
// undefined 'err'
// B xiaoming
// undefined 'err'
``` 

**promise方式**

```js{37-41}
const { AsyncParallelHook } = require('tapable')
const syncHook = new AsyncParallelHook(['name'])
syncHook.tapPromise("A", (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('A', name)
            resolve()
        }, 2000)
    })
})
syncHook.tapPromise("B", (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('B', name)
            resolve()
        }, 3000)
    })
})
syncHook.tapPromise("C", (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('C', name)
            resolve()
        }, 1000)
    })
})

syncHook.promise("xiaoming").then((value)=>{
    console.log(value)
},(err)=>{
    console.log(err)
})
// 输出结果
// C xiaoming
// A xiaoming
// B xiaoming
// undefined
```

### AsyncParallelBailHook

* 异步并行钩子。

* 返回值不为 `undefiend` , 侧跳过之后的监听函数。

### AsyncSeriesHook

* 异步串行钩子。

* 先订阅先执行。

### AsyncSeriesBailHook

* 异步串行钩子。

* 返回值不为 `undefiend` , 侧跳过之后的监听函数。

### AsyncSeriesWaterfallHook

* 异步串行钩子。

* 上一个函的返回值交给下一个函数使用。

## Interception

`Tapable` 提供了拦截器功能。

* `call` 拦截器

    - `(...args) => void` 。

    -  在每次执行 `call` 之前调用一次，多个钩子也只执行一次。您可以访问 `hook` 传入的参数。

    

* `tap` 拦截器

    - `(tap: Tap) => void` 。

    -  在 `tap` 的之前调用一次，传递的参数此次注册的 `tap` 信息。 `Tap` 对象无法更改。

* `loop` 拦截器 

    - `(...args) => void` 。

    -  将为循环钩子的每个循环触发。

* `register` 拦截器。

    - `(tap: Tap) => Tap | undefined` 。

    - 拦截每一次 `tap` 增加的钩子函数。并且允许修改 `tap` 对象。

``` js
const {
    SyncHook
} = require('tapable')
const syncHook = new SyncHook(['name', "age"])
syncHook.tap("A", (name, age) => {
    console.log("A", name, age)
})
syncHook.tap("B", (name, age) => {
    console.log("B", name, age)
})
syncHook.intercept({
    call() { // call 拦截器
      console.log(arguments, "call")
    },
    tap() { // tap 拦截
        console.log(arguments, "tap")
    },
    register(registerInfo) { // register拦截器
        console.log(arguments, "register")
        return registerInfo
    }
})
syncHook.call("xiaoming", '18')
```

**输出结果**

``` sh
PS D:\study\my-webpack\tabpable> node .\interception.js
[Arguments] { '0': { type: 'sync', fn: [Function], name: 'A' } } 'register'
[Arguments] { '0': { type: 'sync', fn: [Function], name: 'B' } } 'register'
[Arguments] { '0': 'xiaoming', '1': '18' } 'call'
[Arguments] { '0': { type: 'sync', fn: [Function], name: 'A' } } 'tap'
A xiaoming 18
[Arguments] { '0': { type: 'sync', fn: [Function], name: 'B' } } 'tap'
B xiaoming 18
```

## Context

`Tapable` 为 `Hook` 和 `interception` 提供了上下文的功能。上下文的作用主要是将任意值传递给后续的 `Hook` 和 `interception` 。

**tap 添加 context**

``` js
// 非 context start
const syncHook = new SyncHook(['name', "age"])
syncHook.tap("A", (name, age) => {
    console.log("A", name, age)
})
syncHook.call("xiaoming", '18')
// 非 context end

// context start
const syncHook = new SyncHook(['name', "age"])
syncHook.tap({
    context: true,
    name: 'context'
}, (context, name, age) => {
    if (context) {
        console.log(context, "context")
    } else {
        console.log("A", name, age)
    }
})
syncHook.call("xiaoming", '18')
// context end
```
**interception 添加 context**

``` js
const syncHook = new SyncHook(['name', "age"])
myCar.hooks.accelerate.intercept({
    // 设置context
    context: true,
    // 此时tap的拦截器第一个参数是context对象。
    tap: (context, tapInfo) => {
        if (context) {
            // 可以给context设置一些属性，传递给下一个拦截器。
            context.hasMuffler = true;
        }
    }
});
syncHook.call("xiaoming", '18')
```
