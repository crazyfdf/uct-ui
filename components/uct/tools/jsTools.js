/**
 * 判断类型
 * @param {*} obj 判断对象
 * @param {*} type 判断的类型
 * @returns 返回Boolean
 */
const isType = (obj, type) => {
  return Object.prototype.toString.call(obj) === `[object ${type}]`;
};

let timer = null;
/**
 * 防抖
 * debounce(fnc,1000,true)
 * @param {Function} func 回调函数
 * @param {Number} time 防抖时间默认500毫秒
 * @param {Boolean} isImmediate 是否立即执行
 * @returns
 */
const debounce = (func, time = 500, isImmediate = true) => {
  if (timer !== null) clearTimeout(timer);
  if (isImmediate) {
    if (!timer) {
      typeof func === "function" && func();
    }
    timer = setTimeout(() => {
      timer = null;
    }, time);
  } else {
    timer = setTimeout(() => {
      typeof func === "function" && func();
    }, time);
  }
};

let prev = new Date();
let flag = true;
/**
 * 节流
 * throttle(fnc,1000,true)
 * @param {Function} func 回调函数
 * @param {Number} time 节流时间默认500毫秒
 * @param {Boolean} isImmediate 是否立即执行
 * @returns
 */
const throttle = (func, time = 500, isImmediate = true) => {
  if (isImmediate) {
    if (typeof func === "function") {
      const now = new Date();
      if (now - prev > time) {
        if (flag) {
          func();
          flag = false;
        }
        prev = new Date();
        flag = true;
      }
    }
  } else {
    if (typeof func === "function") {
      flag = false;
      func = function(...args) {
        const now = new Date();
        if (now - prev > time) {
          if (flag) {
            func();
            flag = false;
          }
          prev = new Date();
          flag = true;
        }
      };
    }
  }
};

/**
 * deep clone
 * @param  {[type]} parent object 需要进行克隆的对象
 * @return {[type]}  深克隆后的对象
 */
const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];
  const _clone = parent => {
    if (parent === null) return null;
    // 原生数据直接返回
    if (typeof parent !== "object" && typeof obj !== "function") return parent;

    let child, proto;

    if (isType(parent, "Array")) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, "RegExp")) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, "Date")) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
};

/**
 * 只执行一次，cache 缓存
 * @param {Function} f 回调函数
 * @returns 返回Boolean
 */
let cache = {};
const once = f => {
  return async function(key) {
    // console.log(cache[key]);
    if (cache[key]) {
      return cache[key];
    } else {
      cache[key] = true;
      await f.apply(f, arguments);
      return cache[key];
    }
  };
};

export default { once, clone, debounce, throttle };
