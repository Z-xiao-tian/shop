<template>
	<div id="menu">
		<div><i class="el-icon-s-unfold menu_btn" @click="changeMenu"></i></div>
		<el-menu
			:default-active="defaultActive"
			class="el-menu-vertical-demo menu"
			background-color="#313743"
			text-color="#fff"
			active-text-color="#367bec"
			@open="handleOpen"
			@close="handleClose"
			:collapse="isCollapse"
			router
		>
			<el-submenu :index="item.order.toString()" v-for="item in menus" :key="item.id">
				<template slot="title">
					<i :class="iconObj[item.id]"></i>
					<span>{{ item.authName }}</span>
				</template>
				<el-menu-item-group>
					<el-menu-item
						:index="childrenItem.id.toString()"
						v-for="childrenItem in item.children"
						:key="childrenItem.id"
						:route="'/' + childrenItem.path"
						@click="menuActiveStatusFun(childrenItem.id)"
					>
						<i class="el-icon-menu"></i>
						<span>{{ childrenItem.authName }}</span>
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>
<script>
	import api from "@/http/api";

	export default {
		name: "PageMenu",
		data() {
			return {
				defaultActive: sessionStorage.getItem("menuActiveStatus"),
				isCollapse: false,
				iconObj: {
					124: "el-icon-s-custom",
					125: "el-icon-user",
					103: "el-icon-key",
					101: "el-icon-box",
					102: "el-icon-notebook-1",
					145: "el-icon-data-analysis",
				},
				menus: [
					{
						id: 124,
						authName: "首页",
						path: "home",
						order: 0,
						children: [
							{
								id: 109,
								authName: "首页",
								path: "home",
								children: [],
								order: null,
							},
						],
					},
				],
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				// console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				// console.log(key, keyPath);
			},
			menuActiveStatusFun(index) {
				sessionStorage.setItem("menuActiveStatus", index);
			},
			changeMenu() {
				this.isCollapse === true ? (this.isCollapse = false) : (this.isCollapse = true);
			},
			async getMenuList() {
				let data = await api.getMenus().then(response => response.data);
				this.menus = [...this.menus, ...data];
			},
		},
		created() {
			this.getMenuList();
		},
	};
</script>
<style scoped>
	#menu {
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
	.menu {
		border: none;
	}
	.menu_btn {
		width: 100%;
		height: 40px;
		background: #4a5064;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
	}
</style>
