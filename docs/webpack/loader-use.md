---
 sidebarDepth: 2
---

# loader 用法

## 使用

### 单个 loader 用法

* 当一个 `loader` 在资源中使用，这个 `loader` 只能传入一个参数，这个参数是包含资源文件的字符串。

* 同步 `loader` 可以简单的返回一个代表模块转化后的值。

* 在更复杂的情况下， `loader` 可以通过[this.callback(err, code, sourceMap, ...)](https://www.webpackjs.com/api/loaders/#this-callback)函数，返回任意的数量的值。错误信息要么传递给这个 `this.callback` 函数，要是扔进同步 `loader` 中。

### 多个 loader 用法

* 当多个 `loader` 链式调用时，请记住他们会已相反的顺序执行，取决于数组的写法格式，从右到左或者下到上。

* 最后的 `loader` 最早调用，将会传入原始资源内容。

* 中间 `loader` 的执行，会传入前一个 `loader` 的返回结果。

* 第一个 `loader` 最后调用，期望值是传出 `JavaScript` 和 `SourceMap(可选)`

## 准则

### 简单

`loader` 应该只做单一的任务，这不仅使每个 `laoder` 易维护，也可以在更多场景链式调用。

### 链式(chaining)

利用 `laoder` 可以链式调用的优势，将不同loader组合起来，实现不同的任务，而不是一个 `laoder` 实现实现多个任务。

### 模块化(Modular)

保证输出模块化， `laoder` 生成的模块与普通模块遵循相同的设计原则。

### 无状态(stateless)

确保输出模块化， `laoder` 生成的模块与普通模块遵循相同的设计原则。

### loader工具库

[loader-utils](https://www.npmjs.com/package/loader-utils), 它提供了许多有用的工具，但最常用的一种工具是获取传递给 `laoder` 的参数。

[scheme-utils](https://www.npmjs.com/package/schema-utils)与 `oader-utils` 配合使用，用于保证 `laoder` 选项与 `JSON Scheme` 结构一致的校验。

### loader 依赖

 `Loader Dependencies`
如果一个 `laoder` 使用外部资源（例如：从文件系统读取），必须声明它，这些信息是缓存 `laoder` 失效，以及在观察模式下(watch mode)下重新编译。

### 模块依赖

 `Module Dependencies`
根据模块类型，可能会有不同的模块指定依赖关系，例如在 CSS 中，使用 `@import` 和 `@url` 语句来声明这些依赖。这些依赖关系应该由模块系统解析。

### 绝对路径

不要在模块代码中插入绝对路径，因为当项目根路径发生变化时，文件的绝对路径也会发生变化。 `loader-utils` 中的 `stringifyRequest` 方法，可以把绝对路径转为相对路径。

### 同等依赖

如果你的 `laoder` 简单包裹另外一个包，你应该把这个包作为 `peerDependencies` 引入。这种方式允许应用开发者在必要的情况下，在 `package.json` 指定所需要的确定的版本。

## API 部分

下面列举了一些常用[Loader API](https://www.webpackjs.com/api/loaders/)

### 缓存结果

[this.cacheable](https://www.webpackjs.com/api/loaders/#this-cacheable), `webpack` 充分利用缓存来提高编译效率。

``` js
this.cacheable(true);
```

### 异步

[this.async](https://www.webpackjs.com/api/loaders/#this-async)

``` sh
module.exprots = {
    let callback = this.async()
    doSomeAsyncOperation(content,(err, result)=> {
        callback(null,result)
    })
}
```

### raw loader

默认的情况源文件是以 `UTF-8` 字符串的形式传入给 `laoder` , 设置 `module.exports.raw = true` , 可以使 `buffer` 的形式处理。

``` js
module.exports.raw = true;
```

### 获取 Loader 的 options

``` sh
const laoderUtils = require('loader-utils')

module.exports = (source) => {
    const options = laoderUtils.getOptions(this)
    return source
}
```

###  返回其他结果

[this.callback](https://www.webpackjs.com/api/loaders/#this-callback) `laoder` 有些场景下还需要返回除了内容之外的东西。

``` sh
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
```

1. 第一个参数必须是 Error 或者 null
2. 第二个参数是一个 string 或者 Buffer。
3. 可选的：第三个参数必须是一个可以被这个模块解析的 source map。
4. 可选的：第四个选项，会被 webpack 忽略，可以是任何东西（例如一些元数据）。例如 `AST`

``` js
module.exports = (source) => {
    let callback = this.async()
    this.callback(null, source, sourceMaps)
    return;
}
```

### 其他 Loader API

[完整API](https://www.webpackjs.com/api/loaders/)

|方法名|含义|
|---|----|
|this.context        |  当前处理文件的所在目录，假如当前 loader 处理的文件是 /src/main.js, this.context 就等于 /src  |
|this.resource       |  当前处理文件的完整请求路径，包括 querystring， 例如 /src/main.js?name=1 |
|this.resourcePath   |  当前处理文件的路径， 例如 /src/main.js |
|this.resourceQuery  |  当前处理文件的 querystring |
|this.target         |  等于 webpack 中配置的 Target |
|this.loadModule     |  但 `loader` 在处理一个文件时，如果依赖其他文件的处理结果才能才能得到当前的文件的结果时，就可以通过 this.loadModule 去获取 request 对应文件的处理结果|
|this.resolve       | 像 require 语句一样获得指定的文件的完整路径|
|this.addDependency      | 给当前处理文件添加其依赖的文件，以便在其它依赖的文件发生变化时，会重新调用 laoder 处理文件|
|this.addContextDependency| 和 addDependency 类似，但 addContextDependency 是把整个目录加入到当前正在处理的依赖中。|
|this.clearDependencies| 清除当前正在处理文件的所有依赖|
|this.emitFile | 输出一个文件 |
|loader-utils.stringifyRequest | 把一个请求字符串转成一个字符串，以便能在 request 或者 import 中使用以避免绝对路劲，如果你在一个 loader 中生成代码的话请使用这个，而非使用 JSOstringify()|
|loader-utils.interpolateName | 使用多个占位符或一个正则表达式转换为一个文件的模块，这个模块和正则表达式被设置为查询参数，在当前 laoder 的上下文被称为 name 或者 regExp | 
