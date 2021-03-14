<template>
  <view>
    <view>
      <form-demo v-show="current==0"></form-demo>
      <scroll-demo v-show="current==1"></scroll-demo>
    </view>
    <uct-tabbar style="position:fixed;bottom:0;width:100%;left:0;right:0;"></uct-tabbar>
  </view>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import ScrollDemo from "./components/scroll-demo.vue";
import FormDemo from "./components/form-demo.vue";
export default {
  components: {
    FormDemo,
    ScrollDemo,
  },
  computed: {
    ...mapState({
      current: (state) => state.init.tabbar,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  data() {
    return {};
  },
  onPullDownRefresh() {
    uni.redirectTo({
      url: "/pages/index",
    });
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>