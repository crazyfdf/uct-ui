<!--
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-15 14:42:36
 * @LastEditTime: 2021-04-28 14:48:48
 * @Description: 
-->
<template>
  <view class='button'>
    <uct-nav>
      <view slot="center">Divider分割线</view>
    </uct-nav>
    <uct-divider class="mt100"
                 :item="item"></uct-divider>
  </view>
</template>

<script>
export default {
  data() {
    return {
      item: {
        type: "divider",
        label: "分割线",
        icon: "icon-fengexian",
        options: {
          orientation: "",
        },
        key: "divider_1612871370842",
      },
    };
  },
};
</script>