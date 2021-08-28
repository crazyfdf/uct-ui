//vue.config.js
const TransformPages = require('uni-read-pages');
const { webpack } = new TransformPages();
const path = require('path');
function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'aliasPath', 'name', 'meta', 'title'], //需要获取包涵的字段
					});
					return JSON.stringify(tfPages.routes);
				}, true),
			}),
		],
		devServer: {
			port: 8080,
			compress: true,
		},
		resolve: {
			alias: {
				'@': resolve('src'),
			},
		},
	},
};
