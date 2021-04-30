# Route 路由跳转

## Route 路由跳转使用方法
```
/**
* @description: 跳转再封装，不支持复杂传参。
* @param {string} path 跳转地址
* @param {object} params 跳转携带对参数
* @param {number} type 跳转类型
    0: "navigateTo", //保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
    1: "redirectTo", //关闭当前页面，跳转到应用内的某个页面。
    2: "reLaunch", //关闭所有页面，打开到应用内的某个页面。
    3: "switchTab", //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
*/
this.$uct.to(path, params = {}, type = 0)
```
## Route 路由跳转案例
```vue
<template>
  <view class="px40">
    <uct-nav>
      <view slot="center">Route 路由跳转</view>
    </uct-nav>
    <uct-button class="mt40" @click="item.handler" v-for="(item, index) in router" :key="index">
      <view slot="text" class="f14">{{ item.text }}</view>
    </uct-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      router: [
        {
          text: "保留当前页面，跳转到应用内的某个页面",
          handler: () => this.$uct.to("/pages/example/components/empty", {}, 0),
        },
        {
          text: "关闭当前页面，跳转到应用内的某个页面",
          handler: () => this.$uct.to("/pages/example/components/empty", {}, 1),
        },
        {
          text: "关闭所有页面，打开到应用内的某个页面",
          handler: () => this.$uct.to("/pages/example/components/empty", {}, 2),
        },
        {
          text: "跳转到tabBar页面，并关闭其他所有非tabBar页面",
          handler: () => this.$uct.to("/pages/example/components/empty", {}, 3),
        },
        {
          text: "跳转外部链接。例如：百度",
          handler: () => this.$uct.to("http://www.baidu.com"),
        },
      ],
    };
  },
};
</script>
```