<template>
  <div class="body">
    <!--表格-->
    <div class="head flex">
      <div class="font">积分统计</div>
      <div :class="['head1',yday==true?'bj':'']" style="margin-left: 40%" @click="Xyday()">
        全部
      </div>
      <div :class="['head1',Qday==true?'bj':'']" style="margin-right: 0px" @click="XQday">按月统计</div>
      <div :class="['head1',Tday==true?'bj':'']" @click="XTday()">按年统计</div>
      <div class="head1" style="width: 150px;border: 1px solid #ddd">
        <el-date-picker
          v-model="value1"
          style="width: 150px"
          @click=""
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
          :data="stateList"
          tooltip-effect="dark"
          style="width: 76.5%"
          border>
          <el-table-column
            label="已领取总积分"
            prop="获取"
            align="center"
            min-width="250">
          </el-table-column>
          <el-table-column
            prop="消费"
            align="center"
            label="已兑换总积分"
            min-width="250">
          </el-table-column>
          <el-table-column
            prop="money"
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
          :data="stateList"
          tooltip-effect="dark"
          style="width: 55.1%"
          border>
          <el-table-column
            label="签到领取"
            align="center"
            prop="签到"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="订单"
            align="center"
            label="订单获取"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="邀请"
            align="center"
            label="邀请获取"
            min-width="80"
          >
          </el-table-column>
          <el-table-column
            prop="抵现"
            align="center"
            label="订单抵现"
            min-width="80"
          >
          </el-table-column>
          <el-table-column
            prop="兑换"
            align="center"
            label="全积分兑换"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="积分加金额"
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
    data() {
      return {
        input: '',
        value1: '',
        value6: '',
        stateList:[],
        //选择
        yday: true,
        Qday: false,
        Tday: false
      }
    },
    methods: {
      //  积分统计
      getState() {
        this._getData('/api/v1/integral_record/statistics', {},
          data => {
            console.log(data)
            this.stateList=data;
          })
      },
      //全部
      Xyday() {
        this.Tselect(1);
        this.getState();
      },
      //按月选择
      XQday() {
        this.Tselect(2);
        var datas=new Date();
        var year=datas.getFullYear();
        var month=parseInt(datas.getMonth())+1;
        this._getData('/api/v1/integral_record/statistics', {
            date:year+'-'+month
          }, data => {
            this.stateList=data;
          })
      },
      XTday() {
        this.Tselect(3);
        var datas=new Date();
        var year=datas.getFullYear();
        this._getData('/api/v1/integral_record/statistics', {
          date:year
        }, data => {
          this.stateList=data;
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
    created(){
      this.getState()
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
    margin: 40px 0px 0px 100px;
  }
  .bj {
    background-color: rgba(0, 153, 153, 1);
    color: white;
  }
</style>
