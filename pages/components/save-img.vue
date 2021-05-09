<template>
  <view class="see-img">
    <uct-nav>
      <view slot="center">SaveImg保存图片</view>
    </uct-nav>
    <uct-save-img
      ref="saveImg"
      url="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3566088443,3713209594&fm=26&gp=0.jpg"
    ></uct-save-img>
  </view>
</template>

<script>
export default {
  mounted() {
    this.$refs.saveImg.showImg();
  },
};
</script>

<style scoped lang="scss"></style>
