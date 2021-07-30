<!--
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-13 16:08:09
 * @LastEditTime: 2021-04-16 11:42:36
 * @Description: 
-->
##  ScrollItem使用方法
``` vue
<uct-scroll-item class="px40"
                     @success="init"
                     :tabIndex="false"
                     :url="scrollOption.url"
                     :api="scrollOption.api"
                     :more="scrollOption.more"
                     :list="scrollOption.list">
    <view v-for="item in 200"
          class="px40">
      <view>{{item}}</view>
    </view>
</uct-scroll-item>
```

```js
export default {
  data() {
    return {
      /**
       * @description: 子列表配置
       * @param  url:String 请求url,more!:Object|Boolean 请求参数{key:value},api:String 根据api返回list数据,list:Array 请求返回数据
       */
      scrollOption: { url: "", api: "", more: false, list: [] },
    };
  },
};

```