/*
使用dll技术,对某些库(第三方库,jquery,react,vue..)进行打包
当运行webpack指令时,默认查找webpack.config.js配置文件
需求:需要运行 webpack.dll.js文件
使用命令 webpack --config webpack.dll.js
*/
const path = require('path');
const webpack = require('webpack')
module.exports = {
    entry:{
        //最终打包生成的[name]--->jquery
        //['jquery']--->要打包的库是jquery
        //jquery:['jquery'],
        //多项打包
        vendor:['vue','jquery']
    },
    output:{
        filename:'[name].js',
        path:path.join(__dirname,'dll'),
        library:'[name]_[hash:5]',//打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins:[
        //打包生成一个manifest.json -->提供和jquery，vue映射
        new webpack.DllPlugin({
            name:'[name]_[hash:5]',//映射库的暴露的内容名称,
            path:path.join(__dirname,'dll','manifest.json'),//输出文件路径
        }),
    ],
    mode:'production'
}