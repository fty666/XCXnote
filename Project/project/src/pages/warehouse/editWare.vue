<template>
  <div class="body">
    <el-form :model="addList" :rules="rules" ref="addList">
      <div class="flex">
        <div class="font">仓库编号：</div>
      </div>
      <div class="flex">
        <div class="font">名称：</div>
        <div class="inputs">
          <el-form-item prop="name">
            <el-input size="medium" v-model="addList.name"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="flex">
        <div class="font">城市：</div>
        <div class="inputs">
          <el-form-item prop="city">
            <el-input size="medium" v-model="addList.city"></el-input>
          </el-form-item>
        </div>
      </div>
      <!--<div class="flex">-->
      <!--<div class="font">城市：</div>-->
      <!--<div class="inputs">-->
      <!--<el-form-item  prop="city">-->
      <!--<el-input size="medium" v-model="input"></el-input>-->
      <!--</el-form-item>-->
      <!--</div>-->
      <!--</div>-->
      <div class="flex">
        <div class="font">详细地址：</div>
        <div class="inputs">
          <el-form-item prop="address">
            <el-input size="medium" v-model="addList.address"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="flex">
        <div class="font">联系人：</div>
        <div class="inputs">
          <el-form-item prop="linkman">
            <el-input size="medium" v-model="addList.linkman"></el-input>
          </el-form-item>
        </div>
      </div>
      
      <div class="flex">
        <div class="font">电话：</div>
        <div class="inputs">
          <el-form-item prop="mobile">
            <el-input size="medium" v-model="addList.mobile"></el-input>
          </el-form-item>
        </div>
      </div>
      
      <!--按钮-->
      <div class="flex">
        <div class="font" style="margin: 45px 0px 50px 50px">
          <el-form-item>
            <el-button class="buttons3" @click="submit('addList')">
              确认修改
            </el-button>
          </el-form-item>
        </div>
        <div class="inputs">
          <router-link to="/warehouse/warehouseManage">
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
      var phone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error('手机号输入有误'))
          }
        }
        callback();
      };
      return {
        input: '',
        value1: '',
        addList: {
          name: '',
          city: '',
          address: '',
          linkman: '',
          mobile: '',
        },
        rules: {
          name: [{
            required: true, message: '请输入名称', trigger: 'blur'
          }],
          city: [
            {required: true, message: '请输入城市信息', trigger: 'blur'}
          ],
          address: [{
            required: true, message: '请输入具体地址', trigger: 'blur'
          }],
          linkman: [
            {required: true, message: '请输入联系人', trigger: 'blur'},
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: phone, trigger: 'blur'}]
        },
      }
    },
    methods: {
      //  提交添加
      submit(formName) {
        console.log(formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._getData('v1/service/create', this.addList, data => {
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              this.$router.push({path: "/member"});
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
