<template>
  <div class="comment">
    <nav-header :active="active"></nav-header>
    <el-row type="flex" justify="center">
      <el-col :span="14" class="detail_title">
        <div>{{ info.articleTitle }}</div>
        <div class="time">发布时间：{{ info.articleDate }}</div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="14" class="detail_content">
        <div v-show="!info.articleContent">暂无文章数据...</div>
        <div v-html="ripeTxt" class="md markdown-body"></div>
      </el-col>
    </el-row>
    <!--<el-row type="flex" justify="center">
      <el-col :span="14">
        <h2 style="color:#3D5064;border-top:1px dashed #3D5064;padding-top:15px;margin-top:30px;">发表评论：</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="15" class="detail_content" style="margin-left:-63px;">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="username">
            <el-input type="text" v-model="ruleForm.username" @change="usernameChange" autocomplete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="ruleForm.email" autocomplete="off" placeholder="请输入邮箱 (不会呈现给任何人)"></el-input>
          </el-form-item>
          <el-form-item label="身份校验" prop="pass" v-show="authorStatus">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="校验是否为作者身份，校验值为后台登录密码"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" :rows="8" v-model="ruleForm.content" autocomplete="off"></el-input>
          </el-form-item>
          <no-ssr>
            <geetest :data="param" style="margin:0 0 50px 100px;" @on-success="geetSuccess" @on-error="geetError"></geetest>
          </no-ssr>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="detail_content">
      <el-col :span="14">
        <el-card class="box-card" v-show="commentList.length !== 0" v-for="(item, index) in commentList" :key="index">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;">{{item.username}} <el-tag type="success" v-show="author.includes(item.username)">作者</el-tag> 说：</span>
            
            <span style="float: right; padding: 3px 0;font-weight: bold;"><Time :time="item.time" :interval="1" /></span>
          </div>
          <div>
            {{item.content}}
          </div>
        </el-card>
        
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import NavHeader from "~/components/NavHeader.vue";
import {baseurl } from "~/plugins/url.js";
import Time from "~/plugins/time";
import Geetest from "~/components/Geetest.vue";
const highlight = require('highlight.js')
const marked = require('marked')

marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value
  }
})
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      console.log(value);
      const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      if (value === "") {
        callback(new Error("请输入您的邮箱"));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("邮箱格式不正确"));
        }
        // callback();
      }
    };
    var validateContent = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入评论内容"));
      } else {
        callback();
      }
    };
    var validateIdentity = (rule, value, callback) => {
      if (this.authorStatus) {
        if (value === "") {
          callback(new Error("请输入校验值，校验作者身份"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      active: "index",
      ruleForm: {
        username: "",
        email: "",
        content: "",
        pass: "",
      },
      param: {
        baseUrl: `${baseurl}/api/geet`,
        product: "float",
      },
      geetValidate: null,
      rules: {
        username: [{ validator: checkUsername, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        content: [{ validator: validateContent, trigger: "change" }],
        pass: [{ validator: validateIdentity, trigger: "change" }],
      },
      commentList: [],
      count: 0,
      author: [],
      authorStatus: false,
    };
  },
  async asyncData({ app, params }) {
    let result = await app.$axios.get(`${baseurl}/articles/${params.id}`);
    if (result.data.code == 200 && result.data.data) {
      let info = result.data.data;
      return { info };
    }
  },
  computed: {
    ripeTxt() {
      // console.log('computed:', this.info.articleContent)
      return marked(this.info.articleContent)
      // return 'this.info.articleContentsdfasdfsadfaaaaaaaaaaasdfasfsfsafsafasfsdfsdfsfasfasdgafgdsfgsaasdgas'
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: `${this.des}` },
        { hid: "author", content: "brian" },
      ],
    };
  },
  components: {
    NavHeader,
    Time,
    Geetest,
  },
  created() {

  },
  methods: {
    async test() {
      let bbb = await this.$axios.get(`${baseurl}/articles/4`);
      console.log("bbb", bbb.data);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let json = Object.assign(
            {},
            {
              comment: Object.assign(this.ruleForm, {
                time: new Date().getTime(),
              }),
              id: this.$route.params.id,
              geetValidate: this.geetValidate,
            }
          );
          this.commentsSubmit(json, formName);
        } else {
          this.$notify({
            title: "评论失败",
            message: "请认真填写表单内容",
            type: "error",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$captch.reset();
    },
    async commentsSubmit(json, formName) {
      try {
        let { data } = await this.$axios.post(`${baseurl}/api/comment`, json);
        if (Object.is(data.status, "0000")) {
          this.$refs[formName].resetFields();
          this.$notify({
            title: "评论成功",
            message: "发布评论成功，请注意言论",
            type: "success",
          });
          this.$captch.reset();
          this.commentLists(this.$route.params.id);
        } else if (Object.is(data.status, "0001")) {
          this.$refs[formName].resetFields();
          this.$notify({
            title: "身份校验成功",
            message: "发布评论成功，请注意言论",
            type: "success",
          });
          this.$captch.reset();
          this.commentLists(this.$route.params.id);
        } else {
          this.$notify({
            title: "校验失败",
            message: data.msg,
            type: "error",
          });
          return false;
        }
      } catch (error) {
        // handle error
      }
    },
    async commentLists(id) {
      try {
        let {
          data: { count, result },
        } = await this.$axios.post(`${baseurl}/api/articleComments`, { id });
        let {
          data: { data },
        } = await this.$axios.post(`${baseurl}/api/comment/config/list`, {
          id,
        });
        /*数组暂时倒序*/
        this.count = count;
        this.commentList = result.comment.reverse();
        this.author = data.author;
      } catch (error) {
        // handle error
      }
    },
    pagination(page) {
      console.log(page);
    },
    usernameChange(val) {
      this.authorStatus = this.author.includes(val);
      console.log(`status:${this.authorStatus}`);
    },
    async geetSuccess(result) {
      try {
        this.geetValidate = result;
      } catch (e) {
        this.$notify({
          title: "未知错误",
          message: `发生错误：${e}`,
          type: "error",
        });
      }
    },
    geetError() {},
  },
};
</script>
<style lang="less" scoped>
@import "./../../assets/css/Index/Detail.less";
// @import '~assets/css/Markdown.css';
.markdown-body{
   overflow:hidden;
}

.comment {
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .box-card {
    border: 1px solid #dcdfe6 !important;
    border-radius: 5px;
    margin-bottom: 1rem;
  }
  .el-card__body {
    background: rgb(248, 248, 248) !important;
  }
  .el-tag {
    padding: 0 6px !important;
    height: 25px !important;
    line-height: 25px !important;
  }
  /*分页*/
  .pagination {
    float: right;
    margin-top: 1rem;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #41b883;
  }
}
</style>
