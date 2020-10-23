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

``` js
this.cacheable(true);
```

### 异步

### raw loader

### 获取 loader 的 options
