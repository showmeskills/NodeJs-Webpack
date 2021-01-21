const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
process.env.NODE_ENV = "development";
module.exports ={
    entry:path.join(__dirname, 'src','app.js'),
    output:{
        filename:'built.js',
        path:path.join(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:()=>[
                                require('postcss-preset-env')()
                            ]
                        }
                    },
                    'less-loader',
                ]
            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                   {
                       loader:'postcss-loader',
                       options:{
                           ident:'postcss',
                           plugins:()=>[
                               require('postcss-preset-env')()
                           ]
                       }
                   }
                   
                ]
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
            template:path.join(__dirname,'views','index.html')
        }),
        new MiniCssExtractPlugin({
            filename:'css/built.css'
        }),
        new VueLoaderPlugin()
    ],
    devServer:{
        contentBase:path.join(__dirname,'build'),
        compress:true,
        open:true,
        port:3000,
    },
    resolve:{
        alias: {  
             'vue$':'vue/dist/vue.js'
        },
        extensions: ['.js', '.vue']
    },
    mode:'development'
}