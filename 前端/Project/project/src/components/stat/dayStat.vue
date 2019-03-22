<template>
  <div>
    <div class="head flex">
      <div class="font2">平台日营业额查询</div>
      <div class="head1" style="margin-left: 30%">导出数据</div>
      <div :class="['head1',yday==true?'bj':'']" style="margin: 10px 0px 0px 5%" @click="Xyday()">
        过去7天
      </div>
      <div :class="['head1',Qday==true?'bj':'']" style="margin-right: 0px" @click="XQday">过去30天</div>
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
    <div style="width: 99.8%;margin: 10px 0px 0px 0px">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="月份"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="date"
          label="总订单数"
          align="center"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="有效订单数"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          min-width="160"
          label="无效订单数">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="总营业额"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="已退款金额"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="平台利润"
          min-width="189">
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
  export default {
    name: "",
    data() {
      return {
        tableData: [{
          value1:'',
          date: '2016-05-02',
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
  .bj {
    background-color: rgba(0, 153, 153, 1);
    color: white;
  }
</style>
