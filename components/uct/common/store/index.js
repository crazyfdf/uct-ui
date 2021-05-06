import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ["token"];

// 保存变量到本地存储中
const saveStorage = function(key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    uni.setStorageSync(key, value);
  }
};
// 获取本地存储中的变量
const getStorage = function(key) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    return uni.getStorageSync(key);
  }
};
const store = new Vuex.Store({
  state: {
    // 需要本地存储的变量
    token: getStorage("token") ? getStorage("token") : "",
    // 如果version无需保存到本地永久存储，无需getStorage方式
    version: "0.0.1",
    // 自定义tabbar数据
    tabbar: [
      {
        iconPath: "/static/imgs/tabbar/js.png",
        selectedIconPath: "/static/imgs/tabbar/js_select.png",
        text: "工具",
      },
      {
        iconPath: "/static/imgs/tabbar/component.png",
        selectedIconPath: "/static/imgs/tabbar/component_select.png",
        text: "组件",
        midButton: true,
      },
      {
        iconPath: "/static/imgs/tabbar/template.png",
        selectedIconPath: "/static/imgs/tabbar/template_select.png",
        text: "模板",
      },
    ],
  },
  mutations: {
    _commitAll(state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      let nameArr = payload.name.split(".");
      let saveKey = "";
      let len = nameArr.length;
      if (len >= 2) {
        let obj = state[nameArr[0]];
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]];
        }
        obj[nameArr[len - 1]] = payload.value;
        saveKey = nameArr[0];
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = payload.value;
        saveKey = payload.name;
      }
      // 保存变量到本地，见顶部函数定义
      saveStorage(saveKey, state[saveKey]);
    },
  },
});

export default store;
