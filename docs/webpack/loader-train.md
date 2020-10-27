---
 sidebarDepth: 2
---

# loader 实战

## babel-loader

`Babel` 是一个工具链，主要用于在当前和较旧的浏览器或环境中将 `ECMAScript 2015+`代码转换为 `JavaScript` 的向后兼容版本。

`webpack`结合`babel-laoder`将`javascript`转为向后兼容代码。

简单实现一个`babel-loader`如下：

### webpack.config.js

```js
const path = require("path");
module.exports = {
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "dist"),
  },
  entry: {
    index: path.join(__dirname, "./src/index.js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  // 告诉`webpack`如何解析查找所需要的`laoder`
  // 先去查找 node_modules 目录下， 在查找 `loader`目录下。
  resolveLoader: {
    modules: ["node_modules", "./loader/"],
  },
};
```

### babel-loader

`babel-loader`放在`./loader/`目下。

```js
const babel = require("@babel/core");
const loaderUtils = require("loader-utils");
const path = require("path");
module.exports = function (inputSource) {
  // 获取webpack.config.js 里 babel-laoder的 options 的参数。
  const options = loaderUtils.getOptions(this);
  // 默认 options 选项
  const defaultOPtions = {
    // 生成 sourceMap
    sourceMaps: true,
    // 与当前正在编译的代码关联的文件名
    filename: path.basename(this.resourcePath),
  };
  // 使用 babel 生成 code，sourceMap，ast
  const { code, sourceMap, ast } = babel.transform(
    inputSource,
    Object.assign(defaultOPtions, options)
  );
  // 把 babel 生成的 sourceMap，ast 传递给 webpack，
  // 这样 webpack 就不需要在从新生成, 从而提高编译效率。
  this.callback(null, code, sourceMap, ast);
};
```

### 参考

- [loader-utils](https://www.npmjs.com/package/loader-utils)

- [@babel/core](https://babeljs.io/docs/en/babel-core)

- [@babel/core 的 options 传递的参数](https://babeljs.io/docs/en/babel-core)

- [在线 babel REPL](https://babeljs.io/docs/en/babel-core)