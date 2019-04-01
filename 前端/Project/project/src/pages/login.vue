<template>
  <div class="login-box">
    <h3 style="margin-bottom: 30px;font-weight: 900;font-size: 25px;">管理员后台登录</h3>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm.account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item type="password" label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="login">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          account: "",
          password: ""
        },
        rules: {
          account: [{required: true, message: "请输入账户", trigger: "blur"}],
          password: [{required: true, message: "请输入密码", trigger: "blur"}]
        }
      };
    },
    methods: {
      register() {
        this.$router.push({path: "/register"});
      },
      submitForm(formName) {
        console.log(this.ruleForm)
        this.$refs[formName].validate(valid => {
          this._getData('/api/v1/user_admin/login', this.ruleForm,
            data => {
              console.log(data)
              this.$message({
                type: 'success',
                message: '登陆成功'
              });
              sessionStorage.setItem('userInfo', JSON.stringify(data.auth))
              this.$router.push({path: "/index"});
            })
        });
      }
    }
  }
</script>

<style scoped>
  .login-box {
    width: 400px;
    height: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -250px 0 0 -200px;
    text-align: center;
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
