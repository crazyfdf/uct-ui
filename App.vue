<script>
import Vue from "vue";

export default {
  methods: {},
  onLaunch: function (options) {
    console.log(this.$uct);
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
  font-size: 14px;
  overflow-x: hidden;
  // background-color: #f2f4f5;
  box-sizing: border-box;
}
@import "uview-ui/index.scss";
</style>
