<template>
  <div class="body">
    <el-form :model="addList" :rules="rules" ref="addList" label-width="150px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="addList.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="addList.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="district">
        <el-input v-model="addList.district" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属地区" prop="address">
        <el-input v-model="addList.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="加盟费用" prop="fee">
        <el-input v-model="addList.fee" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分成比例" prop="divide">
        <el-input v-model="addList.divide" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="time">
        <el-date-picker
          v-model="addList.time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="buttons" type="primary" @click="submitForm('addList')">提交</el-button>
        <router-link to="/join/join">
          <el-button class="buttons">返回</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addList.password) {
          callback(new Error('两次输入密码不一致!'));
        } else if (value.length < 6 || value.length > 30) {
          console.log(value.length)
          callback(new Error('密码不符合要求'));
        } else {
          callback();
        }
      };
      var phone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        }
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(value)) {
          callback(new Error('手机号输入有误'))
        } else {
          callback();
        }
      };
      return {
        addList: {
          name: '',
          time: '',
          fee: '',
          mobile: '',
          divide: '',
          address: '',
          district: '',
          account: '',
          password: '',
          Xpassword: ''
        },
        rules: {
          name: [{
            required: true, message: '请输入用户昵称', trigger: 'blur'
          }],
          mobile: [
            {required: true, message: '输入手机号', trigger: 'blur'},
            {validator: phone, trigger: 'blur'}
          ],
          address: [{
            required: true, message: '请输入地址', trigger: 'blur'
          }],
          district: [{
            required: true, message: '请输入所属地区', trigger: 'blur'
          }],
          fee: [{
            required: true, message: '请输入加盟费', trigger: 'blur'
          }],
          divide: [{
            required: true, message: '请输入分成比例1-100', trigger: 'blur'
          }],
          time: [{
            required: true, message: '请输入时间', trigger: 'blur'
          }],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._getData('/api/v1/alliance/edit', {
              id: this.addList.id,
              fee: this.addList.fee,
              name: this.addList.name,
              time: this.addList.time,
              mobile: this.addList.mobile,
              divide: this.addList.divide,
              address: this.addList.address,
              district: this.addList.district,
              account: this.addList.account,
            }, data => {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.$router.push({path: "/join/join"});
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      let userInfo = JSON.parse(sessionStorage.getItem("edits"))
      this.addList = userInfo;
    }
  }
</script>

<style scoped>
  .body {
    margin-top: 100px;
  }
  
  .demo-ruleForm {
    width: 30%;
    margin-left: 25%;
  }
</style>
