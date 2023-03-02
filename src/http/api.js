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

/**
 * @name 获取用户列表
 * @param {String} query - 查询参数(可以为空)
 * @param {Number} pageSzie - 每页显示条数
 * @param {Number} pageNum - 当前第几页
 */
async function getUserList(query,pageSzie, pageNum) {
	return await instance
		.get("/users", {
			params: {
				query: query,
				pagesize: pageSzie,
				pagenum: pageNum,
			},
		})
		.then(response => {
			return response;
		})
		.catch(err => {
			return err;
		});
}

/**
 * @name 添加用户
 * @param {obj} - 包含要添加的用户名、密码、邮箱、手机号等字段
 * @return 返回是否添加成功的信息
 */
function addUser(obj) {
	return instance
		.post("/users", obj)
		.then(response => {
			return response;
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

/**
 * @name 修改用户
 * @param {NuMber} id - 要修改用户的id
 * @param {String} email - 修改的email
 * @param {String} mobile - 修改的mobile
 * @returns 返回是否修改成功的消息
 */
function resviceUser(id, email, mobile) {
	return instance
		.put("/users/" + id, { email, mobile })
		.then(response => {
			return response;
		})
		.catch(err => {
			return err;
		});
}

/**
 * @name 删除用户
 * @param {Number} id - 要删除的的用户的id 
 * @returns 返回是否删除成功
 */
function deleteUser(id) {
	return instance
		.delete("/users/" + id)
		.then(response => {
			return response;
		})
		.catch(err => {
			return err;
		});
}

export default {
	login,
	getMenus,
	getUserList,
	addUser,
	resviceUser,
	deleteUser
};
