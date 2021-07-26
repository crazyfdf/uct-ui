<!--
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-15 17:52:37
 * @LastEditTime: 2021-05-06 14:14:01
 * @Description: 
-->
<template>
  <view class='form-item'>
    <uct-nav>
      <view slot="center">{{item.type}}</view>
    </uct-nav>
    <!-- 增删改查组件 -->
    <uct-form-item class="px20 mt100"
                   v-if="Object.keys(item).length"
                   :config="formData.config"
                   :item="item"></uct-form-item>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: "",
      item: {},
      formData: require("@/json/form.json"),
    };
  },
  mounted() {
    this.formData.list.forEach((item) => {
      if (item.type === this.$Route.query.type) {
        this.item = item;
      }
    });
  },
};
</script>