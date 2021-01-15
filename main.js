import Vue from 'vue'
import App from './App'
import tools from '@/common/utils/tools'
import store from '@/common/store'
import api from '@/common/request/index'
import rules from '@/common/utils/rules'
import form from '@/common/request/formName'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import {
  API_URL
} from './env.js'

import { router, RouterMount } from '@/common/router'  //路径换成自己的
Vue.use(router)
Vue.component('mescroll-body', MescrollBody)

App.mpType = 'app'

Vue.prototype.$rules = rules;
Vue.prototype.$api = api;
Vue.prototype.$tools = tools;
Vue.prototype.$store = store;
Vue.prototype.$API_URL = API_URL;
Vue.prototype.$form = form;
Vue.prototype.$Bus = new Vue()

const app = new Vue({
  store,
  ...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif