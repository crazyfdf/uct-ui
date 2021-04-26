# TimeFormat时间格式化

## TimeFormat时间格式化使用方法
```
/**
* @description: 格式化时间
* @param {string} fmt 年月日，时分秒,"YYYY-MM-DD HH:MM"
* @param {date} date Date格式数据
* @return {string} 返回"YYYY-MM-DD HH:MM"格式字符串
*/
this.$uct.dateFormat(fmt, date)
```
## TimeFormat时间格式化案例
```vue
<template>
  <view class="px40">
    <uct-nav>
      <view slot="center">TimeFormat 时间格式化</view>
    </uct-nav>
    <view class="mt40" v-for="(item, index) in dateFormat" :key="index">
      {{ $uct.timeFormat(item, date) }}
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      dateFormat: ["YYYY-MM-DD hh:mm:ss", "YYYY-MM-DD", "hh:mm:ss"],
    };
  },
};
</script>
```