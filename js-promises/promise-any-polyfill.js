/* Polyfill for Promise.any() method of JS Promises */

const myPromiseAny = (promisesArray) => {
  const errorResult = new Array(promisesArray.length);
  let promiseCount = 0;

  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise, index) => {
      promise
        .then((val) => resolve(val))
        .catch((err) => {
          errorResult[index] = err;
          promiseCount += 1;
          if (errorResult.length === promiseCount) {
            reject(errorResult);
          }
        });
    });
  });
};


