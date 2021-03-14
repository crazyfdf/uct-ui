class AdapterFactory {
  constructor(name, value) {
    value.length == 1 ? this.single(name, value) : this.multiple(name.model, value);
  }
  single (name, value) {
    if (name.rules[1] && name.rules[1].message == 'img')
    {
      let data = JSON.parse(name.options.data)
      value.forEach((item) => {
        this[data.id] = item.uploadfilekey;
        this[data.url] = item.localvurl;
      });
      console.log(data);
    }
    else
    {
      value.forEach((item) => {
        this[`${name.model}id`] = item.uploadfilekey;
        this[`${name.model}url`] = item.localvurl;
      });
    }
  }
  multiple (name, value) {
    this[`${name}list`] = [];
    value.forEach((item) => {
      let data = {};
      data[`${name}id`] = item.uploadfilekey;
      data[`${name}url`] = item.localvurl;
      this[`${name}list`].push(data);
    });
  }
}
class Adapter {
  constructor(options) {
    this.actions = options.uploadurl;
    this.formData = {
      key: options.uploadfilekey,
      token: options.uploadauth,
    };
  }
}

const formType = {
  1: "input",
  6: "radio",
  7: "checkbox",
  8: "select"
}
class FormAdapter {
  constructor(options) {
    let list = []
    this.list = []
    if (options.optionsinfo)
    {
      list = options.optionsinfo.split(',').map(item => {
        return {
          value: item,
          label: item
        }
      })
    }
    options.forEach(item => {
      let data = {
        "type": formType[item.coltype],
        "label": item.colname,
        "placeholder": item.placeholder,
        "key": item.colindex,
        "rules": [{
          "required": item.isnotnull == 0 ? false : true,
          "message": "必填项"
        }],
        "model": item.colinnerid,
        "options": list
      }
      this.list.push(data)
    })
    this.list.push({
      "type": "button",
      "label": "提交",
      "options": {
        "type": "primary",
        "handle": "submit",
        "dynamicFun": "",
        "hidden": false,
        "disabled": false
      },
      "key": "button_1607930140236"
    })
    this.config = {
      "layout": "vertical",
      "labelCol": {
        "span": 4
      },
      "wrapperCol": {
        "span": 20
      },
      "hideRequiredMark": false,
      "customStyle": ""
    }
  }
}
export { AdapterFactory, Adapter, FormAdapter } 