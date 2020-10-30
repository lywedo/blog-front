<template>
<div>
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<el-row type="flex" justify="center" class="content-blog">
		<el-col :span="10">
			<nuxt-link  v-for="item in list" :key="item.articleId" :to="{name:'Article-id',params:{id:item.articleId}}" class="box-href">
				<el-card class="box-card" shadow="hover">
					<h2 class="box-title">{{item.articleTitle}}</h2>
					<div class="box-icon">
						<span><i class="el-icon-date"></i>&nbsp;{{item.articleDate}}</span>
						<!-- <span><i class="el-icon-view"></i>&nbsp;115次阅读</span> -->
					</div>
					<div class="box-content">{{item.articleDescription}}</div>
				</el-card>
			</nuxt-link>
			<el-pagination class="pagination" @current-change="pagination" background layout="prev, pager, next" :page-size="5" :total="count" v-show="count >= 5"></el-pagination>
		</el-col>
		<!-- 右侧关于我 -->
        <el-col :span="5" :offset="1">
			<el-card class="about">
				<div class="about-title">about Me</div>
				<div class="about-name">
					<!-- <img src="http://172.16.4.51:9000/boots/B620BABD2679FE7FCC076130369CC6EB.png" alt="brianlee"> -->
				</div>
				<div class="about-content">
					<p>网名：Brian·Lee</p>

					<p>职业：客户端工程师</p>

					<p>邮箱：cn_brian@163.com</p>
				</div>
			</el-card>
			<!-- 近期文章开始 -->
			<el-card class="article">
				<div class="article-title">近期文章</div>
				<hr>
				<nuxt-link v-for="item in lately" :key="item.articleId" :to="{name:'Article-id',params:{id:item.articleId}}" class="article-link">
					<i class="el-icon-edit"></i>&nbsp;&nbsp;{{item.articleTitle}}
				</nuxt-link>
			</el-card>
			<!-- 近期文章结束 -->

			<!-- 友情链接开始 -->
			<el-card class="link">
				<div class="link-title">友情链接</div>
				<hr>
				<div class="link-content">
					<a href="/" target="_blank" class="link-url">虚位以待</a>
					<a href="/" target="_blank" class="link-url">虚位以待</a>
				</div>
			</el-card>
			<!-- 友情链接结束 -->
		</el-col>
	</el-row>
	<NavFooter />
</div>
</template>

<script>
import NavHeader from '~/components/NavHeader.vue'
import NavFooter from '~/components/Footer.vue'
import {dockerurl, baseurl, USER_INFO} from '~/plugins/url.js'
export default {
	data() {
		return {
			active:'index'
		}
	},
	async asyncData({app}) {
		// 服务器端渲染数据
		let json = {page:1,pageSize:5}
		let {data} =await app.$axios.get(`${dockerurl}/articles/query`,{params:json});
		if(data.code == 200 && data.data){
			let list = data.data.records
			let count = data.data.total
			let lately = list.slice(0,4);
			return {list,count,lately}
		}
		// let lately = list.slice(0,4);
		// return {list,count,lately}
	},
	methods: {
		pagination(page) {
			let json = {page: page,pageSize:5}
			this.$axios.get(`${baseurl}/articles/query`,{params:json}).then(res=>{
				if(res.data.code == 200 && res.data.data){
					let error = res.data.data.msg
					let count = res.data.data.total
					let list = res.data.data.records
					this.list =list;
				}
			});
		}
	},
	components: {
		NavHeader,
		NavFooter
	},
	mounted(){
	},
	head() {
		return {
			title:'Brian的个人博客-一个基于Nuxt构建的博客网站',
			meta:[
				{hid:'description',name:'description',content:'李闯个人博客，是一个记录博主学习和成长的自媒体博客。关注于web前端技术和web全栈技术的学习研究。'},
				{hid:'keywords',name:'keywords',content:'李闯,互联网,自媒体,李闯博客,新鲜科技,科技博客,Brian,独立博客,个人博客,原创博客,brianlee,brian,前端,前端开发,全栈,全栈开发,nuxt,nuxtjs,vue,vuejs'},
				{hid:'author',content:'brian'}
			]
		}
	}
}
</script>

<style lang="less">
    @import './../assets/css/Index/Content.less';
</style>
