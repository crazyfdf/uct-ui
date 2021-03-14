const routerType = {
  0: "navigateTo",//保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
  1: "redirectTo",//关闭当前页面，跳转到应用内的某个页面。
  2: "reLaunch",//关闭所有页面，打开到应用内的某个页面。
  3: "switchTab",//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
}
export default {
  /**
   * 跳转再封装，不支持复杂传参。
   */
  to (path, params = {}, type = 0) {
    // 判断是否有参数
    if (Object.keys(params).length)
    {
      let arr = Object.entries(params)
      path += "?"
      arr.forEach(item => {
        path += `${item[0]}=${item[1]}&`
      })
      path = path.substring(0, path.length - 1)
    }
    // 是否跳转外部链接
    if (~path.indexOf('http'))
    {
      // #ifdef H5
      window.location = path;
      // #endif
      // #ifndef  H5
      uni.navigateTo({
        url: '/pages/public/webview?webviewPath=' + path
      });
      // #endif
      return false
    }
    uni[routerType[type]]({
      url: path
    })
  },

  // 打电话
  callPhone (phoneNumber = '') {
    let num = phoneNumber.toString()
    uni.makePhoneCall({
      phoneNumber: num,
      fail (err) {
        console.log('makePhoneCall出错', err)
      },
    });
  },

  /**提示框
   *title(标题)
   *icon(图标):  success，loading，none
   *duration(延时): 0为不关闭, 毫秒数
   *options(其它参数)
   */
  showToast (title, options = {}) {
    uni.showToast({
      title: `${title}` || '',
      icon: options.icon || 'none',
      duration: (options && options.duration) || 1500,
      image: (options && options.image) || '',
      mask: (options && options.mask) || true,
    });
  },
  showLoading (title, mask, time) {
    uni.showLoading({
      title: `${title}` || '',
      mask: mask || true
    });
    setTimeout(function () {
      uni.hideLoading();
    }, time);
  },

  // 检查网络
  checkNetwork () {
    uni.getNetworkType({
      complete: function (res) {
        console.log(res.networkType)
        if (res.networkType == 'none')
        {
          setTimeout(() => {
            uni.showToast({
              icon: 'none',
              title: '网络异常,请检查网络设置!',
              duration: 2000,
              position: 'bottom'
            })
          }, 200)
          // return false
        }
      }
    });
  },

  GetLoc () {
    return new Promise((resolve, reject) => {
      //获得地址
      uni.getLocation({
        type: 'gcj02',
        geocode: true,
        success: function (lb) {
          var latitude = lb.latitude
          var longitude = lb.longitude
          var speed = lb.speed
          var accuracy = lb.accuracy
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            get_poi: 1,
            poi_options: "page_size=20;page_index=1",
            success: function (e) {
              resolve(e.result)
            },
            fail: err => {
              uni.showToast({
                icon: 'none',
                title: `${err}`
              })
            }
          })
        },
        fail: function (res) {
          console.log(res);
          uni.showToast({
            icon: 'none',
            title: '获取地址失败, 请检查是否开启定位权限~~'
          })
        }
      })
    })
  },

  /* 获取设备信息 */
  GetSystemInfo () {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      try
      {
        if (uni.getStorageSync('platform'))
        {
          resolve(uni.getStorageSync('platform'))
        } else
        {
          uni.getSystemInfo({
            success: function (res) {
              uni.setStorageSync('platform', res.platform)
              resolve(res.platform)
            }
          });
        }
      } catch (e)
      {
        console.log(e);
      }
    })
    // #endif
  },

  GetAppVersion () {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      try
      {
        if (uni.getStorageSync('version'))
        {
          resolve(uni.getStorageSync('version'))
        } else
        {
          plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
            uni.setStorageSync('version', wgtinfo.version)
            resolve(wgtinfo.version)
          })
        }
      } catch (e)
      {
        console.log(e);
      }
    })
    // #endif
  },
  //获取客户端ID
  getClientId () {
    // #ifdef APP-PLUS
    //获取客户端ID和版本号
    var clientid = '';
    // 苹果系统
    plus.device.getInfo({
      success: function (e) {
        clientid = e.uuid;
        uni.setStorageSync('clientid', clientid);
      },
      fail: function (e) {
        console.log(e);
      }
    });
    // 安卓系统
    plus.device.getAAID({
      success: function (e) {
        clientid = e.aaid;
        console.log(clientid);
        uni.setStorageSync('clientid', clientid);
      },
      fail: function (e) {
        console.log(e);
      }
    });
    //老版本、安卓模拟器
    if (clientid == '')
    {
      clientid = plus.device.uuid;
      uni.setStorageSync('clientid', clientid);
    }
    return clientid;
    // #endif
  },

  /* 深拷贝 */
  deepCopy (obj) {
    let res = obj instanceof Array ? [] : {}
    for (const [key, value] of Object.entries(obj))
    {
      res[key] = typeof value == "object" ? this.deepCopy(value) : value
    }
    return res
  }
}
