export default function uniLogin() {
  return Promise((resolve, reject) => {
    uni.login({
      provider: "univerify",
      univerifyStyle: {
        // 自定义登录框样式
        backgroundColor: "#ffffff", // 授权页面背景颜色，默认值：#ffffff
        icon: {
          path: "/static/img/icon/logo.png", // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
        },
        phoneNum: {
          color: "#000000", // 手机号文字颜色 默认值：#000000
          fontSize: "18", // 手机号字体大小 默认值：18
        },
        slogan: {
          color: "#8a8b90", //  slogan 字体颜色 默认值：#8a8b90
          fontSize: "12", // slogan 字体大小 默认值：12
        },
        authButton: {
          normalColor: "#3479f5", // 授权按钮正常状态背景颜色 默认值：#3479f5
          highlightColor: "#2861c5", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
          disabledColor: "#73aaf5", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
          textColor: "#ffffff", // 授权按钮文字颜色 默认值：#ffffff
          title: "本机号码一键登录ok", // 授权按钮文案 默认值：“本机号码一键登录”
        },
        otherLoginButton: {
          visible: "true", // 是否显示其他登录按钮，默认值：true
          normalColor: "#f8f8f8", // 其他登录按钮正常状态背景颜色 默认值：#f8f8f8
          highlightColor: "#dedede", // 其他登录按钮按下状态背景颜色 默认值：#dedede
          textColor: "#000000", // 其他登录按钮文字颜色 默认值：#000000
          title: "我用登录方式", // 其他登录方式按钮文字 默认值：“其他登录方式”
          borderWidth: "1px", // 边框宽度 默认值：1px（仅ios支持）
          borderColor: "#c5c5c5", //边框颜色 默认值： #c5c5c5（仅ios支持）
        },
        privacyTerms: {
          defaultCheckBoxState: "true", // 条款勾选框初始状态 默认值： true
          textColor: "#8a8b90", // 文字颜色 默认值：#8a8b90
          termsColor: "#1d4788", //  协议文字颜色 默认值： #1d4788
          prefix: "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”
          suffix: "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”
          fontSize: "12", // 字体大小 默认值：12,
          privacyItems: [
            // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
            {
              url: "", // 点击跳转的协议详情页面
              title: "用户服务协议", // 协议名称
            },
            {
              url: "", // 点击跳转的协议详情页面
              title: "隐私政策", // 协议名称
            },
          ],
        },
      },
      success(res) {
        // 登录成功
        resolve(res);
      },
      fail(res) {
        // 登录失败
        reject(res);
        uni.closeAuthView(); //关闭一键登录弹出窗口
      },
      complete: () => {
        uni.closeAuthView();
      },
    });
  });
}
