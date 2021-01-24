/* eslint-disable linebreak-style */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

process.env.NODE_ENV = 'development';
// 压缩css插件 npm i optimize-css-assets-webpack-plugin
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'app.js'),
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
                // eslint-disable-next-line global-require
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
                // eslint-disable-next-line global-require
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
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules|webpack.config.js/,
      //   loader: 'eslint-loader',
      //   options: {
      //     fix: true,
      //   },
      // },
      /*
        Js兼容性处理:
        1.babel-loader@8.1.0
        2.@babel/preset-env@7.8.0
        2.1基本js兼容处理(只能转化基本语法)
        问题:它只能转化基本语法,如promise不能转换
        2.2全部JS兼容处理--> @babel/polyfill@7.8.3
        在入口文件引入既可 import '@babel/polyfill';
        问题:我只要解决部分兼容性问题,但是讲所有兼容性代码全部引入,体积太大
        2.3需要做兼容性处理的就做:按需加载 --> core-js@3.6.4
        3.@babel/core@7.8.4
      */
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
    port: 3000,
  },
  resolve: {
    alias: { // 修改vue被导入时候报的路径
      vue$: 'vue/dist/vue.js',
    },
    extensions: ['.js', '.vue'],
  },
  mode: 'development',
};
