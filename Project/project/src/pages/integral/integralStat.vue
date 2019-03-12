<template>
  <div class="body">
    <!--表格-->
    <div class="head flex">
      <div class="font">积分统计</div>
      <div class="head1" style="background-color: rgba(0, 153, 153, 1);color:white;margin-left: 46%;margin-right: 0px">
        全部
      </div>
      <div class="head1" style="margin-right: 0px">按月统计</div>
      <div class="head1" style="margin-right: 0px">按年统计</div>
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
    <div style="border: 1px solid #ddd;height: 350px;">
      <div class="tables">
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 76.5%"
          border>
          <el-table-column
            label="已领取总积分"
            align="center"
            min-width="250">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="已兑换总积分"
            min-width="250">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="已抵现总金额"
            min-width="250"
           >
          </el-table-column>
        </el-table>
      </div>
      <div class="tables">
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 55.1%"
          border>
          <el-table-column
            label="签到领取"
            align="center"
            min-width="80">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="订单获取"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="邀请获取"
            min-width="80"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="订单抵现"
            min-width="80"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="全积分兑换"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="积分+金额兑换"
            min-width="120"
          >
          </el-table-column>
        </el-table>
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
          date: '2016',
          name: '王小虎',
          address: '上海市'
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
  .tables{
    width: 90%;
    margin: 40px 0px 0px 100px;
  }
</style>
