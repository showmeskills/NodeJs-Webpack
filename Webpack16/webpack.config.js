const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        })
    ],
    mode:'production',
    externals:{
        //忽略库名 --npm打包;拒绝jquery这个包打入进来
        jquery:'jQuery',
    }

}