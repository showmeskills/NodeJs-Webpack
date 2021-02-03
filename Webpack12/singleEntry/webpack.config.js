const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  entry:path.join(__dirname, 'src', 'app.js'),
  output: {
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

