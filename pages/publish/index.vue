<template>
  <div class="main-container">
    <!-- <NavHeader :active="active"></NavHeader> -->
    <div class="main">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题">
          <el-input
            :placeholder="$store.getters.articleRaw.split('\n')[0]"
            :disabled="true"
          >
          </el-input
        ></el-form-item>
        <el-form-item label="文章简介" prop="desc">
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择博客分类">
            <!-- <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option> -->
            <el-option
              v-for="item in sorts"
              :key="item.sortId"
              :label="item.sortName"
              :value="item.sortId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="align-self: center">
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <NavFooter />
  </div>
</template>

<script>
import NavHeader from "~/components/NavHeader.vue";
import NavFooter from "~/components/Footer.vue";
import {dockerurl, baseurl, USER_INFO } from "~/plugins/url.js";
export default {
  data() {
    return {
      active: "index",
      ruleForm: {
        region: "",
        desc: "",
      },
      rules: {
        region: [{ required: true, message: "请选择分类", trigger: "change" }],
        desc: [
          { required: true, message: "请填写博客简介", trigger: "blur" },
          {
            min: 5,
            max: 25,
            message: "长度在 5 到 25 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    NavHeader,
    NavFooter,
  },
  async asyncData({ app }) {
    let { data } = await app.$axios.get(`${dockerurl}/sorts/all`);
    console.log(data);
    if (data.code == 200 && data.data) {
      let sorts = data.data;
      return { sorts };
    }
  },
  methods: {
    async onSubmit() {
      if (this.ruleForm.desc == "") {
        this.$message.error("请检查简介");
        return;
      }
      if (this.ruleForm.region == "") {
        this.$message.error("请检查分类");
        return;
      }
      console.log();
      let article = this.$store.getters.articleRaw
      let title = article.split("\n")[0]
      let req = {
        userId: 0,
        articleTitle: title,
        articleContent: article.split(title)[1],
        articleDescription: this.ruleForm.desc,
      };
      console.log(article.split("\n").length)
      let {data} = await this.$axios.post(`${baseurl}/articles/publish`, req)
      if(data.code == 200){
          this.$router.replace("/")
      }else {
          this.$message.error("发表失败" + data.msg)
      }
    },
  },
};
</script>
<style lang="less" scoped>
@globalColor: #41b883;
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>