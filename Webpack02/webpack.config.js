const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports ={
    entry:path.join(__dirname,'src','app.js'),
    output:{
        filename:'built.js',
        path:path.join(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.less$/,
                use:['style-loader', 'css-loader', 'less-loader']
            },
            {
                test:/\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options:{
                    limit: 8 * 1024,
                    esModule:false,
                    name: '[hash:10].[ext]'
                }
            },
            {
                test:/\.html$/,
                loader: 'html-loader'
            },
            {
                exclude:/\.(css|js|html|less|png)$/,
                loader:'file-loader',
                options:{
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
        plugins:[
            new HtmlWebpackPlugin({
                template:path.join(__dirname,'views','index.html')
            })
        ],
        mode:'development'
    
}