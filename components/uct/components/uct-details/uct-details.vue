<template>
  <view class='uct-details'>
    <slot name="nav"></slot>
    <view class="u-skeleton u-skeleton-rect"
          style="flex:1;width:100vw">
      <slot></slot>
    </view>
    <uct-skeleton :loading="loading"
                  v-if="ready"
                  :animation="true"
                  bgColor="#FFF">
    </uct-skeleton>
  </view>
</template>

<script>
export default {
  props: {
    /** 是否加载中状态 */
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ready: false, //解决h5端top值计算错误
    };
  },
  mounted() {
    this.$nextTick(() => (this.ready = true));
  },
};
</script>

<style scoped lang="scss">
.uct-details {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>