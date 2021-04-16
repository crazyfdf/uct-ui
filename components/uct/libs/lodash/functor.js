/*
 * @Author: 祸灵
 * @Date: 2021-04-04 12:19:14
 * @LastEditTime: 2021-04-16 13:24:50
 * @LastEditors: 祸灵
 * @Description: 函子
 * @FilePath: \UC-font\components\uct\libs\lodash\functor.js
 */
/**
 * 函子是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理(变形关系)
 * let r = Container.of(5).map(x => x + 1).map(x => x * x)//36
 * 副作用 单传入null时可能会变得不纯
 * @description: 函子
 * @param {*}
 * @return {*}
 */
class Container {
  static of(value) {
    return new Container(value);
  }
  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return Container.of(fn(this._value));
  }
}

/**
 * 我们在编程的过程中可能会遇到很多错误，需要对这些错误做对应的处理
 * Maybe函子的作用就是可以对外部的控制情况做处理（控制副作用在允许的范围）
 * let r = Maybe.of(undefined).map(x => x.toUpperCase())//null
 * 可以处理空值，但不知道哪里出了问题
 * @description: Maybe函子
 * @param {*}
 * @return {*}
 */
class Maybe {
  static of(value) {
    return new Maybe(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return this.isNothing() ? Maybe.of(this._value) : Maybe.of(fn(this._value));
  }
  isNothing() {
    return [null, undefined].includes(this._value);
  }
}

/**
 * Either类似if...else...的处理
 * 异常会让函数变的不纯，Either函子可以用来做异常处理
 * 可以处理异常并显示哪里出了问题
 * let r = Either.of('{"name": "zs"}').map(x => JSON.parse(x))//error: Unexpected token o in JSON at position 1
 * @description: Either函子
 * @param {*}
 * @return {*}
 */

class Either {
  static of(value) {
    return new Either(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    try {
      return Either.of(fn(this._value));
    } catch (e) {
      console.log(`error: ${e.message}`);
    }
  }
}

/**
 * IO函子中的_value是一个函数，这里把函数作为值来处理
 * IO函子可以把不纯的动作存储到_value中，延迟执行这个不纯的操作(惰性执行)，包装当前的纯的操作
 * 把不纯的操作交给调用者来处理
 * let r = IO.of(process).map(p => p.execPath);
 * console.log(r._value());//E:\node\node.exe
 *
 * 存在问题：使用函数组合时需要多次调用._value()
 * const fs = require('fs')
 * let readFile = (fileName) => new IO(() => fs.readFileSync(fileName, 'utf-8'))
 * let print = (x) => new IOMonad(() => x)
 * let cat = compose(readFile, print)
 * let r = cat('D:\\UCToo/UC-font/components/uct/libs/lodash/curry.js')._value()._value()
 *
 * @description: IO函子
 * @param {*}
 * @return {*}
 */

const compose = require("./compose.js");
class IO {
  static of(value) {
    return new IO(() => value);
  }
  constructor(fn) {
    this._value = fn;
  }
  map(fn) {
    return new IO(compose(this._value, fn));
  }
}

/** Monad函子是可以变扁的Pointed函子，IO(IO(x))
 * 一个函子如果具有join和flatMap两个方法并遵守一些定律就是一个Monad函子
 * const fs = require('fs')
 * let readFile = (fileName) => new IOMonad(() => fs.readFileSync(fileName, 'utf-8'))
 * let print = (x) => new IOMonad(() => x)
 * let r = readFile('D:\\UCToo/UC-font/components/uct/libs/lodash/curry.js').flatMap(print)._value()
 * @description: Monad函子
 * @param {*}
 * @return {*}
 */

class IOMonad {
  static of(value) {
    return new IOMonad(() => value);
  }
  constructor(fn) {
    this._value = fn;
  }
  map(fn) {
    return new IOMonad(compose(this._value, fn));
  }
  join() {
    return this._value();
  }
  flatMap(fn) {
    return this.map(fn).join();
  }
}
module.exports = {
  Container,
  Maybe,
  Either,
  IO,
  IOMonad,
};
