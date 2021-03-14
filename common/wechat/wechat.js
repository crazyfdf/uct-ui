/**
 * Wechat v1.0.0
 * @Class Wechat
 * @description shopro-wechat 1.0.0 wehcat第三方登入组件
 * @Author llidongtony
 * @Date 2020-02-19
 * @Email lidongtony@qq.com
 */
import api from '@/common/request/index'
import store from '@/common/store'
import router from '@/components/router'
import {
  API_URL
} from '@/config/env'

export default class Wechat {

  async login () {
    let token = '';
    /*     if (router.$Route.path.indexOf('public/login') == -1)
        {
          uni.setStorageSync('fromLogin', router.$Route);
        } */
    // #ifdef MP-WEIXIN
    // store.commit('FORCE_OAUTH', true);
    this.login_hawk();
    // #endif
    // #ifdef H5
    this.wxOfficialAccountLogin();
    // #endif
    // #ifdef APP-PLUS
    token = await this.wxOpenPlatformLogin();
    return token;
    // #endif
  }
  // #ifdef H5

  wxOfficialAccountLogin () {
    let oUrl = window.location.href;
    window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + store.state.init.initData.wechat.appid +
      `&redirect_uri=${API_URL}user/wxOfficialAccountLogin&response_type=code&scope=snsapi_userinfo&state=` +
      oUrl;
    throw 'stop';
  }
  //临时登入获取OpenId 不入库不绑定用户

  wxOfficialAccountBaseLogin () {
    let oUrl = window.location.href;
    //首次进入 没有登入 保存
    window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + store.state.init.initData.wechat.appid +
      `&redirect_uri=${API_URL}user/wxOfficialAccountBaseLogin&response_type=code&scope=snsapi_base&state=` +
      oUrl;
    throw 'stop';
  }
  // #endif

  wxOpenPlatformLogin () {
    let that = this;

    return new Promise((resolve, reject) => {
      //app第三方登录
      console.log("App微信拉起授权")
      let that = this
      uni.getProvider({
        service: 'oauth',
        success: function (res) {
          console.log(res.provider);
          //支持微信、qq和微博等
          if (~res.provider.indexOf('weixin'))
          {
            uni.login({
              provider: 'weixin',
              success: function (loginRes) {
                console.log(loginRes);
                if (loginRes.errMsg === "login:ok")
                {
                  resolve(loginRes.authResult);
                  /* let authResult = loginRes.authResult;
                  uni.getUserInfo({
                    provider: 'weixin',
                    success: function (infoRes) {
                      console.log(infoRes);
                      resolve(infoRes.userInfo);
                    },
                    fail: function (res) {
                      api('dev.debug', {
                        info: res
                      })
                    }
                  }); */
                }
                else
                {
                  console.log('未授权登录');
                }
              },
              fail: function (res) {
                api('dev.debug', {
                  info: res
                })
              }
            });
          }
        }
      })
    });
  }

  // #ifdef MP-WEIXIN
  getWxMiniProgramSessionKey () {
    let that = this;
    let sessionStatus = false;
    let session_key = '';
    return new Promise((resolve, reject) => {
      uni.checkSession({
        success (res) {
          if (res.errMsg === 'checkSession:ok') sessionStatus = true;
        },
        complete () {
          if (!uni.getStorageSync('session_key') || !sessionStatus)
          {
            uni.login({
              success: function (info) {
                let code = info.code;
                api('user.getWxMiniProgramSessionKey', {
                  code: code,
                }).then(res => {
                  if (res.code === 1)
                  {
                    uni.setStorageSync('session_key', res.data.session_key);
                    uni.setStorageSync('openid', res.data.openid);
                    session_key = res.data.session_key;
                  }
                });
              }
            });
          } else
          {
            session_key = uni.getStorageSync('session_key');
          }
        }
      })

      resolve(session_key);

    });
  }

  login_hawk (e) {
    let that = this;
    return new Promise((resolve, reject) => {

      if (e.detail.errMsg === "getUserInfo:ok")
      {
        uni.login({
          success: function (info) {
            uni.showLoading({
              title: '登录中'
            });
            let code = info.code;
            api('user.login_hawk', {
              code,
            }).then(res => {
              uni.showToast({
                title: `${res.msg}`,
                icon: 'none',
                duration: 1000,
                mask: true
              });
              if (res.code === 1)
              {
                resolve(res.data.userInfo.token);
                let token = res.data.userInfo.token;
                /* 自动更新数据 */
                uni.request({
                  url: API_URL + 'user/Updata_user_hawk',
                  data: {
                    userInfo: e.detail.rawData,
                    mobile: '',
                    token
                  },
                  method: 'post',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  success: function (lres) {
                    console.log(lres);
                  }
                });
              }
            });
          }
        });
      }
    })
  }

  checkMiniProgramUpdate () {
    let updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
    });
    updateManager.onUpdateReady(function (res) {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success (res) {
          if (res.confirm)
          {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
    updateManager.onUpdateFailed(function (res) {
      // 新的版本下载失敗
    });
  }

  // #endif


}
