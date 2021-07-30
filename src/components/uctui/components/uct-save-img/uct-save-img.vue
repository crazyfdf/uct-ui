<template>
  <view class="uct-see-img"
        @longpress="logoTime">
    <u-mask :show="show"
            v-if="show && lazyLoad"
            @click="show = false">
      <view class="y-c"
            style="height:100vh">
        <u-image :width="586"
                 :height="820"
                 mode="aspectFit"
                 :src="url"></u-image>
        <view class="mt20 f16 c-white">长按保存图片至相册</view>
      </view>
    </u-mask>
    <!-- nvue不能使用uview -->
    <uni-popup ref="popup"
               v-if="!lazyLoad"
               type="center">
      <view class="y-c"
            style="height:100vh;margin-top:-80rpx"
            @longpress="logoTime">
        <image :src="url"
               :lazy-load="true"
               style="width:586rpx;height:820rpx;background-size: 100%;" />
        <text class="mt20 f16 c-white">长按保存图片至相册</text>
      </view>
    </uni-popup>
  </view>
</template>

<script>
/**
 * 保存图片，为分享业务设计，可实现移动端图片展示，保存等功能。
 * @displayName SaveImg保存图片
 */
export default {
  components: {},
  props: {
    /** 图片地址 */
    url: {
      type: String,
      defalut: "",
    },
    /** 是否开启图片懒加载 */
    lazyLoad: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showImg() {
      this.show = true;
      if (!this.lazyLoad) {
        this.$refs.popup.open();
      }
    },
    closeImg() {
      this.show = false;
      if (!this.lazyLoad) {
        this.$refs.popup.close();
      }
    },
    logoTime() {
      let that = this;
      uni.saveImageToPhotosAlbum({
        filePath: this.url,
        success: function () {
          that.closeImg();
          uni.showToast({
            title: "保存成功",
            icon: "success",
            duration: 2000,
          });
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
/*上下左右居中*/
.y-c {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* x水平靠右*/
.x-je {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  justify-content: flex-end;
}
</style>
