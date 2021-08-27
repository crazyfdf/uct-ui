<!--
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-13 16:08:09
 * @LastEditTime: 2021-04-29 09:57:04
 * @Description: 
-->
##  Scroll使用方法
``` vue
<uct-tabs class="px40"
              :tabs="tabs"
              :tabRight="tabRight"
              v-model="tabIndex"></uct-tabs>
```

```js
export default {
  data() {
    return {
      /**
       * @description: 列表配置
       * @param {object} name!:String "标题"
       */
      tabs: [
        { name: "标题0" },
        { name: "标题1" },
        { name: "标题2" },
        { name: "标题3" },
        { name: "标题4" },
        { name: "标题5" },
      ],
      tabRight: 100, //列表水平滚动间距，为0时为flex平均分布于
      tabIndex: 1, //当前列表下标
    };
  },
  methods: {
    changeTabIndex(v) {
      console.log(v);
    },
  },
};

```