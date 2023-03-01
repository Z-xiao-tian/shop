<template>
	<div id="order_info">
		<el-row style="width:100%;height: 100%;">
			<el-col :span="8"><div class="grid-content bg-purple">
                <div class="image_box" :style="{'--bc':bc}">
                    <i :class="imgSrc"></i>
                    <!-- <img :src="imgSrc" alt="图片加载失败"> -->
                </div>
            </div></el-col>
			<el-col :span="16" style="height: 100%;"><div class="grid-content bg-purple order_info_text">
                <h2 style="margin-bottom: 5px;">￥{{number}}</h2>
                <h3>{{ title }}</h3>
            </div></el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "OrderInfo",
        data(){
            return{
                // htmlSrc :'el-icon-edit'
            }
        },
        props:{
            title:{
                type:String,
                required:true
            },
            number:{
                type:Number,
                default:0
            },
            imgSrc:{
                type:String,
                required:true
            },
            bc:{
                type:String,
                required:true
            }
        }
	};
</script>
<style scoped>
	#order_info {
		width: calc(90% / 3);
		height: 120px;
		background: white;
	}
    .image_box{
        height: 120px;
        width: 120px;
        background: var(--bc);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: white;
    }
    .order_info_text{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .order_info_text>h2{
        font-size: 40px;
    }
    .order_info_text>h3{
        font-size: 16px;
        font-weight: 100;
        color: gray;
    }
</style>
