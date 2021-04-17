<template>
  <!-- 分割线 -->
  <view class='form-divider'
        v-if="item.type=='divider'"
        v-show="!item.options.hidden">
    <view :style="{'order':textAlign}">{{item.label}}</view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    textAlign() {
      if (this.item.type == "divider") {
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
      }
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
  margin: 40rpx 0;
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