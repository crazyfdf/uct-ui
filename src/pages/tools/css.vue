<!--
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-16 14:37:26
 * @LastEditTime: 2021-08-03 15:12:50
 * @Description: 
-->
<template>
  <view class="css px40">
    <uct-nav>
      <view slot="center">CSS样式</view>
    </uct-nav>
    <view class="f32 f900">color：</view>
    <view class="uct-black mt10">uct-black</view>
    <view class="uct-white mt10">uct-white</view>
    <view class="uct-gray mt10">uct-gray</view>
    <view class="uct-dark mt10">uct-dark</view>
    <view class="uct-blue mt10">uct-blue</view>
    <view class="uct-skyblue mt10">uct-skyblue</view>
    <view class="uct-green mt10">uct-green</view>
    <view class="uct-red mt10">uct-red</view>
    <view class="uct-orange mt10">uct-orange</view>
    <view class="uct-yellow mt10">uct-yellow</view>

    <view class="f32 f900 mt40">推荐写法：</view>
    <view class="f32 f900 mt40">颜色：</view>
    <view class="c-red mt10">c-red(字体红色)</view>
    <view class="bc-red mt10">bc-red(背景红色)</view>
    <view class="bs-1-red mt10">bs-1-red(边框红色)</view>

    <view class="f32 f900 mt40">间距：</view>
    <view class="my10 bc-red c-white">my10(y轴偏移10rpx)</view>
    <view class="py10 bc-red c-white">py10(y轴间距10rpx)</view>
    <view class="mt10 bc-red c-white">mt10(向上偏移10rpx)</view>
    <view class="pt10 bc-red c-white">pt10(向上间距10rpx)</view>

    <view class="f32 f900 mt40">字重：</view>
    <view class="f18 f500 mt10">f18 f500(18px字重500)</view>
    <view class="f18 f700 mt10">f18 f700(18px字重700)</view>
    <view class="f18 f900 mt10">f18 f900(18px字重900)</view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.uct-black {
  background-color: $uct-black;
}
.uct-white {
  background-color: $uct-white;
}
.uct-gray {
  background-color: $uct-gray;
}
.uct-dark {
  background-color: $uct-dark;
}
.uct-blue {
  background-color: $uct-blue;
}
.uct-skyblue {
  background-color: $uct-skyblue;
}
.uct-green {
  background-color: $uct-green;
}
.uct-red {
  background-color: $uct-red;
}
.uct-orange {
  background-color: $uct-orange;
}
.uct-yellow {
  background-color: $uct-yellow;
}
</style>
