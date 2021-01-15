<!--空布局

可作为独立的组件, 不使用mescroll的页面也能单独引入, 以便APP全局统一管理:
import MescrollEmpty from '@/components/uni/components/empty.vue';
<empty v-if="isShowEmpty" :option="optEmpty" @emptyclick="emptyClick"></empty>

-->
<template>
  <view class="empty"
        :class="{ 'empty-fixed': option.fixed }"
        :style="{ 'z-index': option.zIndex, top: option.top }">
    <view>
      <image v-if="option.icon"
             class="empty-icon"
             :src="option.icon"
             mode="widthFix" />
    </view>
    <view v-if="option.tip"
          class="empty-tip">{{ option.tip }}</view>
    <view v-if="option.btnText"
          class="empty-btn"
          @click="emptyClick">{{ option.btnText }}</view>
  </view>
</template>

<script>
export default {
  props: {
    // empty的配置项: 默认为GlobalOption.up.empty
    option: {
      type: Object,
      default () {
        return {
          fixed: true,
          textLoading: '加载中 ...', // 加载中的提示文本
          icon: "/static/imgs/public/mescroll-empty.png", // 图标路径 
          tip: '~ 空空如也 ~', // 提示
          btnText: ""
        };
      }
    }
  },
  methods: {
    // 点击按钮
    emptyClick () {
      uni.navigateBack({
        delta: 1
      });
      this.$emit('emptyclick');
    }
  }
};
</script>

<style>
/* 无任何数据的空布局 */
.empty {
  box-sizing: border-box;
  width: 100%;
  padding: 100rpx 50rpx;
  text-align: center;
}

.empty.empty-fixed {
  z-index: 99;
  position: absolute; /*transform会使fixed失效,最终会降级为absolute */
  top: 100rpx;
  left: 0;
}

.empty .empty-icon {
  width: 280rpx;
  height: 280rpx;
}

.empty .empty-tip {
  margin-top: 20rpx;
  font-size: 24rpx;
  color: gray;
}

.empty .empty-btn {
  display: inline-block;
  margin-top: 40rpx;
  min-width: 200rpx;
  padding: 18rpx;
  font-size: 28rpx;
  border: 1rpx solid #e04b28;
  border-radius: 60rpx;
  color: #e04b28;
}

.empty .empty-btn:active {
  opacity: 0.75;
}
</style>
