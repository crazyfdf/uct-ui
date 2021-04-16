<!--
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-13 16:08:09
 * @LastEditTime: 2021-04-15 17:51:08
 * @Description: 
-->
##  Form使用方法

**注意**：formData表单数据是通过表单设计器 k-form-design拿到的。推荐使用k-form-design快速部署您的表单页面。使用地址：http://cdn.kcz66.com/k-form-design.html

``` vue
<uct-form class="px40"
              :formData="formData"
              :url="url"
              @submit="submit"></uct-form>
```

```js
export default {
  data() {
    return {
      formData: require("@/config/form.json"),//表单数据
      
      url: "system/uploadPartnerByProject",//表单提交地址
    };
  },
  methods: {
    // 成功回调
    submit(data) {
      setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        });
      }, 1000);
    },
  },
};
```
