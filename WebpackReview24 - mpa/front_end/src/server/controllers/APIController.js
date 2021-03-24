let IndexBookModel = require('../models');
let indexBookModel = new IndexBookModel();

class APIController {
    constructor() { }

    // 获取图书
    actionAdmin(){
        return async function (ctx) {
            let msg = await indexBookModel.getData();
            ctx.body = msg;
        }
    }
    // 添加图书
    actionAdd(){
        return async function(ctx){
            
            try{
                let msg = await indexBookModel.addData(ctx.request.body);

                if(msg.code == 0){
                    ctx.body = msg
                }else{
                    ctx.body = '添加失败！'
                }

            }catch(err){
                console.log('err ====>>>>', err);
                
            }
            
        }
    }
    // 编辑图书页
    actionEditPage(){
        return async function (ctx) {
            // console.log('ctx.request.query ====>>>>', ctx.request.query);

            // let id = ctx.request.query.editid;
            let id = ctx.params.id;
            console.log('id ====>>>>', id);
            
            
            try{
                let msg = await safeRequest.getEditData(id)
                console.log('msg ====>>>>', msg);


                ctx.body = msg


                // ctx.render('editpage', {
                //     data: msg.data
                // });
                
            }catch(err){
                console.log('err ====>>>>', err);
                
            }
            
            
        }
    }
    // 完成修改图书
    actionEdit(){
        return async function (ctx) {

            // console.log('ctx.request.body ====>>>>', ctx.request.body);
            
            try{
                let msg = await safeRequest.editData(ctx.request.body)
                // console.log('msg ====>>>>', msg);
                
                ctx.body = msg;

                // ctx.redirect('/admin')
                
            }catch(err){
                console.log('err ====>>>>', err);
                
            }
            
            
        }
    }

    // 删除图书
    actionDelete(){
        return async function (ctx) {
            // let id = ctx.request.query.deleteid;
            let id = ctx.params.id;
            // console.log('id ====>>>>', id);

            try{
                let msg = await safeRequest.deleteData(id);
                console.log('msg ====>>>>', msg);
                
                ctx.body = msg;
                // ctx.redirect('/admin')
            }catch(err){
                console.log('err ====>>>>', err);
                
            }
            
            
        }
    }
}

module.exports = APIController