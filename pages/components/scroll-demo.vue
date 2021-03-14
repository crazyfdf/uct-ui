<template>
  <view class='page-body'>
    <view v-for="(tabItem,index) in tabs"
          class="mt100"
          :key="index">
      <uct-scroll v-show="tabIndex==index"
                  :tabs="tabs"
                  @success="init"
                  :tabIndex="tabIndex"
                  @change="i=>tabIndex = i"
                  :scrollOption="scrollOption"
                  url=""
                  :more="tabs[index].more"
                  @moreChange="moreChange"
                  @downCallback="downCallback"
                  :tabOption="tabOption">
        <view v-for="item in 200"
              class="px40">
          <view>{{item}}</view>
        </view>
      </uct-scroll>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tabs: [
        { name: "≡", more: false, list: [], isMore: true },
        { name: "关注", more: false, list: [] },
        { name: "推荐", more: false, list: [] },
        { name: "热榜", more: false, list: [] },
        { name: "快讯", more: false, list: [] },
        { name: "专题", more: false, list: [] },
      ],
      scrollOption: {
        top: 120,
        downOption: {
          use: true,
          auto: false,
        },
      },
      tabOption: {
        tabWidth: 100,
      },
      tabIndex: 1,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>
