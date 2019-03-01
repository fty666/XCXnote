<template>
	<div class="body">
    <!--回购-->
    <div class="flex" style="margin-top: 20px;">
      <div class="state flex" style="background-color:rgba(134, 134, 134, 1);">
        <div class="state2" style="color: white">平台强制回购</div>
      </div>
      <div class="state flex" style="margin-left: 0">
        <div class="state2">经销商申请回购</div>
      </div >
    </div>
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">账号：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="请输入用户账号"></el-input>
      </div>
      
      <div class="font">名称：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="请输入商品名称"></el-input>
      </div>
      
      <div class="font">购入日期：</div>
      <div class="input" >
        <el-date-picker
          v-model="value1"
          style="width: 150px;"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      
      <div class="font" style="margin-left: 5px">至</div>
      <div class="input" >
        <el-date-picker
          v-model="value1"
          style="width: 150px;"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 500px">
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px">
        <el-button type="primary" size="small" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    <!--表格头-->
    <div class="head join">
      <div class="head1" style="margin-left: 20px" @click="manage()">回购规则设置</div>
      <div class="head1">显示条数</div>
    </div>
    <!--表格-->
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        border>
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          width="250"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <div style="color: #0099ce;padding-left: 88px" @click="del(scope.row.id)">强制回购</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--回购规则-->
    <div>
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        width="25%"
        center>
        <div class="xiu">
          <div class="edit">回购规则设置</div>
          <div class="flex">
            <div class="edit1">强制回购期限：</div>
            <div class="edit2">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="flex">
            <div class="logBtn1"> <el-button size="medium"  type="primary">提交</el-button></div>
            <div class="logBtn2"> <el-button size="medium">取消</el-button></div>
          </div>
        </div>
      </el-dialog>
    </div>
	</div>
</template>

<script>
    export default {
        name: "",
      data(){
        return{
          input:'',
          value1:'',
          tableData3: [{
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
          multipleSelection: [],
          centerDialogVisible:false
        }
      },
      methods:{
        manage(){
          this.centerDialogVisible=true;
        }
      }
    }
</script>

<style scoped>
</style>
