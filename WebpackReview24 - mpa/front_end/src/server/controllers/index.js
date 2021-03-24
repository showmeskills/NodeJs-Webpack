const router = require('koa-simple-router')

// 返回页面
const IndexController = require('./indexController');
const indexController = new IndexController();

// 返回接口
const APIController = require('./APIController');
const aPIController = new APIController();


/** 
 * RESTful 风格 API
 * 
 * GET      http://localhost:8080/books             获取图书
 * POST     http://localhost:8080/books/book        添加图书
 * GET      http://localhost:8080/books/book/1      根据 id 获取图书
 * PUT      http://localhost:8080/books/book        编辑图书
 * DELETE   http://localhost:8080/books/book/1      删除图书
 * 
*/

module.exports = (app) => {
    // 返回页面
    app.use(router(_ => {
        _.get('/', indexController.index())
        _.get('/index.html', indexController.index())
        _.get('/es', indexController.actionEs())
    }))

    // 返回接口
    app.use(router({ prefix: '/api' }, _ => {
        // 获取图书
        _.get('/books', aPIController.actionAdmin())
        // 添加图书页
        _.post('/books/book', aPIController.actionAdd())
        // 编辑图书
        _.get('/books/book/:id', aPIController.actionEditPage())
        _.put('/books/book', aPIController.actionEdit())
        // 删除图书
        _.delete('/books/book/:id', aPIController.actionDelete())
    }))
}

