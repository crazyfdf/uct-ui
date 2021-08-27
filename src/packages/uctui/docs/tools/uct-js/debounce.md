# Throttle | Debounce 节流防抖

## Throttle | Debounce 节流防抖使用方法
```
/**
 * 节流
 * throttle(fnc,1000,true)
 * @param {Function} func 回调函数
 * @param {Number} time 节流时间默认500毫秒
 * @param {Boolean} isImmediate 是否立即执行
 * @returns
 */
this.$uct.throttle(func, time = 500, isImmediate = true)
```
```
/**
 * 防抖
 * debounce(fnc,1000,true)
 * @param {Function} func 回调函数
 * @param {Number} time 防抖时间默认500毫秒
 * @param {Boolean} isImmediate 是否立即执行
 * @returns
 */
this.$uct.debounce(func, time = 500, isImmediate = true)
```
## Throttle | Debounce 节流防抖案例
```vue
<template>
  <view class="px40">
    <uct-nav>
      <view slot="center">Throttle | Debounce 节流防抖</view>
    </uct-nav>
    <view class="f700 f24 mt40">{{ result }}</view>
    <uct-button class="mt40" @click="add('debounce')" text="防抖"></uct-button>
    <uct-button class="mt40" @click="add('throttle')" text="节流"></uct-button>
  </view>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      result: "0",
    };
  },
  methods: {
    add(type) {
      switch (type) {
        case "debounce":
          this.$uct.debounce(
            () => {
              this.result += "0";
            },
            5000,
            true
          );
          break;

        case "throttle":
          this.$uct.throttle(
            () => {
              this.result += "0";
            },
            5000,
            true
          );
          break;
      }
    },
  },
};
</script>
```