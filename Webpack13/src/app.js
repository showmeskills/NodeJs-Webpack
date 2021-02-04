/*
lazy loading and Prefetch
1.lazy loading 是触发一些条件才会加载(不会自动加载)
2.对js文件懒加载
3.工作原理,使用Promise的回调函数,当触发的时候才进行调用文件
4.懒加载的问题,如果文件体积比较打,用户点击的时候会有延迟的效果,所有可以配置预加载来解决这个问题,但是Prefetch兼容性太别差
Prefetch 预加加载 为了等其它资源加载完毕,浏览器空闲了再偷偷加载
1.打包文件时候,js文件已经提前被加载完毕
2.当使用lazy loading的时候,只会调用预加载保存到缓存的文件
3.使用 webpackPrefetch:true
正常加载可以认为是并行加载(同一事件加载多个文件)
*/
console.log('app.js文件被加载了~~')


document.getElementById('btn').onclick = function(){
  //lazy loading
  //Prefetch 预加载
  import(/* webpackChunkName:'test',webpackPrefetch:true */'./assets/scripts/test.js')
  .then(({add,minus}) =>{
    console.log(add(4,5));
    console.log(minus(5,2));
  })
  .catch(_=>{
    console.log(_)
  })
}




