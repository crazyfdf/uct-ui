<template>
  <!-- 输入框 -->
  <view v-show="!item.options.hidden">
    <!-- 文字输入框 -->
    <input v-if="item.type=='input'"
           class="uct-input"
           :type="item.options.type"
           :name="item.model"
           v-model="value"
           :placeholder="item.options.placeholder"
           :disabled="item.options.disabled" />
    <!-- 文本输入框 -->
    <textarea v-else-if="item.type=='textarea'"
              class="uct-input-textare"
              :type="item.options.type"
              :name="item.model"
              auto-height
              v-model="value"
              maxlength="9999"
              :placeholder="item.options.placeholder"
              :disabled="item.options.disabled" />
    <!-- 数字输入框 -->
    <input v-else-if="item.type=='number'"
           class="uct-input"
           :type="item.type"
           :name="item.model"
           v-model="value"
           :maxlength="item.options.precision?item.options.precision:9999"
           :placeholder="item.options.placeholder"
           :disabled="item.options.disabled" />
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
  &-textarea {
    width: auto;
    font-size: 28rpx;
    padding: 10rpx 0;
    line-height: normal;
    flex: 1;
  }
}
</style>