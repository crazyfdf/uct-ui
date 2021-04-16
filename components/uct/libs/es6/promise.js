/*
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-14 20:16:31
 * @LastEditTime: 2021-04-15 20:06:24
 * @Description:promise
 * 1.promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
 * 2.promise 中有三种状态 分别是 成功 fulfilled 失败 rejected 等待 pending
 * pending -> fulfilled
 * pending -> rejected
 * 一旦状态确定就不可更改
 * 3.resolve和reject函数是用来更改状态的
 * resolve:fulfilled
 * reject:rejected
 * 4.then方法内部做的事就是判断状态，如果状态是成功，调用成功的回调函数。如果是失败，调用失败的回调函数。then方法是定义在原型对象中的。
 * 5.then成功回调有一个参数，表示成功之后的值，then失败回调有一个参数，表示失败后的原因
 * 6.同一个promise对象下面的then方法是可以被调用多次的
 * 7.then方法是可以被链式调用的，后面then方法的回调函数拿到得到值是上一个then方法的回调函数的返回值
 */
const PENDING = "pending"; //等待
const FULFILLED = "fulfilled"; //成功
const REJECTED = "executor"; //失败

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  //promise 状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败的原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];
  resolve = value => {
    if (this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保持成功之后的值
    this.value = value;
    // 判断成功回调是否存在 如果存在就调用
    while (this.successCallback.length) this.successCallback.shift()();
  };
  reject = reason => {
    if (this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED;
    // 保持失败后的原因
    this.reason = reason;
    // 判断失败回调是否存在 如果存在就调用
    while (this.failCallback.length) this.failCallback.shift()();
  };
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback
      ? failCallback
      : reason => {
          throw reason;
        };
    let promise2 = new MyPromise((resolve, reject) => {
      // 成功
      if (this.status === FULFILLED) {
        // 为了获取promise2
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 失败
      else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 等待
      else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
  finally(callback) {
    return this.then(
      value => {
        return MyPromise.resolve(callback()).then(() => value);
      },
      reason => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  }
  catch(failCallback) {
    return this.then(undefined, failCallback);
  }
  static all(array) {
    let result = [];
    let index = 0;
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        if (index === array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        // promise对象
        if (current instanceof MyPromise) {
          current.then(
            value => addData(i, value),
            reason => reject(reason)
          );
        }
        // 普通值
        else {
          addData(i, array[i]);
        }
      }
    });
  }
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }
}
/**
 * 1.判断x的值是普通值还是promise对象
 * 2.如果是普通值，直接调用resolve，
 * 3.如果是promise对象，查看promise对象的返回结果
 * 4.根据promise对象的返回结果，决定调用resolve还是reject
 * @param {promise|基础数据类型} x
 * @param {function} resolve
 * @param {function} reject
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x)
    return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  if (x instanceof MyPromise) {
    // promise对象
    // x.then(resolve(value),reason=>reject(reason))
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

// function other() {
//   return new MyPromise((resolve, reject) => {
//     resolve('other')
//   })
// }
// let promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject('失败')
//   }, 2000);
//   // throw new Error('exector orrr')
//   // resolve('成功')
// })
// promise.then(value => { console.log(value); return 2000 }, reason => { console.log(111 + reason); return 'bbb' }).then(value => { console.log(value); return value }, reason => { console.log(222 + reason); return reason }).then(value => { console.log(value); return value }, reason => { console.log(3333 + reason); return reason })
// promise.then().then(value => {
//   console.log(value);
//   return value
// }, reason => {
//   console.log(3333 + reason);
//   return reason
// })

function p1() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("p1");
    }, 2000);
  });
}

function p2() {
  return new MyPromise((resolve, reject) => {
    reject("p2");
  });
}

// MyPromise.all(['a', 'b', p1(), p2(), 'c']).then(res => {
//   console.log(res);
// })
p2()
  .then(value => {
    console.log(value);
  })
  .catch(reason => {
    console.log(reason);
  });
