<template>
  <view class='card'>
    <uct-nav>
      <view slot="center">Card卡片</view>
    </uct-nav>
    <uct-card class="mt100"
              :className="['bc-gray']"
              :title="item.label">
      <view slot="body">这是卡片内容</view>
      <view slot="foot">这是卡片底部</view>
    </uct-card>
  </view>
</template>

<script>
export default {
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
};
</script>