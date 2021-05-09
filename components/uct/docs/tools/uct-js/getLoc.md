# GetLoc 获取地址

## GetLoc 获取地址使用方法
```
/**
* 获取地址
* getLoc()
*/
this.$uct.getLoc().then()
```

## GetLoc 获取地址案例
```vue
<template>
  <view class="getLoc">
    <uct-nav>
      <view slot="center">getLoc 获取地址</view>
    </uct-nav>
    <view>当前地址：{{res}}</view>
    <uct-button class="mt40"
                @click="getLoc"
                text="获取地址"></uct-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      res: "",
    };
  },
  methods: {
    getLoc() {
      this.$uct.getLoc().then((res) => {
        this.res = res;
      });
    },
  },
};
</script>

```