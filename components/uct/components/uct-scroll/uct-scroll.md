<!--
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-13 16:08:09
 * @LastEditTime: 2021-04-16 11:38:43
 * @Description: 
-->
##  Scroll使用方法
``` vue
<uct-scroll :tabs="tabs"
                class="px40"
                @success="init"
                v-model="tabIndex"
                @change="changeTabIndex"
                :tabRight="tabRight">
      <view v-for="item in 200"
            class="px40">
        <view>{{item}}</view>
      </view>
    </uct-scroll>
```

```js
export default {
  data() {
    return {
      /**
       * @description: 列表配置
       * @param {object} name!:String "标题",url:String 请求url,more!:Object|Boolean 请求参数{key:value},api:String 根据api返回list数据,list:Array 请求返回数据
       */
      tabs: [
        { name: "标题0", url: "", api: "", more: false, list: [] },
        { name: "标题1", url: "", api: "", more: false, list: [] },
        { name: "标题2", url: "", api: "", more: false, list: [] },
        { name: "标题3", url: "", api: "", more: false, list: [] },
        { name: "标题4", url: "", api: "", more: false, list: [] },
        { name: "标题5", url: "", api: "", more: false, list: [] },
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