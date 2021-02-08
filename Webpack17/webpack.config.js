const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
//add-asset-html-webpack-plugin@3.1.3 作用
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
    entry:path.join(__dirname,'src','app.js'),
    output:{
        filename:'js/[name].built.js',
        path:path.join(__dirname,'build')
    },
    module:{
        rules:[  
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader', 
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader', 
                    'less-loader',
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'src','views','index.html')
        }),
        //告诉webpack 哪些库不参与打包,同时引入使用时的名称也得变
        new webpack.DllReferencePlugin({
            manifest:path.join(__dirname,'dll','manifest.json')
        }),
        //将摸个文件打包输出去,并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath:path.join(__dirname,'dll','vendor.js')
        })
    ],
    mode:'production',

}