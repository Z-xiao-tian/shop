import instance from "./request";

function login(obj) {
	return instance({
		url: "/login",
		method: "post",
		data: obj
	})
		.then(response => {
			return response;
		})
		.catch(err => {
			return err;
		});
}


export default {
    login
}