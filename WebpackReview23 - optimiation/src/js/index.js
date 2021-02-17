import'$css/index';
import(/* webpackChunkName:'a' */'./a.js') //给chunk命名
.then(({add})=>{
    console.log(add(1,2))
})

