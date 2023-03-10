<template>
	<el-container id="goods">
		<el-header>
			<el-input placeholder="请输入内容" v-model="searchQuery" class="input-with-select search">
				<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
			</el-input>
			<!-- 添加商品 -->
			<el-button type="primary" class="add_goods_btn" @click="$router.push('/goods/add')">添加商品</el-button>
		</el-header>
		<el-main>
			<el-table :data="goodsTableData" border style="width: 100%">
				<el-table-column type="index"></el-table-column>
				<el-table-column prop="goods_name" label="商品名称"></el-table-column>
				<el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
				<el-table-column prop="goods_weight" label="商品重量"></el-table-column>
				<el-table-column label="创建时间">
					<template slot-scope="props">
						{{ props.row.add_time | dateFormat }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="props">
						<el-button type="danger" @click="deleteGoods(props.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[5, 10, 50, 100]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</el-footer>
	</el-container>
</template>
<script>
	import instance from "@/http/request";

	export default {
		name: "Goods",
		data() {
			return {
				//总页数
				total: 0,
				//每页条目个数 - 默认每页十条
				pageSize: 10,
				//当前页数 - 默认打开为第一页
				currentPage: 1,
				//搜索关键词
				searchQuery: "",
				//表格数据
				goodsTableData: [],
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
			//删除功能
			async deleteGoods(good) {
				const { data, meta } = await instance.delete(`goods/${good.goods_id}`);
				if (meta.status !== 200) return this.$message.error(meta.msg);
				this.$message.success(meta.msg);
				this.getGoods();
			},
			//搜索功能
			search() {
				this.getGoods(this.searchQuery, 1000000, 1);
			},
			//页数切换
			handleSizeChange(val) {
				this.pageSize = val;
				this.getGoods(val);
				// console.log(`每页 ${val} 条`);
			},
			//每页条数切换
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getGoods(this.pageSize, val);
				// console.log(`当前页: ${val}`);
			},
			//获得商品列表
			async getGoods(query = this.searchQuery, pagesize = this.pageSize, pagenum = this.currentPage) {
				const { data, meta } = await instance.get("/goods", { params: { query, pagenum, pagesize } });
				if (meta.status !== 200) return this.$message.error(meta.msg);
				this.goodsTableData = data.goods;
				this.total = data.total;
				// console.log(data, meta);
			},
		},
		created() {
			this.getGoods();
		},
	};
</script>
<style scoped>
	#goods {
		background: white;
		border-radius: 10px;
		padding-top: 20px;
	}
	.search {
		width: 334px;
		height: 40px;
	}
	.add_goods_btn {
		margin-left: 20px;
	}
</style>
