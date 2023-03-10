import axios from "axios";
import { Loading, Message } from "element-ui";

const instance = axios.create({
	// baseURL: "https://www.liulongbin.top:8888/api/private/v1/",
	baseURL: "http://127.0.0.1:8888/api/private/v1/",
	timeout: 1000 * 10,
});

let loading;
//创建请求拦截器
instance.interceptors.request.use(
	config => {
		if (loading) loading.close();
		//开启loading动画
		loading = Loading.service({
			target: "#app",
			text: "加载中",
			spinner: "el-icon-loading",
			background: "rgba(0, 0, 0, 0.7)",
		});
		//获取token并设置到响应头中
		localStorage.getItem("Token") && (config.headers.Authorization = localStorage.getItem("Token"));
		return config;
	},
	err => {
		console.log("拦截请求失败", err);
		return Promise.reject(err);
	},
);

//创建响应拦截器
instance.interceptors.response.use(
	response => {
		//请求响应到达后关闭loading动画
		loading.close();
		if(response.data.meta.msg === '无效token'){
			Message.error('登录过期,请重新登录');
		}
		return response.data;
	},
	err => {
		loading.close();
		Message.error("网络出错啦！");
		console.log("响应拦截失败", err);
		return err;
	},
);

export default instance;
