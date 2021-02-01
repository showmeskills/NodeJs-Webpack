const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
process.env.NODE_ENV = 'production';
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

/*
缓存:
  babel缓存
    cacheDirectory:true 让第二次打包速度更快
  文件资源缓存 让代码上线运行缓存更好使用
    hash:每次webpack构建时会生成一个唯一的hash值
    问题:因为js和css同时使用一个hash值
    如果重新打包,会导致所有缓存失效.(可能只改动了一个文件(js或css中的一个))
    解决使用chunkhash值
    chunkhash:根据chunk生成的hash值,如果打包来源于同一个chunk,那么hash值就一样
    问题:js和css的hash值还是一样的
    因为css是再js中被引入的所以同属于一个chunk
    contenthash:根据文件的内容生成hash值,不同文件hash值一定不一样

*/
/*
css renew
*/
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
  entry: [path.join(__dirname, 'src', 'app.js'),path.join(__dirname,'views','index.html')],
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: path.join(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        //以下loader只会匹配一个/它匹配完cssloader后就不会在匹配其它的loader
        //注意:不能有两个配置处理同一个类型文件 例如eslint-loader and babel-loader 都是处理js文件,所有解决提取一个出来就可以
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
      filename: 'css/built.[contenthash:10].css',
    }),
   
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
  //JS压缩 把development 换成production生产环境下自动解压缩
  mode: 'development',
  devtool: 'source-map',
};


