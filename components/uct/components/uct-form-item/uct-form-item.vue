<template>
  <view>
    <view class="uct-form-item"
          :class="{'uct-form-item-flex':config.layout == 'horizontal','uct-form-item-block':config.layout == 'vertical'
     }">
      <!-- 大标题 -->
      <view v-if="item.type == 'text'"
            class="text f16 f900"
            :style="[getTitleStyle]">{{
        item.label
      }}</view>
      <!-- 标题name -->
      <view class="uct-title f700"
            v-if="item.rules && item.rules.length"
            :class="
          item.rules[0].required ||
          (item.rules[1] && item.rules[1].message == 'img')
            ? 'isRequired'
            : ''
        ">{{ item.label }}</view>
      <!-- 输入框 -->
      <form-input v-if="['input', 'textarea', 'number'].includes(item.type)"
                  :item="item"
                  class="uct-form-item-value"
                  :class="{'uct-form-item-value-border':isborder,'uct-form-item-value-flex':config.layout == 'horizontal','uct-form-item-value-block':config.layout == 'vertical'}"
                  v-model="value"></form-input>
      <!-- 选择器 -->
      <form-select v-if="['cascader', 'select', 'time', 'date'].includes(item.type)"
                   :item="item"
                   class="uct-form-item-value"
                   :class="{'uct-form-item-value-border':isborder,'uct-form-item-value-flex':config.layout == 'horizontal','uct-form-item-value-block':config.layout == 'vertical'}"
                   v-model="value"
                   @mapData="mapData"></form-select>
      <!-- 选择框 -->
      <form-check v-if="['radio', 'checkbox'].includes(item.type)"
                  :item="item"
                  class="uct-form-item-value"
                  :class="config.layout == 'horizontal'? 'uct-form-item-value-flex': 'uct-form-item-value-block'"
                  v-model="value"></form-check>
      <!-- 上传文件 -->
      <form-file v-if="['uploadFile', 'uploadImg'].includes(item.type)"
                 :item="item"
                 @fileValue="(val) => $emit('fileValue', val)"
                 class="uct-form-item-value"
                 :class="config.layout == 'horizontal'? 'uct-form-item-value-flex': 'uct-form-item-value-block'"></form-file>
      <!-- 开关 -->
      <form-switch v-if="item.type == 'switch'"
                   :item="item"
                   class="uct-form-item-value"
                   :class="config.layout == 'horizontal'? 'uct-form-item-value-flex': 'uct-form-item-value-block'"
                   v-model="value"></form-switch>

      <!-- 警告提示 -->
      <form-alert v-if="item.type == 'alert'"
                  :item="item"
                  class="uct-alert"
                  v-model="value"></form-alert>

      <!-- 分割线 -->
      <form-divider v-if="item.type == 'divider'"
                    :item="item"
                    class="uct-divider"
                    v-model="value"></form-divider>
      <!-- 按钮 -->
      <uct-button style="width: 100%"
                  v-if="item.type == 'button'"
                  :form-type="item.options.handle"
                  :type="item.options.type"
                  :rotate="true"
                  :bgColor="item.options.type | color"
                  :disabled="item.options.disabled"
                  @click="handle"
                  :hidden="item.options.hidden"
                  :text="item.label"></uct-button>
    </view>

    <!-- 提示语 -->
    <view v-show="!config.hideRequiredMark && errorMessage"
          class="c-red mt10">{{errorMessage}}</view>
    <!-- 下划线 -->
    <view class="uct-border-bottom mt20"></view>
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

/**
 * 表单子组件，为uct-form表单组件提供支持，内部包括标题，输入框，选择器，选择框，上传文件，分割线，开关，警告提示，提示语，下划线等组件。
 * @displayName FormItem子表单
 */
export default {
  name: "uct-form-item",
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
    /**  horizontal左右布局，vertical上下布局
     * @values {"type": "input",
      "label": "输入框",
      "icon": "icon-write",
      "options": {"type": "text",
        "width": "100%",
        "defaultValue": "",
        "placeholder": "请输入",
        "clearable": false,
        "maxLength": null,
        "hidden": false,
        "disabled": false},
      "model": "input_1612861962073",
      "key": "input_1612861962073",
      "rules": [{"required": false,
        "message": "必填项"}]},
     */
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    /**  horizontal左右布局，vertical上下布局 */
    config: {
      type: Object,
      default() {
        return { layout: "vertical", hideRequiredMark: false };
      },
    },
    /** 是否显示表单域的边框 */
    isborder: {
      type: Boolean,
      default: true,
    },
    /** title的自定义样式 */
    customStyle: {
      type: Object,
      default() {
        return {
          backgroundColor: "rgba(246, 246, 246, 1)",
          padding: "20rpx 40rpx",
          width: "100vw",
        };
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
      // 父组件的参数，在computed计算中，无法得知this.parent发生变化，故将父组件的参数值，放到data中
      parentData: {
        borderBottom: true,
        labelWidth: 90,
        labelPosition: "left",
        labelStyle: {},
        labelAlign: "left",
      },
      data: {},
    };
  },
  created() {
    if (this.item.type == "uploadImg") {
      this.img = this.value;
    }
  },
  watch: {
    value(val) {
      this.data[`${this.item.model}`] = val;
      /**
       * 当组件内容发生改变时传递参数
       * @event input
       * @property {object} data {key:value}
       * @params {object} data
       */
      this.$emit("input", this.data);
      this.rule();
    },
  },
  computed: {
    // label的下划线
    elBorderBottom() {
      // 子组件的borderBottom默认为空字符串，如果不等于空字符串，意味着子组件设置了值，优先使用子组件的值
      return this.borderBottom !== ""
        ? this.borderBottom
        : this.parentData.borderBottom
        ? this.parentData.borderBottom
        : true;
    },
    getTitleStyle() {
      let style = {};
      style = Object.assign(style, this.customStyle);
      return style;
    },
  },
  methods: {
    mapData(content) {
      this.$emit("mapData", content);
    },
    handle() {
      formType[this.item.options.handle](this);
    },
    rule() {
      let that = this;
      let rules = {};
      if (that.item.rules) {
        for (let item1 of that.item.rules) {
          item1.name = that.item.model;
          item1.type = item1.pattern;
        }
        rules = that.$uct.rules(this.data, that.item.rules);
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
    border: none;
    background-color: transparent;
    &-flex {
      margin-left: 40rpx;
    }
    &-block {
      margin-top: 20rpx;
    }
    &-border {
      padding: 0 20rpx;
      border-radius: 6rpx;
      border: 1px solid $u-form-item-border-color;
      box-sizing: border-box;
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
/* start--Retina 屏幕下的 1px 边框--start */
.uct-border,
.uct-border-bottom,
.uct-border-left,
.uct-border-right,
.uct-border-top,
.uct-border-top-bottom {
  position: relative;
}

.uct-border-bottom:after,
.uct-border-left:after,
.uct-border-right:after,
.uct-border-top-bottom:after,
.uct-border-top:after,
.uct-border:after {
  /* #ifndef APP-NVUE */
  content: " ";
  /* #endif */
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  box-sizing: border-box;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  // 多加0.1%，能解决有时候边框缺失的问题
  width: 199.8%;
  height: 199.7%;
  transform: scale(0.5, 0.5);
  border: 0 solid $u-border-color;
  z-index: 2;
}

.uct-border-top:after {
  border-top-width: 1px;
}

.uct-border-left:after {
  border-left-width: 1px;
}

.uct-border-right:after {
  border-right-width: 1px;
}

.uct-border-bottom:after {
  border-bottom-width: 1px;
}
</style>
