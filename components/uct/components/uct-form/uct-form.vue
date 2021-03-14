<template>
  <view :style="{
    'margin-top':`${top}rpx`,
    'margin-bottom':`${bottom}rpx`
  }">
    <slot></slot>
    <view v-for="(item,key) in formList"
          v-if="formList.length"
          :key="key">
      <uct-form-item @mapData="mapData"
                     class="mb40"
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
export default {
  props: {
    /* form提交其他参数 */
    more: {
      type: Object,
      default() {
        return {};
      },
    },
    /* 直接拿到form数据和form表单名二选一 */
    formData: {
      type: Object,
      default() {
        return {};
      },
    },
    /* 通过form表单名拿到from数据 */
    name: {
      type: String,
      default() {
        return "";
      },
    },
    /* form id 修改拿到初始值用 */
    form_id: {
      type: String,
      default() {
        return "";
      },
    },
    /* 提交url */
    url: {
      type: String,
      default: "",
    },
    top: {
      type: Number,
      default() {
        return 0;
      },
    },
    bottom: {
      type: Number,
      default() {
        return 120;
      },
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
    /* 提交表单 */
    submit() {
      let that = this;
      if (that.form_id) {
        that.more.id = that.form_id;
      }
      let data = Object.assign(that.data, that.more);
      console.log(that.data);
      that.$tools.showLoading("正在提交", true, 1000);
      if (that.url) {
        that.$api(that.url, { ...data }).then((res) => {
          console.log(res);
          if (res.code == "000") {
            that.$emit("submit", data);
          }
        });
      } else {
        that.$emit("submit", data);
      }
    },
    /* 清除表单 */
    formReset(e) {
      console.log("清空数据");
    },
    /* 提交表单前的判断条件 */
    rules() {
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
            console.log(rules);
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
        rules = that.$rules.rules(that.data, item.rules);
        console.log(that.data, item.rules, rules);
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
    },
  },
};
</script>

<style scoped lang="scss">
</style>