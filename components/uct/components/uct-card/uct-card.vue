<template>
  <view class='uct-card pa20 bc-gray'>
    <view class="f900 f16 mb20">{{item.label}}</view>
    <slot></slot>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.uct-card {
  position: relative;
  border-radius: 8rpx;
  box-sizing: border-box;
}
</style>
