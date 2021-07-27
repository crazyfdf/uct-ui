import config from '@/common/config.json';
// uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */

export default {
	toast: config.toast,
	noNetwork: config.noNetwork,
	// popup包含popup，actionsheet，keyboard，picker的值
	popup: config.popup,
	mask: config.mask,
	navbar: config.navbar,
	topTips: config.topTips,
	sticky: config.sticky,
	indexListSticky: config.indexListSticky,
};
