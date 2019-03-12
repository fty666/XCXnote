<template>
  <div class="body">
    <div class="flex">
      <div class="font">仓库编号：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" ></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">名称：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">省份：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">城市：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">详细地址：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">联系人：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input"></el-input>
      </div>
    </div>
  
    <div class="flex">
      <div class="font">电话：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input"></el-input>
      </div>
    </div>

    <!--按钮-->
    <div class="flex">
      <div class="font" style="margin: 42px 0px 50px 50px">
        <el-button class="buttons" plain style="background-color: rgba(0, 153, 153, 1);color: white">确认修改</el-button>
      </div>
      <div class="inputs">
        <router-link to="/warehouse/warehouseManage">
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
