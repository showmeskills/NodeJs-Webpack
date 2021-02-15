const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
   entry:'./src/js/index.js',
    output:{
        filename:'js/[name].js',
        path:path.join(__dirname,'build'),
    },
    module:{
        rules:[
            //loader的配置
            {
                test:/\.css$/,//test检查
                //多个loader用use
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:'development',
    //解析模块的规则
    resolve:{
        //配置解析模块路劲别名:优点简写路径,缺点路径没有提示
        alias:{
            //就代表css文件的绝对路径 入口文件引入 import'$css/index.css';

            $css:path.join(__dirname,'src','css'),
        },
        //配置省略文件路径的后缀名 import'$css/index';
        extensions:['.js','.json','.css','jsx'],
        //告诉webpack 解析模块是取找哪个目录; 如果不写绝对路劲,它会往上层目录找
        modules:[path.join(__dirname,'..','..','node_modules'),'node_modules']
    }
}