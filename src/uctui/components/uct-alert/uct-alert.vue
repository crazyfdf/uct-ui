<template>
  <!-- 提示 -->
  <view class='form-alert'
        :style="{'background-color':bColor.bgColor,'border-color':bColor.borColor}">
    <image v-if="item.options.showIcon"
           class="icon mr10"
           :src="require(`../../static/imgs/alert/${item.options.type}.png`)" />
    <view style="flex:1">
      <view>{{item.label}}</view>
      <view>{{item.options.description}}</view>
    </view>
    <image :src="require(`../../static/imgs/alert/close.png`)"
           @click="close"
           class="x-je"
           style="width:30rpx;height:30rpx;" />
  </view>
</template>

<script>
/**
 * 表单的提示
 * @displayName Alert提示
 */
export default {
  props: {
    /** 提示配置
     * @values {"type": "alert",
      "label": "提示",
      "options": {"type": "success",
        "description": "这是success的提示",
        "showIcon": true,
        "banner": true,
        "hidden": false,
        "closable": true},
      "key": "alert_1619342193554"}, */
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    bColor() {
      let color = {
        bgColor: "#1afa291A",
        borColor: "#1afa29",
      };
      switch (this.item.options.type) {
        case "success":
          color.bgColor = "#1afa291A";
          color.borColor = "#1afa29";
          break;
        case "info":
          color.bgColor = "#1296db1A";
          color.borColor = "#1296db";
          break;
        case "warning":
          color.bgColor = "#f4ea2a1A";
          color.borColor = "#f4ea2a";
          break;
        case "error":
          color.bgColor = "#d81e061A";
          color.borColor = "#d81e06";
          break;
      }
      return color;
    },
  },
  methods: {
    // 小程序还不兼容
    close() {
      this.item.options.hidden = true;
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  width: 32rpx;
  height: 32rpx;
}
.form-alert {
  display: flex;
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
  border: 2rpx solid;
}
</style>