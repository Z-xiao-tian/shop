<template>
	<el-container id="params">
		<el-header class="select_header">
			<el-alert
				title="注意：只允许为第三级分类设置相关参数！"
				type="warning"
				:closable="false"
				show-icon
			></el-alert>
			<div class="select_category">
				<span>选择商品分类：</span>
				<el-cascader
					v-model="cascaderData"
					:options="region"
					:props="cascaderOption"
					@change="dynamicParamsHandleChange"
				></el-cascader>
			</div>
		</el-header>
		<el-main>
			<el-tabs v-model="activeName" @tab-click="tabsClick">
				<el-tab-pane label="用户管理" name="1">
					<el-container>
						<el-header style="padding: 10px 0">
							<el-button type="primary" size="mini" class="btn" @click="openDynamicParamsDialog">
								添加参数
							</el-button>
							<el-dialog title="添加动态参数" :visible.sync="dynamicParamsDialogStatus">
								<el-form
									label-position="right"
									label-width="100px"
									:rules="addGoodsRules"
									ref="addForm"
									:model="addDynamicParamsForm"
								>
									<el-form-item label="参数名称:">
										<el-input v-model="addDynamicParamsForm.addDynamicParamsText"></el-input>
									</el-form-item>
								</el-form>
								<span slot="footer">
									<el-button @click="dynamicParamsDialogStatus = false">取 消</el-button>
									<el-button type="primary" @click="addDynamicParams">确 定</el-button>
								</span>
							</el-dialog>
						</el-header>
						<el-main>
							<el-table :data="dynamicParamsTableData" style="width: 100%">
								<el-table-column type="expand">
									<template slot-scope="props">
										<el-tag
											class="tag"
											v-for="tag in props.row.attr_vals"
											:key="tag.id"
											closable
											:disable-transitions="true"
										>
											{{ tag }}
										</el-tag>
										<el-input
											v-if="inputVisible"
											v-model="inputValue"
											ref="saveTagInput"
											size="small"
											@keyup.enter.native="tagInputConfirm(props.row.id)"
											@blur="tagInputConfirm"
										></el-input>
										<el-button v-else size="small" @click="showInput">+ New Tag</el-button>
									</template>
								</el-table-column>
								<el-table-column type="index"></el-table-column>
								<el-table-column label="参数名称" prop="attr_name"></el-table-column>
								<el-table-column label="操作">
									<template slot-scope="props">
										<el-button
											type="primary"
											size="mini"
											icon="el-icon-edit"
											@click="openEditDynamicParamsDialog(props.row)"
										>
											编辑
										</el-button>
										<el-dialog title="修改动态参数" :visible.sync="editDynamicParamsDialogStatus">
											<el-form label-position="right" label-width="100px">
												<el-form-item label="参数名称:">
													<el-input
														v-model="editDynamicParamsForm.editDynamicParamsText"
													></el-input>
												</el-form-item>
											</el-form>
											<span slot="footer">
												<el-button @click="editDynamicParamsDialogStatus = false">
													取 消
												</el-button>
												<el-button type="primary" @click="editDynamicParams">确 定</el-button>
											</span>
										</el-dialog>
										<el-button
											type="danger"
											size="mini"
											icon="el-icon-delete"
											style="margin-left: 20px"
											@click="deleteDynamicParam(props.row)"
										>
											删除
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-main>
					</el-container>
				</el-tab-pane>
				<el-tab-pane label="配置管理" name="2">
					<el-container>
						<el-header style="padding: 10px 0">
							<el-button type="primary" size="mini" class="btn" @click="openDynamicParamsDialog">
								添加属性
							</el-button>
							<el-dialog title="添加动态参数" :visible.sync="dynamicParamsDialogStatus">
								<el-form
									label-position="right"
									label-width="100px"
									:rules="addGoodsRules"
									ref="addForm"
									:model="addDynamicParamsForm"
								>
									<el-form-item label="属性名称:">
										<el-input v-model="addDynamicParamsForm.addDynamicParamsText"></el-input>
									</el-form-item>
								</el-form>
								<span slot="footer">
									<el-button @click="dynamicParamsDialogStatus = false">取 消</el-button>
									<el-button type="primary" @click="addDynamicParams">确 定</el-button>
								</span>
							</el-dialog>
						</el-header>
						<el-main>
							<el-table :data="dynamicParamsTableData" style="width: 100%">
								<el-table-column type="expand">
									<template slot-scope="props">
										<el-tag
											class="tag"
											v-for="tag in props.row.attr_vals"
											:key="tag.id"
											closable
											:disable-transitions="true"
										>
											{{ tag }}
										</el-tag>
										<el-input
											v-if="inputVisible"
											v-model="inputValue"
											ref="saveTagInput"
											size="small"
											@keyup.enter.native="tagInputConfirm(props.row.id)"
											@blur="tagInputConfirm"
										></el-input>
										<el-button v-else size="small" @click="showInput">+ New Tag</el-button>
									</template>
								</el-table-column>
								<el-table-column type="index"></el-table-column>
								<el-table-column label="参数名称" prop="attr_name"></el-table-column>
								<el-table-column label="操作">
									<template slot-scope="props">
										<el-button
											type="primary"
											size="mini"
											icon="el-icon-edit"
											@click="openEditDynamicParamsDialog(props.row)"
										>
											编辑
										</el-button>
										<el-dialog title="修改动态参数" :visible.sync="editDynamicParamsDialogStatus">
											<el-form label-position="right" label-width="100px">
												<el-form-item label="参数名称:">
													<el-input
														v-model="editDynamicParamsForm.editDynamicParamsText"
													></el-input>
												</el-form-item>
											</el-form>
											<span slot="footer">
												<el-button @click="editDynamicParamsDialogStatus = false">
													取 消
												</el-button>
												<el-button type="primary" @click="editDynamicParams">确 定</el-button>
											</span>
										</el-dialog>
										<el-button
											type="danger"
											size="mini"
											icon="el-icon-delete"
											style="margin-left: 20px"
											@click="deleteDynamicParam(props.row)"
										>
											删除
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-main>
					</el-container>
				</el-tab-pane>
			</el-tabs>
		</el-main>
	</el-container>
