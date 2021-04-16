<template>
  <view>
    <!-- @slot 自定义的其他表单组件，提交参数通过more传递 -->
    <slot name='more'></slot>
    <view v-for="(item,index) in formList"
          v-if="formList.length"
          :key="index">
      <uct-form-item @mapData="mapData"
                     class="mb40"
                     :ref="`formItem${index}`"
                     @input="changeInput"
                     @upImage="upImage"
                     :config="formData.config"
                     :item="item"
                     @fileValue="fileValue"
                     @formSubmit="formSubmit"></uct-form-item>
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
    /** 直接拿到form数据和form表单名二选一 */
    formData: {
      type: Object,
      default() {
        return {};
      },
    },
    /** 通过form表单名拿到from数据 */
    name: {
      type: String,
      default: "",
    },
    /** form id 修改表单时拿到初始值用 */
    form_id: {
      type: String,
      default: "",
    },
    /** 提交url */
    url: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      apiList: [], //api传入的表单数据
      data: {}, //当前表单的提交数据
    };
  },
  computed: {
    formList: {
      set(val) {},
      get() {
        if (Object.keys(this.formData).length) {
          return this.formData.list;
        } else if (this.url) {
          return this.apiList;
        } else {
          return [];
        }
      },
    },
  },
  mounted() {
    /* 判断当前表单数据是由外部传入还是api传入 */
    if (!Object.keys(this.formData).length && this.url != "") {
      this.$api("form/form", { name: this.name, id: this.form_id }).then(
        (res) => {
          this.apiList = res.data.frmJson.list;
        }
      );
    }
    console.log(this.$uct);
  },
  methods: {
    upImage(img) {},
    fileValue(val) {
      Object.assign(this.data, val);
    },
    /*  */
    mapData(content) {
      let lng = `${content.model}_lng`;
      let lat = `${content.model}_lat`;
      let obj = {};
      obj[lng] = content.lng;
      obj[lat] = content.lat;
      Object.assign(this.data, obj);
    },
    /* 提交表单 */
    formSubmit() {
      this.submit.before(this.rules)();
    },
    /* 监听表单内容发生改变 */
    changeInput(data) {
      Object.assign(this.data, data);
    },

    submit() {
      if (this.form_id) {
        this.more.id = this.form_id;
      }
      let data = Object.assign(this.data, this.more);
      console.log(this.data);
      this.$tools.showLoading("正在提交", true, 1000);
      if (this.url) {
        this.$api(this.url, { ...data }).then((res) => {
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
      }
      this.formList.forEach((item, index) => {
        this.$refs[`formItem${index}`][0].rule();
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>