/**
 * 接口列表文件
 */
export default {
  /* 系统类 */
  system: {
    /** 50000 初始化 ↓ **/
    init: {
      url: 'system/uploadAppEquipInfo',
      auth: false,
      method: 'POST',
      // desc: '初始化数据',
      command: "50000",
      data: {
        // deviceuniqueid:'IMEL',//android取IMEI，IOS自定义一个
        lanuchsource: 1,//1直接打开 2Push唤醒 3其他App唤醒
        locationinfo: {}
      }
    },
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

};
