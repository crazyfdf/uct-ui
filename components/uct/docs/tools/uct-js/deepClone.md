# DeepClone 对象深度克隆

## DeepClone 对象深度克隆使用方法
```
/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}  深克隆后的对象
*/
this.$uct.clone(parent)
```
## DeepClone 对象深度克隆案例
```vue
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
  },
};
</script>
```