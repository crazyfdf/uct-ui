<template>
  <view class='vuex'>

  </view>
</template>

<script>
export default {
  created() {
    this.$uct.vuex("version", "0.0.2");
    console.log(this.$store.state.version);
  },
};
</script>