<template>
	<div id="page_header">
		<div class="logo">
			<img src="../assets/images/logo.png" alt="">
		</div>
		<el-button type="info" @click="quit">退出</el-button>
	</div>
</template>
<script>
	export default {
		name: "PageHeader",
		methods:{
			//退出登录 - 清除Token返回到登录页面
			quit(){
				localStorage.removeItem('Token');
				this.$router.push('/login');
			}
		}
	};
</script>
<style scoped>
	#page_header {
		width: 100%;
		height: 100%;
		background: rgb(54, 61, 64);
		padding: 0 20px 0 20px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.logo{
		height: 60px;
		width: 300px;
	}
	img{
		width: 100%;
		height: 100%;
	}
</style>
