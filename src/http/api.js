import instance from "./request";

/**
 * @name 登录
 * @param {Object} obj - 传入包含要验证的用户名和密码的对象
 * @returns Promise
 */
function login(obj) {
	return instance({
		url: "/login",
		method: "post",
		data: obj,
	})
		.then(response => {
			return response;
		})
		.catch(err => {
			return err;
		});
}

/**
 * @name 获取菜单权限列表
 * @return Promise - data
 */
function getMenus() {
	return instance
		.get("/menus")
		.then(response => {
			return response;
		})
		.catch(err => {
			return err;
		});
}

export default {
	login,
	getMenus
};
