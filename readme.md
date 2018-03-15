# webpack4.0 不完全指北

- webpack-cli 单独分到另一个包里去了
- webpack.config 需要设置 mode 属性，三种选择——`development`, `production`, `none` 


## webpack v4.0 不完全指北

https://auth0.com/blog/webpack-4-release-what-is-new/?utm_source=dev&utm_medium=sc&utm_campaign=webpack4_new

https://webpack.toobug.net/zh-cn/chapter3/common-chunks-plugin.html

1. node 支持的下降
webpack v4.0 已不再支持Node.js v4.0,webpack作者同时提醒用户尽量使用Node v8.9.4或者更高版本。

2. webpack-cli 的独立
```shell
The CLI moved into a separate package: webpack-cli.
Please install 'webpack-cli' in addition to webpack itself to use the CLI.
-> When using npm: npm install webpack-cli -D
-> When using yarn: yarn add webpack-cli -D
```
在4.0版本之前，`webpack-cli`是`webpack`运行的命令行接口，常用配置包括输出配置、环境配置等，但是在4.0版本中，webpack团队把这个接口单独拿了出来做成了一个包。

3. R.I.P. CommonsChunkPlugin
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

4. mode 的必须性



