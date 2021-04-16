<!--空布局

可作为独立的组件, 不使用mescroll的页面也能单独引入, 以便APP全局统一管理:
import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
<mescroll-empty v-if="isShowEmpty" :option="optEmpty" @emptyclick="emptyClick"></mescroll-empty>

-->
<template>
  <view class="mescroll-empty"
        :class="{ 'empty-fixed': option.fixed }"
        :style="{ 'z-index': option.zIndex, top: option.top }">
    <view>
      <image v-if="icon"
             class="empty-icon"
             :src="icon"
             mode="widthFix" />
    </view>
    <view v-if="tip"
          class="empty-tip">{{ tip }}</view>
    <view v-if="option.btnText"
          class="empty-btn"
          @click="emptyClick">{{ option.btnText }}</view>
  </view>
</template>

<script>
// 引入全局配置
import GlobalOption from "./mescroll-uni-option.js";

/**
 * 空布局组件，当列表或者页面内容为空白时可使用，可快速实现空白页图片提示，文字提示，按钮操作功能
 * @displayName Empty空布局
 */
export default {
  name: "uct-empty",
  props: {
    /**  empty的配置项: 默认为GlobalOption.up.empty
     * 列表第一页无任何数据时,显示的空布局 (需配置warpId才生效)
warpId : 父布局的id (1.3.5版本支持传入dom元素)
icon : 空布局的图标路径
tip : 提示文本
btntext : 按钮文本
btnClick : 点击按钮的回调
supportTap: 如果您的运行环境支持tap,则可配置true,可减少点击延时,快速响应事件;默认false,通过onclick添加点击事件; (v 1.3.0 新增) (注:微信和PC无法响应tap事件)
     * @values {warpId : null ,
  icon : null ,
  tip : "暂无相关数据~" ,
  btntext : "" ,
  btnClick : null
  supportTap : false}
     */
    option: {
      type: Object,
      default() {
        return {
          use: true, // 是否显示空布局
          icon: "/static/imgs/public/mescroll-empty.png", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
          tip: "~ 空空如也 ~", // 提示
          btnText: "", //button的内容文字，为空时不显示button
        };
      },
    },
  },
  // 使用computed获取配置,用于支持option的动态配置
  computed: {
    // 图标
    icon() {
      return this.option.icon == null
        ? GlobalOption.up.empty.icon
        : this.option.icon; // 此处不使用短路求值, 用于支持传空串不显示图标
    },
    // 文本提示
    tip() {
      return this.option.tip == null
        ? GlobalOption.up.empty.tip
        : this.option.tip; // 此处不使用短路求值, 用于支持传空串不显示文本提示
    },
  },
  methods: {
    // 点击按钮
    emptyClick() {
      /**
       * 点击按钮回调
       * @event emptyclick
       */
      this.$emit("emptyclick");
    },
  },
};
</script>

<style>
/* 无任何数据的空布局 */
.mescroll-empty {
  box-sizing: border-box;
  width: 100%;
  padding: 100rpx 50rpx;
  text-align: center;
}

.mescroll-empty.empty-fixed {
  z-index: 99;
  position: absolute; /*transform会使fixed失效,最终会降级为absolute */
  top: 100rpx;
  left: 0;
}

.mescroll-empty .empty-icon {
  width: 280rpx;
  height: 280rpx;
}

.mescroll-empty .empty-tip {
  margin-top: 20rpx;
  font-size: 24rpx;
  color: gray;
}

.mescroll-empty .empty-btn {
  display: inline-block;
  margin-top: 40rpx;
  min-width: 200rpx;
  padding: 18rpx;
  font-size: 28rpx;
  border: 1rpx solid #e04b28;
  border-radius: 60rpx;
  color: #e04b28;
}

.mescroll-empty .empty-btn:active {
  opacity: 0.75;
}
</style>
