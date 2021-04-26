<template>
  <view class="page-body">
    <uct-nav>
      <view slot="center">Form表单</view>
    </uct-nav>
    <uct-form :formData="formData"
              :url="url"
              @submit="submit"></uct-form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      /** formData表单数据是通过表单设计器 k-form-design拿到的。推荐使用k-form-design快速部署您的表单页面。使用地址：http://cdn.kcz66.com/k-form-design.html */
      formData: require("@/config/form.json"),

      url: "system/uploadPartnerByProject", //表单提交地址
    };
  },
  methods: {
    // 成功回调
    submit(data) {
      setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        });
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

