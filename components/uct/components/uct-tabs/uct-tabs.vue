<!-- tab组件: <me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange"></me-tabs> -->
<template>
  <view class="me-tabs"
        :class="{'tabs-fixed': fixed}"
        :style="{height: tabHeightVal,backgroundColor: bcColor}">
    <scroll-view v-if="tabs.length"
                 :id="viewId"
                 :scroll-left="scrollLeft"
                 scroll-x
                 :scroll-with-animation="animation"
                 :scroll-animation-duration="300">
      <view class="tabs-item"
            :class="{'tabs-flex':!isScroll, 'tabs-scroll':isScroll}">
        <!-- tab -->
        <view class="tab-item"
              :style="{marginRight: tabRightVal, height: tabHeightVal, 'line-height':tabHeightVal,color: value===i?cColor:''}"
              v-for="(tab, i) in tabs"
              :class="value===i?'active':'c-gray'"
              :key="i"
              @click="tabClick(i)">
          {{getTabName(tab)}}
          <!-- 下划线 -->
          <view class="tabs-line"
                v-show="value===i"
                :id="`tabs${i}`"
                :style="{backgroundColor: blColor,width:tabRightVal?'120%':'150rpx'}"></view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    tabs: {
      // 支持格式: ['全部', '待付款'] 或 [{name:'全部'}, {name:'待付款'}]
      type: Array,
      default() {
        return [];
      },
    },
    nameKey: {
      // 取name的字段
      type: String,
      default: "name",
    },
    value: {
      // 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
      type: [String, Number],
      default: 0,
    },
    fixed: Boolean, // 是否悬浮,默认false
    tabWidth: Number, // 每个tab的宽度,默认不设置值,为flex平均分配; 如果指定宽度,则不使用flex,每个tab居左,超过则水平滑动(单位默认rpx)
    tabRight: Number, //tab的偏移量
    height: {
      // 高度,单位rpx
      type: Number,
      default: 80,
    },
    bcColor: {
      type: String,
      default: "transparent",
    },
    cColor: {
      type: String,
      default: "#000",
    },
    blColor: {
      type: String,
      default: "#479ff7",
    },
  },
  data() {
    return {
      viewId: "id_" + Math.random().toString(36).substr(2, 16),
      scrollLeft: 0,
      animation: true,
      valueIndex: `tabs${this.value}`,
      oldScrollLeft: 0,
    };
  },
  computed: {
    isScroll() {
      return this.tabRight && this.tabs.length; // 指定了tabWidth的宽度,则支持水平滑动
    },
    tabHeightPx() {
      return uni.upx2px(this.height);
    },
    tabHeightVal() {
      return this.tabHeightPx + "px";
    },
    tabWidthPx() {
      return uni.upx2px(this.tabWidth);
    },
    tabRightPx() {
      return uni.upx2px(this.tabRight);
    },
    tabWidthVal() {
      return this.isScroll ? this.tabWidthPx + "px" : "";
    },
    tabRightVal() {
      return this.isScroll ? this.tabRightPx + "px" : "";
    },
  },
  watch: {
    tabs() {
      this.warpWidth = null; // 重新计算容器宽度
      this.valueIndex = `tabs${this.value}`;
      this.scrollCenter(); // 水平滚动到中间
    },
    value(v) {
      this.valueIndex = `tabs${v}`;
      this.scrollCenter(); // 水平滚动到中间
    },
  },
  methods: {
    getTabName(tab) {
      return typeof tab === "object" ? tab[this.nameKey] : tab;
    },
    tabClick(i) {
      if (this.value != i) {
        this.$emit("input", i);
        this.$emit("change", i);
      }
    },
    async scrollCenter() {
      if (!this.isScroll) return;
      if (!this.warpWidth) {
        // tabs容器的宽度
        let rect = await this.initWarpRect();
        this.warpWidth = rect
          ? rect.width
          : uni.getSystemInfoSync().windowWidth; // 某些情况下取不到宽度,暂时取屏幕宽度
      }
      setTimeout(async () => {
        const query = uni.createSelectorQuery().in(this);
        await query
          .select("#" + this.valueIndex)
          .boundingClientRect((data) => {
            let left = Math.abs(data.left + this.oldScrollLeft);
            let diff = left - this.warpWidth / 2;
            this.scrollLeft = diff;
            this.oldScrollLeft = this.scrollLeft;
          })
          .exec();
      }, 100);
      /*       let tabLeft = this.tabWidthPx * this.value + this.tabWidthPx / 2; // 当前tab中心点到左边的距离
      let diff = tabLeft - this.warpWidth / 2; // 如果超过tabs容器的一半,则滚动差值
      this.scrollLeft = diff;
      // #ifdef MP-TOUTIAO
      this.scrollTimer && clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        // 字节跳动小程序,需延时再次设置scrollLeft,否则tab切换跨度较大时不生效
        this.scrollLeft = Math.ceil(diff);
      }, 400);
      // #endif 
      */
    },
    initWarpRect() {
      return new Promise((resolve) => {
        setTimeout(() => {
          // 延时确保dom已渲染, 不使用$nextclick
          let query = uni.createSelectorQuery();
          // #ifndef MP-ALIPAY
          query = query.in(this); // 支付宝小程序不支持in(this),而字节跳动小程序必须写in(this), 否则都取不到值
          // #endif
          query
            .select("#" + this.viewId)
            .boundingClientRect((data) => {
              resolve(data);
            })
            .exec();
        }, 20);
      });
    },
  },
  mounted() {
    this.scrollCenter(); // 滚动到当前下标
  },
};
</script>

<style lang="scss">
.me-tabs {
  position: relative;
  font-size: 30rpx;
  box-sizing: border-box;
  overflow-y: hidden;
  width: 100%;
  &.tabs-fixed {
    z-index: 990;
    position: fixed;
    top: var(--window-top);
    left: 0;
    width: 100%;
  }

  .tabs-item {
    position: relative;
    white-space: nowrap;
    padding-bottom: 30rpx; // 撑开高度,再配合me-tabs的overflow-y: hidden,以达到隐藏滚动条的目的
    box-sizing: border-box;
    .tab-item {
      position: relative;
      text-align: center;
      box-sizing: border-box;
      &.active {
        font-weight: bold;
      }
    }
  }

  // 平分的方式显示item
  .tabs-flex {
    display: flex;
    .tab-item {
      flex: 1;
    }
  }
  // 居左显示item,支持水平滑动
  .tabs-scroll {
    .tab-item {
      display: inline-block;
    }
  }

  // 选中tab的线
  .tabs-line {
    z-index: 1;
    position: absolute;
    left: 50%;
    bottom: 0; // 至少与.tabs-item的padding-bottom一致,才能保证在底部边缘
    height: 6rpx;
    transform: translateX(-50%);
    border-radius: 4rpx;
    // transition: left 0.3s;
  }
}
</style>
