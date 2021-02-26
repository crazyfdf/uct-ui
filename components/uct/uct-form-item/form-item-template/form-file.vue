<template>
  <!-- 上传文件 -->
  <view v-show="!item.options.hidden">
    <!-- 上传图片 -->
    <u-upload v-if="item.type=='uploadImg'"
              :before-upload="beforeUpload"
              class="uct-input"
              :action="item.options.action"
              :file-list="fileList"
              :max-size="5 * 1024 * 1024"
              :max-count="item.options.limit"></u-upload>
    <!-- 上传文件 -->
    <!--     <u-upload v-if="item.type=='uploadFile'"
              class="uct-input"
              :max-size="5 * 1024 * 1024"
              :max-count="item.options.limit"></u-upload> -->
  </view>
</template>

<script>
export default {
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
      value: "",
    };
  },
  computed: {
    fileList: {
      set(val) {
        this.value = val;
      },
      get() {
        if (this.item.options.defaultValue == "[]") {
          return [];
        } else {
          return this.item.options.defaultValue;
        }
      },
    },
  },
  watch: {
    value(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    beforeUpload(index, list) {
      // 返回一个promise
      console.log(index, list);
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