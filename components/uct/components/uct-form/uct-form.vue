<template>
  <view>
    <!-- @slot 自定义的其他表单组件，提交参数通过more传递 -->
    <slot name='more'></slot>
    <view v-for="(item,index) in formList"
          class="pa20"
          v-if="formList.length"
          v-show="!(item.options&&item.options.hidden)||!item.options"
          :key="index">
      <!-- Form布局组件 -->
      <!-- card布局 -->
      <uct-card v-if="item.type == 'card'"
                :className="['bc-gray']"
                :title="item.label">
        <uct-form @dataItem="dataItem"
                  slot="body"
                  v-if="item.list&&item.list.length"
                  :_formConfig="formData.config"
                  :_formList="item.list"></uct-form>
      </uct-card>
      <!-- 分割线 -->
      <uct-divider v-if="item.type == 'divider'"
                   :item="item"></uct-divider>
      <!-- Form布局组件END -->

      <!-- 大标题 -->
      <uct-title v-if="item.type == 'text'"
                 class="f16 f900"
                 :titleStyle="titleStyle"
                 :item="item"></uct-title>
      <!-- 警告提示 -->
      <uct-alert v-if="item.type == 'alert'"
                 :item="item"></uct-alert>
      <!-- HTML -->
      <rich-text v-if="item.type == 'html'"
                 :nodes="item.options.defaultValue"></rich-text>
      <!-- 按钮 -->
      <uct-button v-if="item.type == 'button'"
                  :form-type="item.options.handle"
                  :type="item.options.type"
                  :rotate="true"
                  :bgColor="$uct.color(item.options.type)"
                  :disabled="item.options.disabled"
                  @click="handle(item.options.handle)"
                  :hidden="item.options.hidden"
                  :text="item.label"></uct-button>
      <!-- 增删改查组件 -->
      <uct-form-item v-if="['input', 'textarea', 'number','cascader','treeSelect', 'select', 'time', 'date','radio', 'checkbox','uploadFile', 'uploadImg','switch','rate','slider'].includes(item.type)"
                     :ref="item.key"
                     @input="changeInput"
                     :config="config"
                     :item="item"></uct-form-item>
    </view>
  </view>
</template>

<script>
import "../../libs/utils/aop.js";

/**
 * 表单业务组件，专门为表单而设计的，利用它可以快速实现表单验证、提交、增删改查等功能。
 * @displayName Form表单
 */

export default {
  name: "uct-form",
  props: {
    /** form提交其他参数
     * @values {key:value}
     */
    more: {
      type: Object,
      default() {
        return {};
      },
    },
    /** form数据
     * @values {"list": [],
                "config": {"layout": "horizontal",
                  "labelCol": {"xs": 4,
                    "sm": 4,
                    "md": 4,
                    "lg": 4,
                    "xl": 4,
                    "xxl": 4},
                  "wrapperCol": {"xs": 18,
                    "sm": 18,
                    "md": 18,
                    "lg": 18,
                    "xl": 18,
                    "xxl": 18},
                  "hideRequiredMark": false,
                  "customStyle": ""}} */
    formData: {
      type: Object,
      default() {
        return {};
      },
    },
    /** 提交url */
    url: {
      type: String,
      default: "",
    },
    /** title的自定义样式 */
    titleStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    /** 通过api拿到的表单数据(递归组件需要) */
    _formList: {
      type: Array,
      default() {
        return [];
      },
    },
    /** 内部form递归组件的配置(递归组件需要) */
    _formConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      data: {}, //当前表单的提交数据
    };
  },
  computed: {
    config: {
      set(val) {},
      get() {
        if (Object.keys(this.formData).length) {
          return this.formData.config;
        } else {
          return this._formConfig;
        }
      },
    },
    formList: {
      set(val) {},
      get() {
        if (Object.keys(this.formData).length) {
          this.config = this.formData.config;
          return this.formData.list;
        } else {
          return this._formList;
        }
      },
    },
    /* 增删改查组件数据 */
    formItemList() {
      return this.formList.filter((item) =>
        [
          "input",
          "textarea",
          "number",
          "cascader",
          "select",
          "time",
          "date",
          "radio",
          "checkbox",
          "uploadFile",
          "uploadImg",
          "switch",
        ].includes(item.type)
      );
    },
  },
  methods: {
    handle(type) {
      switch (type) {
        case "submit":
          this.formSubmit();
          break;
        case "reset":
          this.formReset();
          break;
      }
    },
    /* 提交表单 */
    formSubmit() {
      this.submit.before(this.rules)();
    },
    /* 监听表单内容发生改变 */
    changeInput(data) {
      Object.assign(this.data, data);
      /**
       * 递归表单内部数据改变事件
       * @event dataItem
       * @property {Object} data 内部表单数据
       * @params  {Object} data
       */
      this.$emit("dataItem", this.data);
    },

    dataItem(data) {
      this.data = Object.assign(this.data, data);
    },
    /** 提交表单 */
    submit() {
      if (this.form_id) {
        this.more.id = this.form_id;
      }
      let data = Object.assign(this.data, this.more);
      console.log(this.data);
      this.$uct.showLoading("正在提交", true, 1000);
      if (this.url) {
        this.$uct.api(this.url, { ...data }).then((res) => {
          console.log(res);
          if (res.code == "000") {
            /**
             * 表单提交事件
             * @event submit
             * @property {Object} data 表单提交数据
             * @params  {Object} data
             */
            this.$emit("submit", data);
          }
        });
      } else {
        /**
         * 表单提交事件
         * @event submit
         * @property {object} data 表单提交数据
         * @params {object} data
         */
        this.$emit("submit", data);
      }
    },
    /* 清除表单 */
    formReset(e) {
      console.log("清空数据");
    },
    /* 提交表单前的判断条件 */
    rules() {
      if (this.formData.config.hideRequiredMark) {
        let that = this;
        let rules = {};
        for (let item of that.formList) {
          if (item.rules) {
            for (let item1 of item.rules) {
              item1.name = item.model;
              item1.type = item1.pattern;
            }
          } else if (item.list) {
            for (let item2 of item.list) {
              if (item2.rules) {
                for (let item3 of item2.rules) {
                  item3.name = item2.model;
                  item3.type = item3.pattern;
                }
              } else {
                continue;
              }
              rules = that.$uct.rules(that.data, item2.rules);
              if (!rules.isOk) {
                break;
              }
            }
            if (!rules.isOk) {
              uni.showToast({
                icon: "none",
                title: rules.message,
              });
              return false;
            }
          } else {
            continue;
          }
          rules = that.$uct.rules(that.data, item.rules);
          if (!rules.isOk) {
            break;
          }
        }
        if (!rules.isOk) {
          uni.showToast({
            icon: "none",
            title: rules.message,
          });
          return false;
        }
        return true;
      } else {
        let flag = true;
        this.formItemList.forEach((item, index) => {
          if (!this.$refs[item.key][0].rule()) {
            flag = false;
          }
        });
        return flag;
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>