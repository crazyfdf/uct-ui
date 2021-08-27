<!--
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-13 16:08:09
 * @LastEditTime: 2021-04-15 17:56:16
 * @Description: 
-->
##  Button使用方法
``` vue
<uct-button :text="text"
          :time="time"
          :bgColor="bgColor"
          :fontColor="fontColor"
          :rotate="rotate"
          :disabled="disabled"></uct-button>
```

```js
export default {
  data() {
    return {
      time: 10000, //防抖及动画时长
      rotate: true, //是否启动加载
      disabled: false, //是否禁用
      text: "按钮", //显示文本
      bgColor: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.6))", //按钮背景颜色
      fontColor: "#fff", //按钮字体颜色
    };
  },
};

```