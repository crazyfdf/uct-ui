const rulesDate = {
  /*  普通的正则表达式 */
  // {name: 'xxx', type: 'number', message: 'xxx'}
  number: /^-?[1-9][0-9]?.?[0-9]*$/,
  int: /^-?[1-9][0-9]*$/,
  phone: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
  telephone: /^(0\d{2,3})-?(\d{7,8})$/,
  email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  pwd: /^.{6,16}$/,
  inviteCode: /^[a-zA-Z0-9]{6,16}$/,
  idCard: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  /*  数字取值范围 */
  // {name: 'xxx', type: 'range', min: 6, max: 6, message: 'xxx'}
  range: (data, rule) => {
    let val = data[rule.name]
    if (val)
    {
      if (numberReg.test(val))
      {
        if (rule.min && val < rule.min)
        {
          return { isOk: false, message: rule.message }
        } else if (rule.max && val > rule.max)
        {
          return { isOk: false, message: rule.message }
        }
      } else
      {
        return { isOk: false, message: rule.message }
      }
    }
  },
  /* 字符串长度取值范围 */
  // {name: 'xxx', type: 'lengthRange', min: 6, max: 6, message: 'xxx'}
  lengthRange: (data, rule) => {
    let le = data[rule.name] ? data[rule.name].length : 0
    if (rule.min && le < rule.min)
    {
      return { isOk: false, message: rule.message }
    } else if (rule.max && le > rule.max)
    {
      return { isOk: false, message: rule.message }
    }
  },
  /* 自定义正则表达式 */
  // {name: 'xxx', type: '/^1[0-9]{10,10}$/', message: 'xxx'}
}
export default {
  isRule: (type, val) => {
    if (rulesDate[type] && typeof rulesDate[type] !== "function")
    {
      return rulesDate[type].test(val)
    }
  },
  rules: (data, rules) => {
    let res = { isOk: true, message: '' }
    if (!rules || !rules.length) { return res }
    for (let rule of rules)
    {
      // rule: {name:'', type:'', message:'', min:1, max:2, eq:'', required:Boolean, regex:''}
      if (!rule || !rule.name || (!rule.type && !rule.required)) { continue }
      // 如果值不存在
      if ((!data[rule.name] && data[rule.name] !== 0) || data[rule.name] == "[]")
      {
        // 如果是必填项就返回错误提示，required可以作为type是为了不同的type能给用户不同的提示
        if (rule.type === 'required' || rule.required)
        {
          return { isOk: false, message: rule.message }
        }
        // 如果不是必填项就跳过
        continue
      }
      // 验证类型是否在已定义的rulesDate中
      if (rulesDate[rule.type] != undefined)
      {
        if (typeof rulesDate[rule.type] == "function") { res = rulesDate[rule.type](data, rule) }
        else
        {
          if (!rulesDate[rule.type].test(data[rule.name])) { res = { isOk: false, message: rule.message } }
        }
      }
      else if (rule.type && !rule.type.test(data[rule.name])) { res = { isOk: false, message: rule.message } }
    }

    // 发现任何一个错误就立即返回，后面的不再判断
    if (!res.isOk)
    {
      if (!res.message)
      {
        res.message = '请正确输入所有数据' //默认提示
      }
      return res
    }
    return res
  }
}