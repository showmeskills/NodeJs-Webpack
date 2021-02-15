const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
   entry:'./src/index.js',
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
            },
            {
                test:/\.js$/,
                //单个loader
                loader:'eslint-loader',
                //排除node_modules下的文件
                exclude:/node_modules/,
                //值检查src下的js文件
                include:path.join(__dirname,'src'),
                //优先执行
                enforce:'pre',
                //延后执行
                //enforce:'post',
                //多个loader可以添加options来添加额外内容
                options:{}
            },
            {
                //以下配置只会生效一个
                oneOf:[]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode:'development',
}