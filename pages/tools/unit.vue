<template>
  <view class="px40">
    <uct-nav>
      <view slot="center">Unit 单位转换</view>
    </uct-nav>
    <view class="mt40"
          v-for="(item, index) in num"
          :key="index">{{ $uct.numberFormat(item) }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      num: [
        1,
        11,
        111,
        1111,
        11111,
        111111,
        1111111,
        11111111,
        111111111,
        1111111111,
      ],
    };
  },
};
</script>
