// .env.js 文件
// 不同环境访问不同的路径
const ENV_API_URL = {
  development: "", //开发环境
  production: "", //生产环境
};
const ENV_BASE_URL = {
  development: "", //开发环境
  production: "", //生产环境
};
/* 腾讯地图 */
const key = "";
let QQMapWX, qqmapsdk;
if (key) {
  QQMapWX = require("./map/qqmap-wx-jssdk.min.js");
  qqmapsdk = new QQMapWX({
    key,
  });
}

// #ifndef H5
const API_URL = ENV_API_URL[process.env.NODE_ENV || "development"]; //后台接口域名
// #endif
// #ifdef H5
const API_URL = ENV_API_URL[process.env.NODE_ENV || "development"] + "api/"; //后台接口域名
// #endif
const BASE_URL = ENV_BASE_URL[process.env.NODE_ENV || "development"]; //后台根域名
const HAS_LIVE = false; //后台是否开通直播权限,根据情况在manifest.json中，开启注释相应组件的引入。
export default { qqmapsdk, API_URL, BASE_URL, HAS_LIVE };
