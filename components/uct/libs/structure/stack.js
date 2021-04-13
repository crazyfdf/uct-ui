/*
 * @Author: 祸灵
 * @Date: 2021-04-06 18:38:49
 * @LastEditTime: 2021-04-08 19:31:06
 * @LastEditors: Please set LastEditors
 * @Description: 栈
 * @FilePath: \UC-font\components\uct\libs\structure\structure.js
 */
class Stack {
  constructor(items = []) {
    this.items = items
    this.length = this.size()
  }
  /**
   * @description: 入栈
   * @param {*} element 入栈元素
   */
  push (element) {
    this.items.push(element)
    this.length++
  }
  /**
   * @description: 出栈
   * @return {*} 返回栈顶
   */
  pop () {
    this.length--
    return this.items.pop()
  }
  /**
   * @description: 查看栈顶
   * @return {*}  返回栈顶元素
   */
  peek () {
    return this.items[this.length - 1]
  }
  /**
   * @description: 是否栈空
   * @return {*} 返回true|false
   */
  isEmpty () {
    return this.length === 0 ? true : false
  }
  /**
 * @description: 栈中元素个数
 * @return {*} 返回栈中元素个数
 */
  size () {
    return this.items.length
  }
  /**
   * @description: 栈中元素转string
   * @return {*}  返回string后的栈内元素
   */
  toString () {
    return this.items.join('')
  }
}
function dec2bin (decNumber) {
  let stack = new Stack()
  let binaryString = ''
  while (decNumber > 0)
  {
    stack.push(decNumber % 2)
    decNumber = Math.floor(decNumber / 2)
  }
  while (!stack.isEmpty())
  {
    binaryString += stack.pop()
  }
  return binaryString
}

console.log(dec2bin(123));