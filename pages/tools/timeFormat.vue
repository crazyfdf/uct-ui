<template>
  <view class="px40">
    <uct-nav>
      <view slot="center">TimeFormat 时间格式化</view>
    </uct-nav>
    <view class="mt40"
          v-for="(item, index) in dateFormat"
          :key="index">
      {{ $uct.timeFormat(date,item) }}
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

<style scoped lang="scss"></style>
