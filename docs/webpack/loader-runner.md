### loader runner

[loader-runner](https://www.npmjs.com/package/loader-runner) 是一个独立出去的 npm 包, 允许你不依靠 `webpack` 单独运行 `loader` 。

``` js
import {
    runLoaders
} from "loader-runner";

runLoaders({
        resource: "/abs/path/to/file.txt?query",
        // String: Absolute path to the resource (optionally including query string)

        loaders: ["/abs/path/to/loader.js?query"],
        // String[]: Absolute paths to the loaders (optionally including query string)
        // {loader, options}[]: Absolute paths to the loaders with options object

        // loader 执行的上下文环境，就是 loader 函数中的 this。 可以在 conext 对象上赋值，然后在 this 上获取。
        context: {
            minimize: true
        },
        // Additional loader context which is used as base context

        readResource: fs.readFile.bind(fs),
        // A function to read the resource
        // Must have signature function(path, function(err, buffer))
    },
    function(err, result) {
        // err: Error?
        // result.result: Buffer | String
        // The result
        // result.resourceBuffer: Buffer
        // The raw resource as Buffer (useful for SourceMaps)
        // result.cacheable: Bool
        // Is the result cacheable or do it require reexecution?
        // result.fileDependencies: String[]
        // An array of paths (files) on which the result depends on
        // result.contextDependencies: String[]
        // An array of paths (directories) on which the result depends on
    }
);
```
