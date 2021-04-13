<template>
  <view class="page-body">
    <uct-nav :isBack="false">
      <view slot="center">表单模板</view>
    </uct-nav>
    <uct-form class=" mb140 px40"
              :formData="formData"
              url="system/uploadPartnerByProject"
              @submit="submit"></uct-form>
  </view>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      formData: require("@/config/form.json"),
    };
  },
  computed: {},
  methods: {
    async submit(data) {
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

