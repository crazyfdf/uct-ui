<template>
  <!-- 开关 -->
  <view class='form-switch'
        v-if="item.type=='switch'"
        v-show="!item.options.hidden">
    <switch :checked="item.options.defaultValue"
            :disabled="item.options.disabled"
            @change="switchChange"
            class="uct-switch"
            color="#479FF7" />
  </view>
</template>

<script>
export default {
  behaviors: ["uni://form-field"],
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    switchChange: function (e) {
      this.value = e.target.value;
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