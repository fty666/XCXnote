<template>
  <div class="body">
    <div class="flex">
      <div class="font">名称：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">电话：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">地址：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">所属地区：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">加盟费用：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">分成比例：</div>
      <div class="inputs">
        <el-input size="medium" style="width:150px;" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">后台登录账号：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">后台登录密码：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">加盟时间：</div>
      <div class="inputs">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
    <!--按钮-->
    <div class="flex">
      <div class="font" style="margin: 42px 0px 50px 50px">
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
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        input: '',
        value1: ''
      }
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
