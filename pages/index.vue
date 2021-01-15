<template>
  <view>
    <view>
      <home v-show="current==0"></home>
      <live v-show="current==1"></live>
      <my v-show="current==2"></my>
    </view>
    <tabbar style="position:fixed;bottom:0;width:100%;left:0;right:0;"></tabbar>
  </view>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';
import Home from '@/pages/index/home.vue'
import Live from '@/pages/index/live.vue'
import My from '@/pages/index/my.vue'
import Tabbar from '@/components/tabbar/tabbar.vue'
export default {
  components: {
    Home,
    Live,
    My,
    Tabbar
  },
  computed: {
    ...mapState({
      current: state => state.init.tabbar,
      userInfo: state => state.user.userInfo,
    })
  },
  data () {
    return {

    };
  },
  onPullDownRefresh () {
    uni.redirectTo({
      url: '/pages/index'
    });
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
</style>