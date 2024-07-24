/* Polyfill for Promise.any() method of JS Promises */

const myPromiseAny = (promisesArray) => {
  const errorResult = new Array(promisesArray.length);
  let promiseCount = 0;

  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((val) => resolve(val))
        .catch((err) => {
          errorResult[promiseCount] = err;
          promiseCount += 1;
          if (errorResult.length === promiseCount) {
            reject(errorResult);
          }
        });
    });
  });
};


/* Test Cases */

//Input:
const test1 = new Promise(function (resolve, reject) {
  setTimeout(reject, 500, 'one');
});
const test2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 600, 'two');
});
const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, 'three');
});
myPromiseAny([test1, test2, test3]).then(function (value) {
  // first and third fails, 2nd resolves
  console.log(value);
}).catch(function (err){
  console.log(err);
});
// Expected Output:
// "two"



//Input:
const test4 = new Promise(function (resolve, reject) {
setTimeout(reject, 500, 'one');
});
const test5 = new Promise(function (resolve, reject) {
  setTimeout(reject, 600, 'two');
});
const test6 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, 'three');
});
myPromiseAny([test4, test5, test6]).then(function (value) {
  console.log(value);
}).catch(function (err){
  // all three fails
  console.log(err);
});
// Expected Output:
// ["three","one","two"]