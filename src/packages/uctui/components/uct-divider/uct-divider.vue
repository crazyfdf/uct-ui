<template>
  <!-- 分割线 -->
  <view class='form-divider'>
    <view :style="{'order':textAlign}">{{item.label}}</view>
  </view>
</template>

<script>
/**
 * 表单的分割线
 * @displayName Divider分割线
 */
export default {
  props: {
    /** 分割线配置
     * @values {"type": "divider",
			"label": "分割线",
			"options": {"orientation": ""},
			"key": "divider_1619341833283"} */
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    textAlign() {
      let align = 0;
      switch (this.item.options.orientation) {
        case "left":
          align = -1;
          break;
        case "right":
          align = 1;
          break;
        default:
          align = 0;
      }
      return align;
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.form-divider {
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    display: inline-block;
    flex: 1 auto;
    height: 2rpx;
    background-color: #999;
  }
  &::after {
    content: "";
    flex: 1 auto;
    display: inline-block;
    height: 2rpx;
    background-color: #999;
  }
}
</style>