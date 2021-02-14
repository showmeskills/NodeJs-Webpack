const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
   entry:'./src/index.js',
    output:{
        //文件名称(指定名称+目录)
        filename:'js/[name].js',
        //输出文件目录(将来所有资源输出的公共目录)
        path:path.join(__dirname,'build'),
        //一般用于生产环境,所有资源引入的公共路径前缀  e.g '(当前路径下找)imgs/a.jpg' --> 通过公共路径处理'(当前服务器地址补充)/imgs/a.jpg'
        publicPath:'/',
        //非入口chunk的文件名称(除了entry(入口文件包括单和多入口)之外的chunk文件,就由它命名)
        //如果创建额外的chunk呢 1.import 方式 2.optimization->node
        /*          
            import ('./add').then(({defult:add})=>{
                console.log(add(1,2));
            })
        */
        chunkFilename:'js/[name]_extraChunk.js',//add 命名例如 0,1,2,3
        //library用途 全局向外暴露出去一个变量name,通常和dll一起用
        library:'[name]',//整个库向外暴露的变量名
        //libraryTarget:'window',//变量添加到哪个平台上browser
        //libraryTarget:'global',//变量添加到哪个平台上global
        //libraryTarget:'commonjs'//会commonjs方法暴露 name
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:'development',
}