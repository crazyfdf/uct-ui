

## UCT UI

### 多平台快速开发的UI框架

## 说明

UCT UI，是[uni-app](https://uniapp.dcloud.io/)生态优秀的UI框架，全面的组件和便捷的工具会让您信手拈来，如鱼得水

## 特性

*   兼容安卓，iOS，微信小程序
*   30+精选组件，功能丰富，多端兼容，让您快速集成，开箱即用
*   众多贴心的JS利器，让您飞镖在手，召之即来，百步穿杨
*   众多的常用页面和布局，让您专注逻辑，事半功倍
*   详尽的文档支持，现代化的演示效果
*   按需引入，精简打包体积

## 预览
您可以通过**链接**直接打开，查看最佳的演示效果。  

也可以通过**微信**扫码，查看最佳的演示效果。  


##链接

*   [官方文档](https://uct-1257264070.cos-website.ap-guangzhou.myqcloud.com/)
*   [更新日志](https://uct-1257264070.cos-website.ap-guangzhou.myqcloud.com/guide/uct-guide/update-log.html)
*   [升级指南](https://uct-1257264070.cos-website.ap-guangzhou.myqcloud.com/guide/uct-guide/update-guide.html)



## 安装

#### [**下载地址**]()

## 快速上手

1.  `main.js`引入UCT库

~~~
// main.js
importuctfrom"@/components/uct";
Vue.use(uct);
~~~

2.  `App.vue`引入基础样式(注意style标签需声明scss属性支持)

~~~
/* App.vue */
<style lang="scss">
@import"@/components/uct/index.scss";
</style>
~~~

3.  `uni.scss`引入全局scss变量文件

~~~
/* uni.scss */
@import'@/components/uct/static/style/\_theme.scss';
~~~

4.  `pages.json`配置easycom规则(按需引入)

~~~
// pages.json
{
    "easycom": {
        "autoscan": true,
        "custom": {
          "^uct-(.*)": "@/components/uct/components/uct-$1/uct-$1.vue" // 匹配components目录内的vue文件
        }
      },
	// 此为本身已有的内容
	"pages": [
		// ......
	]
}
~~~

请通过[快速上手](https://uct-1257264070.cos-website.ap-guangzhou.myqcloud.com/guide/uct-guide/start.html)了解更详细的内容

## 使用方法

配置easycom规则后，自动按需引入，无需`import`组件，直接引用即可。

~~~
<template>
	<uct-button>按钮</u-button>
</template>
~~~

请通过[快速上手](https://uct-1257264070.cos-website.ap-guangzhou.myqcloud.com/guide/uct-guide/start.html)了解更详细的内容

## 版权信息

UCT UI遵循[MIT](https://en.wikipedia.org/wiki/MIT_License)开源协议，意味着您无需支付任何费用，也无需授权，即可将UCT UI应用到您的产品中。