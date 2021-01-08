const path = require('path');
module.exports = {
    entry:path.join(__dirname, 'src','index.js'),
    output:{
        filename:'built.js',
        path:path.join(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins:[

    ],
    mode:'development'
}