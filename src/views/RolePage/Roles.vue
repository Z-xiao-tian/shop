<template>
	<div id="roles">
		<el-header>
			<!-- 添加角色 -->
			<el-button type="primary" class="add_role" @click="addRoleDialogStatus = true">添加角色</el-button>
		</el-header>
		<el-main>
			<el-table :data="tableData" style="width: 100%">
				<!-- 展开列 -->
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-row class="level_one_permission_bar" v-for="item1 in props.row.children" :key="item1.id">
							<el-col :span="5">
								<div>
									<el-tag closable @close="removeRightById(props.row, item1.id)">
										{{ item1.authName }}
									</el-tag>
									<i class="el-icon-caret-right"></i>
								</div>
							</el-col>
							<el-col :span="19">
								<el-row
									class="level_tow_permission_bar"
									v-for="item2 in item1.children"
									:key="item2.id"
								>
									<el-col :span="6">
										<div>
											<el-tag
												closable
												type="success"
												@close="removeRightById(props.row, item2.id)"
											>
												{{ item2.authName }}
											</el-tag>
											<i class="el-icon-caret-right"></i>
										</div>
									</el-col>
									<el-col :span="18" class="level_three_permission_bar">
										<el-tag
											class="level_three_tag"
											closable
											type="warning"
											v-for="item3 in item2.children"
											:key="item3.id"
											@close="removeRightById(props.row, item3.id)"
										>
											{{ item3.authName }}
										</el-tag>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</template>
				</el-table-column>
				<!-- 表格单元 -->
				<el-table-column type="index"></el-table-column>
				<el-table-column label="角色名称" prop="roleName"></el-table-column>
				<el-table-column label="角色描述" prop="roleDesc"></el-table-column>
				<!-- 操作区域 -->
				<el-table-column label="操作">
					<template slot-scope="props">
						<el-button type="primary" icon="el-icon-edit" @click="openReviseRoleDialog(props.row)">
							编辑
						</el-button>
						<el-button type="danger" icon="el-icon-delete" @click="deleteRole(props.row)">删除</el-button>
						<el-button type="warning" icon="el-icon-menu" @click="openAssignPermissionDialog(props.row)">
							分配权限
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<!-- 添加角色dialog -->
		<el-dialog title="添加角色" :visible.sync="addRoleDialogStatus">
			<el-form :model="addRoleForm" label-width="auto" label-position="left" :rules="rules" ref="addRoleFrom">
				<el-form-item label="角色名" prop="roleName">
					<el-input v-model="addRoleForm.roleName"></el-input>
				</el-form-item>
				<el-form-item label="角色描述" prop="roleDesc">
					<el-input v-model="addRoleForm.roleDesc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addRoleDialogStatus = false">取 消</el-button>
				<el-button type="primary" @click="addRole('addRoleFrom')">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 修改角色dialog -->
		<el-dialog title="修改角色" :visible.sync="reviseRoleDialogStatus">
			<el-form
				:model="reviseRoleForm"
				label-width="auto"
				label-position="left"
				:rules="rules"
				ref="reviseRoleFrom"
			>
				<el-form-item label="角色名" prop="roleName">
					<el-input v-model="reviseRoleForm.roleName"></el-input>
				</el-form-item>
				<el-form-item label="角色描述" prop="roleDesc">
					<el-input v-model="reviseRoleForm.roleDesc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="reviseRoleDialogStatus = false">取 消</el-button>
				<el-button type="primary" @click="reviseRole('reviseRoleFrom')">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 分配权限dialog -->
		<el-dialog title="分配权限" :visible.sync="assignPermissionDialogStatus">
			<el-tree
				:data="rightData"
				show-checkbox
				default-expand-all
				:default-checked-keys="havaRightsId"
				node-key="id"
				ref="tree"
				highlight-current
				:props="defaultProps"
			></el-tree>
			<div slot="footer" class="dialog-footer">
				<el-button @click="assignPermissionDialogStatus = false">取 消</el-button>
				<el-button type="primary" @click="assignPermission">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import api from "@/http/api";
	import instance from "@/http/request";

	export default {
		//角色列表
		name: "Roles",
		data() {
			return {
				//角色表格数据
				tableData: [],
				//添加角色dialog状态 false - 关闭 true - 打开
				addRoleDialogStatus: false,
				//添加角色表单数据
				addRoleForm: {
					roleName: "",
					roleDesc: "",
				},
				//表单验证规则
				rules: {
					roleName: [{ required: true, message: "角色名不能为空！", trigger: "blur" }],
					roleDesc: [{ required: true, message: "角色描述不能为空！", trigger: "blur" }],
				},
				//修改角色dialog状态
				reviseRoleDialogStatus: false,
				// 修改角色表单数据
				reviseRoleForm: {
					id: "",
					roleName: "",
					roleDesc: "",
				},
				//授权角色dialog状态
				assignPermissionDialogStatus: false,
				// 授权角色树形控件数据
				rightData: [],
				// 授权角色属性控件配置
				defaultProps: {
					children: "children",
					label: "authName",
				},
				//打开授权角色dialog对应的id
				roleId: "",
				//打开角色授权dialog此角色拥有的权限
				havaRightsId: [],
			};
		},
		methods: {
			//新增角色
			addRole(formName) {
				this.$refs[formName].validate(valid => {
					if (!valid) return;
					instance
						.post("/roles", { roleName: this.addRoleForm.roleName, roleDesc: this.addRoleForm.roleDesc })
						.then(res => {
							if (res.meta.status === 201) {
								this.addRoleDialogStatus = false;
								this.getRole();
								this.addRoleForm.roleName = '' 
								this.addRoleForm.roleDesc = '' 
								this.$message({
									type: "success",
									message: res.meta.msg,
								});
							} else {
								this.$message.error(res.meta.msg);
							}
						})
						.catch(err => {
							this.$message.err("出错了");
							console.log(err);
						});
				});
				// console.log("role");
			},
			//删除角色
			deleteRole(row) {
				this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						instance.delete("/roles/" + row.id).then(res => {
							if (res.meta.status === 200) {
								this.getRole();
								this.$message({
									type: "success",
									message: res.meta.msg,
								});
							} else {
								this.$message.error(res.meta.msg);
							}
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			},
			//打开修改角色dialog
			openReviseRoleDialog(row) {
				this.reviseRoleForm.id = row.id;
				this.reviseRoleForm.roleName = row.roleName;
				this.reviseRoleForm.roleDesc = row.roleDesc;
				this.reviseRoleDialogStatus = true;
			},
			//修改角色
			reviseRole(formName) {
				this.$refs[formName].validate(valid => {
					if (!valid) return;
					instance
						.put("/roles/" + this.reviseRoleForm.id, {
							roleName: this.reviseRoleForm.roleName,
							roleDesc: this.reviseRoleForm.roleDesc,
						})
						.then(res => {
							if (res.meta.status === 200) {
								this.reviseRoleDialogStatus = false;
								this.getRole();
								this.$message({
									type: "success",
									message: res.meta.msg,
								});
							} else {
								this.$message.err(res.meta.msg);
							}
						});
				});
			},
			//根据id删除对应的权限
			async removeRightById(role, rightId) {
				const confirmrResult = await this.$confirm("此操作将永久删除该权限，是否继续？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).catch(err => err);
				if (confirmrResult !== "confirm") {
					return this.$message.info("取消了删除");
				}
				const { data, meta } = await instance.delete(`roles/${role.id}/rights/${rightId}`);
				if (meta.status !== 200) {
					return this.$message.error("删除权限失败");
				}
				this.$message.success("删除成功");
				role.children = data;
			},
			//打开分配角色权限dialog
			async openAssignPermissionDialog(role) {
				this.roleId = role.id;
				this.havaRightsId = [];
				//将选择角色拥有的权限的保存下来
				this.getId(role, this.havaRightsId);
				const { data, meta } = await instance.get("/rights/tree");
				if (meta.status !== 200) return this.$message.error(meta.msg);
				this.rightData = data;
				this.assignPermissionDialogStatus = true;
			},
			//分配角色权限
			async assignPermission() {
				let chenkedRids = this.$refs.tree.getCheckedKeys().toString();
				const { data, meta } = await instance.post(`roles/${this.roleId}/rights`, {
					rids: chenkedRids,
				});
				if(meta.status !== 200) return this.$message.error(meta.msg);
				this.assignPermissionDialogStatus = false;
				this.getRole()
				this.$message.success(meta.msg);
			},
			//获得权限id
			getId(node, arr) {
				if (!node.children) {
					return arr.push(node.id);
				}
				node.children.forEach(item => {
					this.getId(item, arr);
				});
			},
			//获取角色列表
			getRole() {
				api.getRolesList().then(response => {
					if (response.meta.status === 200) {
						this.tableData = response.data;
					} else {
						this.$message.error("加载失败");
					}
				});
			},
		},
		created() {
			this.getRole();
		},
	};
</script>
<style scoped>
	#roles {
		width: 100%;
		height: 100%;
		background: white;
		border-radius: 10px;
		text-align: left;
	}
	.add_role {
		margin: 20px 0 0 20px;
	}
	.level_one_permission_bar,
	.level_tow_permission_bar {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		border-bottom: 1px rgb(200, 200, 200) solid;
	}
	.level_one_permission_bar:nth-child(1) {
		border-top: 1px rgb(200, 200, 200) solid;
	}
	.level_tow_permission_bar {
		text-align: left;
	}
	.level_tow_permission_bar:first-child {
		border-top: none;
	}
	.level_tow_permission_bar:last-child {
		border-bottom: none;
	}
	.level_three_permission_bar {
		text-align: left;
		padding: 10px 0;
		line-height: 3;
	}
	.level_three_tag {
		margin-right: 10px;
	}
</style>
