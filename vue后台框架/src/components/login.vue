<template>
   <div class="bg">
     <div class="login-box">
       <h3>传家宝后台管理平台</h3>
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
         <el-form-item label="用户名称" prop="userName">
           <el-input v-model="ruleForm.userName" auto-complete="off"></el-input>
         </el-form-item>
         <el-form-item type="password" label="密码" prop="password">
           <el-input v-model.number="ruleForm.password"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="submitForm('ruleForm')" class="login">登陆</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        userName: "1783937717@qq.com",
        password: "123456"
      },
      rules: {
        userName: [{ required: true, message: "请输入账户", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      // console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm.password);
          this.$http
            .post(this.url + "admin/login", {
              password: this.ruleForm.password,
              Email: this.ruleForm.userName
            })
            .then(
              resp => {
                console.log(resp);
                if (resp.state==1) {
                   sessionStorage.setItem('id',resp.data.id)
                  sessionStorage.setItem('fig',resp.data.admin_job_flag)
                  this.$router.push({path: "/commodity"});
                }

                // else{
                //   this.$message.error(resp.message);
                // }
              },
              response => {
                this.$Message.error(
                  response.state + ",服务器繁忙请稍后再试！"
                );
              }
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
   created() {
    var data={
      data:{
        imgBox:{
          name:"我啊啊啊"
        }
      }
    }
    console.log(data);
    }
  }
</script>

<style scoped>
  .main-header {
    display: flex;
    justify-content: space-between;
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3{
    text-align: center;
    margin-bottom: 20px;
  }
  /*.bg{*/
    /*width: 100%;*/
    /*min-height: 1000px;*/
    /*height:100%;*/

    /*background:  url(../assets/img/login.jpg) no-repeat center center fixed;*/
    /*-webkit-background-size: cover;*/
    /*-moz-background-size: cover;*/
    /*-o-background-size: cover;*/
    /*background-size: cover;*/
  /*}*/
.login-box {
  width: 400px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -250px 0 0 -200px;

}
.login-box img {
  width: 200px;
  margin: 0 auto 40px auto;
  display: block;
}
.login {
  width: 300px;
  position: relative;
  /* margin-left: -50px; */
}
</style>
