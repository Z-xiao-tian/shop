<template>
	<div id="business_card">
		<div class="header_box">
			<el-avatar
				class="uesr_head_pic"
				:size="userHeadPicture.size"
				:src="userHeadPicture.url"
				:fit="userHeadPicture.fit"
				@error="errorHandler"
			></el-avatar>
			<div>
				<h1>{{ userInfo.username }}</h1>
				<h3>{{ userInfo.permissions }}</h3>
			</div>
		</div>
		<div class="info_text">
			<div class="text_box">
				<span>上次登录时间：</span>
				<span>{{ userInfo.lastLoginTime }}</span>
			</div>
			<div class="text_box">
				<span>上次登录地点：</span>
				<span>{{ userInfo.lastLoginAddress }}</span>
			</div>
		</div>
	</div>
</template>
<script>
	import url from "@/assets/images/Head_picture.png";

	export default {
		name: "BusinessCard",
		props: {
			userInfo: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {
				userHeadPicture: {
					size: 150,
					url: url,
					fit: "fill",
					alt: "",
				},
			};
		},
		methods: {
			//头像图片加载失败
			errorHandler() {
				return true;
			},
		},
	};
</script>
<style scoped>
	#business_card {
		width: 360px;
		height: 310px;
		background: white;
		padding: 10px;
		box-sizing: border-box;
	}
	.header_box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		padding-bottom: 30px;
		border-bottom: 1px solid rgb(202, 202, 202);
	}
	.info_text {
		height: 30%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.text_box {
		padding-top: 20px;
		box-sizing: border-box;
	}
	.text_box > span:nth-child(1) {
		float: right;
	}
	.text_box > span:nth-child(1) {
		float: left;
	}
</style>
