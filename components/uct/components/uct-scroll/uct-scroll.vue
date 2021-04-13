<!--
 * @Author: 祸灵
 * @Date: 2021-02-24 16:18:53
 * @LastEditTime: 2021-04-09 17:28:31
 * @LastEditors: Please set LastEditors
 * @Description: 通用列表组件
 * @FilePath: \uni-front\components\uct\uct-scroll\uct-scroll.vue
-->
<template>
  <view>
    <!-- 搜索栏 -->
    <uct-search v-if="search"
                class="search"
                :style="{top:searchTop}"
                placeholder="请输入搜索关键字"
                @search="searchChange"></uct-search>
    <!-- tabbar -->
    <view class="top-warp">
      <!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
      <uct-tabs :value="tabNowIndex"
                v-if="tabs.length>1"
                :tabs="tabs"
                :height="tabsHeight"
                :bcColor="bcColor"
                :blColor="blColor"
                :cColor="cColor"
                :tabRight="tabRight"
                @change="tabChange"></uct-tabs>
      <slot name="moreTab"></slot>
    </view>

    <!-- list内容懒加载 -->
    <uct-scroll-item v-show="tabIndex === index"
                     v-if="lazy"
                     :ref="'uctscroll'+index"
                     v-for="(item,index) in tabs"
                     :key="index"
                     @downCallback="$emit('downCallback')"
                     @success="(list)=>$emit('success',list)"
                     :url="item.url"
                     :api="item.api"
                     :more="item.more"
                     :tabIndex="tabIndex"
                     :index="index"
                     :downOption="downOption"
                     :upOption="upOption"
                     :top="top1"
                     :bottom="bottom">
      <slot></slot>
    </uct-scroll-item>
    <!-- list内容不使用懒加载 -->
    <view v-if="!lazy">
      <uct-scroll-item v-if="tabIndex === index"
                       :ref="'uctscroll'+index"
                       v-for="(item,index) in tabs"
                       :key="index"
                       @downCallback="$emit('downCallback')"
                       @success="(list)=>$emit('success',list)"
                       :url="item.url"
                       :api="item.api"
                       :more="item.more"
                       :tabIndex="tabIndex"
                       :index="index"
                       :downOption="downOption"
                       :upOption="upOption"
                       :top="top1"
                       :bottom="bottom">
        <slot></slot>
      </uct-scroll-item>
    </view>
  </view>
</template>

<script>
/**
 * @description:
 * @param {*}
 * @return {*}
 */
export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    lazy: {
      type: Boolean | String,
      default() {
        return true;
      },
    },
    search: {
      type: Boolean,
      default() {
        return false;
      },
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number | String,
      default() {
        return 0;
      },
    },
    bottom: {
      type: Number,
      default() {
        return 120;
      },
    },
    tabsHeight: {
      type: Number,
      default() {
        return 80;
      },
    },
    tabRight: {
      type: Number,
      default: 0,
    },
    bcColor: {
      type: String,
      default: "#fff",
    },
    cColor: {
      type: String,
      default: "#000",
    },
    blColor: {
      type: String,
      default: "#479ff7",
    },
    searchTop: "top:80rpx",
    downOption: {
      type: Object,
      default() {
        return {
          auto: false, // 不自动加载 (mixin已处理第一个tab触发downCallback)
        };
      },
    },
    upOption: {
      type: Object,
      default() {
        return {
          auto: false, // 不自动加载
          noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
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
    tabNowIndex(v) {
      return this.tabIndex;
    },
    /**
     * @description: scroll的离页面顶部的距离，this.baseTop为导航栏的高度，单位rpx
     * @param {*}
     * @return {*}
     */
    top1(v) {
      if (this.tabs.length > 1 && this.tabs[this.tabIndex].nav !== false) {
        return (
          (this.$uct.config.navHeight + this.$uct.config.statusBarHeight) * 2 +
          this.tabsHeight +
          this.top
        );
      } else if (this.tabs[this.tabIndex].nav === false) {
        return this.$uct.config.statusBarHeight * 2 + this.top;
      } else {
        return (
          (this.$uct.config.navHeight + this.$uct.config.statusBarHeight) * 2 +
          this.top
        );
      }
    },
  },
  methods: {
    tabChange(i) {
      if (this.tabs[i].isMore) {
        this.$emit("moreChange", i);
      } else {
        this.$emit("change", i);
      }
    },
    reload() {
      this.$refs[`uctscroll${this.tabIndex}`][0].downCallback();
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
.search {
  position: fixed;
  height: 60rpx;
  top: 0;
  z-index: 2;
}
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