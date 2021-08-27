<!--
 * @Author: your name
 * @Date: 2021-04-13 16:05:26
 * @LastEditTime: 2021-04-16 14:35:11
 * @LastEditors: 祸灵
 * @Description: In User Settings Edit
 * @FilePath: \UC-font\components\uct\components\uct-button\uct-button.md
-->
##  Navbar导航使用方法
``` vue
<uct-nav>
  <view slot="left"
        @click="goBack">返回</view>
  <view slot="center">Navbar导航栏</view>
  <view slot="right">更多</view>
</uct-nav>
```

```js
export default {
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};

```