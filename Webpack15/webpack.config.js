const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWepackPlugin = require('workbox-webpack-plugin');
/*
PWA:渐进式网络开发应用程序(可以离线访问技术)
  workbox --> workbox-webpack-plugin@5.0.0
*/
process.env.NODE_ENV = 'production';
const commonCssLoader = [
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
]
module.exports = {
  entry: [path.join(__dirname, 'src', 'app.js'),path.join(__dirname,'src','views','index.html')],
  output: {
    filename: 'js/built.[hash:10].js',
    path: path.join(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        oneOf:[
          {
            test: /\.less$/,
            use: [...commonCssLoader,'less-loader'],
          },
          {
            test: /\.css$/,
            use: [...commonCssLoader],
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
              //开始babel缓存--第二次构建时,会读取之前的缓存
              cacheDirectory:true,
            },
          },
          {
            exclude: /\.(html|js|less|css|jpg|png|gif)/,
            loader: 'file-loader',
            options: {
              name: '[hash:10].[ext]',
            },
          },
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'src', 'views', 'index.html'),
      minify:{
        //移除空格
        collapseWhitespace:true,
        //移除注释
        removeComments:true
      }
    }),
    new MiniCssExtractPlugin({
      // 文件重命名
      filename: 'css/built.[contenthash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWepackPlugin.GenerateSW({
      /*
        1.帮助serviceworker快速启动
        2.删除旧的serviceworker
        生成一个serviceworker 配置文件
      */
      clientsClaim:true,
      skipWaiting:true,
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    open: true,
    //开启HMR功能,当修改了webpack配置,新配置要项生效,必须重新启动webpack
    hot:true,
    port: 3000,
  },
  //JS压缩 把development 换成production生产环境下自动解压缩
  mode: 'production',
  devtool: 'source-map',
};


