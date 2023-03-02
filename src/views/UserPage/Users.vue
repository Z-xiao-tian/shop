<template>
	<el-container id="users">
		<!-- 修改用户dialog -->
		<el-dialog title="修改用户" :visible.sync="reviseUserDialogStatus">
			<el-form :model="reviseUserFrom" label-width="auto" label-position="left" :rules="rules">
				<el-form-item label="用户名">
					<el-input v-model="reviseUserFrom.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="reviseUserFrom.email"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="reviseUserFrom.mobile"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="reviseUserDialogStatus = false">取 消</el-button>
				<el-button type="primary" @click="reviseUser">确 定</el-button>
			</div>
		</el-dialog>
		<!--  -->
		<!--  -->
		<!--  -->
		<!-- 分配用户角色dialog -->
		<el-dialog title="分配角色" :visible.sync="distributeRoleDialogStatus">
			<el-form :model="distributeRoleFrom" label-width="auto" label-position="left" :rules="rules">
				<el-form-item label="当前用户">
					<span>{{ distributeRoleFrom.username }}</span>
				</el-form-item>
				<el-form-item label="当前角色">
					<span>{{ distributeRoleFrom.role_name }}</span>
				</el-form-item>
				<el-form-item label="分配新角色">
					<el-select v-model="distributeRoleFrom.value" placeholder="请选择">
						<el-option
							v-for="item in roleOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="distributeRoleDialogStatus = false">取 消</el-button>
				<el-button type="primary" @click="distributeRole">确 定</el-button>
			</div>
		</el-dialog>
		<!--  -->
		<!--  -->
		<!--  -->
		<el-header>
			<!-- 搜索 -->
			<el-input placeholder="请输入内容" v-model="searchText" class="input-with-select search">
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
			<!-- 添加用户 -->
			<el-button type="primary" class="add_user_btn" @click="addUserDialogStatus = true">添加用户</el-button>
			<el-dialog title="添加用户" :visible.sync="addUserDialogStatus">
				<el-form :model="addUserForm" label-width="auto" label-position="left" :rules="rules">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="addUserForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="addUserForm.password"></el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input v-model="addUserForm.email"></el-input>
					</el-form-item>
					<el-form-item label="手机号">
						<el-input v-model="addUserForm.mobile"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="addUserDialogStatus = false">取 消</el-button>
					<el-button type="primary" @click="addUser">确 定</el-button>
				</div>
			</el-dialog>
		</el-header>
		<el-main>
			<!-- 数据展示 -->
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="id"></el-table-column>
				<el-table-column prop="username" label="姓名" width="180"></el-table-column>
				<el-table-column prop="email" label="邮箱"></el-table-column>
				<el-table-column prop="mobile" label="电话"></el-table-column>
				<el-table-column prop="role_name" label="角色"></el-table-column>
				<el-table-column prop="mg_state" label="状态">
					<template slot-scope="props">
						<!-- 状态切换 -->
						<el-switch v-model="props.row.mg_state"></el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="username" label="操作" width="200">
					<template slot-scope="props">
						<!-- 修改用户 -->
						<el-button
							type="primary"
							icon="el-icon-edit"
							size="small"
							@click="openReviseUserDialog(props.row)"
						></el-button>
						<!-- 删除用户 -->
						<el-button
							type="danger"
							icon="el-icon-delete"
							size="small"
							@click="deleteUser(props.row)"
						></el-button>
						<!-- 角色分配 -->
						<el-button
							type="warning"
							icon="el-icon-share"
							size="small"
							@click="openDistributeRoleDialog(props.row)"
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
					:current-page="pageNum"
					:page-size="pageSize"
					:total="total"
					layout="total, sizes, prev, pager, next, jumper"
				></el-pagination>
			</div>
		</el-footer>
	</el-container>
</template>
<script>
	import api from "@/http/api";

	export default {
		name: "Users",
		data() {
			return {
				//添加用户dialog状态
				addUserDialogStatus: false,
				//添加用户表单数据
				addUserForm: {
					username: "",
					password: "",
					email: "",
					mobile: "",
				},
				//添加用户表单验证规则
				rules: {
					username: [{ required: true, message: "用户名不能为空！", trigger: "blur" }],
					password: [{ required: true, message: "密码不能为空！", trigger: "blur" }],
					allRules: [{ required: true, message: "此字段不能未空", trigger: "blur" }],
				},
				//修改用户dialog状态
				reviseUserDialogStatus: false,
				reviseUserFrom: {
					id: "",
					username: "",
					email: "",
					mobile: "",
				},
				distributeRoleDialogStatus: false,
				distributeRoleFrom: {
					username: "",
					role_name: "",
					value: "",
				},
				roleOptions: [
					{
						value: -1,
						label: "超级管理员",
					},
					{
						value: 0,
						label: "普通管理员",
					},
					{
						value: 1,
						label: "普通用户",
					},
				],
				//搜索输入框
				searchText: "",
				//用户数据列表
				tableData: [],
				//分页- 每页多少条
				pageSize: 10,
				//当前第几页
				pageNum: 1,
				//用户数据总条数
				total: 0,
			};
		},
		methods: {
			//添加用户
			addUser() {
				api.addUser(this.addUserForm).then(res => {
					if (res.meta.status === 201) {
						this.addUserDialogStatus = false;
						this.$message({
							message: res.meta.msg,
							type: "success",
						});
						this.getUserList();
					} else {
						this.$message.error(res.meta.msg);
					}
				});
			},
			//删除用户
			deleteUser(row) {
				this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(async () => {
						const meta = await api.deleteUser(row.id).then(res => res.meta);
						if (meta.status === 200) {
							this.getUserList();
							this.$message({
								type: "success",
								message: meta.msg,
							});
						} else {
							this.$message.error(meta.msg);
						}
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			},
			//打开修改用户对话框
			openReviseUserDialog(row) {
				this.reviseUserFrom.id = row.id;
				this.reviseUserFrom.username = row.username;
				this.reviseUserFrom.email = row.email;
				this.reviseUserFrom.mobile = row.mobile;
				this.reviseUserDialogStatus = true;
			},
			//修改用户
			reviseUser() {
				const { id, email, mobile } = this.reviseUserFrom;
				api.resviceUser(id, email, mobile).then(res => {
					if (res.meta.status === 200) {
						this.$message({
							message: res.meta.msg,
							type: "success",
						});
					} else {
						this.$message.error(res.meta.msg);
					}
					this.reviseUserDialogStatus = false;
				});
			},
			//打开分配用户角色dialog
			openDistributeRoleDialog(row) {
				this.distributeRoleFrom.username = row.username;
				this.distributeRoleFrom.role_name = row.role_name;
				this.distributeRoleDialogStatus = true;
			},
			//分配用户角色
			distributeRole() {
				this.distributeRoleDialogStatus = false;
				this.$message({
					type:"success",
					message:'更改成功'
				});
				console.log(this.distributeRoleFrom.value);
			},
			//每页条数切换
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.getUserList(val, this.pageNum);
			},
			//页数切换
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.getUserList(this.pageSize, val);
			},
			//获取用户列表
			getUserList(pagesize = this.pageSize, pagenum = this.pageNum) {
				api.getUserList(pagesize, pagenum).then(response => {
					this.tableData = response.data.users;
					this.total = response.data.total;
				});
			},
		},
		created() {
			this.getUserList();
		},
	};
</script>
<style scoped>
	#users {
		background: white;
		border-radius: 10px;
		padding: 15px;
	}
	.search {
		width: 334px;
		height: 40px;
	}
	.add_user_btn {
		margin-left: 20px;
	}
</style>
