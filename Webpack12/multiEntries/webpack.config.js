const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  entry:{
    main:path.join(__dirname, 'src','app.js'),
    test:path.join(__dirname, 'src','assets','scripts','test.js'),
    print:path.join(__dirname, 'src','assets','scripts','print.js'),
  },
  output: {
    //用[name]取文件名默认main 这个名字根据entry的名字 例如main,test
    filename: 'js/[name].built.[contenthash:10].js',
    path: path.join(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src','views', 'index.html'),
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    }),
  ],
  optimization:{
    splitChunks:{
      chunks:'all',
    }
  },
  mode: 'production',
};