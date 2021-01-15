<!-- <scroll :tabs="tabs"
              @success="(list)=>{this.tabs[index].list=list}"
              :index="tabIndex"
              @change="tabChange"
              :i="index"></scroll>
      tabs: [{ name: '全部', more: { name: this.$form.officedispatch, type: "all" }, list: [] }, { name: '未签订', more: { name: this.$form.officedispatch, type: "nocheck" }, list: [] }, { name: '已签订', more: { name: this.$form.officedispatch, type: "check" }, list: [] }, { name: '已过期', more: { name: this.$form.officedispatch, type: "Invalid" }, list: [] }],
      tabIndex: 0
-->     

<template>
  <view>
    <!-- 有搜索栏和tabbar -->
    <view v-if="search&&tabs.length">
      <!-- tabbar -->
      <view class="top-warp">
        <!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
        <me-tabs v-model="tabIndex"
                 :tabs="tabs"
                 @change="tabChange"></me-tabs>
      </view>

      <!-- 搜索栏 -->
      <view v-show="i === index"
            class="search"
            style="top:100rpx">
        <i-search placeholder="请输入搜索关键字"
                  @search="searchChange"></i-search>
      </view>

      <!-- list内容 -->
      <view v-show="i === index">
        <mescroll-uni ref="mescrollRef"
                      @init="mescrollInit"
                      @down="downCallback"
                      @up="upCallback"
                      :down="downOption"
                      :up="upOption"
                      :top="200"
                      :bottom="120">
          <view class="scroll">
            <slot></slot>
          </view>
        </mescroll-uni>
      </view>
    </view>

    <!-- 有搜索栏无tabbar -->
    <view v-else-if="search&&!tabs.length">
      <!-- 搜索栏 -->
      <view v-show="i === index"
            class="search">
        <i-search placeholder="请输入搜索关键字"
                  @search="searchChange"></i-search>
      </view>
      <!-- list内容 -->
      <view v-show="i === index">
        <mescroll-uni ref="mescrollRef"
                      @init="mescrollInit"
                      @down="downCallback"
                      @up="upCallback"
                      :down="downOption"
                      :up="upOption"
                      :top="120"
                      :bottom="120">
          <view class="scroll">
            <slot></slot>
          </view>
        </mescroll-uni>
      </view>
    </view>

    <!-- 无搜索栏 -->
    <view v-else>
      <!-- tabbar -->
      <view class="top-warp"
            v-if="tabs.length">
        <!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
        <me-tabs v-model="tabIndex"
                 :tabs="tabs"
                 @change="tabChange"></me-tabs>
      </view>

      <!-- list内容 -->
      <view v-show="i === index">
        <mescroll-uni ref="mescrollRef"
                      @init="mescrollInit"
                      @down="downCallback"
                      @up="upCallback"
                      :down="downOption"
                      :up="upOption"
                      :top="120"
                      :bottom="120">
          <view class="scroll">
            <slot></slot>
          </view>
        </mescroll-uni>
      </view>
    </view>
  </view>
</template>

<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MeTabs from "@/components/me-tabs/me-tabs.vue"
import iSearch from './i-search.vue';


export default {
  mixins: [MescrollMixin], // 使用mixin

  components: {
    MeTabs,
    iSearch
  },
  props: {
    i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
    index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
      type: Number,
      default () {
        return 0
      }
    },
    tabs: { // 为了请求数据,演示用,可根据自己的项目判断是否要传
      type: Array,
      default () {
        return []
      }
    },
    search: {
      type: Boolean,
      default () {
        return false
      }
    },
    url: {
      type: String,
      default () {
        return 'form.list'
      }
    },
    more: {
      tyep: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      downOption: {
        // auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
      },
      upOption: {
        // auto: false, // 不自动加载
        noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: '~ 空空如也 ~', // 提示
        }
      },
      list: [],
      tabIndex: 0,
      searchPage: {
        num: 1, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
        size: 10, // 每页数据的数量
        time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
      },
    };
  },
  methods: {
    tabChange (i) {
      this.$emit('change', i)
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback (page) {
      let pageNum = page.num; // 页码, 默认从1开始
      let pageSize = page.size; // 页长, 默认每页10条
      let url = this.url
      this.$api(url, { page: pageNum, size: pageSize, ...this.more }).then(res => {
        let curPageData = res.data.data
        //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        this.mescroll.endSuccess(curPageData.length);
        //设置列表数据
        if (page.num == 1) this.list = []; //如果是第一页需手动制空列表
        this.list = this.list.concat(curPageData); //追加新数据
        this.$emit("success", this.list)
      }).catch(() => {
        //联网失败, 结束加载
        this.mescroll.endErr();
      })
    },
    searchChange (value) {
      let pageNum = this.searchPage.num; // 页码, 默认从1开始
      let pageSize = this.searchPage.size; // 页长, 默认每页10条
      let url = this.url
      this.more.value = value
      this.upCallback(this.searchPage)
    }
  },
};
</script>

<style scoped lang="scss">
.search {
  position: fixed;
  height: 60rpx;
  top: 0;
}
.scroll {
  margin: 0 30rpx;
}
.top-warp {
  z-index: 90;
  position: fixed;
  left: 0;
  width: 100%;
  background-color: white;
}
.top-warp .tip {
  height: 120rpx;
  line-height: 120rpx;
  text-align: center;
}
</style>