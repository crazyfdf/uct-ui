<template>
  <view>
    <view class="uct-form-item"
          :class="config.layout=='horizontal'?'uct-form-item-flex':'uct-form-item-block'">
      <!-- 标题 -->
      <view v-if="item.type=='text'"
            class="text f16 f900">{{item.label}}</view>
      <!-- 标题 -->
      <view class="uct-title"
            v-if="item.rules&&item.rules.length"
            :class="item.rules[0].required||item.rules[1]&&item.rules[1].message=='img'?'isRequired':''">{{item.label}}</view>
      <!-- 输入框 -->
      <form-input v-if="['input','textarea','number'].includes(item.type)"
                  :item="item"
                  class="uct-form-item-value"
                  :class="config.layout=='horizontal'?'uct-form-item-value-flex':'uct-form-item-value-block'"
                  v-model="value"></form-input>
      <!-- 选择器 -->
      <form-select v-if="['cascader','select','time','date'].includes(item.type)"
                   :item="item"
                   class="uct-form-item-value"
                   :class="config.layout=='horizontal'?'uct-form-item-value-flex':'uct-form-item-value-block'"
                   v-model="value"
                   @mapData="mapData"></form-select>
      <!-- 选择框 -->
      <form-check v-if="['radio','checkbox'].includes(item.type)"
                  :item="item"
                  class="uct-form-item-value"
                  :class="config.layout=='horizontal'?'uct-form-item-value-flex':'uct-form-item-value-block'"
                  v-model="value"></form-check>
      <!-- 上传文件 -->
      <form-file v-if="['uploadFile','uploadImg'].includes(item.type)"
                 :item="item"
                 @fileValue="(val)=>$emit(
                 'fileValue',
                 val)"
                 class="uct-form-item-value"
                 :class="config.layout=='horizontal'?'uct-form-item-value-flex':'uct-form-item-value-block'"></form-file>
      <!-- 开关 -->
      <form-switch v-if="item.type=='switch'"
                   :item="item"
                   class="uct-form-item-value"
                   :class="config.layout=='horizontal'?'uct-form-item-value-flex':'uct-form-item-value-block'"
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
      <uct-button style="width:100%"
                  v-if="item.type=='button'"
                  :form-type="item.options.handle"
                  :type="item.options.type"
                  :rotate="true"
                  :bgColor="item.options.type|color"
                  :disabled="item.options.disabled"
                  @click="handle"
                  :hidden="item.options.hidden"
                  :text="item.label"></uct-button>
    </view>

    <!-- 提示语 -->
    <view v-show="config.hideRequiredMark&&errorMessage"
          class="c-red">{{errorMessage}}</view>
  </view>
</template>

<script>
import FormAlert from "./form-item-template/form-alert.vue";
import FormDivider from "./form-item-template/form-divider.vue";
import FormInput from "./form-item-template/form-input.vue";
import FormSelect from "./form-item-template/form-select.vue";
import FormSwitch from "./form-item-template/form-switch.vue";
import FormCheck from "./form-item-template/form-check.vue";
import FormFile from "./form-item-template/form-file.vue";
import filter from "../../libs/utils/filter.js";

const formType = {
  submit: (that) => {
    that.$emit("formSubmit");
  },
  reset: (that) => {
    that.$emit("formReset");
  },
};
export default {
  filters: filter,
  components: {
    FormInput,
    FormSwitch,
    FormDivider,
    FormSelect,
    FormAlert,
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
    config: {
      type: Object,
      default() {
        return { layout: "vertical", hideRequiredMark: false }; //horizontal左右布局，vertical上下布局
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
  watch: {
    value(val) {
      let data = {};
      data[`${this.item.model}`] = val;
      this.$emit("input", data);
      this.rule(data);
    },
  },
  methods: {
    mapData(content) {
      this.$emit("mapData", content);
    },
    handle() {
      formType[this.item.options.handle](this);
    },
    rule(data) {
      let that = this;
      let rules = {};
      if (that.item.rules) {
        for (let item1 of that.item.rules) {
          item1.name = that.item.model;
          item1.type = item1.pattern;
        }
        rules = that.$uct.rules(data, that.item.rules);
      }
      if (!rules.isOk) {
        that.errorMessage = rules.message;
        return false;
      } else {
        that.errorMessage = "";
        return true;
      }
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
