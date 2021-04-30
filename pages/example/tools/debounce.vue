<template>
  <view class="px40">
    <uct-nav>
      <view slot="center">Throttle | Debounce 节流防抖</view>
    </uct-nav>
    <view class="f700 f24 mt40">{{ result }}</view>
    <view class="mt40">
      <uct-button @click="add('debounce')"
                  text="防抖"></uct-button>
    </view>
    <view class="mt40">
      <uct-button @click="add('throttle')"
                  text="节流"></uct-button>
    </view>
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
            time: 5000,
            success: () => {
              this.result += "0";
            },
          });
          break;

        case "throttle":
          this.$uct.throttle(5000, true, () => {
            this.result += "0";
          })();
          break;
      }
    },
  },
};
</script>
