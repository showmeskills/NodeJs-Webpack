// console.log(' ====>>>>', '666');
// console.log(' ====>>>>', Vue);


// var html = template('template', {user: })


$(function () {

    // 加载图书信息
    getListBook()
    function getListBook() {
        $.ajax({
            url: '/books',
            type: 'get',
            dataType: 'json',
            success(msg) {
                // console.log('msg ====>>>>', msg);

                let html = template('template', {
                    data: msg
                });

                $('#tbody').html(html);

                // 数据回来之后才能对其操作
                editBook();
            },

            error(err) {
                console.log('err ====>>>>', err);

            }
        })
    }



    // 当点击添加按钮的时候才给提交按钮绑定事件
    $('#add').click(function () {
        $('#myModal').modal('show');


        // 添加图书
        $('#btn_submit').off('click').click(function () {

            // console.log('111 ====>>>>', 111);
            // submitData('/add');


            let data = $('#form').serialize();

            $.ajax({
                url: '/books/book',
                type: 'post',
                data: data,
                dataType: 'json',
                success(msg) {
                    // console.log('添加图书msg ====>>>>', msg);

                    if (msg.code == 0) {
                        // 添加成功 --> 重新加载
                        getListBook()

                        toastr.success('提交成功！');

                    } else {
                        toastr.error('提交失败！')
                    }
                },

                error(err) {
                    console.log('err ====>>>>', err);
                    toastr.error('提交失败！')
                }
            })

            // 关闭模态框
            $('#myModal').modal('hide');
        })
    });




    // 操作图书
    function editBook() {
        // 修改图书
        $('.edit').on('click', 'a:eq(0)', function () {
            // console.log('1 ====>>>>', 1);

            $('#myModal').modal('show');



            // 获取到要编辑的图书的 id
            let id = $(this).parent().siblings().eq(0).text();
            // console.log('id ====>>>>', id);

            $.ajax({
                // url: '/editpage?editid=' + id,
                url: '/books/book/' + id,
                type: 'get',
                dataType: 'json',
                success(msg) {
                    console.log('msg ====>>>>', msg);

                    $('#form').find('input[name=name]').val(msg.data.name)
                    $('#form').find('input[name=author]').val(msg.data.author)
                    $('#form').find('input[name=category]').val(msg.data.category)
                    $('#form').find('input[name=description]').val(msg.data.description)

                    // 发起请求，修改图书信息
                    $('#btn_submit').off('click').click(function () {
                        // console.log('222 ====>>>>', 222);

                        // submitData('/edit', id)

                        let data = $('#form').serialize();
                        data += `&id=${id}`;

                        // console.log('data ====>>>>', data);

                        $.ajax({
                            url: '/books/book',
                            type: 'put',
                            data: data,
                            dataType: 'json',
                            success(msg) {
                                // console.log('添加图书msg ====>>>>', msg);

                                if (msg.code == 0) {
                                    // 添加成功 --> 重新加载
                                    getListBook()

                                    toastr.success('提交成功！');

                                } else {
                                    toastr.error('提交失败！')
                                }
                            },

                            error(err) {
                                console.log('err ====>>>>', err);
                                toastr.error('提交失败！')
                            }
                        })

                        // 关闭模态框
                        $('#myModal').modal('hide');

                    })
                },

                error(err) {
                    console.log('err ====>>>>', err);

                }
            })


        })

        // 删除图书
        $('.edit').on('click', 'a:eq(1)', function () {

            let id = $(this).parent().siblings().eq(0).text();

            let flag = confirm(`确定要删除 id 为 ${id} 的数据吗?`);

            if (flag) {
                $.ajax({
                    // url: '/delete?deleteid=' + id,
                    url: '/books/book/' + id,
                    type: 'delete',
                    dataType: 'json',
                    success(msg) {
                        // console.log('添加图书msg ====>>>>', msg);

                        if (msg.code == 0) {
                            // 删除成功 --> 重新加载
                            getListBook()

                            toastr.success('删除成功！');

                        } else {
                            toastr.error('删除失败！')
                        }
                    },

                    error(err) {
                        console.log('err ====>>>>', err);
                        toastr.error('删除失败！')
                    }
                })
            }



        })
    }


    /**
     * 提交数据
     * 
     * submitData(url)      添加图书
     * 
     * submitData(url, id)  修改图书
     * 
     * */

    // `name=vue111111111111111111111111111111&author=尤小右&category=IT技术&description=一款前端框架的教程&id=${id}`

    function submitData(url, id) {
        let data = $('#form').serialize();
        data += id ? `&id=${id}` : '';

        // console.log('data ====>>>>', data);

        $.ajax({
            url: url,
            type: 'post',
            data: data,
            dataType: 'json',
            success(msg) {
                // console.log('添加图书msg ====>>>>', msg);

                if (msg.code == 0) {
                    // 添加成功 --> 重新加载
                    getListBook()

                    toastr.success('提交成功！');

                } else {
                    toastr.error('提交失败！')
                }
            },

            error(err) {
                console.log('err ====>>>>', err);
                toastr.error('提交失败！')
            }
        })

        // 关闭模态框
        $('#myModal').modal('hide');
    }



    // 关闭模态框的时候重置表单
    $('#myModal').on('hidden.bs.modal', function (e) {
        // 重置表单
        $('#form')[0].reset();
    })

})















































new Vue({
    el: "#app",
    data: {
        message: 'hello koa!'
    },
    delimiters: ['[[', ']]']
})
