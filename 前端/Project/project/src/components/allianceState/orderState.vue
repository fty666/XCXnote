<template>
  <div>
    <div class="head flex">
      <div class="font" style="width: 30%">订单统计</div>
      <div style="width: 60%">
        <div class="flex">
          <div class="head1 Mouse" style="margin-left: 15%" @click="exportFunc('orderTable','订单统计')">导出数据</div>
          <div :class="['head1','Mouse',yday==true?'bj':'']" style="margin-right: 0px" @click="Xyday()">
            昨天
          </div>
          <div :class="['head1','Mouse',Qday==true?'bj':'']" style="margin-right: 0px" @click="XQday">按月统计</div>
          <div :class="['head1','Mouse',Tday==true?'bj':'']" @click="XTday()">按年统计</div>
          <div :class="['head1','Mouse',all==true?'bj':'']" @click="Xall()">全部</div>
          <div class="head1" style="width: 150px;border: 1px solid #ddd">
            <el-date-picker
              v-model="times"
              style="width: 150px"
              value-format="yyyy-MM-dd"
              type="date"
              size="mini"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>
    <div style="border: 1px solid #ddd;height: 600px;">
      <div class="tables" id="orderTable">
        <el-table
          ref="multipleTable"
          :data="membeList"
          tooltip-effect="dark"
          style="width: 100%"
          border>
          <el-table-column
            label="排名"
            type="index"
            width="100px"
            align="center">
          </el-table-column>
          <el-table-column
            label="加盟商名称"
            prop="name"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="newMemberCount"
            label="新增会员数"
            align="center"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="allMemberCount"
            label="全部会员数"
            align="center"
            min-width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderMemberCount"
            label="有订单会员数"
            align="center"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="buyPercent"
            label="购买率"
            align="center"
            min-width="200">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "memberState",
    data() {
      return {
        times:'',
        membeList: [],
        //选择
        yday: true,
        Qday: false,
        Tday: false,
        totals: '',
        all: '',
      }
    },
    watch: {
      times(v, o) {
        this.selcTimes();
      }
    },
    methods: {
      //获取会员
      getMembe() {
        this._getData('/api/v1/alliance/yesterdayMember', {}, data => {
          this.membeList = data;
        })
      },
      //时间选择
      selcTimes() {
        this._getData('/api/v1/alliance/yearMonthDayOrder', {
          create_time: this.times
        }, data => {
          this.membeList = data;
        })
      },
      //选择背景
      Xyday() {
        this.Tselect(1);
        this.getMembe();
      },
      XQday() {
        let data = this.Tselect(2);
        this.getTimes('M', data => {
          console.log(data)
          this._getData('/api/v1/alliance/yearMonthMember', {create_time: data}, data => {
            this.membeList = data;
          })
        })
      },
      XTday() {
        this.Tselect(3);
        this.getTimes('Y', data => {
          this._getData('/api/v1/alliance/yearMember', {create_time: data}, data => {
            this.membeList = data;
          })
        })
      },
      Xall() {
        this.Tselect(4);
        this._getData('/api/v1/alliance/allOrder', {}, data => {
          this.membeList = data;
        })
      },
      Tselect(flag) {
        this.yday = false;
        this.Qday = false;
        this.Tday = false;
        this.all = false;
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
          case 4:
            this.all = true;
            break;
        }
      }
    },
    created() {
      this.getMembe();
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
    width: 90%;
    margin: 40px 0px 0px 6%;
  }
  
  .bj {
    background-color: rgba(0, 153, 153, 1);
    color: white;
  }
</style>
