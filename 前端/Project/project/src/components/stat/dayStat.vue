<template>
  <div>
    <div class="head flex">
      <div class="font2">平台日营业额查询</div>
      <div class="head1" style="margin-left: 30%" @click="exportFunc('dayList','月营业额统计')">导出数据</div>
      <div :class="['head1','Mouse',yday==true?'bj':'']" style="margin: 10px 0px 0px 5%" @click="Xyday()">
        过去7天
      </div>
      <div :class="['head1','Mouse',Qday==true?'bj':'']" style="margin-right: 0px" @click="XQday">过去30天</div>
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
    <div style="width: 99.8%;margin: 10px 0px 0px 0px" id="dayList">
      <el-table
        :data="dayList"
        border
        style="width: 100%">
        <el-table-column
          prop="times"
          label="日期"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="countOrder"
          label="总订单数"
          align="center"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="validOrderCount"
          align="center"
          label="有效订单数"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="noValidOrderCount"
          align="center"
          min-width="160"
          label="无效订单数">
        </el-table-column>
        <el-table-column
          prop="normalPayTotal"
          align="center"
          label="总营业额"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="refundPayTotal"
          align="center"
          label="已退款金额"
          min-width="150">
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
    name: "",
    data() {
      return {
        //选择
        yday: true,
        Qday: false,
        Tday: false,
        value1:'',
        dayList:[]
      }
    },
    methods: {
      //获取过去7天统计
      getDay(){
        this._getData('/api/v1/order/old7day', {
          consigner_type:1
        }, data => {
          for(let item in data){
            data[item].times=item;
            this.dayList.push(data[item])
          }
        })
      },
      //获取过去30天的统计
      threeDay(){
        this._getData('/api/v1/order/old30day', {
          consigner_type:1
        }, data => {
          for(let item in data){
            data[item].times=item;
            this.dayList.push(data[item])
          }
        })
      },
      //选择背景
      Xyday() {
        this.getDay();
        this.Tselect(1);
      },
      XQday() {
        this.threeDay()
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
    },
    created(){
      this.getDay();
    }
  }
</script>

<style scoped>
  .bj {
    background-color: rgba(0, 153, 153, 1);
    color: white;
  }
</style>
