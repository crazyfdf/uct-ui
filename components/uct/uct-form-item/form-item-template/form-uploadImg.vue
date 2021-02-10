<template>
  <!-- 图片 -->
  <view class='form-uploadImg'
        v-if="item.type=='uploadImg'"
        v-show="!item.options.hidden">
    <robby-image-upload v-model="img"
                        :limit="item.options.limit"
                        :header="header"
                        @delete="deleteImage"
                        @add="addImage"
                        :showUploadProgress="true"
                        :server-url="item.options.action"></robby-image-upload>
  </view>
</template>

<script>
import RobbyImageUpload from "@/components/robby-image-upload/robby-image-upload.vue";

export default {
  behaviors: ["uni://form-field"],
  components: {
    RobbyImageUpload,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      imglist: {},
      header: {
        token: uni.getStorageSync("token"),
      },
    };
  },
  created() {
    if (this.item.type == "uploadImg") {
      this.img = this.value;
    }
  },
  computed: {
    img: {
      set(v) {
        if (this.item.type == "uploadImg") {
          this.imglist[this.name] = v;
          this.$emit("upImage", this.imglist);
          // this.$emit('input', this.imglist)
        }
      },
      get() {
        return this.value;
      },
    },
  },
  methods: {
    deleteImage: function (e) {},
    addImage: function (e) {},
  },
};
</script>

<style scoped lang="scss">
</style>