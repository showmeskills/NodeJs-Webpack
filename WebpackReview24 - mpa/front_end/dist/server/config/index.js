const _ = require('lodash')
const path = require('path')

let config = {
    "staticDir": path.join(__dirname, '../..', 'assets'),
    "templateDir": path.join(__dirname, '../..', 'views/books/pages')
}


if(process.env.NODE_ENV == 'development'){
    let localPort = {
        port: 8080,
        baseURL: `http://localhost:8088`
    };

    _.assignIn(config, localPort)
}

if(process.env.NODE_ENV == 'production'){
    let prodPort = {
        port: 80
    };

    _.assignIn(config, prodPort)
}

module.exports = config;