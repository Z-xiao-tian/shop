import VueRouter from "vue-router";
//引入页面级组件
import Page from "@/views/Page";
import Login from "@/views/LoginPage/Login";
import Home from "@/views/HomePage/Home"

//创建路由规则
const routes = [
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/",
		component: Page,
        children:[
            {
                path:'/home',
                component:Home
            }
        ]
	},
];

//创建路由实例
const router = new VueRouter({
    routes
})

export default router