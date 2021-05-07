<template>
  <view class="getLoc">
    <uct-nav>
      <view slot="center">Vuex 操作vuex</view>
    </uct-nav>
    <view>当前版本：{{$store.state.init.version}}</view>
    <uct-button class="mt40"
                @click="setVersion"
                text="更改版本"></uct-button>
  </view>
</template>

<script>
export default {
  methods: {
    setVersion() {
      this.$uct.vuex("init.version", "0.0.2");
    },
  },
};
</script>
