<template>
  <div class="edit-account">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="登录名:" prop="account">
        <el-input v-model="ruleForm.account" placeholder="请输入登录名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password" v-if="pass==true">
        <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <div class="tree">
        <el-form-item label="权限:" prop="auth">
          <el-checkbox-group v-model="auth" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in authBox"
                         :label="item.id"
                         :key="item.id"
                         :checked="relAuth.includes(item.name)">
              {{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
    </el-form>
    <div class="button">
      <el-button type="primary" @click="addSubmit()">保存</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
  </div>

</template>

<script>
  export default {
    name: "",
    data() {
      return {
        auth: [],
        relAuth: [],
        pass: true,
        ruleForm: {
          account: '',
          password: '',
          email: '',
        },
        // 定义赋值
        authBox: [],
        multipleSelection: [],
        rules: {
          account: [{required: true, message: '请输入登录名', trigger: 'change'}],
          password: [{required: true, message: '请输入密码', trigger: 'change'}],
          email: [{required: true, message: '请输入邮箱', trigger: 'change'}],
        }
      }
    },
    methods: {
      handleCheckedCitiesChange(value) {
      },
      getList() {
        this._getData('/api/v1/auth/index', {},
          data => {
            this.authBox = data;
          })
      },
      addSubmit() {
        //编辑
        if (this.static == 1) {
          console.log(this.ruleForm)
          var ids = '';
          var len = this.auth.length;
          for (var i = 0; i < len; i++) {
            ids = ids + this.auth[i] + ',';
          }
          this._getData('/api/v1/user_admin/edit', {
              id: this.ruleForm.id,
              account: this.ruleForm.account,
              email: this.ruleForm.email,
              auth: ids
            },
            data => {
              console.log(data)
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.getList();
              this.$emit('close')
              this.$emit('getLists')
            },)
        }
        //新增
        if (this.static == 2) {
          var ids = '';
          var len = this.auth.length;
          for (var i = 0; i < len; i++) {
            ids = ids + this.auth[i] + ',';
          }
          this._getData('/api/v1/user_admin/create',
            {
              account: this.ruleForm.account,
              password: this.ruleForm.password,
              email: this.ruleForm.email,
              auth: ids
            }, data => {
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              this.getList();
              this.$emit('close')
              this.$emit('getLists')
            },)
        }
      },
      cancel() {
        this.$emit('close');
      },
    },
    props: ["onlyInfo", "static"],
    created() {
      this.getList();
      if (this.onlyInfo) {
        this.ruleForm = this.onlyInfo;
        this.pass = false;
        this.relAuth = this.onlyInfo.user_auth;
      }
      if (this.static == 2) {
        this.ruleForm = {};
      }
    },
  }
</script>

<style scoped>
  /*.titles {*/
  /*text-align: left;*/
  /*margin: 50px 0px 0px 20px;*/
  /*font-size: 28px;*/
  /*font-weight: 700;*/
  /*color: black;*/
  /*}*/
  
  /*.inputs {*/
  /*margin: 40px 0px 0px 20px;*/
  /*}*/
  
  /*!*. {*!*/
  /*!*margin: 0px 0px 0px 20px;*!*/
  /*!*}*!*/
  
  /*.font {*/
  /*width: 100px;*/
  /*text-align: left;*/
  /*font-size: 15px;*/
  /*}*/
  
  /*.font2 {*/
  /*width: 250px;*/
  /*margin: 10px 0px 0px 10px;*/
  /*}*/
  
  /*.box {*/
  /*width: 80px;*/
  /*margin: 10px 0px 0px 20px;*/
  /*}*/
  .edit-account {
    width: 85%;
    height: auto;
    margin: 0px 0px 50px 0px;
    /*border:1px solid gray;*/
  }
  
  /*.edit-account .el-input{*/
  /*width:70%;*/
  /*}*/
  .tree {
    width: 150px;
  }
  
  .button {
    text-align: center;
  }
</style>
