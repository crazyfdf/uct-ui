/* 颜色配置 */
const colorType = {
  1: "rgba(255, 43, 43, 1);",
  2: "rgba(255, 102, 102, 1);",
  3: "rgba(255, 191, 43, 1);",
  primary: "#1464c7",
  danger: "red",
  dashed: "white",
  default: "rgba(181, 181, 181, 1);",
};

export default {
  /**
   * @description: 格式化时间
   * @param {date|number} date Date格式数据
   * @param {string} fmt 年月日，时分秒,"YYYY-MM-DD HH:MM"
   * @return {string} 返回"YYYY-MM-DD HH:MM"格式字符串
   */
  timeFormat(date = null, fmt = "YYYY-MM-DD") {
    // 如果为null,则格式化当前时间
    if (!date) date = Number(new Date());
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (date.toString().length == 10) date *= 1000;
    date = new Date(date);
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(), // 年
      "M+": (date.getMonth() + 1).toString(), // 月
      "D+": date.getDate().toString(), // 日
      "h+": date.getHours().toString(), // 时
      "m+": date.getMinutes().toString(), // 分
      "s+": date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
    return fmt;
  },
  /**
   * @description: 取截单元,单位
   * @param {number} number 数字
   * @return {string} 格式化后的数字
   */

  numberFormat(number) {
    if (number.toString().length >= 13) {
      // return number/1000000000000+"万亿"
      const numbers = number / 1000000000000;
      const realVal = parseFloat(numbers).toFixed(2);
      return realVal + "万亿";
    } else if (number.toString().length >= 9) {
      const numbers = number / 100000000;
      const realVal = parseFloat(numbers).toFixed(2);
      return realVal + "亿";
    } else if (number.toString().length >= 4) {
      const numbers = number / 10000;
      const realVal = parseFloat(numbers).toFixed(2);
      return realVal + "万";
    } else if (number.toString().length < 2) {
      const realVal = `0${number}`;
      return realVal;
    } else {
      return number;
    }
  },
  color(type) {
    return colorType[type];
  },
};
