
const SafeRequest = require('../utils/SafeRequest')

// 图书数据模型
class IndexBookModel {
    constructor(){}

    // 获取图书
    getData(){
        let safeRequest =  new SafeRequest('/books');
        return safeRequest.fetch();
    }

    // 添加图书
    addData(opt){
        let safeRequest =  new SafeRequest('/books/book');
        return safeRequest.fetch({
            method: 'post',
            params: opt
        });
    }

    // 获取修改的图书数据
    getEditData(id){}

    // 修改图书
    editData(opt){}

    // 删除图书
    deleteData(id){}
}

module.exports = IndexBookModel