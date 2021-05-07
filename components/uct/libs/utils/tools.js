import wxLogin from "./login/wxLogin";
import uniLogin from "./login/uniLogin";
const routerType = {
  0: "navigateTo", //保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
  1: "redirectTo", //关闭当前页面，跳转到应用内的某个页面。
  2: "reLaunch", //关闭所有页面，打开到应用内的某个页面。
  3: "switchTab", //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
};
export default {
  wxLogin,
  uniLogin,
  /**
   * @description: 跳转再封装，不支持复杂传参。
   * @param {string} path 跳转地址
   * @param {object} params 跳转携带对参数
   * @param {number} type 跳转类型
      0: "navigateTo", //保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
      1: "redirectTo", //关闭当前页面，跳转到应用内的某个页面。
      2: "reLaunch", //关闭所有页面，打开到应用内的某个页面。
      3: "switchTab", //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
   */
  to(path, params = {}, type = 0) {
    // 判断是否有参数
    if (Object.keys(params).length) {
      let arr = Object.entries(params);
      path += "?";
      arr.forEach(item => {
        path += `${item[0]}=${item[1]}&`;
      });
      path = path.substring(0, path.length - 1);
    }
    // 是否跳转外部链接
    if (~path.indexOf("http")) {
      // #ifdef H5
      window.location = path;
      // #endif
      // #ifndef  H5
      uni.navigateTo({
        url: "/pages/public/webview?webviewPath=" + path,
      });
      // #endif
      return false;
    }
    uni[routerType[type]]({
      url: path,
    });
  },

  /**
   * @description: 打电话
   * @param {string} phoneNumber 电话号码
   */
  callPhone(phoneNumber = "") {
    let num = phoneNumber.toString();
    uni.makePhoneCall({
      phoneNumber: num,
      fail(err) {
        console.log("makePhoneCall出错", err);
      },
    });
  },

  /**提示框
   *title(标题)
   *icon(图标):  success，loading，none
   *duration(延时): 0为不关闭, 毫秒数
   *options(其它参数)
   */
  showToast(title, options = {}) {
    uni.showToast({
      title: `${title}` || "",
      icon: options.icon || "none",
      duration: (options && options.duration) || 1000,
      image: (options && options.image) || "",
      mask: (options && options.mask) || true,
    });
  },
  showLoading(title, options = {}) {
    uni.showLoading({
      title: `${title}` || "",
      mask: options.mask || true,
    });
    setTimeout(function() {
      uni.hideLoading();
    }, options.time || 1000);
  },

  // 检查网络
  checkNetwork() {
    uni.getNetworkType({
      complete: function(res) {
        console.log(res.networkType);
        if (res.networkType == "none") {
          setTimeout(() => {
            uni.showToast({
              icon: "none",
              title: "网络异常,请检查网络设置!",
              duration: 2000,
              position: "bottom",
            });
          }, 200);
          // return false
        }
      },
    });
  },

  getLoc() {
    return new Promise((resolve, reject) => {
      //获得地址
      uni.getLocation({
        type: "gcj02",
        geocode: true,
        success: function(lb) {
          // let location = {
          //   ...lb.address,
          //   latitude: lb.latitude,
          //   longitude: lb.longitude,
          // };
          resolve(lb);
          /* if (this.$uct.qqmapsdk) {
            this.$uct.qqmapsdk.reverseGeocoder({
              location,
              get_poi: 1,
              poi_options: "page_size=20;page_index=1",
              success: function(e) {
                resolve(e.result);
              },
              fail: err => {
                uni.showToast({
                  icon: "none",
                  title: `${err}`,
                });
              },
            });
          } else {
            resolve({
              location,
            });
          }*/
        },
        fail: function(res) {
          console.log(res);
          uni.showToast({
            icon: "none",
            title: "获取地址失败, 请检查是否开启定位权限~~",
          });
        },
      });
    });
  },

  /* 获取设备信息 */
  getSystemInfo() {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      uni.getSystemInfo({
        success: function(res) {
          resolve(res.platform);
        },
      });
    });
    // #endif
  },

  getAppVersion() {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      try {
        if (uni.getStorageSync("version")) {
          resolve(uni.getStorageSync("version"));
        } else {
          plus.runtime.getProperty(plus.runtime.appid, function(res) {
            uni.setStorageSync("version", res.version);
            resolve(res.version);
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
    // #endif
  },
  //获取客户端ID
  getClientId() {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      //获取客户端ID和版本号
      var clientId = "";
      // 苹果系统
      plus.device.getInfo({
        success: function(e) {
          clientId = e.uuid;
        },
        fail: function(e) {
          console.log(e);
        },
      });
      // 安卓系统
      plus.device.getAAID({
        success: function(e) {
          clientId = e.aaid;
        },
        fail: function(e) {
          console.log(e);
        },
      });
      //老版本、安卓模拟器
      if (clientId == "") {
        clientId = plus.device.uuid;
      }
      resolve(clientId);
    });
    // #endif
  },
};
