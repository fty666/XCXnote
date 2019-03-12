<template>
  <div class="body">
    <!--表格-->
    <div class="head flex">
      <div class="font">交易记录</div>
      <div class="head1" style="margin-left: 35%">导出数据</div>
      <div :class="['head1',yday==true?'bj':'']" style="margin-right: 0px" @click="Xyday()">
        昨天
      </div>
      <div :class="['head1',Qday==true?'bj':'']" style="margin-right: 0px" @click="XQday">最近7天</div>
      <div :class="['head1',Tday==true?'bj':'']" @click="XTday()">最近30天</div>
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
            label="订单数"
            align="center"
            min-width="94">
          </el-table-column>
          <el-table-column
            label="有效订单"
            align="center"
            min-width="140">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="总订单金额"
            align="center"
            min-width="140">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            min-width="140"
            label="退款金额"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="name"
            label="有订单会员数"
            align="center"
            min-width="140">
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
    data() {
      return {
        input: '',
        value1: '',
        value6: '',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }],
        //选择
        yday: true,
        Qday: false,
        Tday: false
      }
    },
    methods: {
      //选择背景
      Xyday() {
        this.Tselect(1);
      },
      XQday() {
        let data = this.Tselect(2);
      },
      XTday() {
        this.Tselect(3);
      },
      Tselect(flag) {
        this.yday = false;
        this.Qday = false;
        this.Tday = false;
        switch (flag) {
          case 1:
            this.yday = true;
            break;
          case 2:
            this.Qday = true;
            break;
          case 3:
            this.Tday = true;
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .font {
    text-align: left;
    margin: 0px 0px 0px 30px;
    color: black;
    font-weight: 700;
    font-size: 16px;
  }
  
  .tables {
    width: 60%;
    margin: 80px 0px 0px 80px;
  }
  
  .lu {
    width: 30%;
  }
  
  .lfont1 {
    margin: 80px 0px 0px 50px;
    font-size: 16px;
  }
  
  .lfont2 {
    margin: 30px 0px 0px 50px;
    font-size: 40px;
    color: lightcoral;
  }
  
  .bj {
    background-color: rgba(0, 153, 153, 1);
    color: white;
  }
</style>
