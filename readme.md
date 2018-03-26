# webpack v4.0 不完全指北

> webpack 是一个开源的前端打包工具。它提供了前端开发缺乏的模块化开发方式，将各种静态资源视为模块，并从中生成优化过的代码。webpack可以从终端或者修改 webpack.config.js 文件来设置各项功能。在今年的2月25日，webpack 团队发布了他们的 4.0.0 版本。

### webpack 更好的默认值

webpack v4.0 之前，我们需要在config文件中定义入口文件和输出文件，但是在新版本中，webpack终于给定了默认值这个概念，新版本中的`entry`和`output`的默认值分别是`./src/index.js`、`./dist/main.js`。所以理论上新版本 webpack 是一个可以无需配置就能hello world的前端打包工具。

### Node环境

webpack v4.0 已不再支持Node.js v4.0,webpack作者同时提醒用户尽量使用Node v8.9.4或者更高版本。

### CLI 到 webpack-cli

```shell
The CLI moved into a separate package: webpack-cli.
Please install 'webpack-cli' in addition to webpack itself to use the CLI.
-> When using npm: npm install webpack-cli -D
-> When using yarn: yarn add webpack-cli -D
```
`webpack-cli`是`webpack`运行的命令行接口，常用配置包括输出配置、环境配置等。在4.0版本之前，`webpack-cli`是随webpack本身安装的，但是在4.0版本中，webpack团队把这个接口单独拿了出来做成了一个包。

### mode 运行模式

在4.0里，你必须要选择一个运行模式，`mode`或者是`--mode`。mode有两种可能性，`development`和`production`。

生产模式和开发模式：

当然了，开发者可以使用`optimization.* `自定义运行模式。

还有一个隐藏属性——`none`,禁用所有属性。

### R.I.P CommonsChunkPlugin

删除了之前常用的`CommonsChunkPlugin`，但是新增了两个插件`splitChunks`和`runtimeChunk`
Commons Chunk ,顾名思义是一个提取代码中公共模块的插件, 在webpack配置多入口文件的时候，它会把所有入口文件进行比较，然后相同的部分提取出来。

例如下面这个例子，就是把entry1, entry2等所有入口文件的相同模块全部提取到common.js中
```javascript
const webpack = require('webpack')

module.exports = {
    ...
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js', ['entry1.js', 'entry2.js',...])
    ]
    ...
}
```

在新版本中，新增了`splitChunks`这个配置项用来实现分割模块的功能：把共用的代码分割出来，减少重复代码的加载，对应 webpack 的模块化开发、按需加载的理念。

```javascript
entry: {
   vendor: ['lodash']
},
 
...
 
optimization: {
    splitChunks: {
        chunks: "initial",                  // 必须三选一： "initial" | "all"(默认就是all) | "async" 
        minSize: 0,                         // 最小尺寸，默认0
        minChunks: 1,                       // 最小 chunk ，默认1
        maxAsyncRequests: 1,                // 最大异步请求数， 默认1
        maxInitialRequests : 1,             // 最大初始化请求书，默认1
        name: function(){},                 // 名称，此选项可接收 function
        cacheGroups:{                       // 这里开始设置缓存的 chunks
            priority: 0,                    // 缓存组优先级
            vendor: {                       // entry中定义的 入口名称
                chunks: "initial",          // 必须三选一： "initial" | "all" | "async"(默认就是异步) 
                test: /react|lodash/,       // 正则规则验证，如果符合就提取 chunk
                name: "vendor",             // 要缓存的 分隔出来的 chunk 名称 
                minSize: 0,
                minChunks: 1,
                enforce: true,
                maxAsyncRequests: 1,        // 最大异步请求数， 默认1
                maxInitialRequests : 1,     // 最大初始化请求书，默认1
                reuseExistingChunk: true    // 可设置是否重用该chunk（查看源码没有发现默认值）
            }
        }
    }
 }
```

### module支持类型提升

webpack4 之前模块类型只支持js一种类型，但是在新版本中模块支持`.mjs`,`.js`,`.json`,`.wasm`等类型的模块。因此webpack在`module.rules`新增了`type`属性，用来支持不同的模块类型。
- javascript/esm (EcmaScript)
- javascript/dynamic (CommonJS)
- json
- javascript/auto (包含以上三种)
- webassembly

*WebAssembly 或称 wasm 是一个实验性的低级编程语言，应用于浏览器内的客户端。WebAssembly 是便携式的抽象语法树，被设计来提供比 JavaScript 更快速的编译及运行*


```javascript
module: {
    rules: [
        {
            test: /\.txt/,
            loader: "raw-loader"
        },
        {
            test: /\.json/,
            loader: "file-loader",
            type: "javascript/auto"
        }
    ]
}
```

### 参考文献

https://github.com/webpack/webpack/releases

https://auth0.com/blog/webpack-4-release-what-is-new/?utm_source=dev&utm_medium=sc&utm_campaign=webpack4_new

https://webpack.toobug.net/zh-cn/chapter3/common-chunks-plugin.html

https://scotch.io/amp/tutorials/whats-new-in-webpack-4?__twitter_impression=true

https://www.robinwieruch.de/minimal-react-webpack-babel-setup/

https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
