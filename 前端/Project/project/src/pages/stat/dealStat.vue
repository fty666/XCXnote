<template>
  <div class="body">
    <!--表格-->
    <div class="head flex">
      <div class="font">交易记录</div>
      <div class="head1 Mouse" style="margin-left: 35%" @click="exportFunc('dealTable','交易记录统计')">
        导出数据
      </div>
      <div :class="['head1','Mouse',yday==true?'bj':'']" style="margin-right: 0px" @click="Xyday()">
        昨天
      </div>
      <div :class="['head1','Mouse',Qday==true?'bj':'']" style="margin-right: 0px" @click="XQday">最近7天</div>
      <div :class="['head1','Mouse',Tday==true?'bj':'']" @click="XTday()">最近30天</div>
      <div class="head1" style="width: 150px;border: 1px solid #ddd">
        <el-date-picker
          v-model="times"
          type="daterange"
          value-format="yyyy-MM-dd"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <div class="flex" style="border: 1px solid #ddd;height: 300px;">
      <div class="tables" id="dealTable">
        <el-table
          ref="multipleTable"
          :data="State"
          tooltip-effect="dark"
          style="width: 100%"
          border>
          <el-table-column
            prop="orderCount"
            label="订单数"
            align="center"
            min-width="94">
          </el-table-column>
          <el-table-column
            label="有效订单"
            align="center"
            prop="validOrderCount"
            min-width="140">
          </el-table-column>
          <el-table-column
            prop="orderMain"
            label="总订单金额"
            align="center"
            min-width="140">
          </el-table-column>
          <el-table-column
            prop="refundPrimeTotal"
            align="center"
            min-width="140"
            label="退款金额"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderMemberCount"
            label="有订单会员数"
            align="center"
            min-width="140">
          </el-table-column>
        </el-table>
      </div>
      <!--付款转化-->
      <div class="lu ">
        <div class="lfont1">付款转化率</div>
        <div class="lfont2">{{this.percent}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        times: '',
        State: [],
        percent: '',
        //选择
        yday: true,
        Qday: false,
        Tday: false
      }
    },
    watch: {
      times(v, o) {
        this.selTime();
      }
    },
    methods: {
      //获取交易记录
      getState() {
        this._getData('/api/v1/data_statistics/yesterdayBusiness', {},
          data => {
            this.percent = data.payChangePercent;
            this.circulation(data, data => {
              this.State = data;
            })
          })
      },
      //选择背景
      Xyday() {
        this.Tselect(1);
        this.getState();
      },
      XQday() {
        let data = this.Tselect(2);
        this._getData('/api/v1/data_statistics/old7Business', {},
          data => {
            this.percent = data.payChangePercent;
            this.circulation(data, data => {
              this.State = data;
            })
          })
      },
      XTday() {
        this.Tselect(3);
        this._getData('/api/v1/data_statistics/old30Business', {},
          data => {
            this.percent = data.payChangePercent;
            this.circulation(data, data => {
              this.State = data;
            })
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
      },
      //  时间选择
      selTime() {
        console.log(this.times);
        this._getData('/api/v1/data_statistics/cycleBusiness', {
            start_time: this.times[0],
            end_time: this.times[1],
          },
          data => {
            console.log(data)
            this.percent = data.payChangePercent;
            this.circulation(data, data => {
              this.State = data;
            })
          })
      }
    },
    created() {
      this.getState();
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
