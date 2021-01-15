<template>
  <view class='form-input'>
    <!-- 输入框 -->
    <view v-show="!item.options.hidden">
      <!-- 文字输入框 -->
      <view v-if="item.type=='input'"
            class="form-item">
        <view class="title"
              :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
        <input class="input"
               :type="item.options.type"
               :name="item.model"
               v-model="value"
               :placeholder="item.options.placeholder"
               :disabled="item.options.disabled" />
      </view>
      <!-- 文本输入框 -->
      <view v-if="item.type=='textarea'">
        <view class="title"
              :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
        <textarea class="textarea"
                  :type="item.options.type"
                  :name="item.model"
                  v-model="value"
                  maxlength="9999"
                  :placeholder="item.options.placeholder"
                  :disabled="item.options.disabled" />
      </view>
      <!-- 数字输入框 -->
      <view v-if="item.type=='number'"
            class="form-item">
        <view class="title"
              :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
        <input class="input"
               :type="item.type"
               :name="item.model"
               v-model="value"
               :maxlength="item.options.precision?item.options.precision:9999"
               :placeholder="item.options.placeholder"
               :disabled="item.options.disabled" />
      </view>
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
  watch: {
    value (val) {
      this.$emit('input', val)
    }
  }
};
</script>

<style scoped lang="scss">
</style>