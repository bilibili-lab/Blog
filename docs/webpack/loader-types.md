# loader 分类

## `loader`可以分为以下四种：

- `pre`前置`laoder`。
- `normal`。
- `inline` 内联`loader`。
- `post` 后置`loader`。

```js
// 前置loader
module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.jsx?$/,
        enforce: "pre",
      }
    ]
}
// normal loader
module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.jsx?$/,
      }
    ]
}
// 内联 loader
// 按照从右到左
// 选项可以传递查询参数，例如 ?key=value&foo=bar，或者一个 JSON 对象，例如 ?{"key":"value","foo":"bar"}。
import Styles from 'style-loader!css-loader?modules!./styles.css';

// 后置 loader
module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.jsx?$/,
         enforce: "post",
      }
    ]
}
```

## 四种loader的执行顺序

`前置 loader` >> `normal loader` >> `内联 loader` >> `后置 loader` 

## 行内loader限制符

|符号|变量|含义|
|---|---|---|
|-！|noPerAutoLoaders| 跳过 pre 和 normal loader。|
| ！|noAutoLoaders| 跳过 normal loader。 |
| ！！|noPerPostAutoLoaders| 跳过 pre、 normal 和 post loader。 |

