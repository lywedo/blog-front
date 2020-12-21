<template>
<div class="container">
	<div class="nav">
	<el-row type="flex" class="NavHeader" justify="center">
		<el-col :span="20">
			<nuxt-link :to="{name:'index'}" class="logo">林宇工作笔记</nuxt-link>
			<el-menu :default-active="active" class="el-menu-demo navbar" active-text-color="#41b883" text-color="#fff"  mode="horizontal" @select="handleSelect">
				<el-menu-item index="index">文章列表</el-menu-item>
				<!--<el-menu-item index="Backarticle">后端文章</el-menu-item>-->
				<!-- <el-menu-item index="version">更新日志</el-menu-item> -->
				<!-- <el-menu-item index=""><a href="http://docs.brianlee.cn" class="docs" target="_blank">文档中心</a></el-menu-item> -->
				<el-menu-item index="about">关于我</el-menu-item>
				<el-menu-item index="login" v-if="!userInfo">登录</el-menu-item>
				<el-menu-item index="mine" v-else>您好，{{userInfo.userNickname}}</el-menu-item>
			</el-menu>
		</el-col>
	</el-row>
	</div>
	<img src="~/static/images/banner.jpg" alt="banner" class="banner_img">
</div>
</template>

<script>
import {baseurl, USER_INFO} from '~/plugins/url.js'
export default {
	data() {
		return {
			activeIndex:'index'
		}
	},
	mounted(){
		this.$store.dispatch('getUserInfo')
	},
	methods:{
		handleSelect(key){
			this.$router.push({name:key});
		}
	},
	computed:{
		userInfo(){
		return JSON.parse(this.$store.state.userInfo)
		
	},
	},
	
	props:['active', 'username']
}
</script>
<style lang="less">
	@import './../assets/css/Index/NavHeader.less';
</style>
