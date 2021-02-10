const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
entry:入口起点
    1.string entry:'./src/index.js'
        单入口
        打包形成一个chunk,输出一个bundle文件
        此时chunk的名称默认是main
    2.array ntry:['./src/index.js','./src/add.js'],
        多入口
        所有入口文件最终只会形成一个chunk,输出出去只有一个bundle文件
        虽然引入多个入口文件,但是最终其它文件还是会被打包到第一个文件中去,所以只输出一个bundle
        作用HMR功能的时候,发现HTML文件不能热更新,可以使用把HTML的文件引入进来
    3.object 
    多入口
    有几个入口文件就形成几个chunk,输出几个bundle
    此时chunk的名称就是key值

    4.特殊用法 多个入口，且默写文件打包成一个chunk 查看案例dll
     entry:{
         所有入口文件最终只会形成一个chunk,输出出去只有一个bundle文件(但是最终其它文件还是会被打包到第一个文件中去)
        index:['./src/index.js','./src/count.js'],
        打包形成一个chunk,输出一个bundle文件
        add:'./src/add.js'
    },
*/
module.exports = {
    //写法1  entry:'./src/index.js',
    //写法2 entry:['./src/index.js','./src/add.js'],
    /*
        写法3
        entry:{
            index:'./src/index.js',
            add:'./src/add.js'
        },
    */
   entry:{
        index:['./src/index.js','./src/count.js'],
        add:'./src/add.js'
    },
    output:{
        filename:'[name].js',
        path:path.join(__dirname,'build')
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:'development',
}