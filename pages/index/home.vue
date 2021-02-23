<template>
  <view class="page-body">

    <uct-form class="mt80"
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

