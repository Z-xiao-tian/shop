<template>
	<div id="myEcharts" :style="{'--width':width,'--height':height}">
		<v-chart class="chart my_chart" :option="option" :style="{'--width':width}"/>
	</div>
</template>

<script>
	import VChart from "vue-echarts";

	export default {
		name: "MyEcharts",
		components: {
			VChart,
		},
        props:{
            option:{
                type:Object,
                required:true
            },
            width:{
                type:String,
                required:true,
            },
            height:{
                type:String,
                required:true,
            }
        },
/*         mounted(){
            window.addEventListener("resize",()=>{
                VChart.resize()
            })
        } */
	};
</script>

<style scoped>
	#myEcharts {
		width: var(--width);
		height: var(--height);
        background: white;
        margin-top: 20px;
        padding-top: 20px;
        box-sizing: border-box;
	}
    .my_chart{
        width: 100%;
    }
</style>
