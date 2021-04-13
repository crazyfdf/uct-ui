<template>
  <!-- 输入框 -->
  <view v-show="!item.options.hidden">
    <!-- 文字输入框 -->
    <input v-if="item.type=='input'"
           class="uct-input"
           :class="value?'c-black':'c-black-7'"
           :style="[getStyle]"
           :type="item.options.type"
           :name="item.model"
           v-model="value"
           :placeholder="item.options.placeholder"
           :disabled="item.options.disabled" />
    <!-- 文本输入框 -->
    <textarea v-else-if="item.type=='textarea'"
              class="uct-input-textarea"
              :class="value?'c-black':'c-black-7'"
              :style="[getStyle]"
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
           :class="value?'c-black':'c-black-7'"
           :style="[getStyle]"
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
      inputHeight: 80, // input的高度
      textareaHeight: 100, // textarea的高度
    };
  },
  watch: {
    value(val) {
      this.$emit("input", val);
    },
  },
  computed: {
    getStyle() {
      let style = {};
      // 如果没有自定义高度，就根据type为input还是textare来分配一个默认的高度
      style.minHeight = this.height
        ? this.height + "rpx"
        : this.item.type == "textarea"
        ? this.textareaHeight + "rpx"
        : this.inputHeight + "rpx";
      style.fontSize = "14px";
      return style;
    },
  },
};
</script>

<style scoped lang="scss">
.uct-input {
  display: flex;
  flex: 1 auto;
  border: none;
  background-color: transparent;
  &-textarea {
    width: auto;
    padding: 10rpx 0;
    line-height: normal;
    flex: 1;
  }
}
</style>