/* // action 即为我们的侧关注点，即logger
Function.prototype.after = function (action) {
  //保留当前函数，这里this指向运行函数即clickHandler
  var func = this;
  // return 被包装过的函数，这里就可以执行其他功能了。
  // 并且该方法挂在Function.prototype上，
  // 被返回的函数依然具有after属性,可以链式调用
  return function () {
    // 原函数执行，这里不考虑异步
    var result = func.apply(this, arguments);
    // 执行之后的操作
    action.apply(this, arguments);
    // 将执行结果返回
    return result;
  };
};
// before 实现类似，只不过执行顺序差别而已
Function.prototype.before = function (action) {
  var func = this;
  return function () {
    action.apply(this, arguments);
    return func.apply(this, arguments);
  };
}; */

Function.prototype.before = function (beforefn) {
  var __self = this;
  return function () {
    if (beforefn.apply(this, arguments))
    {
      return __self.apply(this, arguments);
    }
  };
};

Function.prototype.after = function (afterfn) {
  var __self = this;
  return function () {
    var ret = __self.apply(this, arguments);
    if (ret)
    {
      afterfn.apply(this, arguments);
    }
    return ret;
  };
};

Function.prototype.around = function (beforefn, afterfn) {
  var __self = this;
  return function () {
    if (beforefn.apply(this, arguments))
    {
      var ret = __self.apply(this, arguments);
      if (ret)
      {
        afterfn.apply(this, arguments);
      }
      return ret;
    }
  };
};