<template>
  <view class='uct-form-rate'>
    <u-rate :count="item.options.max"
            v-model="value"></u-rate>
  </view>
</template>

<script>
/**
 * 表单的评分组件
 * @displayName Rate评分
 */
export default {
  props: {
    /** 评分配置
     * @values {"type": "rate",
      "label": "评分",
      "icon": "icon-pingfen_moren",
      "options": {"defaultValue": 0,
        "max": 5,
        "disabled": false,
        "hidden": false,
        "allowHalf": false},
      "model": "rate_1612861359410",
      "key": "rate_1612861359410",
      "rules": [{"required": false,
        "message": "必填项"}]} */
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