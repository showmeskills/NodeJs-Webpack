import '../assets/less/index.css';
import '../assets/less/index1.css';
import print from '../assets/scripts/print.js';
import {add1} from '../assets/scripts/text.js';

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
