import Vue from 'vue'
import rule from './libs/utils/rules'
import api from './common/request/index'
import tools from './libs/utils/tools'
import {
  API_URL
} from './common/config/env.js'
import uView from 'uview-ui';

Vue.use(uView);

const $uct = {
  api,
  API_URL,
  isRule: rule.isRule,
  rules: rule.rules,
  to: tools.to,
  callPhone: tools.callPhone,
  showToast: tools.showToast,
  showLoading: tools.showLoading,
  checkNetwork: tools.checkNetwork,
  GetLoc: tools.GetLoc,
  GetSystemInfo: tools.GetSystemInfo,
  GetAppVersion: tools.GetAppVersion,
  getClientId: tools.getClientId,
}
const install = Vue => {
  Vue.prototype.$uct = $uct
}
export default {
  install
}