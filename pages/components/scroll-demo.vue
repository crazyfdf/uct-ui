<template>
  <view class='page-body'>
    <uct-nav :isBack="false">
      <view slot="center">列表模板</view>
    </uct-nav>
    <uct-scroll :tabs="tabs"
                @success="init"
                :tabIndex="tabIndex"
                @change="i=>tabIndex = i"
                :tabRight="tabRight">
      <view v-for="item in 200"
            class="px40">
        <view>{{item}}</view>
      </view>
    </uct-scroll>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { name: "关注", more: false, list: [] },
        { name: "推荐", more: false, list: [] },
        { name: "热榜", more: false, list: [] },
        { name: "快讯", more: false, list: [] },
        { name: "专题", more: false, list: [] },
      ],
      tabRight: 0,
      tabIndex: 1,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>
