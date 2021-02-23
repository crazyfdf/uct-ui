<template>
  <view>
    <view class="uct-form-item"
          :class="layout=='horizontal'?'uct-form-item-flex':'uct-form-item-block'">
      <!-- 标题 -->
      <view v-if="item.type=='text'"
            class="text f16 f900">{{item.label}}</view>
      <!-- 标题 -->
      <view class="uct-title"
            v-if="item.rules&&item.rules.length"
            :class="item.rules[0].required?'isRequired':''">{{item.label}}</view>
      <!-- 输入框 -->
      <form-input v-if="['input','textarea','number'].includes(item.type)"
                  :item="item"
                  class="uct-form-item-value"
                  :class="layout=='horizontal'?'uct-form-item-value-flex':'uct-form-item-value-block'"
                  v-model="value"></form-input>
      <!-- 选择器 -->
      <form-select v-if="['cascader','select','time','date'].includes(item.type)"
                   :item="item"
                   class="uct-form-item-value"
                   :class="layout=='horizontal'?'uct-form-item-value-flex':'uct-form-item-value-block'"
                   v-model="value"
                   @mapData="mapData"></form-select>
      <!-- 选择框 -->
      <form-check v-if="['radio','checkbox'].includes(item.type)"
                  :item="item"
                  class="uct-form-item-value"
                  :class="layout=='horizontal'?'uct-form-item-value-flex':'uct-form-item-value-block'"
                  v-model="value"></form-check>
      <!-- 上传文件 -->
      <form-file v-if="['uploadFile','uploadImg'].includes(item.type)"
                 :item="item"
                 class="uct-form-item-value"
                 :class="layout=='horizontal'?'uct-form-item-value-flex':'uct-form-item-value-block'"></form-file>
      <!--       <robby-image-upload v-model="img"
                          class="uct-form-item-value"
                          :class="layout=='horizontal'?'uct-form-item-value-flex':'uct-form-item-value-block'"
                          v-if="item.type=='uploadImg'"
                          :limit="item.options.limit"
                          :header="header"
                          @delete="deleteImage"
                          @add="addImage"
                          :showUploadProgress="true"
                          :server-url="item.options.action"></robby-image-upload> -->
      <!-- 开关 -->
      <form-switch v-if="item.type=='switch'"
                   :item="item"
                   class="uct-form-item-value"
                   :class="layout=='horizontal'?'uct-form-item-value-flex':'uct-form-item-value-block'"
                   v-model="value"></form-switch>

      <!-- 警告提示 -->
      <form-alert v-if="item.type=='alert'"
                  :item="item"
                  class="uct-alert"
                  v-model="value"></form-alert>

      <!-- 分割线 -->
      <form-divider v-if="item.type=='divider'"
                    :item="item"
                    class="uct-divider"
                    v-model="value"></form-divider>
      <!-- 按钮 -->
      <button style="width:100%"
              v-if="item.type=='button'"
              :form-type="item.options.handle"
              :type="item.options.type"
              :disabled="item.options.disabled"
              :hidden="item.options.hidden">{{item.label}}</button>
    </view>

    <!-- 提示语 -->
    <view v-if="errorMessage">{{errorMessage}}</view>
  </view>
</template>

<script>
import FormAlert from "./form-item-template/form-alert.vue";
import FormDivider from "./form-item-template/form-divider.vue";
import FormInput from "./form-item-template/form-input.vue";
import FormSelect from "./form-item-template/form-select.vue";
import FormSwitch from "./form-item-template/form-switch.vue";
import FormUploadImg from "./form-item-template/form-uploadImg.vue";
import RobbyImageUpload from "@/components/robby-image-upload/robby-image-upload.vue";
import FormCheck from "./form-item-template/form-check.vue";
import FormFile from "./form-item-template/form-file.vue";

export default {
  components: {
    FormInput,
    FormSwitch,
    FormDivider,
    FormUploadImg,
    FormSelect,
    FormAlert,
    RobbyImageUpload,
    FormCheck,
    FormFile,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    layout: {
      type: String,
      default() {
        return "vertical"; //horizontal左右布局，vertical上下布局
      },
    },
  },
  data() {
    return {
      value: null,
      imglist: {},
      header: {
        token: uni.getStorageSync("token"),
      },
      errorMessage: "", //错误信息
    };
  },
  created() {
    if (this.item.type == "uploadImg") {
      this.img = this.value;
    }
  },
  computed: {
    /*     img: {
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
    }, */
  },
  watch: {
    value(val) {
      this.$emit("input", this.item.model, val);
    },
  },
  methods: {
    deleteImage: function (e) {},
    addImage: function (e) {},
    mapData(content) {
      this.$emit("mapData", content);
    },
  },
};
</script>

<style scoped lang="scss">
/*表单主题*/
.uct-form-item {
  display: flex;
  color: #323232;
  &-flex {
    justify-content: space-between;
    align-items: center;
  }
  &-block {
    flex-direction: column;
  }
  /* 标题 */
  .uct-title {
    white-space: nowrap;
  }

  /* 输入框 */
  .uct-form-item-value {
    display: flex;
    flex: 1 auto;
    font-size: 14px;
    font-weight: 900;
    border: none;
    background-color: transparent;
    &-flex {
      margin-left: 20rpx;
    }
  }
  /* 分界线 */
  .uct-divider {
    flex: 1 auto;
  }
  /* 警告提示 */
  .uct-alert {
    flex: 1 auto;
  }
}
</style>
