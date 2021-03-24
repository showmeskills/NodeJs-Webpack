//HtmlWebpackPlugin hook 函数
const HtmlWebpackPlugin = require('html-webpack-plugin')

//回调函数替换 <!-- injectjs -->
function createUrl(type,arrayData){
    let result = '';
    if(type === 'js'){
        arrayData.forEach(url=>{
           result+= `<script defer src="${url}"></script>`
        })
    }
    if(type === 'css'){
        arrayData.forEach(url=>{
            result += `<link rel="stylesheet" href="${url}"/>`
         })
    }
    return result;
}
class HtmlAfterWebpackPlugin{
        //compiler webpack 每次编译都会有一次对象
    apply(compiler){
        compiler.hooks.compilation.tap('HtmlAfterWebpackPlugin',(compilation)=>{//compliation 会生成多个compliation,取决于多少个执行
            //设置script的位置 1.先拿到当前HTML文件2.放置文件
                //取得 js css
                 HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
                    'HtmlAfterWebpackPlugin', // <-- Set a meaningful name here for stacktraces
                    (data, cb) => {

                        //console.log(data.assets)
                        //储存js
                        this._js = data.assets.js;
                        this._css = data.assets.css;
                    cb(null, data)
                    }
                )
                HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                    'HtmlAfterWebpackPlugin', // <-- Set a meaningful name here for stacktraces
                    (data, cb) => {
                    // Manipulate the content

                    //data.html HtmlWebpackPlugin传进来的html页面
                    data.html =data.html.replace('<!-- injectjs -->',createUrl('js',this._js))
                    data.html = data.html.replace(/components:/g, '../../../components')
                    data.html = data.html.replace(/layout:/g, '../../layout')
                    data.html = data.html.replace("<!-- injectcss -->", createUrl('css', this._css))

                    // Tell webpack to move on
                    cb(null, data)
                    }
                )
        })
    }
}

module.exports = HtmlAfterWebpackPlugin