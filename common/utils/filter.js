export default {
  /**
  * 格式化时间
  */
  // 年月日，时分秒
  // "YYYY-MM-DD HH:MM"
  dateFormat (fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(), // 年
      "M+": (date.getMonth() + 1).toString(), // 月
      "D+": date.getDate().toString(), // 日
      "h+": date.getHours().toString(), // 时
      "m+": date.getMinutes().toString(), // 分
      "s+": date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt)
    {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret)
      {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  },
  //取截单元,单位
  numberFormat (arg) {
    if (arg.toString().length >= 13)
    {
      // return arg/1000000000000+"万亿"
      const numbers = arg / 1000000000000
      const realVal = parseFloat(numbers).toFixed(2);
      return realVal + "万亿"

    } else if (arg.toString().length >= 9)
    {
      const numbers = arg / 100000000
      const realVal = parseFloat(numbers).toFixed(2);
      return realVal + "亿"
    } else if (arg.toString().length >= 4)
    {
      const numbers = arg / 10000
      const realVal = parseFloat(numbers).toFixed(2);
      return realVal + "万"
    } else if (arg.toString().length < 2)
    {
      const realVal = `0${arg}`;
      return realVal
    }
    else
    {
      return arg
    }
  },
  color (index) {
    let tcolor = "rgba(181, 181, 181, 1)";
    switch (index)
    {
      case 1:
        tcolor = "rgba(255, 43, 43, 1);";
        break;
      case 2:
        tcolor = "rgba(255, 102, 102, 1);";
        break;
      case 3:
        tcolor = "rgba(255, 191, 43, 1);";
        break;
      default:
        tcolor = "rgba(181, 181, 181, 1);";
        break;
    }
    return "color:" + tcolor;
  },
}