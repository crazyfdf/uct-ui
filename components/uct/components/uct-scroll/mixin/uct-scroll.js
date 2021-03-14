/* 搜索框配置 */
const searchOption = {
  searchTop: "80rpx",// search距离顶部的偏移
  height: 80,// 高度,单位rpx
  bcColor: "transparent",//背景颜色
  cColor: "#479ff7",// 字体颜色
  blColor: "#479ff7",// 下划线颜色
  placeholder: "请输入关键字",//搜索关键字
}
/* tabbar配置 */
const tabOption = {
  tabWidth: 0,// 每个tab的宽度,默认不设置值,为flex平均分配; 如果指定宽度,则不使用flex,每个tab居左,超过则水平滑动(单位默认rpx)
  height: 80,// 高度,单位rpx
  top: 120,//tabbar配置距离顶部的偏移
  bcColor: "transparent",//背景颜色
  cColor: "#479ff7",// 字体颜色
  blColor: "#479ff7"// 下划线颜色
}
/* scroll配置 */
const scrollOption = {
  top: 150,//scroll距离顶部的偏移
  bottom: 120,//scroll距离底部的偏移
  downOption: {},//下拉配置
  upOption: {},//上拉配置
}

export default {
  props: {
    searchOption: {},
    tabOption: {},
    scrollOption: {},
  },
  computed: {
    searchOptions () {
      return Object.assign({}, searchOption, this.searchOption)
    },
    tabOptions () {
      return Object.assign({}, tabOption, this.tabOption)
    },
    scrollOptions () {
      return Object.assign({}, scrollOption, this.scrollOption)
    },
  },
};