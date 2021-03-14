<template>
  <view>
    <!-- 搜索栏 -->
    <i-search :placeholder="searchOptions.placeholder"
              v-if="search"
              class="search"
              :style="{top:searchOptions.searchTop}"
              @search="searchChange"></i-search>
    <!-- tabbar -->
    <!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
    <me-tabs v-model="tabNowIndex"
             class="top-warp"
             v-if="tabs.length"
             :tabs="tabs"
             :style="{top:`${tabOptions.top}rpx`}"
             :bcColor="tabOptions.bcColor"
             :blColor="tabOptions.blColor"
             :cColor="tabOptions.cColor"
             :tabWidth="tabOptions.tabWidth"
             @change="tabChange"></me-tabs>
    <!-- list内容 -->
    <mescroll-uni ref="mescrollRef"
                  @init="mescrollInit"
                  @down="downCallback"
                  @up="upCallback"
                  @downCallback=""
                  :down="scrollOptions.downOption"
                  :up="scrollOptions.upOption"
                  :top="scrollOptions.top"
                  :bottom="scrollOptions.bottom">
      <!-- 在scorll-view上的自定义内容 -->
      <slot name="more"></slot>
      <view class="scroll">
        <slot></slot>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import iSearch from "./i-search.vue";
import MeTabs from "./me-tabs/me-tabs.vue";
import MescrollUni from "./mescroll-uni/mescroll-uni.vue";
import MescrollMixin from "./mescroll-uni/mescroll-mixins.js";
import uctScroll from "./mixin/uct-scroll.js";
export default {
  mixins: [MescrollMixin, uctScroll], // 使用mixin

  components: {
    MeTabs,
    iSearch,
    MescrollUni,
  },
  props: {
    tabs: {
      // 为了请求数据,演示用,可根据自己的项目判断是否要传
      type: Array,
      default() {
        return [];
      },
    },
    search: {
      type: Boolean,
      default() {
        return false;
      },
    },
    url: {
      type: String,
      default() {
        return "";
      },
    },
    more: {
      type: Object | Boolean,
      default() {
        return {};
      },
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      list: [], //返回的数据
      searchPage: {
        num: 1, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
        size: 10, // 每页数据的数量
        time: null, // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
      },
    };
  },
  computed: {
    tabNowIndex: {
      set(v) {
        this.$emit("change", v);
      },
      get() {
        return this.tabIndex;
      },
    },
  },
  watch: {
    more: {
      handler(newData, oldData) {
        this.upCallback(this.searchPage);
      },
      deep: true,
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
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      if (this.more) {
        let pageNum = page.num; // 页码, 默认从1开始
        let pageSize = page.size; // 页长, 默认每页10条
        let url = this.url;

        this.$api(url, { p: pageNum, s: pageSize, ...this.more })
          .then((res) => {
            let curPageData = res.result.content;
            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            this.mescroll.endSuccess(curPageData.length);
            //设置列表数据
            if (page.num == 1) this.list = []; //如果是第一页需手动制空列表
            this.list = this.list.concat(curPageData); //追加新数据
            this.$emit("success", this.list);
          })
          .catch(() => {
            //联网失败, 结束加载
            this.mescroll.endErr();
          });
      } else {
        this.mescroll.endSuccess(true);
      }
    },
    /* 下拉刷新回调需自定义时使用 */
    downCallback() {
      this.$emit("downCallback");
    },
    reload() {
      this.list = [];
      this.upCallback({ num: 1, size: 10 });
    },
    searchChange(value) {
      if (this.more) {
        let pageNum = this.searchPage.num; // 页码, 默认从1开始
        let pageSize = this.searchPage.size; // 页长, 默认每页10条
        let url = this.url;
        this.more.value = value;
        this.upCallback(this.searchPage);
      }
    },
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
.scroll {
  // margin: 0 40rpx;
}
.top-warp {
  z-index: 1;
  position: fixed;
  left: 0;
  width: 100%;
  // background-color: white;
}
.top-warp .tip {
  height: 120rpx;
  line-height: 120rpx;
  text-align: center;
}
</style>