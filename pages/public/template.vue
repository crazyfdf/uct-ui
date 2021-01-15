<template>
  <view class='page-body'>
    <!-- 自定义表单 -->
    <i-form :name="name"
            :form_id="form_id"
            @submit="submit"></i-form>
  </view>
</template>

<script>
import IForm from '@/components/form/i-form.vue';

export default {
  components: {
    IForm,
  },
  data () {
    return {
      name: this.$form.template,
      form_id: "",
    };
  },

  methods: {
    submit (data) {
      setTimeout(() => {
        uni.navigateBack({
          delta: 1
        });
      }, 1000);
    },
  }
};
</script>

<style scoped lang="scss">
</style>