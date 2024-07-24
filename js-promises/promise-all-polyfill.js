/* Polyfill Implementation of Promise.all() method */

const myPromiseAll = (promisesArray) => {

  // Result array to store the result 
  const result = [];

  // Promises count to track the number of promises completed
  let promisesCount = 0;

  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
      .then((val) => {
        result[index] = val;
        promisesCount += 1;

        // If all promises have been resolved, resolve the overall promise
        if(promisesArray.length === promisesCount) {
          resolve(result)
        }
      })
      .catch((err) => reject(err))
    })
  })
}

/* Testing */

// Test Case 1
function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
}); }
const taskList = [task(1000), task(5000), task(3000)];
//run promise.all
myPromiseAll(taskList)
  .then(results => {
    console.log("got results", results)
  })
  .catch(console.error);
//Output:
//"got results" [1000,5000,3000]

// Test Case 2
function task2(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if(time < 3000){
        reject("Rejected");
      }else{
        resolve(time);
      }
}, time); });
}
const taskList2 = [task2(1000), task2(5000), task2(3000)];
//run promise.all
myPromiseAll(taskList2)
  .then(results => {
    console.log("got results", results)
  })
  .catch(console.error);
// Output:
// "Rejected"