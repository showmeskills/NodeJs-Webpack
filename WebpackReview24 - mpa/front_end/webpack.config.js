const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {merge} = require('webpack-merge');
const argv = require('yargs').argv;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlAfterWebpackPlugin = require('./config/HtmlAfterWebpackPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = argv.mode || 'production';
const mergeConfig = require(`./config/webpack.${mode}.js`);
const glob = require('glob');
let files = glob.sync(path.join(__dirname, '/src/web/views/**/*.entry.js'));

let _entrys = {};
let _htmlPlugins = [];

const fileName =item=>{
    const regExp = () =>{
        if(/.+\/(\w+-\w+)\.entry\.js$/g.test(item) === true){
            let entryKey = RegExp.$1;
            let [pageName,actionName] = entryKey.split('-');
           _entrys[entryKey] = `./src/web/views/${pageName}/${entryKey}.entry.js`
           _htmlPlugins.push(
               new HtmlWebpackPlugin({
                   filename:`../views/${pageName}/pages/${actionName}.html`,
                   template:`./src/web/views/${pageName}/pages/${actionName}.html`,
                   inject:false,
                   chunks:[entryKey]
               })
           )
        }
    }
    return{
        regExp
    }
}

files.forEach(item=>fileName(item).regExp())


const baseConfig = {
    entry:_entrys,
    output:{ 
        path:path.resolve('./dist/assets'),
        filename:'scripts/[name].bundle.js',
        publicPath:'/',
    },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            }
        ]
    },
    plugins:[
        ..._htmlPlugins,
        new HtmlAfterWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from:path.join(__dirname,'src/web/components'),
                    to:'../components',
                    globOptions:{
                        ignore:['**/*.js',"**/*.css"]
                    }
                },
                {
                    from:path.join(__dirname,'src/web/views/layout'),
                    to:'../views/layout'
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename:'style/[name].css',
        })
    ],
    resolve:{
        alias:{
            //把'./src/web/components' 换成 @
            '@':path.resolve(__dirname,'src/web')
        }
    }
}

module.exports = merge(baseConfig,mergeConfig)