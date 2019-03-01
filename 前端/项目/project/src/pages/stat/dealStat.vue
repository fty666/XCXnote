<template>
  <div class="body">
    <!--表格-->
    <div class="head flex">
      <div class="font">交易记录</div>
      <div class="head1" style="margin-left: 600px">导出数据</div>
      <div class="head1" style="background-color: rgba(0, 153, 153, 1);color:white;">
        昨天
      </div>
      <div class="head1">最近7天</div>
      <div class="head1">最近30天</div>
      <div class="head1" style="width: 150px;border: 1px solid #ddd">
        <el-date-picker
          v-model="value1"
          style="width: 150px"
          type="date"
          size="mini"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
    <div class="flex" style="border: 1px solid #ddd;height: 300px;">
      <div class="tables">
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
        </el-table>
      </div>
      <!--付款转化-->
      <div class="lu ">
        <div class="lfont1">付款转化率</div>
        <div class="lfont2">68.77%</div>
      </div>
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
        value6:'',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },],
      }
    },
    methods: {
    
    }
  }
</script>

<style scoped>
  .font{
    text-align: left;
    margin: 0px 0px 0px 30px;
    color: black;
    font-weight:700 ;
    font-size: 16px;
  }
  .tables{
    width: 50%;
    margin: 40px 0px 0px 100px;
  }
  .lu{
    width: 30%;
  }
  .lfont1{
    margin: 80px 0px 0px 50px;
    font-size: 16px;
  }
  .lfont2{
    margin: 30px 0px 0px 50px;
    font-size: 40px;
    color: lightcoral;
  }
</style>
