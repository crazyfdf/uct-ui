##  Switch使用方法
``` vue
<uct-form-item :config="config"
                :item="item"></uct-form-item>
```

```js
export default {
  data() {
    return {
      item:{
        "type": "switch",
        "label": "开关",
        "icon": "icon-kaiguan3",
        "options": {
          "defaultValue": false,
          "hidden": false,
          "disabled": false
        },
        "model": "switch_1612862020078",
        "key": "switch_1612862020078",
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