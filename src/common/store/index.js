import Vue from 'vue';
import Vuex from 'vuex';

import init from './modules/init.js';
import user from './modules/user.js';
import theme from './modules/theme.js';

Vue.use(Vuex);

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['token'];

// 保存变量到本地存储中
const saveStorage = function (key, value) {
	// 判断变量名是否在需要存储的数组中
	if (saveStateKeys.indexOf(key) != -1) {
		uni.setStorageSync(key, value);
	}
};
// 获取本地存储中的变量
const getStorage = function (key) {
	// 判断变量名是否在需要存储的数组中
	if (saveStateKeys.indexOf(key) != -1) {
		return uni.getStorageSync(key);
	}
};
const store = new Vuex.Store({
	modules: {
		init,
		user,
		theme,
	},
	mutations: {
		_commitAll(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if (len >= 2) {
				let obj = state[nameArr[0]];
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[len - 1];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveStorage(saveKey, payload.value);
		},
	},
});

export default store;
