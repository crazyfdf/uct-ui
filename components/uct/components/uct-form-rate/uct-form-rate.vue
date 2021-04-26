<template>
  <view class='uct-form-rate'>
    <u-rate :count="item.options.max"
            v-model="value"></u-rate>
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
  watch: {
    value(val) {
      /**
       * 输入框输入事件
       * @event input 通过v-model语法糖传值，父组件使用v-model或:value
       * @property {string} val 输入框输入值
       * @params {string} val
       */
      this.$emit("input", val);
    },
  },
  data() {
    return {
      value: this.item.options.defaultValue,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>