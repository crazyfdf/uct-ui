/*
 * @Author: your name
 * @Date: 2021-04-06 19:26:08
 * @LastEditTime: 2021-04-08 19:32:28
 * @LastEditors: Please set LastEditors
 * @Description: 队列
 * @FilePath: \UC-font\components\uct\libs\structure\queue.js
 */
class Queue {
  constructor(items = []) {
    this.items = items
    this.length = this.size()
  }
  /**
   * @description: 入队
   * @param {*} element 入队元素
   */
  enqueue (element) {
    this.items.push(element)
    this.length++
  }
  /**
   * @description: 出队
   * @return {*} 返回队值
   */
  dequeue () {
    this.length--
    return this.items.shift()
  }
  /**
   * @description: 查看队头
   * @return {*}  返回队头元素
   */
  peek () {
    return this.items[0]
  }
  /**
   * @description: 是否队列空
   * @return {*} 返回true|false
   */
  isEmpty () {
    return this.length === 0 ? true : false
  }
  /**
  * @description: 队列中元素个数
  * @return {*} 返回队列中元素个数
  */
  size () {
    return this.items.length
  }
  /**
   * @description: 队列中元素转string
   * @return {*}  返回string后的队列内元素
   */
  toString () {
    return this.items.join('')
  }
}

// 击鼓传花
function passGame (nameList, num) {
  let queue = new Queue()
  nameList.forEach(item => {
    queue.enqueue(item)
  })
  while (queue.length > 1)
  {
    for (let index = 0; index < num - 1; index++)
    {
      queue.enqueue(queue.dequeue())
    }
    queue.dequeue()
  }
  let name = queue.peek()
  let index = nameList.indexOf(name)
  return { name, index }
}
console.log(passGame([1, 2, 3, 4, 5], 3));

