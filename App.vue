<script>
import Vue from 'vue';
import { mapMutations, mapActions, mapState } from 'vuex';


export default {
  methods: {
    ...mapActions(['getAppInit', 'getTemplate']),
    init (options) {
      return Promise.all([this.getAppInit(options), this.getTemplate(options)])
    }
  },
  onLaunch: function (options) {
    this.init(options)
  },
};
</script>

<style lang="scss">
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  src: url("/static/uni.ttf");
}
/* #endif */
.page-body {
  height: 100vh;
  padding: 30rpx;
  font-size: 14px;
  overflow-x: hidden;
  background-color: #f2f4f5;
  box-sizing: border-box;
}
@import "@/static/style/_utils.scss";
</style>
