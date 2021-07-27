import config from '@/common/config.json';
// .env.js 文件
// 不同环境访问不同的路径
const ENV_API_URL = {
	development: config.env.development, //开发环境
	production: config.env.production, //生产环境
};

const API_URL = ENV_API_URL[process.env.NODE_ENV || 'development']; //后台接口域名
export default { API_URL };
