const Koa = require('koa');
const app = new Koa();

const serve = require('koa-static');

const config = require('./config')

const log4js = require("log4js");

// 表单数据的处理
const koaBody = require('koa-body');
app.use(koaBody());

log4js.configure({
  appenders: { cheese: { type: "file", filename: "logs/cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});
 
const logger = log4js.getLogger("cheese");
// logger.error("Cheese is too ripe!");
// logger.error("出错了!");


// 错误处理
require('./middlewares').error(app, logger)

// 静态文件
app.use(serve(config.staticDir));

// 开启路由
require('./controllers')(app)

// 模板引擎
const render = require('koa-art-template');

render(app, {
  root: config.templateDir,
  extname: '.html',
});


app.listen(config.port, (  ) => {
    console.log(' ====>>>>', 'server running 8080 ...');
    
})