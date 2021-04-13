<template>
  <view>
    <!-- list内容 -->
    <mescroll-uni :ref="'mescrollRef'+index"
                  @init="mescrollInit"
                  @down="downCallback"
                  @up="upCallback"
                  :down="downOption"
                  :up="upOption"
                  :top="top"
                  :bottom="bottom">
      <view class="scroll">
        <slot></slot>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollMixin from "./mescroll-mixins.js";
import MescrollUni from "./mescroll-uni.vue";

export default {
  mixins: [MescrollMixin], // 使用mixin
  components: {
    MescrollUni,
  },
  props: {
    tabIndex: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
    api: {
      type: String,
      default: "result.content",
    },
    more: {
      type: Object | Boolean,
      default() {
        return {};
      },
    },
    url: {
      type: String,
      default: "",
    },
    top: {
      type: Number,
      default() {
        return 200;
      },
    },
    bottom: {
      type: Number,
      default() {
        return 120;
      },
    },
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
    return {
      searchPage: {
        num: 1, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
        size: 10, // 每页数据的数量
        time: null, // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
      },
      list: [],
      isDown: false, //初始化时是否自定义下拉刷新
      isInit: false, // 当前tab是否已初始化
    };
  },
  computed: {
    dataApi(v) {
      return this.api.split(".");
    },
  },
  watch: {
    more: {
      handler(newData, oldData) {
        this.upCallback(this.searchPage);
      },
      deep: true,
    },
    tabIndex: {
      handler(val) {
        if (!this.isInit && this.tabIndex == this.index) {
          this.isInit = true; // 标记为true
          this.mescroll && this.mescroll.triggerDownScroll(false);
          // this.mescroll && this.mescroll.endDownScroll();
        }
      },
    },
  },
  methods: {
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      if (this.more) {
        this.$api(this.url, {
          p: page.num,
          s: page.size,
          ...this.more,
        })
          .then((res) => {
            for (const item of this.dataApi) {
              res = res[item];
            }
            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            this.mescroll.endSuccess(res.length);
            //设置列表数据
            if (page.num == 1) this.list = []; //如果是第一页需手动制空列表
            this.list = this.list.concat(res); //追加新数据
            this.$emit("success", this.list);
          })
          .catch(() => {
            //联网失败, 结束加载
            this.mescroll.endErr();
          });
      } else {
        if (this.isDown) {
          this.$emit("downCallback");
        }
        this.isDown = true;
        this.mescroll.endSuccess(true);
      }
    },
    // 以ref的方式初始化mescroll对象 (兼容字节跳动小程序)
    mescrollInitByRef() {
      if (!this.mescroll || !this.mescroll.resetUpScroll) {
        // 字节跳动小程序编辑器不支持一个页面存在相同的ref, 多mescroll的ref需动态生成, 格式为'mescrollRef下标'
        let mescrollRef =
          this.$refs.mescrollRef || this.$refs["mescrollRef" + this.index];
        if (mescrollRef) this.mescroll = mescrollRef.mescroll;
      }
    },
    // mescroll组件初始化的回调,可获取到mescroll对象 (覆盖mescroll-mixins.js的mescrollInit, 为了标记isInit)
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
      this.mescrollInitByRef && this.mescrollInitByRef(); // 兼容字节跳动小程序
      // 自动加载当前tab的数据
      if (this.tabIndex === this.index) {
        this.isInit = true; // 标记为true
        this.mescroll.triggerDownScroll();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.scroll {
  // margin: 0 40rpx;
}
</style>