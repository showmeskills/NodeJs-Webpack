(()=>{
    alert(`single entry file has accessed`)
})();

import(/*webpackChunkName:'test'*/'./assets/scripts/test')
.then(({add,minus})=>{
    console.log(add(1,2))
    console.log(minus(4,1))
})
.catch(_=>{
    console.log(`${_}loading failed`)
});

import(/*webpackChunkName:'print'*/'./assets/scripts/print')
.then(print=>{
    console.log(print.default());
})
.catch(_=>{
    console.log(`${_}loading failed`)
})