import { mapState } from 'vuex';
import config from '@/common/config.json';

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let $storeKey = config.store.$storeKey;

module.exports = {
	beforeCreate() {
		// 将vuex方法挂在到$uct中
		// 使用方法为：如果要获取vuex的state中的user变量 => this.$store.state.user
		// 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => this.$uct.vuex('user.name', '史诗')
		// 如果要修改vuex的state的version变量为1.0.1 => this.$uct.vuex('version', '1.0.1')
		this.$uct.vuex = (name, value) => {
			this.$store.commit('_commitAll', {
				name,
				value,
			});
		};
	},
	computed: {
		// 将vuex的state中的所有变量，解构到全局混入的mixin中
		...mapState($storeKey),
	},
};
