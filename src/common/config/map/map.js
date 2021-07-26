/* 腾讯地图 */
const key = "";
let QQMapWX, qqmapsdk;
if (key) {
  QQMapWX = require("./qqmap-wx-jssdk.min.js");
  qqmapsdk = new QQMapWX({
    key,
  });
}
export default qqmapsdk;
