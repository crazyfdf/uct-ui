/*
 * @Author: your name
 * @Date: 2021-03-13 07:55:05
 * @LastEditTime: 2021-04-23 11:38:35
 * @LastEditors: 祸灵
 * @Description: In User Settings Edit
 * @FilePath: \UC-font\components\uct\index.js
 */
import Vue from "vue";
import rule from "./libs/utils/rules";
import api from "./common/request/index";
import tools from "./libs/utils/tools";
import filter from "./libs/utils/filter";
import { debounce, throttle, clone } from "./libs/utils/interactive";
import { API_URL } from "./libs/config/env.js";
import config from "./libs/config/config.js";
import lodash from "./libs/lodash/lodash.js";
import uView from "uview-ui";

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
  Container: lodash.Container,
  Either: lodash.Either,
  IO: lodash.IO,
  IOMonad: lodash.IOMonad,
  Maybe: lodash.Maybe,
  curry: lodash.curry,
  compose: lodash.compose,
  config,
  debounce,
  throttle,
  clone,
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
