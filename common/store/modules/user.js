// 用户数据模块
import api from '@/common/request/index'
import store from '@/common/store'

import {
  USER_INFO,
  LOC_DATA,
  LOGIN_TIP,
  MESSAGE_IDS,
  OUT_LOGIN,
  // #ifdef MP-WEIXIN
  FORCE_OAUTH,
  // #endif
} from '../types.js'
const state = {
  userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {},
  showLoginTip: false,
  locData: {},
  // #ifdef MP-WEIXIN
  forceOauth: false,
  // #endif
  messageIds: {}, //小程序订阅消息模板ids

}

const actions = {
  //設置token并返回上次页面
  setTokenAndBack ({
    commit
  }, token) {
    uni.setStorageSync('token', token);
    store.dispatch('getUserInfo', token);
    let fromLogin = uni.getStorageSync('fromLogin');
    if (fromLogin)
    {
      uni.removeStorageSync('fromLogin')
    } else
    {
      //默认跳转首页S
      // router.replaceAll('/pages/index')
      uni.reLaunch({ url: '/pages/index' })
    }
  },

  // 获取用户信息
  getUserInfo ({
    commit
  }, token) {
    return new Promise((resolve, reject) => {
      api('user.info', { token }).then(res => {
        console.log(res.data);
        commit('LOGIN_TIP', false);
        commit('USER_INFO', res.data);
        uni.setStorageSync('userInfo', res.data);
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },

  //提交type
  switchGroup_id ({
    commit
  }, userInfo) {
    commit('USER_INFO', userInfo);
    uni.setStorageSync('userInfo', userInfo);
  },

  // 获取用户地址信息

  Makeloc ({
    commit
  }, L_data) {
    var that = this;
    if (L_data != 'no')
    {
      uni.setStorageSync('locData', L_data)
      commit('LOC_DATA', L_data);
    } else
    {
      let locData = uni.getStorageInfoSync('locData') ? uni.getStorageInfoSync('locData') : ''
      commit('LOC_DATA', locData);

    }
  },

}

const mutations = {
  // 小程序订阅消息模板ids
  [MESSAGE_IDS] (state, data) {
    state.messageIds = data
  },
  [USER_INFO] (state, data) {
    state.userInfo = data
  },
  [LOC_DATA] (state, data) {
    state.locData = data
  },
  [LOGIN_TIP] (state, data) {
    state.showLoginTip = data
  },

  // #ifdef MP-WEIXIN
  [FORCE_OAUTH] (state, data) {
    state.forceOauth = data
    data ? uni.hideTabBar() : uni.showTabBar();
  },
  // #endif

  [OUT_LOGIN] (state, data) {
    uni.removeStorageSync('token');
    uni.removeStorageSync('userInfo');
    store.commit('USER_INFO', {});
  },

}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
