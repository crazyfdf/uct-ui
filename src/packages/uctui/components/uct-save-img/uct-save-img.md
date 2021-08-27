<!--
 * @Author: your name
 * @Date: 2021-04-13 16:05:26
 * @LastEditTime: 2021-04-20 14:20:25
 * @LastEditors: 祸灵
 * @Description: In User Settings Edit
 * @FilePath: \UC-font\components\uct\components\uct-button\uct-button.md
-->
##  Navbar导航使用方法
``` vue
<uct-save-img
  ref="saveImg"
  url="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3566088443,3713209594&fm=26&gp=0.jpg"
></uct-save-img>
```

```js
export default {
  mounted() {
    this.$refs.saveImg.showImg();
  },
};

```