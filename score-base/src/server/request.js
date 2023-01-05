//axios 二次封装
import axios from 'axios'
class HttpRequest {
	constructor() {
		this.baseUrl = process.env.VUE_APP_API_BASE_URL
		this.timeout = 30000;
	}
	seInterceptors(instance) {
		//请求拦截
		instance.interceptors.request.use(config => {
			config.headers.common["Accept"] = "application/json";
			config.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
			// 判断是否有token
			return config;
		}, error => {
			return Promise.reject(error.error)
		})
		//请求响应
		instance.interceptors.response.use(res => {
			//处理异常登录
			if (res.data.retcode === 10) {
				//清缓存
				sessionStorage.clear();
				localStorage.clear();
				//异常提示
				return Promise.reject(res.data)
			} else {
				return Promise.resolve(res.data);
			}
		}, err => {
			//超时拦截
			if (err && err.stack.indexOf('timeout') > -1) {
				err.response = "timeout";
				// 超时处理 ，超时页面+刷新

				//超时提示
				return Promise.reject(err.response);
			}
			//各种状态码，处理
			if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.response = '服务器出错'
						break;
					case 400:
						err.response = '服务器出错';
						break;
					default:
				}
			} else {
				err.response = "链接服务器失败";
			}
			return Promise.reject(err.response);
		})
	}
	mergeOptions(options) {
		return {
			baseUrl: this.baseUrl,
			timeout: this.timeout,
			...options
		}
	}
	request(options) {
		const instance = axios.create();
		this.seInterceptors(instance);
		const opts = this.mergeOptions(options);
		return instance(opts)
	}
	get(url, config = null) {
		return this.request({
			method: 'get',
			url:process.env.VUE_APP_API_BASE_URL+url,
			...config
		})
	}
	post(url, data = {}, config = null) {
		return this.request({
			method: 'post',
			url:process.env.VUE_APP_API_BASE_URL+url,
			data,
			...config
		})
	}
}
export default new HttpRequest