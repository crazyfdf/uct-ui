<template>
  <view class='page-body'>
    <uct-nav>
      <view slot="center">Scroll列表</view>
    </uct-nav>
    <uct-scroll :tabs="tabs"
                class="px40"
                @success="init"
                v-model="tabIndex"
                @change="changeTabIndex"
                :tabRight="tabRight">
      <view v-for="(item,index) in 200"
            :key="index"
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
      /**
       * @description: 列表配置
       * @param {object} name!:String "标题",url:String 请求url,more!:Object|Boolean 请求参数{key:value},api:String 根据api返回list数据,list:Array 请求返回数据
       */
      tabs: [
        { name: "标题0", url: "", api: "", more: false, list: [] },
        { name: "标题1", url: "", api: "", more: false, list: [] },
        { name: "标题2", url: "", api: "", more: false, list: [] },
        { name: "标题3", url: "", api: "", more: false, list: [] },
        { name: "标题4", url: "", api: "", more: false, list: [] },
        { name: "标题5", url: "", api: "", more: false, list: [] },
      ],
      tabRight: 100, //列表水平滚动间距，为0时为flex平均分布于
      tabIndex: 1, //当前列表下标
    };
  },
  methods: {
    changeTabIndex(v) {
      console.log(v);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
