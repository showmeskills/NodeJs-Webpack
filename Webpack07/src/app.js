import '../assets/index.css';
import '../assets/index1.css';
// import '@babel/polyfill';

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
