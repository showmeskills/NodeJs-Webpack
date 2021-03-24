
class IndexController {
    constructor() { }

    index() {
        let data = '图书馆首页！！！'
        return async function (ctx) {
            await ctx.render('index', {
                data
            });
        }
    }

    actionEs(){
        return async function (ctx) {
            await ctx.render('es', {});
        }
    }

    // 添加图书页
    actionAddPage(){
        return async function (ctx) {
            ctx.render('addpage', {});
        }
    }
}

module.exports = IndexController