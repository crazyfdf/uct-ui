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
    /** 50001 获取App版本信息 ↓ **/
    getAppVersionInfo: {
      url: 'system/getAppVersionInfo',
      auth: false,
      method: 'POST',
      command: "50001",
      data: {}
    },
    /** 50003 获取手机验证码 ↓ **/
    getSMSCode: {
      url: 'system/getSMSCode',
      auth: false,
      method: 'POST',
      command: "50003",
      data: {
        // mobileno:'18354694321'//手机号码
      }
    },

    /** 50007 获取广告配置数据 ↓ **/
    getAdConfig: {
      url: 'system/getAdConfig',
      auth: false,
      method: 'POST',
      command: "50007",
      data: {
        adcode: 'N01'//广告Code
      }
    },
    /** 50011提交意见反馈 ↓ **/
    uploadSuggestion: {
      url: 'system/uploadSuggestion',
      auth: false,
      method: 'POST',
      command: "50011",
      data: {
        // typecode:"",//问题分类String必填1Bug 2功能建议 99其他
        // content:"",//详细描述String必填
        // linkinfo:'',//联系方式String必填
        // imglist:[{//图片列表Array否
        //   imgid:"",//imgid图片idString必填
        //   imgurl:""//imgurl图片urlString必填
        // }]
      }
    },
    /** 50012提交城市加盟 ↓ **/
    uploadPartnerByCity: {
      url: 'system/uploadPartnerByCity',
      auth: false,
      method: 'POST',
      command: "50012",
      data: {
        // cityname:"",//城市名称String必填
        // linkname:"",//姓名String必填
        // linktel:'',//电话String必填
        // email:"",//邮箱String必填
        // companyname:"",//公司名称String必填
        // memo:'',//申请说明String必填
      }
    },
    /** 50013提交寻求报道 ↓ **/
    uploadPartnerByProject: {
      url: 'system/uploadPartnerByProject',
      auth: false,
      method: 'POST',
      command: "50013",
      data: {

      }
    },
  },
  /* 登录类 */
  login: {
    /** 50101 用户+密码登录 ↓ **/
    loginByPassword: {
      url: 'login/loginByPassword',
      auth: false,
      method: 'POST',
      command: "50101",
      data: {
        // username:"18980801253",//用户名String必填手机号码
        // password:"123456"//密码String否
      }
    },
    /** 50102 微信授权获取授权信息 ↓ **/
    loginByWXOpen: {
      url: 'login/loginByWXOpen',
      auth: false,
      method: 'POST',
      command: "50102",
      data: {
        // accesstoken:"",//访问tokenString必填
        // refreshtoken:"",//刷新tokenString必填
        // openid:"",//OpenidString必填
        // unionid:"",//UnionidString必填
      }
    },
    /** 50105 根据登录Token获取用户信息 ↓ **/
    getLoginCustomerInfo: {
      url: 'login/getLoginCustomerInfo',
      auth: false,
      method: 'POST',
      command: "50105",
      data: {}
    },
  },
  /* 公共类 */
  public: {
    /** 50200 全局搜索结果 ↓ **/
    searchByFullText: {
      url: 'public/searchByFullText',
      auth: true,
      method: 'POST',
      command: "50200",
      data: {
        //key:"",//搜索名称String否
      }
    },
    /** 50202 提交点赞操作 ↓ **/
    uploadPraise: {
      url: 'public/uploadPraise',
      auth: true,
      method: 'POST',
      command: "50202",
      data: {
        // kmcid:"",//内容idString是
        // kmctype:"",//类型分类Short是2报告3直播7课程99资讯100自定义Url
      }
    },
    /** 50203 提交（取消）关注机构操作 ↓ **/
    uploadHostFavorite: {
      url: 'public/uploadHostFavorite',
      auth: true,
      method: 'POST',
      command: "50203",
      data: {
        // hostid:"",//机构idString是
        // hosttype:"",//机构类型Short是1 资讯 2 内容
        // optype:""//操作类型Short是1关注 2取消
      }
    },
    /** 50204 提交内容收藏操作 ↓ **/
    uploadContentFavorite: {
      url: 'public/uploadContentFavorite',
      auth: true,
      method: 'POST',
      command: "50204",
      data: {
        // kmcid:"",//内容idString是
        // kmctype:"",//类型分类Short是2报告3直播7课程99资讯100自定义Url
        // optype:""//操作类型Short是1关注 2取消
      }
    },
    /** 50206 搜索页面获取推荐信息 ↓ **/
    getSearchRecommendInfo: {
      url: 'public/getSearchRecommendInfo',
      auth: true,
      method: 'POST',
      command: "50206",
      data: {}
    },
  },
  /* 资讯类 */
  news: {
    /** 51007 获取资讯详情 ↓ **/
    getNewsDetail: {
      url: 'news/getNewsDetail',
      auth: false,
      method: 'POST',
      command: "51007",
      data: {
        // newsid:"",//资讯idString是
      }
    },
    /** 51011 获取资讯评论信息 ↓ **/
    getNewsComment: {
      url: 'news/getNewsComment',
      auth: false,
      method: 'POST',
      command: "51011",
      data: {
        // newsid:"",//资讯idString是
        p: 1,//页码Int是
        s: 10,//每页条数Int是
      }
    },
    /** 51012 提交用户评论/回复信息 ↓ **/
    uploadNewsComment: {
      url: 'news/uploadNewsComment',
      auth: true,
      method: 'POST',
      command: "51012",
      data: {
        // newsid:"",//资讯idString是
        //commentid:"",//评论idString否回复的评论id，回复有效
        // datatype:"",评论类型Int是1评论 2回复
        // content:"",//评论内容String是
      }
    },
  },
  /* 内容相关类 */
  kmc: {
    /* 课程类 */
    course: {
      /** 53001 获取首页数据 ↓ **/
      getIndexData: {
        url: 'kmc/course/getIndexData',
        auth: false,
        method: 'POST',
        command: "53001",
        data: {
          // key:"",//搜索名称String否
          // catecode:"",//分类编码0101IPO上市0102股权激励0103股权融资0104并购重组0105市值管理0106董秘实操
          p: 1,//页码Int是
          s: 10,//每页条数Int是
        }
      },
      /** 53002 课程搜索列表 ↓ **/
      getCourseList: {
        url: 'kmc/course/getCourseList',
        auth: false,
        method: 'POST',
        command: "53002",
        data: {
          // key:"",//搜索名称String否
          // catecode:"",//分类编码0101IPO上市0102股权激励0103股权融资0104并购重组0105市值管理0106董秘实操 
          p: 1,//页码Int是
          s: 10,//每页条数Int是
        }
      },
      /** 53003 获取课程详情 ↓ **/
      getCourseDetail: {
        url: 'kmc/course/getCourseDetail',
        auth: false,
        method: 'POST',
        command: "53003",
        data: {
          // courseid:"",//课程idString是
        }
      },
      /** 53004 获取课程目录 ↓ **/
      getCourseTask: {
        url: 'kmc/course/getCourseTask',
        auth: false,
        method: 'POST',
        command: "53004",
        data: {
          // courseid:"",//课程idString是
        }
      },
      /** 53005 获取课程单任务信息 ↓ **/
      getCourseTaskDetail: {
        url: 'kmc/course/getCourseTaskDetail',
        auth: true,
        method: 'POST',
        command: "53005",
        data: {
          // taskid:"",//任务idString是
        }
      },
      /** 53006 获取课程讨论信息 ↓ **/
      getCourseDiscuss: {
        url: 'kmc/course/getCourseDiscuss',
        auth: false,
        method: 'POST',
        command: "53006",
        data: {
          // courseid:"",//课程idString是
          p: 1,//页码Int是
          s: 10,//每页条数Int是
        }
      },
      /** 53007 提交用户讨论信息 ↓ **/
      uploadCourseDiscuss: {
        url: 'kmc/course/uploadCourseDiscuss',
        auth: true,
        method: 'POST',
        command: "53007",
        data: {
          // courseid:"",//课程idString是
          //content:"",//聊天内容String是

        }
      },
      /** 53008 获取用户评价接口 ↓ **/
      getCourseComment: {
        url: 'kmc/course/getCourseComment',
        auth: false,
        method: 'POST',
        command: "53008",
        data: {
          // courseid:"",//课程idString是
          p: 1,//页码Int是
          s: 10,//每页条数Int是
        }
      },
      /** 53009 提交用户评价 ↓ **/
      uploadCourseComment: {
        url: 'kmc/course/uploadCourseComment',
        auth: true,
        method: 'POST',
        command: "53009",
        data: {
          // courseid:"",//课程idString是
          //content:"",//聊天内容String是
          //evaluatecount:"",//评价分数Float是
        }
      },
      /** 53010 获取全部笔记 ↓ **/
      getAllCourseNotes: {
        url: 'kmc/course/getAllCourseNotes',
        auth: false,
        method: 'POST',
        command: "53010",
        data: {
          // courseid:"",//课程idString是
          p: 1,//页码Int是
          s: 10,//每页条数Int是
        }
      },
      /** 53011 获取我的笔记 ↓ **/
      getMyCourseNotes: {
        url: 'kmc/course/getMyCourseNotes',
        auth: true,
        method: 'POST',
        command: "53011",
        data: {
          // courseid:"",//课程idString是
          p: 1,//页码Int是
          s: 10,//每页条数Int是
        }
      },
      /** 53012 提交用户笔记 ↓ **/
      uploadCourseNotes: {
        url: 'kmc/course/uploadCourseNotes',
        auth: true,
        method: 'POST',
        command: "53012",
        data: {
          // courseid:"",//课程idString是
          //content:"",//聊天内容String是
          //taskid:"",任务idString否
          //ispublic:"",//是否公开Short是0否 1是
        }
      },
      /** 53013 删除课程个人笔记 ↓ **/
      deleteMyCourseNotes: {
        url: 'kmc/course/deleteMyCourseNotes',
        auth: true,
        method: 'POST',
        command: "53013",
        data: {
          // noteid:"",//笔记idString是
        }
      },
      /** 53015 获取课程资料 ↓ **/
      getCourseDoc: {
        url: 'kmc/course/getCourseDoc',
        auth: false,
        method: 'POST',
        command: "530015",
        data: {
          // courseid:"",//课程idString是
          p: 1,//页码Int是
          s: 10,//每页条数Int是
        }
      },
      /** 53016 提交免费参与课程 ↓ **/
      uploadCourseJoinInfo: {
        url: 'kmc/course/uploadCourseJoinInfo',
        auth: true,
        method: 'POST',
        command: "53016",
        data: {
          // courseid:"",//课程idString是
          userformlist: [],
          // userformlist: [{//表单Array否
          //   colinnerid: "",//内部IDString是
          //   colname: "",//列名String是
          //   covalue: "",//表单值String是
          // }]
        }
      },
    },
    /* 报告类 */
    report: {
      /** 54000 按类型获取首页数据 ↓ **/
      getIndexData: {
        url: 'kmc/report/getIndexData',
        auth: false,
        method: 'POST',
        command: "54000",
        data: {
          // key:"",//搜索名称String否
          // catecode:"",//分类编码String否recomm 推荐  hotrank 热榜
          p: 1,//页码Int是
          s: 10,//每页条数Int是
        }
      },
      /** 54001 获取报告详情 ↓ **/
      getReportDetail: {
        url: 'kmc/report/getReportDetail',
        auth: false,
        method: 'POST',
        command: "54001",
        data: {
          // reportid:"",//报告idString是
        }
      },
      /** 54002 获取预览报告信息 ↓ **/
      getReportPreview: {
        url: 'kmc/report/getReportPreview',
        auth: true,
        method: 'POST',
        command: "54002",
        data: {
          // reportid:"",//报告idString是
          // retype:"",//结果类型Short是1 查看 2 预览
        }
      },
      /** 54003 提交免费参与报告 ↓ **/
      uploadReportJoinInfo: {
        url: 'kmc/report/uploadReportJoinInfo',
        auth: true,
        method: 'POST',
        command: "54003",
        data: {
          // reportid:"",//报告idString是
        }
      },
      /** 54004 生成报告海报 ↓ **/
      getReportPoster: {
        url: 'kmc/report/getReportPoster',
        auth: true,
        method: 'POST',
        command: "54004",
        data: {
          // reportid:"",//报告idString是
        }
      },
    }
  },

  /* 内容相关类 */
  center: {
    /** 59011 领取优惠券 ↓ **/
    drawVoucherInfo: {
      url: 'center/drawVoucherInfo',
      auth: true,
      method: 'POST',
      command: "59011",
      data: {
        // couponid:"",//优惠券idString是
      },
    }
  },
  /* 支付相关类 */
  pay: {
    /** 59100 获取订单确认 ↓ **/
    getOrderDetail: {
      url: 'pay/getOrderDetail',
      auth: true,
      method: 'POST',
      command: "59100",
      data: {
        // kmcid:"",//内容idString是
        // kmctype:"",//内容类型Int是2报告3直播7课程99资讯100自定义Url
      },
    },
    /** 59101 提交订单（返回参数待定） ↓ **/
    uploadPayOrder: {
      url: 'pay/uploadPayOrder',
      auth: true,
      method: 'POST',
      command: "59101",
      data: {
        // kmcid:"",//内容idString是
        // kmctype:"",//内容类型Int是2报告3直播7课程99资讯100自定义Url
        // ordermoney:"",//订单金额String是
        //paymoney:"",//实际支付订单金额String是
        //couponid:"",//优惠券idString是
        // discountmoney:"",//优惠券优惠金额String是
        //paytype:"",//支付方式Int是1支付宝2微信
        forminfo: [],
        //forminfo:[  //表单Array否有表单需先填写
        // colinnerid:"",//内部IDString是  
        //colname:"",//列名String是  
        //colvalue:"",//列值String是
        // ],
      },
    },
    /** 59102 查询支付结果 ↓ **/
    queryOrderPayResult: {
      url: 'pay/queryOrderPayResult',
      auth: true,
      method: 'POST',
      command: "59102",
      data: {
        // orderno:"",//业务订单号String是
      },
    },
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
    wxOpenPlatformLogin: {
      url: 'user/login_hawk',
      auth: false,
      method: 'POST',
      // desc: 'app登录微信',
    }
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
};
