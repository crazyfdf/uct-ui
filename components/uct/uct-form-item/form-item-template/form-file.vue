<template>
  <!-- 上传文件 -->
  <view v-show="!item.options.hidden">
    <!-- 上传图片 -->
    <u-upload v-if="item.type=='uploadImg'"
              class="uct-input"
              :max-size="5 * 1024 * 1024"
              :max-count="item.options.limit"></u-upload>
    <!-- 上传文件 -->
    <u-upload v-if="item.type=='uploadFile'"
              class="uct-input"
              :max-size="5 * 1024 * 1024"
              max-count="6"></u-upload>
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
  data() {
    return {
      value: "",
    };
  },
  watch: {
    value(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style scoped lang="scss">
.uct-input {
  display: flex;
  flex: 1 auto;
  font-size: 14px;
  font-weight: 900;
  border: none;
  background-color: transparent;
}
</style>