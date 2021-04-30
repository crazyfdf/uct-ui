<!--
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-15 17:52:37
 * @LastEditTime: 2021-04-28 14:48:08
 * @Description: 
-->
<template>
  <view class='form-item'>
    <uct-nav>
      <view slot="center">{{item.type}}</view>
    </uct-nav>
    <!-- 增删改查组件 -->
    <uct-form-item class="px20 mt100"
                   @mapData="mapData"
                   v-if="Object.keys(item).length"
                   :ref="item.key"
                   :config="formData.config"
                   :item="item"></uct-form-item>
  </view>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      type: "",
      item: {},
      formData: require("@/config/form.json"),
    };
  },
  mounted() {
    this.formData.list.forEach((item) => {
      if (item.type === this.$Route.query.type) {
        this.item = item;
      }
    });
  },
  methods: {},
};
</script>