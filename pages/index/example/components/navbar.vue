<template>
  <view class='navbar'>
    <uct-nav>
      <view slot="left"
            @click="goBack">返回</view>
      <view slot="center">Navbar导航栏</view>
      <view slot="right">更多</view>
    </uct-nav>
  </view>
</template>

<script>
export default {
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>