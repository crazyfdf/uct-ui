# Vuex 操作vuex

## Vuex 操作vuex使用方法
```
/**
* @description: 获取vuex的state中变量
* @param {string} name 变量名
*/
this.$store.state.version
```
```
/**
* @description: 修改vuex的state中变量
* @param {string} name 变量名
* @param {string} value 变量值
*/
this.$uct.vuex("version", "0.0.2");
```

## Vuex 操作vuex案例
```vue
<template>
  <view class="getLoc">
    <uct-nav>
      <view slot="center">Vuex 操作</view>
    </uct-nav>
    <view>当前版本：{{$store.state.version}}</view>
    <uct-button class="mt40"
                @click="setVersion"
                text="更改版本"></uct-button>
  </view>
</template>

<script>
export default {
  methods: {
    setVersion() {
      this.$uct.vuex("version", "0.0.2");
    },
  },
};
</script>
```