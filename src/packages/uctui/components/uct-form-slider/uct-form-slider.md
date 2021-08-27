##  Slider使用方法
``` vue
<uct-form-item :config="config"
                :item="item"></uct-form-item>
```

```js
export default {
  data() {
    return {
      item:{
        "type": "slider",
        "label": "滑动输入条",
        "options": {
          "width": "100%",
          "defaultValue": 0,
          "disabled": false,
          "hidden": false,
          "min": 0,
          "max": 100,
          "step": 1,
          "showInput": false
        },
        "model": "slider_1619662388838",
        "key": "slider_1619662388838",
        "help": "",
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