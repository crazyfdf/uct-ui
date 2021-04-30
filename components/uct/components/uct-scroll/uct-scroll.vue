<!--
 * @Author: 祸灵
 * @Date: 2021-02-24 16:18:53
 * @LastEditTime: 2021-04-29 16:02:47
 * @LastEditors: 祸灵
 * @Description: 通用列表组件
 * @FilePath: \uct-ui\components\uct-scroll\uct-scroll.vue
-->
<template>
  <view>
    <!-- tabbar -->
    <view class="top-warp">
      <!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
      <uct-tabs v-model="tabNowIndex"
                v-if="tabs.length>1"
                :tabs="tabs"
                :px="px"
                :height="tabsHeight"
                :bcColor="bcColor"
                :blColor="blColor"
                :cColor="cColor"
                :tabRight="tabRight"
                @change="tabChange"></uct-tabs>
      <!-- @slot 支持列表右侧自定义内容 -->
      <slot name="moreTab"></slot>
    </view>

    <!-- list内容懒加载 -->
    <view v-if="lazy">
      <uct-scroll-item v-show="tabNowIndex === index"
                       :ref="'uctscroll'+index"
                       v-for="(item,index) in tabs"
                       :key="index"
                       @downCallback="downCallback"
                       @success="success"
                       :url="item.url"
                       :api="item.api"
                       :more="item.more"
                       :fixed="item.fixed||item.fixed===undefined?true:false"
                       :tabIndex="tabNowIndex"
                       :index="index"
                       :downOption="downOption"
                       :upOption="upOption"
                       :top="top1"
                       :bottom="bottom">
        <!-- #ifdef MP -->
        <slot name="{{index}}"></slot>
        <!-- #endif -->
        <!-- #ifndef MP -->
        <slot :name="index"></slot>
        <!-- #endif -->
      </uct-scroll-item>
    </view>
    <!-- list内容不使用懒加载 -->
    <view v-if="!lazy">
      <uct-scroll-item v-if="tabNowIndex === index"
                       :ref="'uctscroll'+index"
                       v-for="(item,index) in tabs"
                       :key="index"
                       @downCallback="downCallback"
                       @success="success"
                       :url="item.url"
                       :api="item.api"
                       :more="item.more"
                       :fixed="item.fixed||item.fixed===undefined?true:false"
                       :tabIndex="tabNowIndex"
                       :index="index"
                       :downOption="downOption"
                       :upOption="upOption"
                       :top="top1"
                       :bottom="bottom">
        <!-- @slot 支持列表内容插槽 -->
        <slot></slot>
      </uct-scroll-item>
    </view>
  </view>
</template>

<script>
/**
 * 列表业务组件，专门为列表而设计的，利用它可以快速实现列表上拉加载、下拉刷新、切换列表、空页面、滑至顶部、触底提示等功能。
 * @displayName Scroll列表
 */
export default {
  name: "uct-scroll",
  props: {
    /**
     * 每个子列表的配置项，当tabs.length>1时显示列表栏
     * @values [{name: "列表名1",more: {}, url: "",list: []},
     {name: "列表名2",more: {}, url: "",list: []}]
     */
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * 标题左右间距
     */
    px: {
      type: Number,
      default: 20,
    },
    /**
     * 是否开启懒加载
     * @values true,false
     */
    lazy: {
      type: Boolean | String,
      default: true,
    },
    /** 当前列表下标 */
    value: {
      type: Number,
      default: 0,
    },
    /**  当前列表内容距离顶部高度，单位rpx  */
    top: {
      type: Number | String,
      default: 20,
    },
    /** 当前列表内容距离底部高度，单位rpx */
    bottom: {
      type: Number,
      default: 20,
    },
    /** 列表栏高度，单位rpx */
    tabsHeight: {
      type: Number,
      default: 80,
    },
    /** 列表栏标签间的间距，单位rpx，为0时为flex布局 */
    tabRight: {
      type: Number,
      default: 0,
    },
    /** 列表栏背景颜色 */
    bcColor: {
      type: String,
      default: "#fff",
    },
    /** 列表栏字体颜色 */
    cColor: {
      type: String,
      default: "#000",
    },
    /** 列表栏下划线颜色 */
    blColor: {
      type: String,
      default: "#479ff7",
    },
    /** 列表下拉配置 */
    downOption: {
      type: Object,
      default() {
        return {
          auto: false, // 不自动加载
        };
      },
    },
    /** 列表上拉配置 */
    upOption: {
      type: Object,
      default() {
        return {
          auto: false, // 不自动加载
          empty: {
            tip: "~ 空空如也 ~", // 提示
          },
        };
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    tabNowIndex: {
      set(v) {
        /**
         * 切换列表默认通过v-model语法糖将下标更改，父组件使用v-model或:value
         * @event input
         * @property {number} i 切换的列表下标
         * @params {number} i
         */
        this.$emit("input", v);
      },
      get() {
        return this.value;
      },
    },
    /**
     * @description: scroll的离页面顶部的距离，this.baseTop为导航栏的高度，单位rpx
     * @param {*}
     * @return {*}
     */
    top1(v) {
      if (this.tabs.length > 1) {
        return (
          (this.$uct.config.navHeight + this.$uct.config.statusBarHeight) * 2 +
          this.tabsHeight +
          this.top
        );
      } else {
        return this.top;
      }
    },
  },
  methods: {
    tabChange(i) {
      if (this.tabs[i].isMore) {
        /**
         * 切换列表自定义事件回调
         * @event moreChange
         * @property {number} i 切换的列表下标
         * @params {number} i
         */
        this.$emit("moreChange", i);
      } else {
        /**
         * 切换列表默认事件事件回调
         * @event change
         * @property {number} i 切换的列表下标
         * @params {number} i
         */
        this.$emit("change", i);
      }
    },
    reload() {
      this.$refs[`uctscroll${this.tabNowIndex}`][0].downCallback();
    },
    success(list) {
      /**
       * 上拉加载成功回调
       * @event success
       * @property {array} list 加载后的数据
       * @params {array} list
       */
      this.$emit("success", list);
    },
    downCallback() {
      /**
       * 下拉刷新回调
       * @event downCallback
       */
      this.$emit("downCallback");
    },
    /*     searchChange(value) {
        let pageNum = this.searchPage.num; // 页码, 默认从1开始
        let pageSize = this.searchPage.size; // 页长, 默认每页10条
        let url = this.url;
        this.more.value = value;
        this.upCallback(this.searchPage);
    }, */
  },
};
</script>

<style scoped lang="scss">
.top-warp {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  left: 0;
  z-index: 1;
}
.top-warp .tip {
  height: 120rpx;
  line-height: 120rpx;
  text-align: center;
}
</style>