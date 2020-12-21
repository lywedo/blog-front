<template>
<div>
	<nav-header :active="active"></nav-header>
	<!-- 并非采用后台动态添加，后期增加动态修改 -->
	<el-row type="flex" justify="center" class="about_content">
		<el-col :span="15" class="about">
			<el-card class="box-card">
				<h1>About Blog</h1>
				<hr class="line"/>
    			<p>简单介绍下博客使用技术：</p>
    			<p class="about_title">前端：</p>
    			<p class="about_text"><b>采用服务器端渲染(ssr)</b>,基于 Vue.js 的通用应用框架:<b>Nuxt.js + Element-UI + @nuxtjs/axios + Less</b></p>
    			<p class="about_title">服务端：</p>
				<p class="about_text">服务层：使用 <b>springboot + mybatis-plus + mysql + minio + redis</b></p>
    			<p class="about_text">(就写这么多，后期想起来再补充~)</p>
    			<h1>About Me</h1>
				<hr class="line"/>
				<p class="about_title">个人简介</p>
				<ul>
					<li>姓名：林宇</li>
					<!-- <li>爱好：写代码</li>
					<li>座右铭：人生为棋，我愿为卒，行动虽慢可谁曾见我退后一步？</li> -->
				</ul>
				<p class="about_title">技能</p>
				<ul>
					<li>客户端：熟练Android原生开发，出过sdk，利用reacnative进行过跨端ios开发，逆向分析apk，脱壳破解，xposed模块编写, 熟悉c语言，linux，了解framwork层，jvm，群控系统，mrp功能机软件，会利用NDK进行JNI底层调用，编写自动化脚本提高工作效率，Anroid app性能调优，机型适配，了解Kotlin语言。</li>
					<li>前端：微信小程序开发、会用vue.js开发单页应用以及基于vue.js 的nuxt.js	ssr框架，了解uniapp等跨端方案，使用过pixi.js开发过游戏，</li>
					<li>其它：基于springboot+mysql+redis开发的 javaweb网站，熟练docker容器化技术，对开发环境比较折腾，git版本控制，python脚本，研究过机器学习，会使用sklearn解决某些问题。</li>
				</ul>
				<p class="about_title">个人评价</p>
				<p class="about_text">认真负责，注重沟通，主动思考推动业务，积极反思问题总结规律，对待问题会从多方面入手。</p>
				<p class="about_text">未来1-3年规划：在客户端上思考机器学习场景。</p>
				<p class="about_title">联系方式</p>
				<p class="about_text">邮箱:lywedo@126.com|微信:dx5qtt1</p>
			</el-card>
		</el-col>
	</el-row>
</div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
export default {
	data() {
		return {
			active:'about'
		}
	},
	components:{
		NavHeader
	},
	head() {
		return {
			title:'个人简介林宇的工作笔记',
			meta:[
				{hid:'description',name:'description',content:'林宇个人博客，是一个记录博主学习和成长的自媒体博客。关注于web前端技术和web全栈技术的学习研究。'},
				{hid:'keywords',name:'keywords',content:'林宇,互联网,自媒体,林宇博客,新鲜科技,科技博客,LamYu,独立博客,个人博客,原创博客,前端,前端开发,Android,全栈,全栈开发,nuxt,nuxtjs,vue,vuejs'},
				{hid:'author',content:'LamYu'}
			]
		}
	}
}
</script>

<style lang="less" scoped>
	@import './../../assets/css/Index/About.less';
</style>
