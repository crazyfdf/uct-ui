<template>
  <!-- 上传文件 -->
  <view v-show="!item.options.hidden">
    <!-- 上传图片 -->
    <u-upload v-if="item.type=='uploadImg'&&options.length"
              :before-upload="beforeUpload"
              class="uct-input"
              :action="options[index].actions"
              :form-data="options[index].formData"
              :file-list="fileList"
              :max-count="item.options.limit"></u-upload>
    <!-- :max-size="5 * 1024 * 1024" -->
    <!-- 上传文件 -->
    <!--     <u-upload v-if="item.type=='uploadFile'&&options.length"
              :before-upload="beforeUpload"
              class="uct-input"
              :action="options[index].actions"
              :form-data="options[index].formData"
              :file-list="fileList"
              :max-count="item.options.limit"></u-upload> -->

    <l-file ref="lFile"
            v-if="item.type=='uploadFile'&&options.length"
            @up-success="upSuccess">
    </l-file>
    <button v-if="item.type=='uploadFile'&&options.length"
            class="uct-input x-c"
            @tap="upLoad">上传文件</button>
  </view>
</template>

<script>
import lFile from "./module/l-file/l-file.vue";
import { AdapterFactory, Adapter } from "../../../libs/utils/adapter.js";
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
        if (
          this.item.options.defaultValue == "" ||
          this.item.options.defaultValue == "[]"
        ) {
          return [];
        } else {
          return this.item.options.defaultValue;
        }
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
  mounted() {
    // this.init();
  },
  methods: {
    init() {
      let fileName = this.item.options.fileName;
      this.$api("system.getFileUploadFormInfo", {
        datainfo: [
          {
            datatype: type[fileName][0],
            catecode: type[fileName][1],
            datacount: this.item.options.limit,
          },
        ],
      }).then((res) => {
        res.result.content[type[fileName][2]][type[fileName][0]].forEach(
          (item) => {
            this.options.push(new Adapter(item));
          }
        );

        this.value = new AdapterFactory(
          this.item,
          res.result.content[type[fileName][2]][type[fileName][0]]
        );
      });
    },
    beforeUpload(index, list) {
      this.index = index;
    },
    upLoad() {
      this.$refs.lFile.upload({
        // #ifdef APP-PLUS
        currentWebview: this.$mp.page.$getAppWebview(),
        // #endif
        url: this.options[this.index].actions, //测试地址，记得更换
        name: "file",
        key: this.options[this.index].formData.key,
        token: this.options[this.index].formData.token,
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