<template>
  <view class='page-body'>
    <uct-nav>
      <view slot="center">ScrollItem子列表</view>
    </uct-nav>
    <uct-scroll-item @success="init"
                     :tabIndex="false"
                     nav
                     :url="scrollOption.url"
                     :api="scrollOption.api"
                     :more="scrollOption.more"
                     :list="scrollOption.list">
      <view v-for="(item,index) in 200"
            class="px40"
            :key="index">
        <view>{{index}}</view>
      </view>
    </uct-scroll-item>
  </view>
</template>

<script>
export default {
  data() {
    return {
      /**
       * @description: 子列表配置
       * @param  url:String 请求url,more!:Object|Boolean 请求参数{key:value},api:String 根据api返回list数据,list:Array 请求返回数据
       */
      scrollOption: { url: "", api: "", more: false, list: [] },
    };
  },
};
</script>

<style scoped lang="scss">
</style>
