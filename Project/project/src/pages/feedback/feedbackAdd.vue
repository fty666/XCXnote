<template>
  <div class="body">
    <!--头部样式-->
    <div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;反馈类型设置</div>
    <!--规则-->
    <div class="bian flex">
      <!--输入内容-->
      <div class="flex" style="width: 40%;margin-top:60px">
        <div class="flex" style="text-align: left">
          <div class="ju">输入内容：</div>
          <div class="ju2">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div class="ju2">
            <el-button   class="buttons2">添加</el-button>
          </div>
        </div>
      </div>
      <!--表格-->
      <div style="width: 50%;margin-top:70px;">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="优先级"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            align="center"
            min-width="200px">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <div style="color: #0099ce;" @click="infos(scope.row.id)">删除</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--客服设置-->
    <div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;客服信息设置</div>
    <div class="bian flex" style="height: 280px;">
      <!--输入内容-->
      <div class="flex" style="width: 30%;margin:10px 0px 0px 100px">
          <div class="flex">
            <div class="font">客服电话:</div>
            <div class="inpu">
              <el-input  size="small" v-model="input" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="flex">
            <div class="font">客服电话:</div>
            <div class="inpu">
              <el-input  size="small" v-model="input" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="flex">
            <div class="font">客服电话:</div>
            <div class="inpu">
              <el-input  size="small" v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div style="margin: 10px 0px 50px 50px;">
              <el-button  size="small"  class="buttons" style="background-color:rgba(0, 153, 153, 1);color: white ">保存</el-button>
            </div>
          </div>
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
        textarea: '',
        value: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }]
      }
    },
    methods: {
      edit() {
        this.centerDialogVisible = true;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style scoped>
  .bian {
    height: 500px;
    width: 99.90%;
    border: 1px solid #ddd;
  }
  
  .ju {
    margin: 80px 0px 0px 20px;
  }
  
  .ju2 {
    margin: 70px 0px 0px 15px;
  }
  
  .font{
    margin: 0px 0px 0px 40px;
    font-size: 15px;
    color: black;
  }
  .inpu{
    margin: 12px 0px 0px 20px;
  }
</style>
