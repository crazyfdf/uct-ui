<template>
  <!-- 警告提示 -->
  <view class='form-alert'
        v-if="item.type=='alert'"
        v-show="!item.options.hidden"
        :style="{'background-color':bColor.bgColor,'border-color':bColor.borColor}">
    <image v-if="item.options.showIcon"
           class="icon mr10"
           :src="require(`../../../static/imgs/alert/${item.options.type}.png`)" />
    <view>{{item.label}}</view>
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
  computed: {
    bColor() {
      if (this.item.type == "alert") {
        let color = {
          bgColor: "#1afa291A",
          borColor: "#1afa29",
        };
        switch (this.item.options.type) {
          case "scolor.uccess":
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
      }
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.icon {
  width: 32rpx;
  height: 32rpx;
}
.form-alert {
  display: flex;
  align-items: center;
  padding: 10rpx;
  border-radius: 10rpx;
  border: 2rpx solid;
}
</style>