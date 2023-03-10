import VueRouter from "vue-router";
import { Message } from "element-ui";
//引入页面级组件
import Page from "@/views/Page";
import Login from "@/views/LoginPage/Login";
import Home from "@/views/HomePage/Home";
import Users from "@/views/UserPage/Users";
import Roles from "@/views/RolePage/Roles";
import Params from "@/views/ParamsPage/Params";
import Goods from "@/views/GoodsPage/Goods";
import Orders from "@/views/OrdersPage/Orders";
import Rights from "@/views/RightPage/Rights";
import Reports from "@/views/ReportsPage/Reports";
import Categories from "@/views/CategoriesPage/Categories";
import AddGood from "@/views/GoodsPage/AddGoodPage/AddGood.vue";


//创建路由规则
const routes = [
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/",
		component: Page,
		redirect: "/home",
		children: [
			{
				path: "/home",
				component: Home,
				meta: {
					isAuth: true,
					title: "首页",
				},
			},
			{
				path: "/users",
				component: Users,
				meta: {
					isAuth: true,
					title: "用户列表",
				},
			},
			{
				path: "/roles",
				component: Roles,
				meta: {
					isAuth: true,
					title: "角色列表",
				},
			},
			{
				path: "/rights",
				component: Rights,
				meta: {
					isAuth: true,
					title: "权限列表",
				},
			},
			{
				path: "/goods",
				component: Goods,
				meta: {
					isAuth: true,
					title: "商品分类",
				},
			},
			{
				path:'/goods/add',
				component:AddGood,
				meta:{
					isAuth:true,
					title:'添加商品'
				}
			},
			{
				path: "/params",
				component: Params,
				meta: {
					isAuth: true,
					title: "分类参数",
				},
			},
			{
				path: "/categories",
				component: Categories,
				meta: {
					isAuth: true,
					title: "商品分类",
				},
			},
			{
				path: "/orders",
				component: Orders,
				meta: {
					isAuth: true,
					title: "订单列表",
				},
			},
			{
				path: "/reports",
				component: Reports,
				meta: {
					isAuth: true,
					title: "数据报表",
				},
			},
		],
	},
];

//创建路由实例
const router = new VueRouter({
	routes,
});
//路由前置守卫,进入除登录页面外的其他页面时查询是否登录,如果没有就重定向到登录页
router.beforeEach((to, from, next) => {
	if (to.fullPath != "/login") {
		const token = localStorage.getItem("Token");
		token ? next() : Message("请先登录") && next("/login");
	} else if (to.fullPath === "/login") {
		next();
	}
});

export default router;
