# Plugin
`webpack`插件向第三方开发者提供了`webpack`引擎中的完整的能力。使用阶段式构建回调，开发者可以引入他们自己的行为到`webpack`构建流程中，创建插件比创建`loader`更加高级，因为你将需要理解一些`webpack`底层的内部特性来做相应的钩子。

在 `Webpack` 运行的生命周期中会广播出许多事件，`Plugin` 可以监听这些事件，在合适的时机通过 `Webpack` 提供的 `API` 改变输出结果。

## 为什么需要插件

- `webpack`基础配置无法满足需求。

- 插件几乎能够更改`webpack`编辑结果。

- `webpack`内部也是通过大量的插件实现的。

## 可以加载插件的常用对象

| 对象            | 钩子 |   
| :---------      | :-- |
| Complier        |  run，watchRun，compile，compilation，make，emit，afterEmit 等。  |   
| Compliation     |  buildModule，seal，optimize，beforeHash 等 |   
| Module Factory  |  beforeReolver，afterResolver,  module,  parser 等。  |
| Module          |    |
| Parser          |  program，statement, call,  expression 等。  |
| Template        |  hash，bootstrap，localVars， render 等。  |

## 创建插件

`webpack` 插件由以下组成：

- 一个 `JavaScript` 命名函数。

- 在插件函数的 `prototype` 上定义一个 apply 方法。

- 指定一个绑定到 `webpack` 自身的事件钩子。

- 处理 `webpack` 内部实例的特定数据。

- 功能完成后调用 `webpack` 提供的回调。


## Complier 和 Compliation
在开发插件中最重要的两个资源是`Complier`和`Compliation`。他们是扩展`webpack`引擎的重要一步。

- `Complier` 对象代表了完整的`webpack`环境配置，这个对象在启动`webpack`时，被一次性建立，并且配置好所有可操作的设置，包括`options`,`loader`和`plugin`，当在`webpack`环境中应用一个插件时，   插件将受到此`Complier`对象的引用。可以使它来访问`webpack`的主环境。

- `Compliation` 对象代表了一次单一的版本 `webpack` 构建和生成编译资源的过程。当运行 `webpack` 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源以及新的 `compilation` 对象。一个 `compilation` 对象包含了 当前的模块资源、编译生成资源、变化的文件、以及 被跟踪依赖的状态信息。


## 简单实现 DonePlugin

**`webpack.config.js`**
```js
const path = require("path");
const DonePlugin = require("./plugins/DonePlugin.js");
module.exports = {
  mode: "development",
  output: {
    path: path.join(__dirname, "dist"),
  },
  entry: {
    index: path.join(__dirname, "./src/index.js"),
  },
  plugins: [
    // 注册插件
    // 可以像插件里传递参数
    new DonePlugin({
      message: "webpack 触发了 done hook 函数！",
    }),
  ],
};
```
**`DonePlugin.js`**
```js
class DonePlugin {
    constructor(options = {}) {
        // 接收插件的参数
        console.log("插件被实例化了")
        this.options = options
    }
    // 插件必须提供一个 apply 函数， 函数接收的参数是 complier 对象
    apply(complier) {
        // 监听 `done` 钩子函数
        complier.hooks.done.tap('Done', () => {
            console.log(this.options.message || "webpack 触发了 done hook")
        })
    }
}
module.exports = DonePlugin
```
## 获取 Compliation 对象

```js
class OptimizePlugin {
    apply(complier) {
        //  complier 对象监听 compilation 钩子函数
        //  接收的参数是 compilation 对象
        complier.hooks.compilation.tap('complitation', (compilation ) => {
            //  通过监听 compilation 的钩子函数，可以对资源进行一些操作， 例如优化。
            compilation.hooks.optimize.tap('optimize', ()=>{
                console.log("在这里可以进行优化的操作！")
            })  
        })
    }
}
module.exports = OptimizePlugin
```
## 实现异步插件
`webpack`的钩子函数有同步和异步区分。 具体每个钩子的类型可以参考如下:

- [webpack官网compiler-hooks](https://webpack.js.org/api/compiler-hooks/#hooks)

- [webpack官网compiler-hooks](https://webpack.js.org/api/compiler-hooks/#hooks)

```js
class AsyncPlugin {
    apply(complier) {
        // 异步钩子通过 tapAsync 或者 tapPromise 来注册
        // 回调函数 将接受一个 callback 函数
        complier.hooks.emit.tapAsync('emit', (compilation,callback) => {
            console.log("开始执行")
            setTimeout(() => {
                callback()
                console.log("结束执行")
            },5000)
        })
    }
}
module.exports = AsyncPlugin
```

## 实现一个 ZipPlugin
将 `webpack` 的 `assets` 整体打包一个`zip` 文件。

```js
const JSZip = require("jszip");
const { RawSource } = require("webpack-sources");
class AsyncPlugin {
  constructor(options = {}) {
    this.options = options;
  }
  apply(complier) {
    // emit 是一个异步的钩子
    // emit 是 webpack 构建流程中最后一次修改 webpack assets 的机会
    complier.hooks.emit.tapAsync("emit", (compilation, callback) => {
      let zip = new JSZip();
      // webpack 打包的资源都 assets 上
      let assets = compilation.assets || {};
      for (let asset in assets) {
        zip.file(asset, assets[asset].source());
      }
      zip
        .generateAsync({ type: "nodebuffer" })
        .then(function (content) {
          // 将资源挂在到 compilation.assets 上， webpack自动将这些文件写入硬盘。
          compilation.assets["default.zip"] = new RawSource(content);
          callback(null, content);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }
}
module.exports = AsyncPlugin;
```

::: tip
只要将`文件name`和`文件的content`挂载到`assets`对象， `webpack`会自动写入硬盘上。
:::

## 参考

[webpack官网如何创建一个插件](https://webpack.js.org/contribute/writing-a-plugin/#creating-a-plugin)

[webpack官网compiler-hooks](https://webpack.js.org/api/compiler-hooks/#hooks)

[webpack官网compilation-hooks](https://webpack.js.org/api/compilation-hooks/)