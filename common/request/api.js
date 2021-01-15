/**
 * 接口列表文件
 */
export default {

  /** 初始化 ↓ **/
  init: {
    url: 'common/init',
    auth: false,
    method: 'GET',
    // desc: '初始化数据',
  },

  /** 上传图片 ↓ **/
  upload: {
    url: 'index/upload',
    auth: true,
    method: 'POST',
    // desc: '上传',
  },

  /** 上传Base64图片 ↓ **/
  uploadBase64: {
    url: 'index/uploadBase64',
    auth: false,
    method: 'POST',
    // desc: '上传Base64位图片',
  },

  /** 模板信息 ↓ **/
  template: {
    url: 'common/component_template',
    auth: false,
    method: 'GET',
    // desc: '模板信息',
  },
  /** 自定义模板页面 ↓ **/
  custom: {
    url: 'index/custom',
    auth: false,
    method: 'GET',
    // desc: '自定义模板页面',
  },

  /** 自动化表单 ↓ **/
  form: {
    form: {
      url: 'formbuild/form',
      auth: false,
      method: 'POST',
      // desc: '获取自动化表单',
    },
    submit: {
      url: 'formbuild/submit',
      auth: false,
      method: 'POST',
      // desc: '获取自动化表单',
    },
    list: {
      url: 'formbuild/list',
      auth: false,
      method: 'POST',
      // desc: '获取表单列表数据',
    },
    detail: {
      url: 'formbuild/detail',
      auth: false,
      method: 'POST',
      // desc: '获取表单列表详细数据',
    }
  },

  /** 富文本  ↓ **/
  richtext: {
    url: 'index/richtext',
    auth: false,
    method: 'GET',
    // desc: '富文本数据',
  },

  /** 用户 ↓ **/
  user: {
    login_hawk: {
      url: 'user/login_hawk',
      auth: false,
      method: 'POST',
      // desc: '微信小程序登入',
    },
  },

  /** 短信 ↓ **/
  sms: {
    send: {
      url: 'sms/send',
      auth: false,
      method: 'POST',
      // desc: '发送短信',
    },
  },

  /** 常见问题 ↓ **/
  faq: {
    list: {
      url: 'faq',
      auth: false,
      method: 'GET',
      // desc: '常见问题列表',
    },
  },

  /** 百度API ↓ **/
  baidu: {
    locData: {
      url: 'https://api.map.baidu.com/geocoder/v2/',
      auth: false,
      method: 'GET'
      // desc: '百度地图',
    }
  }
};
