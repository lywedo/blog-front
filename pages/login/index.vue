<template>
  <body id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
 
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
 
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>
 
 
<script>
import {baseurl, USER_INFO} from '~/plugins/url.js'
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            async login() {
                let req = {
                    username: this.loginForm.username,
                    password: this.loginForm.password
                }
                console.log(req)
                let result = await this.$axios.post(`${baseurl}/users/login`,req)
                if(result.data.code == 200 && result.data.data){
                    if(result.headers.authorization){
                        // sessionStorage.setItem('authorization', result.headers.authorization);
                        result.data.data.authorization = result.headers.authorization
                    }
                    // this.$store.commit('SET_USER_INFO', result.data.data)
                    this.$store.dispatch("setUserInfo", JSON.stringify(result.data.data))
                    // sessionStorage.setItem(USER_INFO, JSON.stringify(result.data.data))
                    this.$router.replace({path: '/'})
                }
            }
        }
    }
</script>
 
<style>
  #poster {
    background:url("/static/images/banner.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0;
  }
 
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
 
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
 
 
</style>