##  Check使用方法
``` vue
<uct-form-item :config="config"
                :item="item"></uct-form-item>
```

```js
export default {
  data() {
    return {
      item:{
        "type": "checkbox",
        "label": "多选框",
        "icon": "icon-duoxuan1",
        "options": {
          "disabled": false,
          "hidden": false,
          "defaultValue": [
            "1",
            "2"
          ],
          "dynamicKey": "",
          "dynamic": 1,
          "options": [{
              "value": "1",
              "label": "选项1"
            },
            {
              "value": "2",
              "label": "选项2"
            },
            {
              "value": "3",
              "label": "选项3"
            }
          ]
        },
        "model": "checkbox_1612862100249",
        "key": "checkbox_1612862100249",
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