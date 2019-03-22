<template>
  <div>
    <div class="head flex">
      <div class="font2">平台总营业额查询</div>
      <div :class="['head1',yday==true?'bj':'']" style="margin: 10px 0px 0px 40%" @click="Xyday()">
        全部
      </div>
      <div :class="['head1',Qday==true?'bj':'']" style="margin-right: 0px" @click="XQday">按月统计</div>
      <div :class="['head1',Tday==true?'bj':'']" @click="XTday()">按年统计</div>
      <div class="head1" style="width: 150px;border: 1px solid #ddd">
        <el-date-picker
          v-model="Stimes"
          style="width: 150px"
          type="date"
          size="mini"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
    <div style="width: 99.8%;margin: 10px 0px 0px 0px">
      <el-table
        :data="platformList"
        border
        style="width: 100%">
        <el-table-column
          prop="countOrder"
          label="总订单数"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="validOrderCount"
          align="center"
          label="有效订单数"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="noValidOrderCount"
          align="center"
          min-width="180"
          label="无效订单数">
        </el-table-column>
        <el-table-column
          prop="normalPayTotal"
          align="center"
          label="总营业额"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="refundPayTotal"
          align="center"
          label="已退款金额"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="profit"
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
    data() {
      return {
        Stimes: '',
        //选择
        yday: true,
        Qday: false,
        Tday: false,
        platformList: []
      }
    },
    watch: {
      Stimes(v, o) {
        console.log(v)
        this.selectTimes();
      }
    },
    methods: {
      //获取平台总营业额
      getSum(val) {
        var data = {};
        if (val != '') {
          data.create_time = val;
        }
        data.consigner_type = 1;
        this._getData('/api/v1/order/businessVolume', data, data => {
          this.circulation(data, data => {
            this.platformList = data;
          })
        })
      },
      //选择年月
      selectTimes() {
        var data = {};
        data.create_time = this.Stimes;
        data.consigner_type = 1;
        this._getData('/api/v1/order/businessVolume', data, data => {
          this.circulation(data, data => {
            this.platformList = data;
          })
        })
      },
      //选择背景
      Xyday() {
        this.Tselect(1);
        this.getSum();
      },
      XQday() {
        let data = this.Tselect(2);
        this.getTimes('M', data => {
          this.getSum(data);
        })
      },
      XTday() {
        this.Tselect(3);
        this.getTimes('Y', data => {
          console.log(data)
          this.getSum(data);
        })
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
    },
    created() {
      this.getSum();
    }
  }
</script>

<style scoped>
  .bj {
    background-color: rgba(0, 153, 153, 1);
    color: white;
  }
</style>
