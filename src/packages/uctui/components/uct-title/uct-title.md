##  Title使用方法
``` vue
<uct-form-item :config="config"
                :item="item"></uct-form-item>
```

```js
export default {
  data() {
    return {
      item:{
        "type": "text",
        "label": "标题",
        "icon": "icon-zihao",
        "options": {
          "textAlign": "left",
          "hidden": false,
          "showRequiredMark": false
        },
        "key": "text_1612861438281"
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