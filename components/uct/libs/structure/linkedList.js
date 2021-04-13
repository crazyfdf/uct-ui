/*
 * @Author: your name
 * @Date: 2021-04-07 19:45:52
 * @LastEditTime: 2021-04-09 13:01:29
 * @LastEditors: Please set LastEditors
 * @Description: 链表
 * @FilePath: \UC-font\components\uct\libs\structure\linkList.js
 */
class LinkedList {
  constructor(head = null) {
    this.head = head
    this.length = this.size()
  }
  /**
   * @description: 节点
   * @param {*} data
   * @return {*}
   */
  Node (data) {
    this.data = data
    this.next = null
    return { data: this.data, next: this.next }
  }
  /**
   * @description: 末尾添加节点
   * @param {*} data 节点
   */
  append (data) {
    if (this.length === 0)
    {
      const newNode = this.Node(data)
      this.head = newNode
    }
    else
    {
      const newNode = this.Node(data)
      let current = this.head
      while (current.next)
      {
        current = current.next
      }
      current.next = newNode
    }
    this.length++
  }
  /**
   * @description: 任意位置插入节点
   * @param {*} position 位置
   * @param {*} data 节点
   * @return {*}
   */
  insert (position, data) {
    if (position < 0 || position > this.length) return false
    const newNode = this.Node(data)
    if (position === 0)
    {
      newNode.next = this.head
      this.head = newNode
    }
    else
    {
      let index = 0
      let current = this.head
      let previous = null
      while (index++ < position)
      {
        previous = current
        current = current.next
      }
      newNode.next = current
      previous.next = newNode
    }
    this.length++
  }
  /**
   * @description: 链表查找
   * @param {*} position 查找位置
   * @return {*} 返回值
   */
  get (position) {
    if (position < 0 || position >= this.length) return null
    let current = this.head
    let index = 0
    while (index++ < position)
    {
      current = current.next
    }
    return current.data
  }
  /**
   * @description: 查找链接是否包含节点
   * @param {*} data 查找节点
   * @return {*} 返回节点位置，找不到返回-1
   */
  indexOf (data) {
    let current = this.head
    let index = 0
    while (index < this.length)
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
    let current = this.head
    let index = 0
    while (index++ < position)
    {
      current = current.next
    }
    current.data = newData
    return true
  }
  /**
   * @description: 根据位置删除
   * @param {*} position 位置
   * @return {*} 返回删除元素
   */
  removeAt (position) {
    if (position < 0 || position >= this.length) return false
    let current = this.head
    if (position === 0)
    {
      this.head = this.head.next
    }
    else
    {
      let index = 0
      let previous = null
      while (index++ < position)
      {
        previous = current
        current = current.next
      }
      previous.next = current.next
    }
    this.length--
    return current.data
  }
  /**
   * @description: 根据节点删除
   * @param {*} data 节点
   * @return {*} 返回删除节点位置，没有找到返回-1
   */
  remove (data) {
    let index = 0
    let current = this.head
    let previous = null
    while (index < this.length)
    {
      if (data === current.data)
      {
        previous.next = current.next
        this.length--
        return index
      }
      previous = current
      current = current.next
      index++
    }
    return -1
  }
  /**
 * @description: 是否链表空
 * @return {*} 返回true|false
 */
  isEmpty () {
    return this.length === 0 ? true : false
  }
  /**
   * @description: 链表中节点个数
   * @return {*} 返回链表中节点个数
   */
  size () {
    if (this.length)
    {
      return this.length
    }
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
   * @description: 转字符串
   * @return {*} 返回转字符串
   */
  toString () {
    let current = this.head
    let listString = ''
    while (current)
    {
      listString += current.data
      current = current.next
    }
    return listString
  }
}

let list = new LinkedList()
list.append('123')
list.append('123')
list.append('123')
list.insert(0, '000')
list.insert(3, '333')
list.insert(5, '555')
console.info(list.get(3), list.get(5));
console.log(list.indexOf('123'));
console.log(list.update(5, '111'));
console.log(list.remove('111'));
console.log(list.toString());
let list1 = new LinkedList({ data: '000', next: null })
console.log(list1);