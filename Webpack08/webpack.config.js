const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports={
    entry: [path.join(__dirname,'src','main.js'),path.join(__dirname,'src','views','index.html')],
    output:{
        filename:'built.js',
        path: path.join(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule:false,
                }
            },
            {
                //处理html 中img 资源
                test:/\.html$/,
                loader:'html-loader',
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            },
            {
                exclude:/\.(html|js|less|css|jpg|png|gif)/,
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({         
                template:path.join(__dirname,'src','views','index.html'),
                minify:{
                    collapseWhitespace:true,
                    removeComments:true
                  }
        }),
        new VueLoaderPlugin()
    ],
    devServer:{
        contentBase:path.join(__dirname,'build'),
        compress:true,
        open:true,
        hot:true,
        port:3000,
    },
    resolve:{
        alias: {  // 修改vue被导入时候报的路径
             'vue$':'vue/dist/vue.js'
        },
        extensions: ['.js', '.vue']
    },
    mode:'development'
}