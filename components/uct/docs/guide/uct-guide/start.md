# 快速上手
## 如何使用
pages.json：

根据easycom模式，将uct组件加载到pages.json,由于uct内部引入了
```pages.json
"easycom": {
    "autoscan": true,
    "custom": {
      "^u-(.*)": "uview-ui/components/u-$1/u-$1.vue", // 匹配node_modules内的vue文件
      "^uct-(.*)": "@/components/uct/components/uct-$1/uct-$1.vue" // 匹配components目录内的vue文件
    }
  },
```
main.js:
将uct的工具加载到项目
```main.js
import uct from '@/components/uct'
Vue.use(uct);
```
App.vue:导入公共样式
```
<style lang="scss">
@import "@/common/scss/app.scss";
</style>
```

uni.scss:导入全局样式变量
```
// uni.scss
@import '@/common/scss/theme.scss';
```




