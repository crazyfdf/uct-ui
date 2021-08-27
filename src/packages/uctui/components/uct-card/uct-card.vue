<template>
  <view class="uct-card"
        @tap.stop="click"
        :class="className"
        :style="{
			borderRadius: borderRadius + 'rpx',
			margin: margin,
			boxShadow: boxShadow,
		}">
    <view v-if="showHead"
          class="uct-card__head f900"
          :style="[{padding: padding + 'rpx'}, headStyle]"
          :class="{
				'uct-border-bottom': headBorderBottom
			}"
          @tap="headClick">
      <view v-if="!$slots.head"
            class="uct-flex uct-row-between">
        <view class="uct-card__head--left uct-flex uct-line-1"
              v-if="title">
          <image :src="thumb"
                 class="uct-card__head--left__thumb"
                 mode="aspectfull"
                 v-if="thumb"
                 :style="{ 
							height: thumbWidth + 'rpx', 
							width: thumbWidth + 'rpx', 
							borderRadius: thumbCircle ? '100rpx' : '6rpx' 
						}"></image>
          <text class="uct-card__head--left__title uct-line-1"
                :style="{
							fontSize: titleSize + 'rpx',
							color: titleColor
						}">
            {{ title }}
          </text>
        </view>
        <view class="uct-card__head--right c-dark uct-line-1"
              v-if="subTitle">
          <text class="uct-card__head__title__text"
                :style="{
							fontSize: subTitleSize + 'rpx',
							color: subTitleColor
						}">
            {{ subTitle }}
          </text>
        </view>
      </view>
      <slot name="head"
            v-else />
    </view>
    <view @tap="bodyClick"
          :style="[{padding: padding + 'rpx'}, bodyStyle]">
      <slot name="body" />
    </view>
    <view v-if="showFoot"
          @tap="footClick"
          :style="[{padding: $slots.foot ? padding + 'rpx' : 0}, footStyle]"
          :class="{
				'uct-border-top': footBorderTop
			}">
      <slot name="foot" />
    </view>
  </view>
</template>

<script>
/**
 * @displayName Card 卡片
 * 卡片组件一般用于多个列表条目，且风格统一的场景
 */
export default {
  name: "uct-card",
  props: {
    /** 卡片css */
    className: {
      type: Array,
      default() {
        return [];
      },
    },
    /** 标题 */
    title: {
      type: String,
      default: "",
    },
    /** 标题颜色 */
    titleColor: {
      type: String,
      default: "#303133",
    },
    /** 标题字体大小，单位rpx */
    titleSize: {
      type: [Number, String],
      default: "30",
    },
    /** 副标题 */
    subTitle: {
      type: String,
      default: "",
    },
    /** 副标题颜色 */
    subTitleColor: {
      type: String,
      default: "#909399",
    },
    /** 副标题字体大小，单位rpx */
    subTitleSize: {
      type: [Number, String],
      default: "26",
    },
    /** 用于标识点击了第几个 */
    index: {
      type: [Number, String, Object],
      default: "",
    },
    /** 用于隔开上下左右的边距，带单位的写法，如："30rpx 30rpx"，"20rpx 20rpx 30rpx 30rpx" */
    margin: {
      type: String,
      default: "0",
    },
    /** card卡片的圆角 */
    borderRadius: {
      type: [Number, String],
      default: "16",
    },
    /** 头部自定义样式，对象形式 */
    headStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    /** 主体自定义样式，对象形式 */
    bodyStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    /** 底部自定义样式，对象形式 */
    footStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    /** 头部是否下边框 */
    headBorderBottom: {
      type: Boolean,
      default: true,
    },
    /** 底部是否有上边框 */
    footBorderTop: {
      type: Boolean,
      default: true,
    },
    /** 标题左边的缩略图 */
    thumb: {
      type: String,
      default: "",
    },
    /** 缩略图宽高，单位rpx */
    thumbWidth: {
      type: [String, Number],
      default: "60",
    },
    /** 缩略图是否为圆形 */
    thumbCircle: {
      type: Boolean,
      default: false,
    },
    /** 给head，body，foot的内边距 */
    padding: {
      type: [String, Number],
      default: "30",
    },
    /** 是否显示头部 */
    showHead: {
      type: Boolean,
      default: true,
    },
    /** 是否显示尾部 */
    showFoot: {
      type: Boolean,
      default: true,
    },
    /** 卡片外围阴影，字符串形式 */
    boxShadow: {
      type: String,
      default: "none",
    },
  },
  data() {
    return {};
  },
  methods: {
    click() {
      this.$emit("click", this.index);
    },
    headClick() {
      this.$emit("head-click", this.index);
    },
    bodyClick() {
      this.$emit("body-click", this.index);
    },
    footClick() {
      this.$emit("foot-click", this.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.uct-card {
  position: relative;
  overflow: hidden;
  font-size: 28rpx;
  box-sizing: border-box;

  &-full {
    // 如果是与屏幕之间不留空隙，应该设置左右边距为0
    margin-left: 0 !important;
    margin-right: 0 !important;
    width: 100%;
  }

  &--border:after {
    border-radius: 16rpx;
  }

  &__head {
    &--left {
      &__thumb {
        margin-right: 16rpx;
      }

      &__title {
        max-width: 400rpx;
      }
    }

    &--right {
      margin-left: 6rpx;
    }
  }
}
</style>
