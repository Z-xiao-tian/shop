<template>
	<el-container id="order">
		<!-- 修改地址dialog -->
		<el-dialog title="修改地址" :visible.sync="editOrderDialogStatus">
			<el-form :model="editOrderFrom" label-width="auto" label-position="left">
				<el-form-item label="省/市/区/县">
					<el-cascader
						:options="cityOptions"
						:value="editOrderFrom.city"
						@change="changeProvince"
						change-on-select
					></el-cascader>
				</el-form-item>
				<el-form-item label="详细地址">
					<el-input v-model="editOrderFrom.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editOrderDialogStatus = false">取 消</el-button>
				<el-button type="primary" @click="editOrder">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="物流信息" :visible.sync="showAddressDialogStatus">
			<el-timeline :reverse="false">
				<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.ftime">
					{{ activity.context }}
				</el-timeline-item>
			</el-timeline>
		</el-dialog>
		<el-header>
			<!-- 搜索 -->
			<el-input placeholder="请输入内容" v-model="reqData.query" class="search">
				<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
			</el-input>
		</el-header>
		<el-main>
			<!-- 数据展示 -->
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column type="index"></el-table-column>
				<el-table-column prop="order_number" label="订单编号"></el-table-column>
				<el-table-column prop="order_price" label="订单价格"></el-table-column>
				<el-table-column prop="pay_status" label="是否付款">
					<template slot-scope="props">
						<el-tag :type="props.row.pay_status === 1 ? 'success' : 'danger'">
							{{ props.row.pay_status === 1 ? "已付款" : "未付款" }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="is_send" label="是否发货"></el-table-column>
				<el-table-column label="下单时间">
					<template slot-scope="props">
						{{ props.row.create_time | dateFormat }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="props">
						<!-- 修改地址 -->
						<el-button
							type="primary"
							icon="el-icon-edit"
							size="small"
							@click="openEditOrderDialog(props.row)"
						></el-button>
						<!-- 显示物流信息 -->
						<el-button
							type="success"
							icon="el-icon-location"
							size="small"
							@click="openShowAddressDialog(props.row)"
						></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer>
			<!-- 分页 -->
			<div class="block">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:page-sizes="[5, 10, 20, 30, 50]"
					:current-page="reqData.pagenum"
					:page-size="reqData.pagesize"
					:total="total"
					layout="total, sizes, prev, pager, next, jumper"
				></el-pagination>
			</div>
		</el-footer>
	</el-container>
</template>
<script>
	import instance from "@/http/request";
	import cityOptions from "./provinces.js";

	export default {
		name: "Orders",
		data() {
			return {
				showAddressDialogStatus: false,
				cityOptions: cityOptions,
				editOrderDialogStatus: false,
				editOrderFrom: {
					address: "",
					city: [],
				},
				tableData: null,
				total: 0,
				//请求参数
				reqData: {
					query: "",
					pagenum: 1,
					pagesize: 10,
				},
				//
				activities: [
					{
						time: "2018-05-10 09:39:00",
						ftime: "2018-05-10 09:39:00",
						context: "已签收,感谢使用顺丰,期待再次为您服务",
						location: "",
					},
					{
						time: "2018-05-10 08:23:00",
						ftime: "2018-05-10 08:23:00",
						context: "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
						location: "",
					},
					{
						time: "2018-05-10 07:32:00",
						ftime: "2018-05-10 07:32:00",
						context: "快件到达 [北京海淀育新小区营业点]",
						location: "",
					},
					{
						time: "2018-05-10 02:03:00",
						ftime: "2018-05-10 02:03:00",
						context: "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
						location: "",
					},
					{
						time: "2018-05-09 23:05:00",
						ftime: "2018-05-09 23:05:00",
						context: "快件到达 [北京顺义集散中心]",
						location: "",
					},
					{
						time: "2018-05-09 21:21:00",
						ftime: "2018-05-09 21:21:00",
						context: "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
						location: "",
					},
					{
						time: "2018-05-09 13:07:00",
						ftime: "2018-05-09 13:07:00",
						context: "顺丰速运 已收取快件",
						location: "",
					},
					{
						time: "2018-05-09 12:25:03",
						ftime: "2018-05-09 12:25:03",
						context: "卖家发货",
						location: "",
					},
					{
						time: "2018-05-09 12:22:24",
						ftime: "2018-05-09 12:22:24",
						context: "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
						location: "",
					},
					{
						time: "2018-05-08 21:36:04",
						ftime: "2018-05-08 21:36:04",
						context: "商品已经下单",
						location: "",
					},
				],
			};
		},
		filters: {
			//时间戳格式化过滤器
			dateFormat(timestamp) {
				if (timestamp) {
					let date = new Date(timestamp * 1000);
					let year = date.getFullYear();
					let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
					let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
					let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
					let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
					let second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
					return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
				} else {
					return "";
				}
			},
		},
		methods: {
			async openShowAddressDialog(order) {
				// const {data,meta} = await instance.get(`/kuaidi/${1106975712662}`);
				// if(meta.status!==200) return this.$message.error('出错啦')
				// console.log(data,meta)
				this.showAddressDialogStatus = true;
			},
			changeProvince() {},
			editOrder() {
				console.log(this.editOrderFrom);
				this.editOrderDialogStatus = false;
			},
			openEditOrderDialog(order) {
				console.log(order);
				this.editOrderDialogStatus = true;
			},
			/** 搜索事件 */
			search() {
				this.getOrders();
			},
			/**每页多少条切换 */
			handleSizeChange(val) {
				this.pageSize = val;
				(this.pageNum = 1), this.getOrders();
			},
			/**页数切换 */
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getOrders();
			},
			/**获取订单数据列表 */
			async getOrders() {
				const { data, meta } = await instance.get("/orders", {
					params: this.reqData,
				});
				if (meta.status !== 200) return this.$message.error(meta.msg);
				this.tableData = data.goods;
				this.total = data.total;
			},
		},
		created() {
			this.getOrders();
		},
	};
</script>
<style scoped>
	#order {
		background: white;
		border-radius: 10px;
		padding-top: 20px;
	}
	.search {
		width: 400px;
	}
</style>
