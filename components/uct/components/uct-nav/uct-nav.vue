<template>
  <view class="">
    <view class="uct-navbar"
          :style="[navbarStyle]"
          :class="{ 'uct-navbar-fixed': isFixed, 'uct-border-bottom': borderBottom }">
      <view class="uct-status-bar"
            :style="{ height: statusBarHeight + 'px' }"></view>
      <view class="uct-navbar-inner"
            :style="[navbarInnerStyle]">
        <!-- @slot 自定义导航栏内容插槽，设置custom为true是生效 -->
        <slot v-if="custom"></slot>
        <view v-else
              class="uct-navbar-inner">
          <view class="uct-slot-left pl40">
            <!-- @slot 导航栏左插槽，默认返回按钮 -->
            <slot name="left">
              <image style="width:20rpx;height:36rpx"
                     @tap="goBack"
                     :src="require('../../static/imgs/public/back.png')" />
            </slot>
          </view>
          <view class="uct-slot-content f16 f700"
                :style="{maxWidth:titleWidth+'rpx'}">
            <!-- @slot 导航栏居中插槽，内容最大宽度为titleWidth 单位rpx -->
            <slot name="center"></slot>
          </view>
          <view class="uct-slot-right pr40">
            <!-- @slot 导航栏右插槽 -->
            <slot name="right"></slot>
          </view>
        </view>
      </view>
    </view>
    <!-- 解决fixed定位后导航栏塌陷的问题 -->
    <view class="uct-navbar-placeholder"
          v-if="isFixed && !immersive"
          :style="{ width: '100%', height: Number(navbarHeight) + statusBarHeight + 'px' }"></view>
  </view>
</template>

<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
let menuButtonInfo = {};
// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif
/**
 * navbar 自定义导航栏,此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uniapp自带的导航栏。
 * @displayName Navbar导航栏
 */
export default {
  name: "uct-navbar",
  props: {
    /** 导航栏高度，单位px，非rpx */
    height: {
      type: [String, Number],
      default: "",
    },
    /** 标题的宽度，如果需要自定义右侧内容，且右侧内容很多时，可能需要减少这个宽度，单位rpx */
    titleWidth: {
      type: [String, Number],
      default: "500",
    },
    /** 标题的颜色 */
    titleColor: {
      type: String,
      default: "#606266",
    },
    /** 标题字体是否加粗 */
    titleBold: {
      type: Boolean,
      default: false,
    },
    /** 标题的字体大小 */
    titleSize: {
      type: [String, Number],
      default: 32,
    },
    /** 对象形式，因为用户可能定义一个纯色，或者线性渐变的颜色 */
    background: {
      type: String,
      default: "#ffffff",
    },
    /** 导航栏是否固定在顶部 */
    isFixed: {
      type: Boolean,
      default: true,
    },
    /** 是否沉浸式，允许fixed定位后导航栏塌陷，仅fixed定位下生效 */
    immersive: {
      type: Boolean,
      default: false,
    },
    /** 是否显示导航栏的下边框 */
    borderBottom: {
      type: Boolean,
      default: true,
    },
    /** 导航栏层级 */
    zIndex: {
      type: [String, Number],
      default: "",
    },
    /** 自定义返回逻辑 */
    customBack: {
      type: Function,
      default: null,
    },
    /** 是否自定义 */
    custom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuButtonInfo: menuButtonInfo,
      statusBarHeight: this.$uct.config.statusBarHeight,
    };
  },
  computed: {
    // 导航栏内部盒子的样式
    navbarInnerStyle() {
      let style = {};
      // 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
      style.height = this.navbarHeight + "px";
      // // 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
      // #ifdef MP
      let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
      style.marginRight = rightButtonWidth + "px";
      // #endif
      return style;
    },
    // 整个导航栏的样式
    navbarStyle() {
      let style = {};
      style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.navbar;
      // 合并用户传递的背景色对象
      Object.assign(style, { background: this.background });
      return style;
    },
    // 导航中间的标题的样式
    titleStyle() {
      let style = {};
      // #ifndef MP
      style.left =
        (systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 + "px";
      style.right =
        (systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 + "px";
      // #endif
      // #ifdef MP
      // 此处是为了让标题显示区域即使在小程序有右侧胶囊的情况下也能处于屏幕的中间，是通过绝对定位实现的
      let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
      style.left =
        (systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 + "px";
      style.right =
        rightButtonWidth -
        (systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 +
        rightButtonWidth +
        "px";
      // #endif
      style.width = uni.upx2px(this.titleWidth) + "px";
      return style;
    },
    // 转换字符数值为真正的数值
    navbarHeight() {
      // #ifdef APP-PLUS || H5
      return this.height ? this.height : this.$uct.config.navHeight;
      // #endif
      // #ifdef MP
      // 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
      // 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
      // return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2;//导航高度
      return this.height ? this.height : this.$uct.config.navHeight;
      // #endif
    },
  },
  created() {},
  methods: {
    goBack() {
      // 如果自定义了点击返回按钮的函数，则执行，否则执行返回逻辑
      if (typeof this.customBack === "function") {
        // 在微信，支付宝等环境(H5正常)，会导致父组件定义的customBack()函数体中的this变成子组件的this
        // 通过bind()方法，绑定父组件的this，让this.customBack()的this为父组件的上下文
        this.customBack.bind(this.$u.$parent.call(this))();
      } else {
        uni.navigateBack({
          delta: 1,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@mixin vue-flex($direction: row) {
  /* #ifndef APP-NVUE */
  display: flex;
  flex-direction: $direction;
  /* #endif */
}
.uct-navbar {
  width: 100%;
}

.uct-navbar-fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 991;
}

.uct-status-bar {
  width: 100%;
}

.uct-navbar-inner {
  width: 100%;
  @include vue-flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
}

.uct-back-wrap {
  @include vue-flex;
  align-items: center;
  flex: 1;
  flex-grow: 0;
  padding: 14rpx 14rpx 14rpx 24rpx;
}

.uct-back-text {
  padding-left: 4rpx;
  font-size: 30rpx;
}

.uct-navbar-content-title {
  @include vue-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: absolute;
  left: 0;
  right: 0;
  height: 60rpx;
  text-align: center;
  flex-shrink: 0;
}

.uct-navbar-centent-slot {
  flex: 1;
}

.uct-title {
  line-height: 60rpx;
  font-size: 32rpx;
  flex: 1;
}
.uct-slot-left {
  flex: 1;
  @include vue-flex;
  align-items: center;
  justify-content: flex-start;
}
.uct-slot-right {
  flex: 1;
  @include vue-flex;
  align-items: center;
  justify-content: flex-end;
}

.uct-slot-content {
  @include vue-flex;
  align-items: center;
  justify-content: center;
}
</style>
