<template>
	<el-container id="categories">
		<!-- 编辑分类dialog -->
		<el-dialog title="修改用户" :visible.sync="editDialogStatus">
			<el-form :model="editFrom" label-width="auto" label-position="left">
				<el-form-item label="分类名称">
					<el-input v-model="editFrom.goodName"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editDialogStatus = false">取 消</el-button>
				<el-button type="primary" @click="editGood">确 定</el-button>
			</div>
		</el-dialog>
		<!--  -->
		<!--  -->
		<!--  -->
		<el-header>
			<!-- 添加用户 -->
			<el-button type="primary" class="add_user_btn" @click="openAddDialog">添加分类</el-button>
			<el-dialog title="添加分类" :visible.sync="addDialogStatus">
				<el-form :model="addForm" label-width="auto" label-position="left">
					<el-form-item label="分类名称">
						<el-input v-model="addForm.categoryName"></el-input>
					</el-form-item>
					<el-form-item label="分类级别">
						<el-select v-model="addForm.categoryLevel" placeholder="请选择">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="父级分类">
						<el-cascader
							v-model="addForm.cascaderData"
							:options="region"
							:props="cascaderOption"
						></el-cascader>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="addDialogStatus = false">取 消</el-button>
					<el-button type="primary" @click="addCategory">确 定</el-button>
				</div>
			</el-dialog>
		</el-header>
		<el-main>
			<!-- 数据展示 -->
			<el-table
				:data="tableData"
				border
				style="width: 100%"
				row-key="cat_id"
				:tree-props="{ children: 'children' }"
			>
				<el-table-column type="index"></el-table-column>
				<el-table-column prop="cat_name" label="分类名称"></el-table-column>
				<el-table-column label="是否有效">
					<template slot-scope="props">
						<i
							:class="props.row.cat_deleted === false ? 'el-icon-success' : 'el-icon-error'"
							:style="'color:' + (props.row.cat_deleted === false ? 'green' : 'red') + ';'"
						></i>
					</template>
				</el-table-column>
				<el-table-column prop="mobile" label="排序">
					<template slot-scope="props">
						<el-tag
							size="mini"
							:type="props.row.cat_level > 1 ? 'warning' : props.row.cat_level < 1 ? '' : 'success'"
						>
							{{ props.row.cat_level > 1 ? "三" : props.row.cat_level < 1 ? "一" : "二" }}级
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="username" label="操作" width="200">
					<template slot-scope="props">
						<el-button type="primary" icon="el-icon-edit" size="small" @click="openEditDialog(props.row)">
							编辑
						</el-button>
						<el-button type="danger" icon="el-icon-delete" size="small" @click="deleteData(props.row)">
							删除
						</el-button>
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
					:current-page="pageNum"
					:page-size="pageSize"
					:page-sizes="[5, 10, 15, 30]"
					:total="total"
					layout="total, sizes, prev, pager, next, jumper"
				></el-pagination>
			</div>
		</el-footer>
	</el-container>
</template>
<script>
	import instance from "@/http/request";
	import _ from "lodash";

	export default {
		name: "Categories",
		data() {
			return {
				editDialogStatus: false,
				editFrom: {
					id: "",
					goodName: "",
				},
				region: [],
				cascaderOption: {
					//可以选择任意一项
					checkStrictly: true,
					//hover触发子类
					expandTrigger: "hover",
					//被选择的值
					value: "cat_id",
					//显示标题
					label: "cat_name",
					//子类关键字
					children: "children",
				},
				addDialogStatus: false,
				addForm: {
					cascaderData: [],
					categoryName: "",
					categoryLevel: null,
				},
				options: [
					{
						value: 0,
						label: "一级分类",
					},
					{
						value: 1,
						label: "二级分类",
					},
					{
						value: 2,
						label: "三级分类",
					},
				],
				tableData: [],
				pageNum: 1,
				pageSize: 10,
				total: 0,
			};
		},
		computed: {},
		methods: {
			//删除分类
			deleteData(product) {
				this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(async () => {
						const { data, meta } = await instance.delete(`categories/${product.cat_id}`);
						if (meta.status !== 200) return this.$message.error(meta.msg);
						this.$message.success(meta.msg);
						this.getCategories();
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			},
			//打开编辑分类dialog
			openEditDialog(product) {
				// console.log(product);
				this.editFrom.goodName = product.cat_name;
				this.editFrom.id = product.cat_id;
				this.editDialogStatus = true;
			},
			async editGood() {
				const { data, meta } = await instance.put(`categories/${this.editFrom.id}`, {
					cat_name: this.editFrom.goodName,
				});
				if (meta.status !== 200) return this.$message.error(meta.msg);
				this.$message.success(meta.msg);
				this.getCategories();
				this.editDialogStatus = false;
			},
			//打开添加分类dialog
			async openAddDialog() {
				//获取所有分类数据
				const { data, meta } = await instance.get("/categories");
				if (meta.status !== 200) return this.$message.error(meta.msg);
				this.region = data;
				this.addDialogStatus = true;
			},
			//添加分类逻辑
			async addCategory() {
				//拷贝一份数据加工
				let cloneObj = _.cloneDeep(this.addForm);
				//去除除要添加的父类id的其他杂项
				this.addForm.categoryLevel === 0
					? (cloneObj.cascaderData = 0)
					: (cloneObj.cascaderData = this.addForm.cascaderData[this.addForm.categoryLevel - 1]);
				//发起请求
				const { data, meta } = await instance.post("/categories", {
					cat_pid: cloneObj.cascaderData,
					cat_name: cloneObj.categoryName,
					cat_level: cloneObj.categoryLevel,
				});
				if (meta.status !== 201) return this.$message.error(meta.msg);
				this.$message.success(meta.msg);
				//清空输入
				this.addForm.cascaderData = [];
				this.addForm.categoryLevel = null;
				this.addForm.categoryName = "";
				this.addDialogStatus = false;
				this.region = null;
			},
			//页数切换
			handleCurrentChange(val) {
				this.pageNum = val;
				// console.log(`当前第${val}页,每页${this.pageSize}条`);
				this.getCategories();
			},
			//每页条数切换
			handleSizeChange(val) {
				this.pageSize = val;
				this.pageNum = 1;
				// console.log(`当前第${this.pageNum}页,每页${val}条`);
				this.getCategories();
			},
			//获取数据
			async getCategories() {
				const { data, meta } = await instance.get("/categories", {
					params: { pagenum: this.pageNum, pagesize: this.pageSize },
				});
				if (meta.status !== 200) return this.$message.error(meta.msg);
				this.tableData = data.result;
				this.total = data.total;
				// console.log(data, meta);
			},
		},
		created() {
			this.getCategories();
		},
	};
</script>
<style scoped>
	#categories {
		background: white;
		border-radius: 10px;
		padding-top: 20px;
	}
</style>
