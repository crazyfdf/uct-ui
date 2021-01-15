<template>
  <view class='form-switch'>
    <!-- 开关 -->
    <view v-if="item.type=='switch'"
          v-show="!item.options.hidden"
          class="form-item">
      <view class="title">{{item.label}}</view>
      <switch :checked="item.options.defaultValue"
              :disabled="item.options.disabled"
              @change="switchChange"
              class="input"
              color="#479FF7" />
    </view>

  </view>
</template>

<script>

export default {
  behaviors: ['uni://form-field'],
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
  },
  methods: {
    switchChange: function (e) {
      this.value = e.target.value
    },
  },
};
</script>

<style scoped lang="scss">
</style>