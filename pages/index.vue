<template>
  <view class="wrap">
    <tools v-show="current == 0"></tools>
    <components v-show="current == 1"></components>
    <templates v-show="current == 2"></templates>
    <u-tabbar :list="tabbarConfig"
              v-model="current"
              :mid-button="true"></u-tabbar>
  </view>
</template>

<script>
import tabbarConfig from "./tabbar.config.js";
import tools from "@/pages/index/tools.vue";
import components from "@/pages/index/components.vue";
import templates from "@/pages/index/templates.vue";
export default {
  components: {
    components,
    tools,
    templates,
  },
  data() {
    return {
      current: 1,
      tabbarConfig: tabbarConfig,
    };
  },
  mounted() {
    this.current = this.$Route.query.current ? this.$Route.query.current : 1;
  },
};
</script>

<style>
/* page {
		background-color: rgb(240, 242, 244);
	} */
</style>

<style lang="scss" scoped>
.u-cell-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 8rpx;
}
</style>
