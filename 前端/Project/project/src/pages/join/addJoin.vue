<template>
  <div class="body">
    <el-form :model="addList" :rules="rules" ref="addList">
      <div class="flex">
        <div class="font">名称：</div>
        <div class="inputs">
          <el-form-item prop="name">
            <el-input size="medium" v-model="addList.name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="flex">
        <div class="font">电话：</div>
        <div class="inputs">
          <el-form-item prop="mobile">
            <el-input size="medium" v-model="addList.mobile" placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="flex">
        <div class="font">地址：</div>
        <div class="inputs">
          <el-form-item prop="address">
            <el-input size="medium" v-model="addList.address" placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="flex">
        <div class="font">所属地区：</div>
        <div class="inputs">
          <el-form-item prop="district">
            <el-input size="medium" v-model="addList.district" placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="flex">
        <div class="font">加盟费用：</div>
        <div class="inputs">
          <el-form-item prop="fee">
            <el-input size="medium" v-model="addList.fee" placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="flex">
        <div class="font">分成比例：</div>
        <div class="inputs">
          <el-form-item prop="divide">
            <el-input size="medium" style="width:150px;" v-model="addList.divide" placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="flex">
        <div class="font">后台登录账号：</div>
        <div class="inputs">
          <el-form-item prop="account">
            <el-input size="medium"  v-model="addList.account" placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="flex">
        <div class="font">后台登录密码：</div>
        <div class="inputs">
          <el-form-item prop="password">
            <el-input size="medium" type="password" v-model="addList.password" placeholder="输入密码6-30位"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="flex">
        <div class="font">确认后台登录密码：</div>
        <div class="inputs">
          <el-form-item prop="Xpassword">
            <el-input size="medium" type="password" v-model="addList.Xpassword"  placeholder="确认输入密码"></el-input>
          </el-form-item>
        </div>
      </div>
      
      <div class="flex">
        <div class="font">加盟时间：</div>
        <div class="inputs">
          <el-form-item prop="time">
            <el-date-picker
              v-model="addList.time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
      </div>
      <!--按钮-->
      <div class="flex">
        <div class="font" style="margin: 42px 0px 50px 50px" @click="submitForm('addList')">
          <el-button class="buttons" plain style="background-color: rgba(0, 153, 153, 1);color: white">添加加盟商</el-button>
        </div>
        <div class="inputs">
          <router-link to="/join/join">
            <div style="margin: 35px 0px 100px 60px">
              <el-button class="buttons" plain>返回</el-button>
            </div>
          </router-link>
        </div>
      </div>
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
        } else {
          var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error('手机号输入有误'))
          }
        }
      };
      return {
        input: '',
        value1: '',
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
          fee: [{
            required: true, message: '请输入加盟费', trigger: 'blur'
          }],
          mobile: [
            {required: true, message: '输入手机号', trigger: 'blur'},
            {validator: phone, trigger: 'blur'}
            ],
          district: [{
            required: true, message: '请输入所属地区', trigger: 'blur'
          }],
          account: [{
            required: true, message: '请输入登录账号', trigger: 'blur'
          }],
          password: [{
            required: true, message: '请输入登录密码', trigger: 'blur'
          }],
          Xpassword: [
            {required: true, message: '请确认登录密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
          divide: [{
            required: true, message: '请输入分成比例1-100', trigger: 'blur'
          }],
          time: [{
            required: true, message: '请输入时间', trigger: 'blur'
          }],
          address: [{
            required: true, message: '请输入地址', trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      submitForm(formName) {
        console.log(this.addList)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.addList.fee)
            this._getData('/api/v1/alliance/create', {
              fee:this.addList.fee,
              name:this.addList.name,
              time:this.addList.time,
              mobile:this.addList.mobile,
              divide:this.addList.divide,
              address:this.addList.address,
              district:this.addList.district,
              account:this.addList.account,
              password:this.addList.password,
            }, data => {
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              // this.$router.push({path: "/member"});
            })
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>
  .body {
    margin-top: 100px;
  }
  
  .font {
    width: 30%;
    text-align: right;
    margin-top: 5px;
  }
  
  .inputs {
    width: 20%;
    text-align: left;
    margin: 15px 0px 0px 20px;
  }
</style>
