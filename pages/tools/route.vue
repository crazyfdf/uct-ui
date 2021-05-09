<template>
  <view class="px40">
    <uct-nav>
      <view slot="center">Route 路由跳转</view>
    </uct-nav>
    <uct-button class="mt40"
                @click="item.handler"
                v-for="(item, index) in router"
                :key="index">
      <view slot="text"
            class="f14">{{ item.text }}</view>
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
          handler: () => this.$uct.to("/pages/components/empty", {}, 0),
        },
        {
          text: "关闭当前页面，跳转到应用内的某个页面",
          handler: () => this.$uct.to("/pages/components/empty", {}, 1),
        },
        {
          text: "关闭所有页面，打开到应用内的某个页面",
          handler: () => this.$uct.to("/pages/components/empty", {}, 2),
        },
        {
          text: "跳转到tabBar页面，并关闭其他所有非tabBar页面",
          handler: () => this.$uct.to("/pages/components/empty", {}, 3),
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
