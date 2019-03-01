<template>
	<div class="body">
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div class="state flex" style="background-color:rgba(0, 153, 153, 1);">
        <div class="state2" style="color: white">全部商品</div>
        <div class="state3" style="color: white">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">已上架</div>
        <div class="state3">(1000)</div>
      </div >
      <div class="state flex">
        <div class="state2">已下架</div>
        <div class="state3">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">经销商酒</div>
        <div class="state3">(1000)</div>
      </div>
    </div>
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">订单单号：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="请输入配货单号"></el-input>
      </div>
      
      <div class="font">用户名：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="请输入用户名"></el-input>
      </div>
      
      <div class="font">昵称：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="请输入昵称"></el-input>
      </div>
      
      <div class="font">提交时间：</div>
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
      
      <div class="font">商品名称：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="请输入商品名称"></el-input>
      </div>
      <!--按钮-->
      <div class="btn" style="margin-left: 5px">
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px">
        <el-button type="primary" size="small" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    <!--表格头-->
    <div class="head right">
      <div class="head1">批量删除</div>
      <div class="head1">导出订单</div>
      <div class="head1">显示条数</div>
      <div class="head1">排序方式</div>
    </div>
    <!--表格-->
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
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
              <div style="color: #0099ce;padding-left: 60px" @click="del(scope.row.id)">查看订单</div>
              <div style="color: #0099ce;padding-left: 20px" @click="del(scope.row.id)">删除订单</div>
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
            multipleSelection: []
          }
        },
      methods: {
        handleSelectionChange(val) {
          this.multipleSelection = val;
        }
      }
    }
</script>

<style scoped>
</style>
