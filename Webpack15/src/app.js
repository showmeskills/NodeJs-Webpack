import './assets/less/index.css';
import './assets/less/index1.css';
import print from './assets/scripts/print.js';
import {add1} from './assets/scripts/text.js';

add1(1,2)
// import '@babel/polyfill';
print();
const add = function add(x, y) {
  return x + y;
}; // eslint-disable-next-line no-console
// eslint-disable-next-line no-console

console.log(add(2, 5)); // eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars

new Promise(((resolve) => {
  setTimeout(() => {
    resolve('promise over');
  }, 100);
})) // eslint-disable-next-line no-console
  .then((_) => {
  // eslint-disable-next-line no-console
    console.log(_);
  });

  if(module.hot){
    //一旦有module.hot,就说明开启了HMR功能。让HMR功能代码生效
    module.hot.accept(`../assets/scripts/print.js`,function(){//module.hot.accept 监听print.js文件的变化,一旦发生变法,其它默认不会重新打包构建,会执行后面的回调函数
      print();
    })
  }


  /*
    1.eslint 不认识 window,navigator全局变量
    解决:需要修改package.json 中eslintConfgi配置
    "env":{
      "browser":ture
    }
    2.sw代码必须运行在服务器上
    -->nodeJs
    -->
      npm i serve -g
      serve -s build 启动服务器,将build目录下所有资源作为金泰资源暴露出去
  */
  //注册serviceworker
  //处理兼容性问题
  if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
      navigator.serviceWorker
      .register('/service-worker.js')
      .then((_)=>{
        console.log('sw注册成功')
      })
      .catch((_)=>{
        console.log(('sw注册失败'))
      })
    })
  }