</template>
<script>
	import instance from "@/http/request";

	export default {
		name: "Params",
		data() {
			return {
				activeName: "1",
				cascaderData: [],
				region: [],
				cascaderOption: {
					//hover触发子类
					expandTrigger: "hover",
					//被选择的值
					value: "cat_id",
					//显示标题
					label: "cat_name",
					//子类关键字
					children: "children",
				},
				dynamicParamsTableData: [],
				inputVisible: false,
				inputValue: "",
				dynamicParamsDialogStatus: false,
				addDynamicParamsForm: {
					addDynamicParamsText: "",
				},
				//修改动态参数输入框值
				editDynamicParamsForm: {
					attr_id: "",
					editDynamicParamsText: "",
				},
				editDynamicParamsDialogStatus: false,
				addGoodsRules: {
					dyName: [{ required: true, message: "请填写参数名称", trigger: "blur" }],
				},
			};
		},
		computed: {
			cateId() {
				if (this.cascaderData.length === 3) return this.cascaderData[2];
				return "";
			},
			attr_sel() {
				return this.activeName === "1" ? "many" : "only";
			},
		},
		methods: {
			//删除参数
			deleteDynamicParam(row) {
				this.$confirm("此操作将永久删除该参数, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(async () => {
						const { data, meta } = await instance.delete(
							`categories/${this.cateId}/attributes/${row.attr_id}`,
						);
						if (meta.status !== 200) return this.$message.error(meta.msg);
						this.$message.success(meta.msg);
						this.dynamicParamsHandleChange();
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			},
			//修改参数
			async editDynamicParams() {
				const { data, meta } = await instance.put(
					`categories/${this.cateId}/attributes/${this.editDynamicParamsForm.attr_id}`,
					{
						attr_name: this.editDynamicParamsForm.editDynamicParamsText,
						attr_sel: this.attr_sel,
					},
				);
				if (meta.status !== 200) return this.$message.error(meta.msg);
				this.$message.success(meta.msg);
				this.dynamicParamsHandleChange();
				this.editDynamicParamsDialogStatus = false;
			},
			//打开修改参数dialog
			openEditDynamicParamsDialog(row) {
				this.editDynamicParamsForm.editDynamicParamsText = row.attr_name;
				this.editDynamicParamsForm.attr_id = row.attr_id;
				this.editDynamicParamsDialogStatus = true;
				console.log(row);
			},
			//打开添加动态参数dialog 如果当前的商品分类id为空就提示先选择商品分类
			openDynamicParamsDialog() {
				if (this.cateId === "") return this.$message.error("请先选择商品分类");
				this.dynamicParamsDialogStatus = true;
			},
			//添加动态参数事件
			async addDynamicParams() {
				// this.$refs.addForm.validate(async valid => {
				// console.log(this.addDynamicParamsForm.addDynamicParamsText);
				// if (!valid) return;
				const { data, meta } = await instance.post(`categories/${this.cateId}/attributes`, {
					attr_name: this.addDynamicParamsForm.addDynamicParamsText,
					attr_sel: this.attr_sel,
					attr_vals: "",
				});
				//判断添加是否成功
				if (meta.status !== 201) return this.$message.error(meta.msg);
				//重置输入框
				this.addDynamicParamsForm.addDynamicParamsText = "";
				//将请求回来的数据加入表格展示的数据中
				this.dynamicParamsTableData.push(data);
				this.$message.success(meta.msg);
				this.dynamicParamsDialogStatus = false;
				// });
			},
			//tabs点击事件
			async tabsClick() {
				if (this.cateId === '') {
					this.$message.error("请先选择商品分类");
				} else {
					this.getData();
				}
			},
			//tag标签关闭事件
			tagClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},
			//添加tag标签事件
			tagInputConfirm(id) {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.dynamicParamsTableData.forEach(item => {
						if (item.id === id) {
							item.attr_vals.push(inputValue);
						}
					});
				}
				this.inputVisible = false;
				this.inputValue = "";
			},
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			//当级联选择器的值变化时
			async dynamicParamsHandleChange() {
				this.getData();
			},
			//获取动态参数或静态属性
			async getData() {
				const { data, meta } = await instance.get(`categories/${this.cateId}/attributes`, {
					params: { sel: this.attr_sel },
				});
				if (meta.status !== 200) return this.$message.error("获取数据失败");
				data.forEach(item => {
					item.attr_vals = item.attr_vals === "" ? [] : item.attr_vals.split(",");
				});
				this.dynamicParamsTableData = data;
				// console.log(this.dynamicParamsTableData);
			},
			//获取分类参数
			async getCategory() {
				const { data, meta } = await instance.get("/categories");
				if (meta.status !== 200) return this.$message.error(meta.msg);
				this.region = data;
			},
		},
		created() {
			this.getCategory();
		},
	};
</script>
<style scoped>
	#params {
		background: white;
		border-radius: 10px;
		padding: 20px 0;
	}
	.select_header {
		height: auto !important;
	}
	.select_category {
		margin-top: 20px;
	}
	.btn {
		background: rgba(73, 188, 255, 0.5);
		border: 1px solid rgba(73, 188, 255, 0.5);
	}
	.tag {
		margin-right: 10px;
	}
</style>
