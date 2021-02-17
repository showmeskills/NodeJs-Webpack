const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
   entry:'./src/js/index.js',
    output:{
        filename:'js/[name].[contenthash:10].js',
        path:path.join(__dirname,'build'),
        chunkFilename:'js/[name].[contenthash:10].chunk.js',//chunk打包后的名字a.hash.chunk.js','
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
    mode:'production',
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
    },
    //用于开发环境
    optimization:{
        splitChunks:{
            chunks:'all',
            /*以下都是默认值,可以不写~
            minSize:30 * 1024,//分割的chunk最小为30kb,(只有小于30kb才会分割),
            maxSize:0,//最大没有限制
            minChunks:1,//要提取的chunks最少被引用1次
            maxAsyncRequests:5,//按需下载时,并行加载的文件的最大数量
            maxInitialRequests:3,//入口js文件最大并行请求数量
            automaticNameDelimiter:'~',//名称链接符
            name:ture,//可以使用命名规则
            cacheGroups:{//分割chunk的组
                //node_modules中的文件会被打包到vendors组的chunk中 --->vendors~xxx.js
                //满足上面的公共规则，如:大小超过30kb,至少引用1次
                vendors:{
                    test:/[\\/]node_modules[\\/]/,
                    //优先级
                    priority:-10
                },
                //默认组
                default:{
                    //要提取的chunks最少被引用2次,会覆盖上面的公共规则
                    minChunks:2,
                    //优先级
                    priority:-20,
                    //如果当前要打包的模块,和之前已经被提取的模块是同一个,就会复用,而不是重新打包
                    reuseExistingChunks:true
                }
            }
            */
        },
        //将当前模块的记录其它模块的hash值单独打包成一个文件 名字为runtime
        //当引入的a文件时候,它发生变化,只有a文件和a文件runtime文件发生变化,main和其它文件不变
        //解决:修改a文件导致b文件的contenthash值变化,导致缓存失效,所以使用runtimeChunk
        runtimeChunk:{
            name:entrypoint =>`runtime-${entrypoint}`,
        },
        minimizer:[
            //配置生产环境的压缩方案:js和css
            //tersers库 const TerserWebpackPlugin = require('terser-webpack-plugin') @2.3.5
            new TerserWebpackPlugin({
                //开启缓存
                cache:true,
                //开启多进程打包
                parallel:true,
                //启动source-map
                sourceMap:true,
            })
        ]    
    }
}