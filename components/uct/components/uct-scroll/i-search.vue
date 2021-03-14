<template>
  <view class="search">
    <view class="search-box">
      <view class="icon-search"
            @click="search"></view>
      <input v-model="value"
             @input="search"
             class="search-val"
             :placeholder="placeholder" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  props: {
    placeholder: {
      //多选 单选  multiple single
      type: String,
      default: "搜索公司/职位",
    },
  },
  methods: {
    search() {
      this.$emit("search", this.value);
    },
  },
};
</script>

<style lang="scss">
.search {
  position: fixed;
  display: flex;
  align-items: center;
  left: 0;
  right: 0;
  height: 60rpx;
  margin: 24rpx;
  background-color: #f6f6f6;
  border-radius: 24rpx;
  justify-content: center;
}
.search-box {
  display: flex;
  align-items: center;
  height: 40rpx;
  .icon-search {
    width: 32rpx;
    height: 32rpx;
    margin-left: 16rpx;
    margin-right: 10rpx;
    background: url("/static/imgs/public/search.png") no-repeat;
    background-size: 100%;
  }

  .search-val {
    font-size: 28rpx;
  }
}
</style>
