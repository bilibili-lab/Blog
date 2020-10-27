---
 sidebarDepth: 2
---

# loader 配置

`loader` 是导出为一个函数的 `node` 模块。该函数在 `laoder` 转换资源的时候调用。

给定的函数将调用 `loader API` , 并通过 `this` 访问上下文。

## 匹配单个loader


匹配单个 loader，你可以简单通过在 rules 对象设置 path.resolve 指向这个本地文件。

``` js
{
    test: /\.js$/
    use: [{
        loader: path.resolve('path/to/loader.js')
        options: {
               // 传递给 loader 的参数
        }
    }]
}
```

## 匹配多个loader

可以使用 `resolveLoader.modules` 配置， `webpack` 将会从这些目录中搜索这些 `laoders` 。

``` js
resolveLoader: {
    modules: [path.resolve('node_modules'), path.resolve(__dirname, 'src', 'loader')]
}
```

## npm link

* 确保正在开发本地 `NPM` 模块（也就是正在开发 `laoder` ）的 `package.json` 已经配置好。在本地 `Npm` 模块根目录下执行 `npm link` , 把本地模块注册到全局。

* 在项目根目录下执行 `npm link loader-name` , 把第 2 部注册到全局的本地 `Npm` 模块链接项目的 `node_modules` 下，其中 `loader-name` 是指在第 1 步中的 `package.json` 文件配置的模块名称。

## alias

配置别名。

``` js
resolveLoader: {
    alias: {
        "babel-loader": path.resolve("./loaders/babel-laoder.js"),
        "css-loader": path.resolve("./loaders/css-laoder.js"),
    }
}
```

