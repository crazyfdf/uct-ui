##  Details使用方法
``` vue
<uct-details :loading="loading">
  <uct-nav slot="nav">
    <view slot="center"
          class="f16 f700">Details详情</view>
  </uct-nav>
  <view>
    Details内容
  </view>
</uct-details>
```

```js
export default {
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
```