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
    },
    //devServer 用于开发环境
    devServer:{
        //运行代码的目录
        contentBase:path.join(__dirname,'build'),
        //监视contentBase目录下的所有文件,以但文件变化就会reload
        watchContentBase:true,
        watchOptions:{
            //忽略文件 不需要监视的文件
            ignored:/node_modules/
        },
        //启动gzip压缩
        compress:true,
        //端口号
        port:5000,
        //域名
        host:'localhost',
        //自动打开浏览器
        open:true,
        //开始HMR功能
        hot:true,
        //不要显示启动服务器的日志信息
        clientLogLevel:'none',
        //除了一些基本启动信息以外,其它呢容都不要显示
        quiet:true,
        //如果出错了,不要全屏提示~
        overlay:false,
        //服务器代理 -->解决开发环境跨域问题
        proxy:{
            //一旦devServer(5000) 服务器接收到/api/xxx的请求,就会把请求转发到另一个服务器(3000)
            '/api':{
                target:'http://localhost:3000',
                //发送请求时,请求路径重写: 将 /api/xxx ---> /xxx (去掉/api)
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}