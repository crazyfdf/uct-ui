/*
 * @Author: 祸灵
 * @Date: 2021-04-03 16:39:25
 * @LastEditTime: 2021-04-15 19:01:19
 * @LastEditors: 祸灵
 * @Description: 函数组合
 * @FilePath: \UC-font\components\uct\libs\lodash\compose.js
 */
/**
 * const reverse = arr => arr.reverse()
 * const first = arr => arr[0]
 * const toUpper = s => s.toUpperCase()
 * const f = compose(reverse, first, toUpper)
 * console.log(f(['one', 'two', 'three']))//THREE
 * @description: 函数组合
 * @param {array} args 组合的函数
 * @param {any} value 函数的值
 * @return {*}
 */
// function compose(...args) {
//   return function (value) {
//     return args.reduce(function (acc, fn) {
//       return fn(acc)
//     }, value)
//   }
// }
const compose = (...args) => value => args.reduce((acc, fn) => fn(acc), value)
module.exports = compose