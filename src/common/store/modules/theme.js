// 初始化数据模块
let barTheme = {
  "normal-theme": {
    color: "#000000",
    background: "#f6f6f6",
  },
  "dark-theme": {
    color: "#ffffff",
    background: "#000000",
  },
  "red-theme": {
    color: "#8e5a54",
    background: "#f9e5ee",
  },
  "yellow-theme": {
    color: "#8c6031",
    background: "#f6e1c9",
  },
  "green-theme": {
    color: "#5d6021",
    background: "#e3eabb",
  },
  "cyan-theme": {
    color: "#417036",
    background: "#d1e9cd",
  },
  "blue-theme": {
    color: "#2e6167",
    background: "#bbe4e3",
  },
};
const state = {
  themeKey: uni.getStorageSync("themeKey") ? uni.getStorageSync("themeKey") : "red-theme",
};

const actions = {};

const mutations = {
  setTheme(state, data) {
    state.themeKey = data;
    uni.setStorageSync("themeKey", data);
    let item = barTheme[data];
    let tcolor = item.color;
    let bcolor = item.background; //背景色。
    uni.setNavigationBarColor({
      frontColor: tcolor,
      backgroundColor: bcolor,
    });
    uni.setTabBarStyle({
      color: tcolor, //底部默认字色
      backgroundColor: bcolor, //底部背景色。
    });
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
