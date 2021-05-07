// 初始化数据模块
const state = {
  version: "0.0.1",
  initData: {},
  routes: [],
  tabbar: uni.getStorageSync("templateData") ? uni.getStorageSync("templateData") : {},
};

const actions = {
  getAppInit({ commit }, options) {},
  // 同步前端路由
  getRoutes({ commit }) {},
  // 模板信息
  getTemplate({ commit }, options) {},
};

const mutations = {};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
