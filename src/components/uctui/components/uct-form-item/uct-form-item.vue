<template>
  <view>
    <view class="uct-form-item"
          :class="{'uct-form-item-flex':config.layout == 'horizontal','uct-form-item-block':config.layout == 'vertical'
     }">
      <!-- 标题name -->
      <view class="uct-form-item-title f700"
            v-if="item.rules && item.rules.length"
            :class="item.rules[0].required? 'isRequired': ''">{{ item.label }}</view>
      <!-- 输入框 -->
      <uct-form-input v-if="['input', 'textarea', 'number'].includes(item.type)"
                      :item="item"
                      class="uct-form-item-value"
                      :class="{'uct-form-item-value-border':isborder,'uct-form-item-value-flex':config.layout == 'horizontal','uct-form-item-value-block':config.layout == 'vertical'}"
                      v-model="value"></uct-form-input>
      <!-- 选择器 -->
      <uct-form-select v-if="['cascader','treeSelect', 'select', 'time', 'date'].includes(item.type)"
                       :item="item"
                       class="uct-form-item-value"
                       :class="{'uct-form-item-value-border':isborder,'uct-form-item-value-flex':config.layout == 'horizontal','uct-form-item-value-block':config.layout == 'vertical'}"
                       v-model="value"
                       @mapData="mapData"></uct-form-select>
      <!-- 选择框 -->
      <uct-form-check v-if="['radio', 'checkbox'].includes(item.type)"
                      :item="item"
                      class="uct-form-item-value"
                      :class="config.layout == 'horizontal'? 'uct-form-item-value-flex': 'uct-form-item-value-block'"
                      v-model="value"></uct-form-check>
      <!-- 上传文件 -->
      <uct-form-file v-if="['uploadFile', 'uploadImg'].includes(item.type)"
                     :item="item"
                     v-model="value"
                     class="uct-form-item-value"
                     :class="config.layout == 'horizontal'? 'uct-form-item-value-flex': 'uct-form-item-value-block'"></uct-form-file>
      <!-- 评分 -->
      <uct-form-rate v-if="item.type == 'rate'"
                     :item="item"
                     class="uct-form-item-value"
                     :class="config.layout == 'horizontal'? 'uct-form-item-value-flex': 'uct-form-item-value-block'"
                     v-model="value"></uct-form-rate>

      <!-- 开关 -->
      <uct-form-switch v-if="item.type == 'switch'"
                       :item="item"
                       class="uct-form-item-value"
                       :class="config.layout == 'horizontal'? 'uct-form-item-value-flex': 'uct-form-item-value-block'"
                       v-model="value"></uct-form-switch>
      <!-- 滑块 -->
      <uct-form-slider v-if="item.type == 'slider'"
                       :min="item.options.min"
                       :max="item.options.max"
                       :step="item.options.step"
                       :disabled="item.options.disabled"
                       v-model="value"
                       class="uct-form-item-value"
                       :class="config.layout == 'horizontal'? 'uct-form-item-value-flex': 'uct-form-item-value-block'"></uct-form-slider>
    </view>

    <!-- 提示语 -->
    <view v-show="!config.hideRequiredMark && errorMessage"
          class="c-red mt10">{{errorMessage}}</view>
    <!-- 下划线 -->
    <view class="uct-border-bottom mt20"></view>
  </view>
</template>

<script>
/**
 * 表单子组件，为uct-form表单组件提供支持，内部包括输入框，选择器，选择框，上传文件，开关，提示语等增删改查组件。
 * @displayName FormItem子表单
 */
export default {
  name: "uct-form-item",
  props: {
    /** 增删改查组件配置
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
      default: false,
    },
  },
  data() {
    return {
      value: null,
      errorMessage: "", //错误信息
      data: {},
    };
  },
  watch: {
    value: {
      handler(val) {
        let value = val
          ? val
          : this.item.options.defaultValue == "[]"
          ? JSON.parse(this.item.options.defaultValue)
          : this.item.options.defaultValue;
        this.data[`${this.item.model}`] = value;
        /**
         * 当组件内容发生改变时传递参数
         * @event input
         * @property {object} data {key:value}
         * @params {object} data
         */
        this.$emit("input", this.data);
        this.rule();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    mapData(content) {
      this.$emit("mapData", content);
    },
    /* 单个校验 */
    rule() {
      // 排除据第一次校验，未要求输入数值为空的情况
      if (!this.item.rules[0].required && !this.value) {
        return true;
      }
      let that = this;
      let rules = {};
      if (that.item.rules) {
        for (let item1 of that.item.rules) {
          item1.name = that.item.model;
          item1.type = item1.pattern;
        }
        rules = that.$uct.rules(this.data, that.item.rules);
        if (!rules.isOk) {
          that.errorMessage = rules.message;
          return false;
        }
      }
      that.errorMessage = "";
      return true;
    },
  },
};
</script>

<style scope lang="scss">
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
  &-title {
    white-space: nowrap;
  }

  /* 输入框 */
  &-value {
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
}
</style>
