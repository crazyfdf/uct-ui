// 此版本发布于2021-04-21
let version = '0.0.1';
let systemInfo = uni.getSystemInfoSync();

function navHeight() {
	// #ifdef APP-PLUS || H5
	return 44;
	// #endif
	// #ifdef MP
	// 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
	// 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
	// return menuButtonInfo.height + (menuButtonInfo.top - options.statusBarHeight) * 2;//导航高度
	return systemInfo.platform == 'ios' ? 44 : 48;
	// #endif
}
function statusBarHeight() {
	// #ifdef H5
	// return 20
	// #endif
	// #ifndef H5
	// #endif
	return systemInfo.statusBarHeight;
}

// 一鍵登录样式配置
const univerifyStyle = null;

export default {
	version: version,
	// 主题名称
	type: ['primary', 'success', 'info', 'error', 'warning'],
	navHeight: navHeight(),
	statusBarHeight: statusBarHeight(),
	systemInfo,
	univerifyStyle, //一鍵登录样式配置
};
