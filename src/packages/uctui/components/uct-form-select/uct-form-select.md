##  Select使用方法
``` vue
<uct-form-item :config="config"
                :item="item"></uct-form-item>
```

```js
export default {
  data() {
    return {
      item:{
        "type": "select",
        "label": "自定义选择器",
        "icon": "icon-xiala",
        "options": {
          "width": "100%",
          "multiple": false,
          "disabled": false,
          "clearable": false,
          "hidden": false,
          "placeholder": "请选择",
          "dynamicKey": "",
          "dynamic": 1,
          "options": [{
              "value": "1",
              "label": "下拉框1"
            },
            {
              "value": "2",
              "label": "下拉框2"
            }
          ],
          "showSearch": false,
          "defaultValue": "2"
        },
        "model": "select_1612861871170",
        "key": "select_1612861871170",
        "rules": [{
          "required": true,
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