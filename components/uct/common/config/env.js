// .env.js 文件
// 不同环境访问不同的路径
const ENV_API_URL = {
  development: 'http://2g238e1732.51mypc.cn:9200/appapi/', //开发环境
  production: 'http://2g238e1732.51mypc.cn:9200/appapi/', //生产环境
}
const ENV_BASE_URL = {
  development: 'http://2g238e1732.51mypc.cn:9200/', //开发环境
  production: 'http://2g238e1732.51mypc.cn:9200/', //生产环境
}
/* 腾讯地图 */
const key = 'LXCBZ-NNIKD-UZ64F-H6AFI-UNJLH-OCFGE';
export let qqmapsdk
if (key)
{
  var QQMapWX = require('../../components/uct-form-item/form-item-template/module/map/qqmap-wx-jssdk.min.js')
  qqmapsdk = new QQMapWX({
    key
  })
}
// #ifdef APP-PLUS
export const API_URL = ENV_API_URL[process.env.NODE_ENV || 'development']; //后台接口域名
// #endif
// #ifdef H5
export const API_URL = "/appapi/"; //后台接口域名
// #endif
export const BASE_URL = ENV_BASE_URL[process.env.NODE_ENV || 'development']; //后台根域名
export const HAS_LIVE = false; //后台是否开通直播权限,根据情况在manifest.json中，开启注释相应组件的引入。
