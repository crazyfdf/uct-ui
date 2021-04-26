<template>
  <view class="nav-wrap">
    <view class="nav-title">
      <image class="logo" src="/static/imgs/logo/logo.png" mode="widthFix"></image>
      <view class="nav-info">
        <view class="nav-title__text"> uct-ui </view>
        <view class="nav-slogan"> 多平台快速开发的UI框架 </view>
      </view>
    </view>
    <view class="nav-desc">
      {{ desc }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    desc: String,
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.nav-wrap {
  padding: 15px;
  position: relative;
}

.nav-title {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}

.nav-info {
  margin-left: 15px;
}

.nav-title__text {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  color: $u-main-color;
  font-size: 25px;
  font-weight: bold;
}

.logo {
  width: 70px;
  /* #ifndef APP-NVUE */
  height: auto;
  /* #endif */
}

.nav-slogan {
  color: $u-tips-color;
  font-size: 14px;
}

.nav-desc {
  margin-top: 10px;
  font-size: 14px;
  color: $u-content-color;
}
</style>
