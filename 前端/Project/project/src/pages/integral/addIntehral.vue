<template>
  <div class="body">
    <div class="flex">
      <div class="font">商品名称：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">商品编号：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">商品图片：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font" >兑换方式：</div>
      <div class="inputs" style="width: 5%;">
        <el-input size="medium" style="width:150px;" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="font" style="width:5%;margin-left: 3%">积分+</div>
      <div class="inputs">
        <el-input size="medium" style="width:150px;" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="flex">
      <div class="font">兑换上架数量：</div>
      <div class="inputs">
        <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <!--按钮-->
    <div class="flex">
      <div class="font" style="margin: 42px 0px 50px 50px">
        <el-button class="buttons" plain style="background-color: rgba(0, 153, 153, 1);color: white">添加商品</el-button>
      </div>
      <div class="inputs">
        <router-link to="/integral/integralConvert">
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
