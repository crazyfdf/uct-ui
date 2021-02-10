<script>
import Vue from "vue";
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  methods: {
    ...mapActions(["getAppInit", "getTemplate"]),
    init(options) {
      return Promise.all([this.getAppInit(options), this.getTemplate(options)]);
    },
  },
  onLaunch: function (options) {
    this.init(options);
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "uniicons";
  src: url("/static/font/PingFang Regular.ttf");
}
page {
  font-family: "uniicons" !important;
}
.page-body {
  width: 100vw;
  height: 100vh;
  padding: 30rpx;
  font-size: 14px;
  overflow-x: hidden;
  background-color: #f2f4f5;
  box-sizing: border-box;
}
@import "uview-ui/index.scss";
</style>
