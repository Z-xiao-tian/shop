<template>
	<div id="reports">
		<my-echarts :option="option" :height="height" :width="width"></my-echarts>
	</div>
</template>
<script>
	import MyEcharts from '../HomePage/MyEcharts.vue';
	import instance from '@/http/request';

	export default {
		name: "Reports",
		components:{
			MyEcharts
		},
		data(){
			return{
				height:'500px',
				width:'1200px',
				option:{},
			}
		},
		methods: {
			async getOption(){
				const {data,meta} = await instance.get('reports/type/1');
				console.log(data,meta);
				this.option = data;
			}	
		},
		created(){
			this.getOption()
		}
	};
</script>
<style scoped>
	#reports{
		background: white;
		border-radius: 10px;
		width: 100%;
		height: 100%;
	}
</style>
