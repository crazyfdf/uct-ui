# CallPhone 拨打电话

## CallPhone 拨打电话使用方法
```
/**
* @description: 打电话
* @param {string} phoneNumber 电话号码
*/
this.$uct.callPhone(phoneNumber = "")
```
## CallPhone 拨打电话案例
```vue
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
```