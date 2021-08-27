# Rule 规则校验

## Rule 规则校验使用方法
```
/**
* @description: 类型校验
* @param {string} type 判断类型可选：number,int,phone,telephone,email,pwd,inviteCode,idCard
* @param {*} val 判断的值
* @return {*} 返回判断的结果:true|false
*/
this.$uct.isRule(type, val)
```
## Rule 规则校验案例
```vue
<template>
  <view class="rule px40">
    <uct-nav>
      <view slot="center">Rule 规则校验</view>
    </uct-nav>
    <view class="mt40">
      <view class="u-item-title">邮箱</view>
      <u-subsection :list="email" @change="emailChange"></u-subsection>
    </view>
    <view class="mt40">
      <view class="u-item-title">手机号</view>
      <u-subsection :list="mobile" @change="mobileChange"></u-subsection>
    </view>
    <view class="mt40">
      <view class="u-item-title">中文</view>
      <u-subsection :list="idCard" @change="idCardChange"></u-subsection>
    </view>
    <view class="mt40">
      <view class="u-item-title">整数</view>
      <u-subsection :list="digits" @change="digitsChange"></u-subsection>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      email: ["google@gmail.com", "google艾特gmail.com"],
      mobile: ["13478561273", "0778-3423082"],
      idCard: ["420821199905250051", "420821199900000000"],
      digits: [283, "下雨的声音"],
    };
  },
  methods: {
    toast(type) {
      this.$uct.showToast(type ? "验证通过" : "验证失败", { icon: type ? "success" : "loading" });
    },
    emailChange(index) {
      this.toast(this.$uct.isRule("email", this.email[index]));
    },
    mobileChange(index) {
      this.toast(this.$uct.isRule("phone", this.mobile[index]));
    },
    idCardChange(index) {
      this.toast(this.$uct.isRule("idCard", this.idCard[index]));
    },
    digitsChange(index) {
      this.toast(this.$uct.isRule("int", this.digits[index]));
    },
  },
};
</script>
```