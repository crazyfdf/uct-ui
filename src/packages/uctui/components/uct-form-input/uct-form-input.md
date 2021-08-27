##  Input使用方法
``` vue
<uct-form-item :config="config"
                :item="item"></uct-form-item>
```

```js
export default {
  data() {
    return {
      item:{
        "type": "input",
        "label": "输入框",
        "icon": "icon-write",
        "options": {
          "type": "text",
          "width": "100%",
          "defaultValue": "",
          "placeholder": "请输入",
          "clearable": false,
          "maxLength": null,
          "hidden": false,
          "disabled": false
        },
        "model": "input_1612861962073",
        "key": "input_1612861962073",
        "rules": [{
          "required": false,
          "message": "必填项"
        }]
      },
      config:{
        "layout": "horizontal",
        "labelCol": {
          "span": 4
        },
        "wrapperCol": {
          "span": 20
        },
        "hideRequiredMark": false,
        "customStyle": ""
      }
  },
};

```