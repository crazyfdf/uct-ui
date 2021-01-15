// 初始化数据模块
import api from '@/common/request/index'
import store from '@/common/store'
import Router from '@/common/router';
import {
  INIT_DATA,
  PAGE_ROUTES,
  TEMPLATE_DATA,
  TAB_BAR
} from '../types.js'
const state = {
  initData: {},
  routes: [],
  tabbar: 0,
  templateData: uni.getStorageSync('templateData') ? uni.getStorageSync('templateData') : {}
}

const actions = {
  getAppInit ({
    commit
  }, options) {
    uni.setStorageSync('mode', 'product');
    return new Promise((resolve, reject) => {
      api('init').then(res => {
        commit('INIT_DATA', res.data);
        uni.setStorageSync('sysInfo', res.data);
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
  // 同步前端路由
  getRoutes ({
    commit
  }) {
    return new Promise((resolve, reject) => {
      api('dev.asyncLink', {
        data: ROUTES
      }).then(res => {
        commit('PAGE_ROUTES', res.data);
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
  // 模板信息
  getTemplate ({
    commit
  }, options) {
    var params = {};
    return new Promise((resolve, reject) => {
      api('template', params).then(res => {
        uni.setStorageSync('templateData', res.data);
        commit('TEMPLATE_DATA', res.data);
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
}

const mutations = {
  [PAGE_ROUTES] (state, data) {
    state.routes = data
  },
  [TAB_BAR] (state, data) {
    state.tabbar = data
  },
  [INIT_DATA] (state, data) {
    state.initData = data
  },
  [TEMPLATE_DATA] (state, data) {
    state.templateData = data
  },
  // 弹窗一次的话，关闭的时候删除数据。
  delPopup (state, path) {
    uni.removeStorageSync('templateData');
    let templateData = state.templateData
    templateData.popup[0].content.list.forEach(item => {
      if (item.page.includes(path))
      {
        let index = item.page.indexOf(path);
        item.page.splice(index, 1)
      }
    })
    uni.setStorageSync('templateData', templateData);
    state.templateData = templateData;
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
