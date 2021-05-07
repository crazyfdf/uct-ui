import Request from './request'
import apiList from './api'

export default function api (url, data = {}) {
  const request = new Request();
  let api = getApiObj(url);
  request.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
    if (api.auth)
    {
      let token = uni.getStorageSync('token');
      if (!token)
      {
        uni.navigateTo({
          url: '/pages/public/login'
        })
        throw ('暂未登入,已阻止此次API请求~');
      }
    }
    if (uni.getStorageSync('token'))
    {
      config.header.token = uni.getStorageSync('token');
    }
    config.data = {
      ...api.data,
      ...data,
    };
    return config
  });

  request.interceptor.response((response) => { /* 请求之后拦截器 */
    if (response.data.code === 0 || response.data.code === 1000)
    { // 服务端返回的状态码不等于200，则reject()
      uni.showToast({
        title: response.data.msg || '请求出错,稍后重试',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    }

    if (response.data.code === 401)
    { // 服务端返回的状态码不等于200，则reject()
      uni.removeStorageSync('token');
      uni.navigateTo({
        url: '/pages/public/login'
      })
    }
    return response
  }, (response) => { // 预留可以日志上报
    setTimeout(() => {
      uni.showToast({
        icon: 'none',
        title: '网络异常,请检查网络设置!',
        duration: 2000,
        position: 'bottom'
      })
    }, 200)
    return response
  })

  return request.request({
    url: api.url,
    data,
    method: api.method
  })

}

function getApiObj (url) {
  let apiArray = url.split("/");
  let api = apiList;
  apiArray.forEach(v => {
    api = api[v];
  });
  return api;
}
