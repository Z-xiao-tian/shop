<template>
	<div>
		<div class="home_main_left float_left">
			<business-card class="business_card" :userInfo="userInfo" />
			<table-for-show :tableData="tableData" />
		</div>
		<div class="home_main_right float_left">
			<div class="order_info_box">
				<order-info
					v-for="item in orderInfo"
					:key="item.id"
					:title="item.title"
					:number="item.number"
					:imgSrc="item.imgSrc"
					:bc="item.bc"
				/>
			</div>
			<my-echarts :option="lineChartOption" :width="lineChartSize.width" :height="lineChartSize.height" />
			<div class="tow_table_box">
				<my-echarts :option="HistogramOption" :width="HistogramSize.width" :height="HistogramSize.height" />
				<my-echarts :option="pieChartOption" :width="pieChartSize.width" :height="pieChartSize.height" />
			</div>
		</div>
	</div>
</template>
<script>
	import BusinessCard from "./BusinessCard.vue";
	import OrderInfo from "./OrderInfo.vue";
	import TableForShow from "./TableForShow.vue";
	import MyEcharts from "./MyEcharts.vue";

	export default {
		name: "HomeMain",
		components: {
			BusinessCard,
			OrderInfo,
			TableForShow,
			MyEcharts,
		},
		data() {
			return {
				//名片数据
				userInfo: {
					username: "Admin",
					permissions: "超级管理员",
					lastLoginTime: "2021-7-10",
					lastLoginAddress: "武汉",
				},
				// 小方格数据
				orderInfo: [
					{
						number: 1235,
						title: "今日支付订单",
						imgSrc: "el-icon-success",
						bc: "#2ec7c9",
					},
					{
						number: 1235,
						title: "今日收藏订单",
						imgSrc: "el-icon-star-on",
						bc: "#ffb980",
					},
					{
						number: 1235,
						title: "今日未支付订单",
						imgSrc: "el-icon-s-goods",
						bc: "#5ab1ef",
					},
					{
						number: 1235,
						title: "本月支付订单",
						imgSrc: "el-icon-success",
						bc: "#2ec7c9",
					},
					{
						number: 1235,
						title: "本月收藏订单",
						imgSrc: "el-icon-star-on",
						bc: "#ffb980",
					},
					{
						number: 1235,
						title: "本月未支付订单",
						imgSrc: "el-icon-s-goods",
						bc: "#5ab1ef",
					},
				],
				//表格数据
				tableData: [
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
					{
						brand: "oppo",
						buyToday: 500,
						buyMouth: 3500,
						generalLedger: 22000,
					},
				],
				//折线图尺寸
				lineChartSize: {
					width: "100%",
					height: "400px",
				},
				//折线图数据配置
				lineChartOption: {
					tooltip: {
						trigger: "axis",
					},
					legend: {
						data: ["苹果", "vivo", "oppo", "魅族", "三星", "小米"],
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true,
					},
					toolbox: {
						feature: {
							saveAsImage: false,
						},
					},
					xAxis: {
						type: "category",
						boundaryGap: false,
						data: ["20191001", "", "20191003", "", "20191005", "", "20191007"],
					},
					yAxis: {
						type: "value",
					},
					series: [
						{
							name: "苹果",
							type: "line",
							// color: "#000000",
							data: [1000, 8000, 6000, 2100, 4200, 230, 6100],
						},
						{
							name: "vivo",
							type: "line",
							data: [2900, 1000, 2000, 4000, 6200, 3400, 4600],
						},
						{
							name: "oppo",
							type: "line",
							data: [4000, 1000, 7900, 5804, 5900, 5850, 1900],
						},
						{
							name: "魅族",
							type: "line",
							data: [4100, 7999, 7000, 4000, 5000, 1800, 320],
						},
						{
							name: "三星",
							type: "line",
							data: [6100, 5900, 1300, 3700, 1290, 2500, 4600],
						},
						{
							name: "小米",
							type: "line",
							data: [8000, 2000, 5000, 3500, 4290, 1330, 8000],
						},
					],
				},
				//柱状图尺寸
				HistogramSize: {
					width: "45%",
					height: "300px",
				},
				//柱状图数据配置
				HistogramOption: {
					legend: {},
					tooltip: {},
					color: ["#2ec7c9", "#b6a2de"],
					dataset: {
						source: [
							["product", "新增用户", "活跃用户"],
							["周一", 43.3, 85.8],
							["周二", 43.3, 85.8],
							["周三", 43.3, 85.8],
							["周四", 43.3, 85.8],
							["周五", 43.3, 85.8],
							["周六", 43.3, 85.8],
							["周日", 43.3, 85.8],
						],
					},
					xAxis: { type: "category" },
					yAxis: {},
					series: [{ type: "bar" }, { type: "bar" }],
				},
				//饼状图尺寸
				pieChartSize: {
					width: "45%",
					height: "300px",
				},
				//饼状图数据配置
				pieChartOption: {
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)",
					},
					legend: {
						bottom: 10,
						left: "center",
						data: ["三星", "小米", "魅族", "魅族", "oppo", "vivo"],
					},
					series: [
						{
							type: "pie",
							radius: "65%",
							center: ["50%", "50%"],
							selectedMode: "single",
							color: ["#39c362", "#0f78f4", "#dd536b", "#9462e5", "#a6a6a6", "#e1bb22"],
							data: [
								{ value: 735, name: "三星" },
								{ value: 510, name: "小米" },
								{ value: 434, name: "魅族" },
								{ value: 335, name: "oppo" },
								{ value: 335, name: "vivo" },
								{ value: 335, name: "苹果" },
							],
						},
					],
				},
			};
		},

		computed: {},
	};
</script>
<style scoped>
	.float_left {
		float: left;
	}
	.float_right {
		float: right;
	}
	.home_main_left {
		width: 28%;
	}
	.home_main_right {
		width: 70%;
	}
	.order_info_box {
		height: 270px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: baseline;
		flex-wrap: wrap;
		align-content: space-between;
		overflow: hidden;
	}
	.tow_table_box {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
