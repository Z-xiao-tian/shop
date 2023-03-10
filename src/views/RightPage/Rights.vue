<template>
	<div>
		<el-table :data="rightsTableData" border style="width: 100%">
			<el-table-column type="index"></el-table-column>
			<el-table-column prop="authName" label="权限名称"></el-table-column>
			<el-table-column prop="path" label="路径"></el-table-column>
			<el-table-column label="权限等级">
				<template slot-scope="props">
					<el-tag :type="props.row.level > 1 ? 'warning' : (props.row.level<1 ? '' : 'success' )">
						{{ props.row.level > 1 ? "三" : props.row.level < 1 ? "一" : "二" }}级
					</el-tag>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	import instance from "@/http/request";

	export default {
		name: "Rights",
		data() {
			return {
				rightsTableData: [],
			};
		},
		methods: {
			async getRights() {
				const { data, meta } = await instance.get("/rights/list");
				if (meta.status !== 200) return this.$message.error(meta.msg);
				this.rightsTableData = data;
			},
		},
		created() {
			this.getRights();
		},
	};
</script>
<style scoped></style>
