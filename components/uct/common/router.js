import { RouterMount, createRouter } from 'uni-simple-router';

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routerErrorEach: (error, router) => {
    if (error.type === 3)
    {
      router.$lockStatus = false;
    }
  },
  routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
  // 有两个判断条件,一个是token,还有一个路由元信息
  let userInfo = uni.getStorageSync('userInfo');
  // 权限控制
  next()
})
// 全局路由后置守卫
router.afterEach((to, from) => { })
export {
  router,
  RouterMount
}
