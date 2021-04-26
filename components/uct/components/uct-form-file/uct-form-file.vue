<template>
  <!-- 上传文件 -->
  <view>
    <!-- 上传图片 -->
    <u-upload v-if="item.type=='uploadImg'"
              :before-upload="beforeUpload"
              class="uct-input"
              :action="item.options.actions"
              :file-list="fileList"
              :max-count="item.options.limit"></u-upload>
    <!-- :max-size="5 * 1024 * 1024" -->
    <!-- 上传文件 -->
    <l-file ref="lFile"
            v-if="item.type=='uploadFile'"
            @up-success="upSuccess">
    </l-file>
    <button v-if="item.type=='uploadFile'"
            class="uct-input x-c"
            @tap="upLoad">上传文件</button>
  </view>
</template>

<script>
import lFile from "./module/l-file.vue";
const type = {
  image: ["IMAGE", "81", 0],
  video: ["VIDEO", "83", 1],
  file: ["FILE", "82", 2],
};

export default {
  components: {
    lFile,
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
      value: null,
      options: [],
      index: 0, //当前选择的文件
    };
  },
  computed: {
    fileList: {
      set(val) {
        this.value = val;
      },
      get() {
        return JSON.parse(this.item.options.defaultValue);
      },
    },
  },
  watch: {
    value: {
      handler(val) {
        this.$emit("fileValue", val);
      },
      deep: true,
    },
  },
  methods: {
    beforeUpload(index, list) {
      this.index = index;
    },
    upLoad() {
      this.$refs.lFile.upload({
        // #ifdef APP-PLUS
        currentWebview: this.$mp.page.$getAppWebview(),
        // #endif
        url: this.item.options.actions, //测试地址，记得更换
        name: "file",
        // key: this.item.options.formData.key,
        // token: this.item.options.formData.token,
      });
    },
    upSuccess(...arg) {
      console.log(arg);
    },
  },
};
</script>

<style scoped lang="scss">
.uct-input {
  display: flex;
  flex: 1 auto;
  font-size: 14px;
  font-weight: 900;
  border: none;
  background-color: transparent;
}
</style>