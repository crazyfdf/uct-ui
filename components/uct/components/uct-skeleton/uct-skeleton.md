##  Skeleton使用方法
``` vue
<template>
  <view class='uct-details'>
    <!-- @slot 详情页的自定义navbar插槽 -->
    <slot name="nav"></slot>
    <view class="uct-skeleton uct-skeleton-rect"
          style="flex:1;width:100vw">
      <slot></slot>
    </view>
    <uct-skeleton :loading="loading"
                  v-if="ready"
                  :animation="true"
                  bgColor="#FFF">
    </uct-skeleton>
  </view>
</template>
```

```js
export default {
  props: {
    /** 是否加载中状态 */
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ready: false, //解决h5端top值计算错误
    };
  },
  mounted() {
    this.$nextTick(() => (this.ready = true));
  },
};

```

```scss
<style scoped lang="scss">
.uct-details {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
```