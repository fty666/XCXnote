<template>
	<div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">ID：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="请输入ID"></el-input>
      </div>
      
      <div class="font">账号：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="请输入账号"></el-input>
      </div>
      
      <div class="font">昵称：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="请输入昵称"></el-input>
      </div>
  
      <div class="font">地区：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="请输入地区"></el-input>
      </div>
  
      <div class="font">申请日期：</div>
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
      <div class="btn" style="margin-left: 30px">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2">
        <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    
    <!--表格头部-->
    <div class="head right">
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
              <div style="color: #0099ce;padding-left: 60px" @click="del(scope.row.id)">详情</div>
              <div style="color: #0099ce;padding-left: 20px" @click="del(scope.row.id)">通过</div>
              <div style="color: #0099ce;padding-left: 20px" @click="del(scope.row.id)">驳回</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
	</div>
</template>

<script>
    export default {
        name: "",
      data(){
          return{
            input:'',
            value1: '',
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
          }
      }
    }
</script>

<style scoped>
</style>
