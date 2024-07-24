const myPromiseRace = (promisesArray) => {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise)
      .then((val) => resolve(val))
      .catch((err) => reject(err));
    });
  });
};


/* Testing */

// Test case 1

// Input:
const test1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, 'one');
});
const test2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'two');
});
const test3 = new Promise(function (resolve, reject) {
  setTimeout(reject, 200, 'three');
});
myPromiseRace([test1, test2, test3]).then(function (value) {
  // first two resolve, 3rd fails, but promise2 is faster
  console.log(value);
}).catch(function (err){
  console.log(err);
});
// Expected Output:
// "two"



// Test Case 2

// Input:
const test4 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, 'one');
});
const test5 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'two');
});
const test6 = new Promise(function (resolve, reject) {
  setTimeout(reject, 40, 'three');
});
myPromiseRace([test4, test5, test6]).then(function (value) {
  // first two resolve, 3rd fails, but promise3 is faster
  console.log(value);
}).catch(function (err){
    console.log(err);
  });
//  Expected Output:
//   "three"