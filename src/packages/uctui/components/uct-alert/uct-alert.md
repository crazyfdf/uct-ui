##  Alert使用方法
``` vue
<uct-form-item :config="config"
                :item="item"></uct-form-item>
```

```js
export default {
  data() {
    return {
      item:{
        "type": "alert",
        "label": "提示",
        "options": {
          "type": "success",
          "description": "这是success提示",
          "showIcon": true,
          "banner": true,
          "hidden": false,
          "closable": true
        },
        "key": "alert_1619342193554"
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