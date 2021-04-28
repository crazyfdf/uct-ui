<template>
  <view class='card'>
    <uct-nav>
      <view slot="center">Card卡片</view>
    </uct-nav>
    <uct-card class="mt100"
              :item="item">
      <view>这是卡片布局</view>
    </uct-card>
  </view>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      item: {
        type: "card",
        label: "卡片布局",
        list: [],
        key: "card_1619595796400",
      },
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>