<template>
  <view class='tabbar'
        :style="extClass"
        v-if="content.isshow">
    <view @click="tabChange(index)"
          v-for="(item,index) in content.list"
          :key="index"
          class="tabbar-item"
          :style="index===current?tabbarItemOn:''">
      <image :src="current===index?item.activeImage:item.image"
             class="tabbar-icon" />
      <view class="tabbar-label">{{item.name}}</view>
    </view>
  </view>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState({
      content: (state) => state.init.templateData.tabbar[0].content,
      current: (state) => state.init.tabbar,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  data() {
    return {
      extClass: "",
      tabbarItemOn: "",
    };
  },
  created() {
    this.extClass = `color:${this.content.color};background-color: ${this.content.bgcolor};`;
    this.tabbarItemOn = `color:${this.content.activeColor}`;
  },
  methods: {
    ...mapMutations(["TAB_BAR"]),
    tabChange(index) {
      if (index === this.current) {
        return;
      }
      this.$store.commit("TAB_BAR", index);
    },
  },
};
</script>

<style scoped lang="scss">
.tabbar {
  display: flex;
  position: relative;
  z-index: 99999;

  &-item {
    display: block;
    flex: 1;
    padding: 16rpx 0 8rpx;
    font-size: 10px;
    text-align: center;
  }
  &-icon {
    width: 40rpx;
    height: 40rpx;
  }
}
</style>