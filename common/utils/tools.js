import {
  API_URL
} from '@/env'
import { router } from '@/common/router'
import api from '@/common/request/index'

var QQMapWX = require('@/components/map/qqmap-wx-jssdk.min.js')
var qqmapsdk = new QQMapWX({
  key: 'LXCBZ-NNIKD-UZ64F-H6AFI-UNJLH-OCFGE'
})
export default {
  /**
   * 跳转再封装，不支持复杂传参。
   */
  routerTo (path, params = {}, isLogin) {
    // 是否跳转外部链接
    if (~path.indexOf('http'))
    {
      // #ifdef H5
      window.location = path;
      // #endif
      // #ifndef  H5
      router.push({
        path: '/pages/public/webview',
        query: {
          'webviewPath': path
        }
      })
      // #endif
      return false
    }
    // 判断是否有参数
    if (path.indexOf('?') !== -1)
    {
      let index = path.lastIndexOf('?');
      let query = path.substring(index + 1, path.length);
      let arr = query.split('&')
      path = path.slice(0, index);
      arr.forEach(item => {
        let mArr = item.split('=');
        params[mArr[0]] = mArr[1]
      })
    }

    if (isLogin)
    {
      router.replaceAll({
        path: path,
        query: params
      })
      /*       uni.redirectTo({
              url: path,
            }) */
    } else
    {
      router.push({
        path: path,
        query: params,
        fail: function (res) {
          // #ifdef MP-WEIXIN 
          wx.switchTab({
            url: path,
          })
          // #endif
          // #ifndef MP-WEIXIN 
          router.pushTab({
            path: path,
            query: params
          })
          // #endif
        }
      })
    }
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
  },

  // #ifdef APP-PLUS
  GetAppVersion () {
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
  },
  //获取客户端ID
  getClientId () {
    //获取客户端ID和版本号
    var clientid = '';
    // #ifdef APP-PLUS
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
    // #endif
    return clientid;
  },

  // #endif
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
