<template>
  <view class="callPhone">
    <uct-nav>
      <view slot="center">callPhone 拨打电话</view>
    </uct-nav>
    <uct-button class="mt40" @click="callPhone" text="拨打电话110"></uct-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phoneNum: "110",
    };
  },
  methods: {
    callPhone() {
      this.$uct.callPhone(this.phoneNum);
    },
  },
};
</script>
