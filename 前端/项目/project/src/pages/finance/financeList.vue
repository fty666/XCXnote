<template>
  <div class="body">
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div class="state flex" style="background-color:rgba(0, 153, 153, 1);">
        <div class="state2" style="color: white">总营业额统计</div>
        <div class="state3" style="color: white">(1000)</div>
      </div>
      <div class="state flex" style="margin-left: 0px">
        <div class="state2">月营业额统计</div>
      </div>
      <div class="state flex" style="margin-left: 0px">
        <div class="state2">日营业额统计</div>
      </div>
      <div class="state flex" style="margin-left: 0px">
        <div class="state2">商品成本列表</div>
      </div>
    </div>
    <!--表格-->
    <div class="head flex">
      <div class="font">平台总营业额查询</div>
        <div class="head1" style="background-color: rgba(0, 153, 153, 1);color:white;margin-left: 1000px">
          全部
        </div>
        <div class="head1">按月统计</div>
        <div class="head1">按年统计</div>
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
        value6:'',
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
</style>
