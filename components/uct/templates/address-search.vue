<template>
  <view class='container'>
    <view class='header bg-ff row padding'>
      <icon type='search'
            size='22'
            color='#999' />
      <input placeholder='请输入地址'
             class='col padding-l'
             @input='bindInput'
             focus
             auto-focus
             @confirm='bindConfirm'></input>
    </view>
    <view class='bg-ff'>
      <view class='padding color-99 font-26'>从下面列表中选择</view>
      <view class='padding border-t list position-r'
            v-for='(item, index) in list'
            :key='index'
            @click='address(item)'>
        <view class='padding-b'>{{item.title}}</view>
        <view class='color-99'>{{item.address}}</view>
      </view>
      <view class='icon_img_tip'
            v-if='list.length == 0'>
        <image src='/icon/icon_tip.png' />
        <view>快去添加地址吧~~</view>
      </view>
    </view>
  </view>

</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    searchList(n) {
      let that = this;
      this.$uct.qqmapsdk.getSuggestion({
        keyword: n,
        success: (res) => {
          that.setData({
            list: res.data,
          });
        },
        fail: (err) => {
          uni.showToast({
            icon: "none",
            title: `${err}`,
          });
        },
      });
    },
    bindInput(e) {
      let val = e.detail.value;
      this.searchList(val);
    },
    bindConfirm(e) {
      let val = e.detail.value;
      this.searchList(val);
    },
    address(item) {
      let pages = getCurrentPages();
      let prePages = pages[pages.length - 2].$vm;
      let list = prePages.list;
      let map = prePages.map;
      map.longitude = item.location.lng;
      map.latitude = item.location.lat;
      prePages.address = item;
      prePages.list = list;
      prePages.map = map;
      prePages.position = {
        longitude: item.location.lng,
        latitude: item.location.lat,
      };
      prePages.checked = 0;
      uni.navigateBack({
        delta: 1,
      });
    },
    setData(obj) {
      Object.assign(this, obj);
    },
  },
};
</script>

<style>
/**app.wxss**/
page {
  background: #f6f6f6;
  font-size: 32rpx;
}
image {
  display: block;
}

.item,
.item-forward {
  background: #fff;
  padding: 25rpx 90rpx 25rpx 25rpx;
  position: relative;
  line-height: 46rpx;
}
.item-forward::before {
  content: "";
  width: 20rpx;
  height: 20rpx;
  border-top: 2px solid #a9a9a9;
  border-right: 2px solid #a9a9a9;
  border-radius: 2px;
  position: absolute;
  top: 50%;
  right: 35rpx;
  transform: rotate(45deg) translateY(-50%);
}
.item image,
.item-forward image {
  width: 46rpx;
  height: 46rpx;
  display: block;
  margin-right: 10rpx;
  position: relative;
}
.active {
  background: #eee;
}

.row,
.item,
.item-forward,
.coupons {
  display: flex;
  width: 100%;
}
.row-wrap {
  flex-wrap: wrap;
}
.col,
.coupons .left {
  flex: 1;
  display: block;
  width: 100%;
}
.col-center {
  height: 100%;
  display: flex;
  align-items: center;
}
.float-r {
  float: right;
}
.padding {
  padding: 20rpx 25rpx;
}
.padding-t {
  padding-top: 20rpx;
}
.padding-b {
  padding-bottom: 20rpx;
}
.padding-l {
  padding-left: 25rpx;
}
.padding-r {
  padding-right: 25rpx;
}
.padding-tb {
  padding-top: 20rpx;
  padding-bottom: 20rpx;
}
.padding-lr {
  padding-left: 25rpx;
  padding-right: 25rpx;
}
.margin {
  margin: 20rpx 25rpx;
}
.margin-t {
  margin-top: 20rpx;
}
.margin-b {
  margin-bottom: 20rpx;
}
.margin-tb {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}
.margin-lr {
  margin-left: 25rpx;
  margin-right: 25rpx;
}
.border,
.border-t,
.border-r,
.border-b,
.border-l {
  position: relative;
}
.border {
  border: 0.5px solid #eee;
}
.border-t::after,
.border-r::after,
.border-b::after,
.border-l::after {
  content: "";
  position: absolute; /*background: #eee;*/
  background: linear-gradient(to top, #eee 0.7px, transparent 0.7px);
}
.border-t::after,
.border-b::after {
  height: 1px;
  left: 25rpx;
  right: 25rpx;
  top: 0;
}
.border-b::after {
  top: auto;
  bottom: 0;
}
.border-l::after,
.border-r::after {
  width: 1px;
  top: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to right, #eee 0.7px, transparent 0.7px);
}
.border-r::after {
  left: auto;
  right: 0;
}

.bg {
  background: #e74246;
}
.bg-ff {
  background: #fff;
}
.color {
  color: #e74246;
}
.color-00 {
  color: #000;
}
.color-ff {
  color: #fff;
}
.color-99,
.icon_img_tip {
  color: #999;
}
.color-6c {
  color: #6c6c6c;
}
.text-right {
  text-align: right;
}
.font-26 {
  font-size: 26rpx;
}

.position-r {
  position: relative;
}
.container {
  padding-top: 110rpx;
}
.header {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  border-bottom: 1px solid #eee;
}
</style>
