<template>
	<el-container id="page">
		<el-header class="page_header">
			<page-header />
		</el-header>
		<el-container class="container">
			<el-aside class="menu">
				<page-menu />
			</el-aside>
			<el-main>
				<el-container>
					<el-header class="container_header">
						<breadcrumb/>
					</el-header>
					<el-main><router-view></router-view></el-main>
				</el-container>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
	import PageHeader from "@/components/PageHeader.vue";
	import PageMenu from "@/components/PageMenu.vue";
	import Breadcrumb from "@/components/Breadcrumb.vue";

	export default {
		name: "Page",
		components: { PageHeader, PageMenu, Breadcrumb },
	};
</script>
<style scoped>
	#page {
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
	::-webkit-scrollbar {
		width: 0px;
		background-color: #ffffff;
	}
	.page_header {
		padding: 0;
		height: 60px;
	}
	.menu {
		width: auto !important;
		height: 100%;
		background: #313743;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.container {
		overflow-x: hidden;
		overflow-y: auto;
		height: calc(100%-60px);
		background: #e9edf1;
	}
	.container_header {
		height: 40px !important;
	}
</style>
