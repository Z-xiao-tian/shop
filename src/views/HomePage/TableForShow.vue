<template>
	<div id="table_for_show">
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="brand" label="课程" width="90"></el-table-column>
			<el-table-column prop="buyToday" label="今日购买" width="90"></el-table-column>
			<el-table-column prop="buyMouth" label="本月购买" width="90"></el-table-column>
			<el-table-column prop="generalLedger" label="总账本" width="90"></el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: "TableForShow",
		props: {
			tableData: {
				type: Array,
				required: true,
			},
		},
		data() {
			return {};
		},
	};
</script>

<style scoped>
	#table_for_show {
		margin-top: 20px;
		width: 360px;
		padding: 20px;
		box-sizing: border-box;
		background: white;
	}
</style>
