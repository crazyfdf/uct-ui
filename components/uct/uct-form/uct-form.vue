<template>
  <view :style="{
    'margin-top':`${top}rpx`,
    'margin-bottom':`${bottom}rpx`
  }">
    <slot></slot>
    <view v-for="(item,key) in formList"
          :key="key">
      <uct-form-item @mapData="mapData"
                     class="mb40"
                     @input="changeInput"
                     @upImage="upImage"
                     :layout="formData.config.layout"
                     :item="item"></uct-form-item>
    </view>
  </view>
</template>

<script>
import debounce from "@/common/utils/interactive.js";

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
      default: "form/submit",
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
      imgList: {},
      iList: [],
      map: {},
      data: {},
    };
  },
  computed: {
    formList: {
      set(val) {},
      get() {
        return !this.formData.list.length ? this.iList : this.formData.list;
      },
    },
  },
  mounted() {
    console.log(this.formData);
    if (!this.formData.list.length) {
      this.$api("form/form", { name: this.name, id: this.form_id }).then(
        (res) => {
          this.iList = res.data.frmJson.list;
        }
      );
    }
  },
  methods: {
    upImage(img) {
      this.imgList = Object.assign(this.imgList, img);
    },
    mapData(content) {
      let lng = `${content.model}_lng`;
      let lat = `${content.model}_lat`;
      let obj = {};
      obj[lng] = content.lng;
      obj[lat] = content.lat;
      Object.assign(this.map, obj);
    },
    formSubmit(e) {
      debounce.canDoFunction({
        key: "submit", //基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
        time: 5000, //如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
        success: () => {
          //成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
          submit.call(this, e);
        },
      });
    },
    changeInput(name, value) {
      this.data[name] = value;
      console.log(this.data);
    },
    formReset(e) {
      console.log("清空数据");
    },
  },
};
function submit(e) {
  let that = this;
  e.detail.value = Object.assign(that.data, that.imgList, that.more, that.map);
  console.log(that.data);
  let rules = {};
  for (let item of that.list) {
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
        rules = that.$rules.rules(e.detail.value, item2.rules);
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
    rules = that.$rules.rules(e.detail.value, item.rules);
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
  that.$tools.showLoading("正在提交", true, 1000);
  if (that.url) {
    that.$api(that.url, { ...e.detail.value, id: that.form_id }).then((res) => {
      console.log(res);
      if (res.code == 1) {
        uni.showToast({
          title: "提交成功",
          duration: 1000,
        });
        that.$emit("submit", e.detail.value);
      } else {
        this.$tools.showLoading(res.msg, true, 2000);
      }
    });
  }
}
</script>

<style scoped lang="scss">
</style>