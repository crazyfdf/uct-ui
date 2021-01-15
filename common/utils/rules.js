
const numberReg = /^-?[1-9][0-9]?.?[0-9]*$/
const intReg = /^-?[1-9][0-9]*$/
const phoneReg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
const telephoneReg = /^(0\d{2,3})-?(\d{7,8})$/
const emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const pwdReg = /^.{6,16}$/
const inviteCodeReg = /^[a-zA-Z0-9]{6,16}$/
const idCardReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

export default {
  isNumber: function (val) {
    return numberReg.test(val)
  },
  isInt: function (val) {
    return intReg.test(val)
  },
  isPhone: function (val) {
    return phoneReg.test(val)
  },
  isTelephone: function (val) {
    return telephoneReg.test(val)
  },
  isEmail: function (val) {
    return emailReg.test(val)
  },
  isPwd: function (val) {
    return pwdReg.test(val)
  },
  isInviteCode: function (val) {
    return inviteCodeReg.test(val)
  },
  isIdCardReg: function (val) {
    return idCardReg.test(val)
  },
  rules: function (data, rules) {
    let res = { isOk: true, message: '' }
    if (!rules || !rules.length)
    {
      return res
    }
    for (let rule of rules)
    {
      // rule: {name:'', type:'', message:'', min:1, max:2, eq:'', required:Boolean, regex:''}
      if (!rule || !rule.name || (!rule.type && !rule.required))
      {
        continue
      }
      // 如果值不存在
      if ((!data[rule.name] && data[rule.name] !== 0) || data[rule.name] == "[]")
      {
        // 如果是必填项就返回错误提示，required可以作为type是为了不同的type能给用户不同的提示
        if (rule.type === 'required' || rule.required)
        {
          res = { isOk: false, message: rule.message }
          if (!res.message)
          {
            res.message = '请正确输入所有数据' //默认提示
          }
          return res
        }
        // 如果不是必填项就跳过
        continue
      }
      switch (rule.type)
      {
        // required 上面已经判断过了
        case 'equals':
        case 'eq':
          if (data[rule.name] !== data[rule.eqName])
          {
            res = { isOk: false, message: rule.message }
          }
          break
        case 'number':
          if (!numberReg.test(data[rule.name]))
          {
            res = { isOk: false, message: rule.message }
          }
          break
        case 'int':
          if (!intReg.test(data[rule.name]))
          {
            res = { isOk: false, message: rule.message }
          }
          break
        case 'phone':
          if (!phoneReg.test(data[rule.name]))
          {
            res = { isOk: false, message: rule.message }
          }
          break
        case 'telephone':
          if (!telephoneReg.test(data[rule.name]))
          {
            res = { isOk: false, message: rule.message }
          }
          break
        case 'email':
          if (!emailReg.test(data[rule.name]))
          {
            res = { isOk: false, message: rule.message }
          }
          break
        case 'pwd':
          if (!pwdReg.test(data[rule.name]))
          {
            res = { isOk: false, message: rule.message }
          }
          break
        case 'inviteCode':
          if (!inviteCodeReg.test(data[rule.name]))
          {
            res = { isOk: false, message: rule.message }
          }
          break
        case 'idCard':
          if (!idCardReg.test(data[rule.name]))
          {
            res = { isOk: false, message: rule.message }
          }
          break
        case 'range': // 数字类型的值取值范围
          // {name: 'xxx', type: 'range', min: 6, max: 6, required: true, message: 'xxx'}
          let val = data[rule.name]
          if (val)
          {
            if (numberReg.test(val))
            {
              if (rule.min && val < rule.min)
              {
                res = { isOk: false, message: rule.message }
              } else if (rule.max && val > rule.max)
              {
                res = { isOk: false, message: rule.message }
              }
            } else
            {
              res = { isOk: false, message: rule.message }
            }
          }
          break
        case 'lengthRange': // 字符串长度取值范围
          // {name: 'xxx', type: 'lengthRange', min: 6, max: 6, message: 'xxx'}
          let le = data[rule.name] ? data[rule.name].length : 0
          if (rule.min && le < rule.min)
          {
            res = { isOk: false, message: rule.message }
          } else if (rule.max && le > rule.max)
          {
            res = { isOk: false, message: rule.message }
          }
          break
        case 'regex': // 自定义正则表达式
          // {name: 'xxx', type: 'regex', regex: /^1[0-9]{10,10}$/, message: 'xxx'}
          if (rule.regex && !rule.regex.test(data[rule.name]))
          {
            res = { isOk: false, message: rule.message }
          }
          break
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
    }
    return res
  }
}