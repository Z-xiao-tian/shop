<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">电商后台管理系统</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: pagePath}">{{ pageName }}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script>
	export default {
		name: "Breadcrumb",
        data(){
            return{
                
            }
        },
        computed:{
            pageName(){
                return this.$route.meta.title
            },
            pagePath(){
                return this.$route.path
            }
        },
        created(){
            // console.log(this.$route)
        }
	};
</script>
<style lang=""></style>
