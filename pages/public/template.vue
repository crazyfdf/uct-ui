<template>
  <view class='page-body'>
    <!-- 自定义表单 -->
    <uct-form :name="name"
              :form_id="form_id"
              @submit="submit"></uct-form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      name: this.$form.template,
      form_id: "",
    };
  },

  methods: {
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

<style scoped lang="scss">
</style>