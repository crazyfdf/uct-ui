<template>
  <view class="deepClone">
    <uct-nav>
      <view slot="center">DeepClone 对象深度克隆</view>
    </uct-nav>
    <view class="mt40"> 源对象为："{info: {name: 'mary'}}"</view>
    <view class="mt40"> 新对象：{{ result }} </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        info: {
          name: "mary",
        },
      },
      result: "",
    };
  },
  onLoad() {
    this.result = this.$uct.clone(this.obj);
    console.log(this.result);
  },
};
</script>
