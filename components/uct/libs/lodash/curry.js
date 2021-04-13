/*
 * @Author: 祸灵
 * @Date: 2021-02-08 17:06:42
 * @LastEditTime: 2021-04-04 13:42:14
 * @LastEditors: 祸灵
 * @Description: 函数柯里化
 * @FilePath: \UC-font\components\uct\libs\lodash\curry.js
 */
/**
 * function getSum(a, b, c) {return a + b + c}
 * const curried = curry(getSum)
 * console.log(curried(1, 2, 3));//6
 * console.log(curried(1)(2, 3));//6
 * console.log(curried(1)(2)(3));//6
 * @description: 柯里化
 * @param {*} func
 * @return {*}
 */
function curry(func) {
  return function curriedFn(...args) {
    // 判断实参和形参的格式
    if (args.length < func.length) {
      return function () {
        return curriedFn(...args.concat(Array.from(arguments)))
      }
    } else {
      return func(...args)
    }
  }
}
module.exports = curry