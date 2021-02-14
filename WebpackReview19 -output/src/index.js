console.log('index.js')


import count from './count.js';


import ('./add').then(({defult:add})=>{
    console.log(add(1,2));
})

console.log(count(5,4))