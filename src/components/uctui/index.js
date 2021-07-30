/*
 * @Author: your name
 * @Date: 2021-03-13 07:55:05
 * @LastEditTime: 2021-05-12 15:39:33
 * @LastEditors: 祸灵
 * @Description: In User Settings Edit
 * @FilePath: \UC-font\components\uct\index.js
 */
import Vue from "vue";
// 外部定义的方法
import api from "@/common/request/index";
import url from "@/common/config/env.js";
import qqmapsdk from "@/common/config/map/map.js";
import config from "@/common/config/config.js";
// uct工具下的方法
import rule from "./tools/rules";
import uniApi from "./tools/uniApi";
import filter from "./tools/filter";
import jsTools from "./tools/jsTools";
import uView from "uview-ui";
Vue.use(uView);
const $uct = {
  api,
  API_URL: url.API_URL,
  qqmapsdk,
  isRule: rule.isRule,
  rules: rule.rules,
  to: uniApi.to,
  callPhone: uniApi.callPhone,
  showToast: uniApi.showToast,
  showLoading: uniApi.showLoading,
  checkNetwork: uniApi.checkNetwork,
  getLoc: uniApi.getLoc,
  getSystemInfo: uniApi.getSystemInfo,
  getAppVersion: uniApi.getAppVersion,
  getClientId: uniApi.getClientId,
  wxLogin: uniApi.wxLogin,
  uniLogin: uniApi.uniLogin,
  config,
  debounce: jsTools.debounce,
  throttle: jsTools.throttle,
  clone: jsTools.clone,
  bus: new Vue(),
  color: filter.color,
  timeFormat: filter.timeFormat,
  numberFormat: filter.numberFormat,
};
const install = Vue => {
  Vue.prototype.$uct = $uct;
};
export default {
  install,
};
