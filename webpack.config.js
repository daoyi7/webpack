const path = require('path')
const webpack = require('webpack')

module.exports = {
  // entry: 'app.js',
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, 'dist')
  // },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // compress: true,
    // port: 9000
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
    // splitChunks: {
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       chunks: 'initial',
    //       name: 'vendors',
    //     },
    //     'async-vendors': {
    //       test: /[\\/]node_modules[\\/]/,
    //       minChunks: 2,
    //       chunks: 'async',
    //       name: 'async-vendors'
    //     }
    //   }
    // },
    // runtimeChunk: { name: 'runtime' }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    // new webpack.NamedChunksPlugin(chunk => chunk.name || 'faceless-chunk'), // a chunk has no name!!!
  ]
}