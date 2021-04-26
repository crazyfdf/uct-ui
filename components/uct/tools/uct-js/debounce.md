# Throttle | Debounce 节流防抖

## Throttle | Debounce 节流防抖使用方法
```
/**
* 节流
* throttle(1000,true,fnc)()
* @param {Number} time 节流时间
* @param {Boolean} isImmediate 是否立即执行
* @param {Function} func 回调函数
* @returns 
*/
this.$uct.throttle(time = 500, isImmediate = false, func)
```
```
/**
* 防抖
* debounce.canDoFunction({
  key: "auth",
  time: 10000,
  success: () => {},
  })
*/
this.$uct.debounce.canDoFunction({
  key: "",
  time: 1000,
  success: () => {},
})
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
          this.$uct.debounce.canDoFunction({
            key: "debounce",
            time: 2000,
            success: () => {
              this.result += "0";
            },
          });
          break;

        case "throttle":
          this.$uct.throttle(2000, true, () => {
            this.result += "0";
          })();
          break;
      }
    },
  },
};
</script>
```