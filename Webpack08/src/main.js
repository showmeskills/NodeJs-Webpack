import './assets/less/index.less';
import print from './assets/scripts/index.js';



if(module.hot){
    module.hot.accept('./assets/scripts/index.js',function(){
        print();
    });
}