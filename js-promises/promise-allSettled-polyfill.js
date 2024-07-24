
const myPromiseAllSettled = (promisesArray) => {
    const mappedPromises = promisesArray.map((promise) => {
        return Promise.resolve(promise).then(
            val => ({ status: 'fulfilled', value: val }),
            err => ({ status: 'rejected', reason: err })
      )
    })

    return Promise.all(mappedPromises)
}

/* Testing */

// Input:
const a = new Promise((resolve) => setTimeout(() => { resolve(3) },200));
const b = new Promise((resolve,reject) => reject(9));
const c = new Promise((resolve) => resolve(5));
myPromiseAllSettled([a, b, c]).then((val)=> {console.log(val)});

//Expected Output: [
//   {
//     "status": "fulfilled",
//     "value": 3
// }, {
//     "status": "rejected",
//     "reason": 9
//   },
//   {
//     "status": "fulfilled",
//     "value": 5
// } ]