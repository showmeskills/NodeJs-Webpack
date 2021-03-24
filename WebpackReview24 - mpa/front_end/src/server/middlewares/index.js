const middleware = {
    error(app, logger){
        app.use(async (ctx, next) => {
            try{
                await next()
            }catch(err){
                
                ctx.status = 500;
                ctx.body = "程序好像出错了，请与程序员小哥联系";

                logger.error(err)
            }
            
        })

        app.use(async (ctx, next) => {
            await next()

            if(ctx.status != 404) return

            ctx.status = 200;
            ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>`
        })
    }
}

module.exports = middleware