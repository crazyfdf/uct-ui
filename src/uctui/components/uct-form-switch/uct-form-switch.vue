<template>
  <!-- 开关 -->
  <view class='form-switch'>
    <switch :checked="item.options.defaultValue"
            :disabled="item.options.disabled"
            @change="switchChange"
            class="uct-switch"
            color="#479FF7" />
  </view>
</template>

<script>
/**
 * 表单的开关组件
 * @displayName Switch开关
 */
export default {
  props: {
    /** 开关配置
     * @values {"type": "switch",
      "label": "开关",
      "icon": "icon-kaiguan3",
      "options": {"defaultValue": false,
        "hidden": false,
        "disabled": false},
      "model": "switch_1612862020078",
      "key": "switch_1612862020078",
      "rules": [{"required": false,
        "message": "必填项"}]} */
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      value: null,
    };
  },
  methods: {
    switchChange: function (e) {
      this.value = e.target.value;
      /**
       * 输入框输入事件
       * @event input 通过v-model语法糖传值，父组件使用v-model或:value
       * @property {string} val 输入框输入值
       * @params {string} val
       */
      this.$emit("input", this.value);
    },
  },
};
</script>

<style scoped lang="scss">
.uct-switch {
  display: flex;
  flex: 1 auto;
  font-size: 14px;
  font-weight: 900;
  border: none;
  background-color: transparent;
}
</style>