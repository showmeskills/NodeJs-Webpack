const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
process.env.NODE_ENV = 'development';
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

/*

*/
module.exports = {
  entry: [path.join(__dirname, 'src', 'app.js'),path.join(__dirname,'views','index.html')],
  output: {
    filename: 'built.js',
    path: path.join(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')(),
              ],
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')(),
              ],
            },
          },

        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules|webpack.config.js/,
        loader: 'babel-loader',
        options: {
          // 预设:指示babel做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
              // 按需下载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3,
                },
                // 指定兼容性左到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      },
      {
        exclude: /\.(html|js|less|css|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'views', 'index.html'),
      minify:{
        //移除空格
        collapseWhitespace:true,
        //移除注释
        removeComments:true
      }
    }),
    new MiniCssExtractPlugin({
      // 文件重命名
      filename: 'css/built.css',
    }),
    new VueLoaderPlugin(),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    open: true,
    //开启HMR功能,当修改了webpack配置,新配置要项生效,必须重新启动webpack
    hot:true,
    port: 3000,
  },
  resolve: {
    alias: { // 修改vue被导入时候报的路径
      vue$: 'vue/dist/vue.js',
    },
    extensions: ['.js', '.vue'],
  },
  //JS压缩 把development 换成production生产环境下自动解压缩
  mode: 'development',
  devtool: 'eval-source-map',
};


/*
 source map:一种 提供源代码到构建后代码映射 技术(如果构建后代码出错了,通过映射代码可以追踪源代码错误)
 [inline-|hidden-|eval-][nosources-][cheap-[module-] source-map

 source-map:外部 错误代码准备信息 和 源代码的错误位置
 也可以配合关键字使用
 inline-source-map:内联 只生成一个内联source-map/错误代码准备信息 和 源代码的错误位置
 hidden-source-map:外部 错误代码的错误原因,但是没有错误位置,不能追踪到源代码的错误
 eval-source-map:内联 每一个文件都生成对应的source-map,都在eval/错误代码准备信息 和 源代码的错误位置
 nosources-source-map:外部 错误代码准备信息,没有任何源代码信息
 cheap-source-map:外部 错误代码准备信息 和 源代码的错误位置,但是只能精确导航
 cheap-module-source-map:外部 错误代码准备信息 和 源代码的错误位置
 内联和外部的区别:1.外部生成了文件,内联没有 2.内联构建速度够快
  module会降loaderdd额source map加入

 如何使用呢 生产环境 开发环境
 开发环境:速度快,调试更友好 eval-source-map
 速度排比(eval>inline>cheap>...)
 速度组合快到慢
 1.eval-cheap-source-map
 2.eval-source-map
 调式友好
 1.source-map
 2.cheap-module-source-map
 3.cheap-source-map
 所有开发环境使用eval-source-map(性能较差/Vue,React使用eval-source-map) / eval-cheap-module-source-map(性能较好)

 生产环境:源代码要不要隐藏?调式要不要更友好
 内联会让代码体积变大,所有只能选择外联
 调式友好(source-map)
 从调式角度来讲呢
 1.source-map/hidden-source-map
 2.cheap-source-map/cheap-module-source-map
 3.nosources-source-map 全部隐藏
 4.hidden-source-map 只能提示构建后的错误代码位置ii
 速度来说
 cheap-source-map:
 cheap-module-source-map:

*/