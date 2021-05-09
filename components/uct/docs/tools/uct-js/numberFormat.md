# Unit 单位转换

## Unit 单位转换使用方法
```
/**
* @description: 取截单元,单位
* @param {number} number 数字
* @return {string} 格式化后的数字
*/  
this.$uct.numberFormat(number)
```
## Unit 单位转换案例
```vue
<template>
  <view class="px40">
    <uct-nav>
      <view slot="center">Unit 单位转换</view>
    </uct-nav>
    <view class="mt40" v-for="(item, index) in num" :key="index">{{ item | numberFormat }}</view>
  </view>
</template>

<script>
export default {
  filters: {
    numberFormat: getApp().$uct.numberFormat,
  },
  data() {
    return {
      num: [1, 11, 111, 1111, 11111, 111111, 1111111, 11111111, 111111111, 1111111111],
    };
  },
};
</script>
```