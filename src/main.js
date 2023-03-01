import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router/router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import ECharts from "vue-echarts";
import "echarts";

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.component("ECharts", ECharts);

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router,
}).$mount("#app");
