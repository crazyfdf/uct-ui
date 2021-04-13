/*
 * @Author: your name
 * @Date: 2021-04-08 19:06:10
 * @LastEditTime: 2021-04-12 10:06:33
 * @LastEditors: Please set LastEditors
 * @Description: 双向链表
 * @FilePath: \UC-font\components\uct\libs\structure\doublyLinkedList.js
 */
class DoublyLinkedList {
  constructor(head = null, tail = null) {
    this.head = head
    this.tail = tail
    this.length = this.size()
  }
  Node (data) {
    this.data = data
    this.prev = null
    this.next = null
    return { data: this.data, prev: this.prev, next: this.next }
  }
  /**
   * @description: 将节点添加带链表尾部
   * @param {*} data 节点
   */
  append (data) {
    const newNode = this.Node(data)
    if (this.length === 0)
    {
      this.head = newNode
      this.tail = newNode
    }
    else
    {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
  }
  /**
   * @description: 链表插入
   * @param {*} position 插入位置
   * @param {*} data 插入节点
   * @return {*} 
   */
  insert (position, data) {
    if (position < 0 || position >= this.length) return false
    const newNode = this.Node(data)
    if (this.length === 0)
    {
      this.head = newNode
      this.tail = newNode
    }
    else
    {
      if (position === 0)
      {
        this.head.prev = newNode
        newNode.next = this.head
        this.head = newNode
      }
      else if (position === this.length)
      {
        newNode.prev = this.tail
        this.tail.next = newNode
        this.tail = newNode
      }
      else
      {
        let current = this.head
        let index = 0
        while (index++ < position)
        {
          current = current.next
        }
        newNode.next = current
        newNode.prev = current.prev
        current.prev.next = newNode
        current.prev = newNode
      }
    }
    this.length++
    return true
  }
  /**
   * @description: 链表查找
   * @param {*} position 查找位置
   * @return {*} 返回值
   */
  get (position) {
    if (position < 0 || position >= this.length) return null
    if (this.length / 2 > position)
    {
      let index = 0
      let current = this.head
      while (index++ < position)
      {
        current = current.next
      }
      return current.data
    }
    else
    {
      let index = this.length - 1
      let current = this.tail
      while (index-- < position)
      {
        current = current.prev
      }
      return current.data
    }
  }
  /**
   * @description: 查找链接是否包含节点
   * @param {*} data 查找节点
   * @return {*} 返回节点位置，找不到返回-1
   */
  indexOf (data) {
    let current = this.head
    let index = 0
    while (current)
    {
      if (current.data === data)
      {
        return index
      }
      current = current.next
      index++
    }
    return -1
  }
  /**
   * @description: 修改节点
   * @param {*} position 位置
   * @param {*} newData 新节点
   * @return {*}
   */
  update (position, newData) {
    if (position < 0 || position >= this.length) return false
    if (this.length / 2 > position)
    {
      let current = this.head
      let index = 0
      while (index++ < position)
      {
        current = current.next
      }
      current.data = newData
    }
    else
    {
      let index = this.length - 1
      let current = this.tail
      while (index-- < position)
      {
        current = current.prev
      }
      current.data = newData
    }
    return true
  }
  removeAt (position) {
    if (position < 0 || position >= this.length) return null
    if (this.length === 1)
    {
      this.head = null
      this.tail = null
    }
    else
    {
      if (position === 0)
      {

      }
    }
  }
  /**
   * @description: 链表中节点个数
   * @return {*} 返回链表中节点个数
   */
  size () {
    let index = 0
    let current = this.head
    while (current)
    {
      current = current.next
      index++
    }
    return index
  }
  /**
   * @description: 遍历
   * @return {*} 遍历后的字符串
   */
  toString () {
    return this.backwardString()
  }
  /**
   * @description: 向前遍历
   * @return {*} 遍历后的字符串
   */
  forwardString () {
    let current = this.tail
    let resultString = ""
    while (current)
    {
      resultString += current.data
      current = current.prev
    }
    return resultString
  }
  /**
   * @description: 向后遍历
   * @return {*} 遍历后的字符串
   */
  backwardString () {
    let current = this.head
    let resultString = ""
    while (current)
    {
      resultString += current.data
      current = current.next
    }
    return resultString
  }
}
let list = new DoublyLinkedList()
list.append('111')
list.append('222')
list.append('333')
list.insert(0, '444')
list.insert(4, '555')
list.insert(2, '666')
list.update(2, '555')
console.log(list.get(2));
