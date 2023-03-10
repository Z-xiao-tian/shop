import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router/router";
import ECharts from "vue-echarts";
import "echarts";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.use(VueQuillEditor);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.component("ECharts", ECharts);

Vue.config.productionTip = false;


new Vue({
	render: h => h(App),
	router,
}).$mount("#app");
