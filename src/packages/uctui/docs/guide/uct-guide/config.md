# 配置
>**uct ui 所有的需要配置的几乎都在common文件夹下**
## 项目结构
```
uct-ui
├── common // 配置文件
│ ├── config
│ │ ├── config.js // js配置主题色，Navbar高度
│ │ ├── env.js // API根路径
│ │ ├── map // 腾讯地图sdk
│ │ └── zIndex.js // 组件层级配置
│ ├── mixins
│ │ ├── share.mixin.js // 分享混入
│ │ └── store.mixin.js // computed全局state混入
│ ├── request
│ │ ├── api.js // 接口地址
│ │ ├── index.js // 请求响应拦截器
│ │ └── request.js // 封装好的uni.request方法
│ ├── router.js // 路由配置
│ ├── scss
│ │ ├── app.scss // 全局样式
│ │ ├── theme.scss // 全部组件的样式变量(每个组件都会导入)
│ │ ├── uct-theme.scss // uct的样式变量
│ │ └── uView-theme.scss // uView的样式变量
│ └── store
│ ├── index.js // vuex全局状态管理
│ └── modules // vuex的modules
├── components
│ └── uct // uct插件-基于uView上的业务框架
│ ├── docs // uct文档
│ ├── components // uct组件
│ ├── templates // uct模板
│ ├── tools // uct工具
│ ├── static // uct静态文件
│ ├── index.js // uct插件入口
│ ├── index.scss // uct公共样式
│ └── package.json // uct依赖的插件
├── hybrid
│ └── html // 文件上传插件，插件地址：https://ext.dcloud.net.cn/plugin?id=1015
├── json
│ ├── form.json // 表单数据
│ ├── list.json // 列表数据
│ └── template.json // 模板数据
├── pages
│ ├── index // 一级页面组件
│ ├── index.vue // 首页
│ ├── components // uct组件使用实例
│ ├── templates // uct模板使用实例
│ └── tools // uct工具使用实例
├── static
│ ├── font // 项目字体文件
│ ├── imgs // 项目图片文件
│ └── style // 项目样式文件
├── App.vue // 项目启动界面入口
├── main.js // 项目启动js入口
├── manifest.json // uni-app配置
├── package.json // 项目依赖插件
├── pages.json // 页面路由
├── README.md // 项目文档
├── uni.scss /// 全部组件的样式变量(每个组件都会导入)
└── vue.config.js //项目配置
```






