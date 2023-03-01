<template>
	<div id="login">
		<div class="box">
			<!-- 头像 -->
			<div class="header">
				<el-avatar
					class="uesr_head_pic"
					:size="userHeadPicture.size"
					:src="userHeadPicture.url"
					:fit="userHeadPicture.fit"
					@error="errorHandler"
				>
					<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
				</el-avatar>
			</div>
			<!-- 登录表单 -->
			<el-form class="login_form" label-position="right" :model="loginForm" :rules="rules" ref="loginFrom">
				<!-- 用户名 -->
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password></el-input>
				</el-form-item>
				<!-- 按钮区域 -->
				<el-form-item class="btn_item">
					<el-button type="primary" @click="submitForm('loginFrom')">登录</el-button>
					<el-button type="info" @click="resetForm('loginFrom')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import headAvatar from "@/assets/images/Head_picture.png";
	import api from "@/http/api";

	export default {
		name: "Login",
		data() {
			return {
				loginForm: {
					username: "",
					password: "",
				},
				userHeadPicture: {
					size: 180,
					url: headAvatar,
					fit: "fill",
				},
				rules: {
					username: [{ required: true, message: "用户名不能为空！", trigger: "blur" }],
					password: [{ required: true, message: "密码不能为空！", trigger: "blur" }],
				},
			};
		},
		methods: {
			//头像图片加载失败
			errorHandler() {
				return true;
			},
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (!valid) return;
					api.login(this.loginForm).then(response => {
						// console.log(response);
						if (response.meta.status === 200) {
							this.$message({
								message: "登录成功",
								type: "success",
								showClose:true,
							});
							localStorage.setItem("Token", response.data.token);
							this.$router.push("/");
						}
					});
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		},
	};
</script>
<style scoped>
	#login {
		width: 100%;
		height: 100%;
		background: #264a6b;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box {
		width: 600px;
		height: 350px;
		border-radius: 10px;
		background: #ffffff;
		padding: 130px 20px 10px 20px;
		box-sizing: border-box;
		position: relative;
	}
	.header {
		width: 180px;
		height: 180px;
		border-radius: 50%;
		background: gray;
		position: absolute;
		top: -90px;
		left: 0;
		right: 0;
		margin: auto;
	}
	.header img {
		width: 100%;
		height: 100%;
	}
	.login_form :first-child,
	.login_form :nth-child(2) {
		margin-bottom: 10px;
	}
	.btn_item {
		text-align: right;
	}
</style>
