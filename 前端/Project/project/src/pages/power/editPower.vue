<template>
  <div class="body">
    <div class="titles">修改账号</div>
    <div class="inputs">
      <!--输入框-->
      <div class="flex inputs1">
        <div class="font">登录名：</div>
        <div class="font2">
          <el-input v-model="input" size="medium" placeholder="请输入内容"></el-input>
        </div>
      </div>
      
      <div class="flex inputs1">
        <div class="font">密码：</div>
        <div class="font2">
          <el-input v-model="input" size="medium" placeholder="请输入内容"></el-input>
        </div>
      </div>
      
      <div class="flex inputs1">
        <div class="font">手机号：</div>
        <div class="font2">
          <el-input v-model="input" size="medium" placeholder="请输入内容"></el-input>
        </div>
      </div>
      
      <!--权限-->
      <div class="inputs1 flex">
        <div class="font">权限：</div>
        <div class="sequence" style="width: 200px;">
          <div class="box">
            <el-checkbox v-model="checked3" label="备选项1"></el-checkbox>
          </div>
          <div class="box">
            <el-checkbox v-model="checked3" label="备选项1"></el-checkbox>
          </div>
          <div class="box">
            <el-checkbox v-model="checked3" label="备选项1"></el-checkbox>
          </div>
          <div class="box">
            <el-checkbox v-model="checked3" label="备选项1"></el-checkbox>
          </div>
          <div class="box">
            <el-checkbox v-model="checked3" label="备选项1"></el-checkbox>
          </div>
        </div>
      </div>
      
      <!--按钮-->
      <div class="inputs1 flex" style="margin-top: 50px">
        <div>
          <el-button type="primary" class="buttons">保存</el-button>
        </div>
        
        <router-link to="/power/power">
          <div style="margin-left: 30px">
            <el-button class="buttons">取消</el-button>
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
        checked3: ''
      }
    }
  }
</script>

<style scoped>
  .titles {
    text-align: left;
    margin: 50px 0px 0px 20px;
    font-size: 28px;
    font-weight: 700;
    color: black;
  }
  
  .inputs {
    margin: 40px 0px 0px 20px;
  }
  
  .inputs1 {
    margin: 0px 0px 0px 20px;
  }
  
  .font {
    width: 100px;
    text-align: left;
    font-size: 15px;
  }
  
  .font2 {
    width: 250px;
    margin: 10px 0px 0px 10px;
  }
  
  .box {
    width: 80px;
    margin: 10px 0px 0px 20px;
  }
</style>
