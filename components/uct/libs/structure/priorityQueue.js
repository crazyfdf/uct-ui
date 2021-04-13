/*
 * @Author: your name
 * @Date: 2021-04-06 20:16:42
 * @LastEditTime: 2021-04-08 19:32:37
 * @LastEditors: Please set LastEditors
 * @Description: 优先级队列
 * @FilePath: \UC-font\components\uct\libs\structure\priorityQueue.js
 */
class PriorityQueue {
  constructor(items = []) {
    this.items = items
    this.length = this.size()
  }
  QueueElement (element, priority) {
    this.element = element
    this.priority = priority
    return { element: this.element, priority: this.priority }
  }
  enqueue (element, priority) {
    const queueElement = this.QueueElement(element, priority)
    if (this.length === 0)
    {
      this.items.push(queueElement)
    }
    else
    {
      let added = false
      for (let i = 0; i < this.length; i++)
      {
        if (queueElement.priority < this.items[i].priority)
        {
          this.items.splice(i, 0, queueElement)
          added = true
          break;
        }
      }
      if (!added)
      {
        this.items.push(queueElement)
      }
    }
    this.length++
  }
  /**
     * @description: 出队
     * @return {*} 返回队值
     */
  dequeue () {
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
    let resultString = ''
    for (const item of this.items)
    {
      resultString += `${item.element}-${item.priority}`
    }
    return resultString
  }
}
let pq = new PriorityQueue()
pq.enqueue('abc', 11)
pq.enqueue('gbc', 12)
pq.enqueue('abc', 11)
pq.enqueue('abc', 4)
pq.enqueue('abc', 5)
pq.enqueue('abc', 11)
pq.enqueue('abc', 1)

console.log(pq.toString());