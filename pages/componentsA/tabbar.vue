<!--
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-16 17:13:53
 * @LastEditTime: 2021-04-16 17:20:35
 * @Description: 
-->
<template>
  <view class='tabbar'>
    <uct-nav>
      <view slot="center">Tabbar列表导航栏</view>
    </uct-nav>
    <uct-tabs class="px40"
              :tabs="tabs"
              :tabRight="tabRight"
              @change="changeTabIndex"
              v-model="tabIndex"></uct-tabs>
  </view>
</template>

<script>
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
</script>

<style scoped lang="scss">
</style>