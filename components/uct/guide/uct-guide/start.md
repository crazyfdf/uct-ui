# 快速上手
## 如何使用
pages.json：

根据easycom模式，将uct组件加载到pages.json
```pages.json
"easycom": {
    "autoscan": true,
    "custom": {
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