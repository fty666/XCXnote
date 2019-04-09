<template>
  <div class="homePage">
    <!--头部总数-->
    <div class="appUp">
      <div class="appUp-1">
        <div>
          <img src="@/img/order.png" class="appUp-1-lef">
        </div>
        <div class="appUp-1-rig">
          <div class="img-all">今日订单总数</div>
          <div class="number">{{this.statistic.todayOrderCount}}</div>
        </div>
      </div>
      <div class="appUp-2">
        <div class="appUp-2-lef">
          <img src="@/img/today.png" class="appUp-1-lef">
        </div>
        <div class="appUp-2-rig">
          <div class="img-all">今日销售总额</div>
          <div class="number">￥{{this.statistic.todayOrderCount}}</div>
        </div>
      </div>
      <div class="appUp-3">
        <div class="appUp-3-lef">
          <img src="@/img/yestaday.png" class="appUp-1-lef">
        </div>
        <div class="appUp-3-rig">
          <div class="img-all">昨日销售总额</div>
          <div class="number">￥{{this.statistic.yesterdayMoneyTotal}}</div>
        </div>
      </div>
      <div class="appUp-4">
        <div class="appUp-4-lef">
          <img src="@/img/sell.png" class="appUp-1-lef">
        </div>
        <div class="appUp-4-rig">
          <div class="img-all">近7日销售总额</div>
          <div class="number">￥{{this.statistic.old7MoneyTotal}}</div>
        </div>
      </div>
    </div>
    <!--处理事务-->
    <div class="deal">
      <div class="deal-1">
        <div class="deal-1chi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;待处理事务</div>
        <div class="deal-1-bot">
          <div class="deal-1-lef">
            <router-link to="/order/orderList">
              <div class="need Mouse">
                <div class="need-lef">待发货订单</div>
                <div class="need-rig">({{this.affairList.unsend}})</div>
              </div>
            </router-link>
            <router-link to="/dealer/dealerAudit">
              <div class="needs Mouse">
                <span class="needs-lef">待审核经销商</span>
                <span class="needs-rig">({{this.affairList.dealerCount}})</span>
              </div>
            </router-link>
          </div>
          <div class="deal-1-rig">
            <router-link to="/order/orderRefund">
              <div class="need Mouse">
                <div class="need-lef-ano">待确认退款信息</div>
                <div class="need-rig-ano">({{this.affairList.backOrderCount}})</div>
              </div>
            </router-link>
            <router-link to="/warehouse/warehouseList">
              <div class="needs Mouse">
                <span class="needs-lef-ano">平台缺货商品</span>
                <span class="needs-rig-ano">({{this.affairList.warnPingtaiGoodsCount}})</span>
              </div>
            </router-link>
            <router-link to="/warehouse/warehouseList">
              <div class="need Mouse">
                <span class="needs-lef-ano">加盟商缺货商品</span>
                <span class="needs-rig-ano">({{this.affairList.warnAllianceGoodsCount}})</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="deal-2">
        <div class="deal-2chi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;会员统计</div>
        <div class="deal-2chis">
          <div class="deal-2chis-part">
            <div class="deal-2-firstNumber" style="margin-left:21px;">{{this.stateList.todayUserCount}}</div>
            <div class="deal-2-firstWorld" style="margin-left: 20px">今日新增</div>
          </div>
          <div class="deal-2chis-part">
            <div class="deal-2-secondNumber" style="margin-left:21px;">{{this.stateList.yesterdayUserCount}}</div>
            <div class="deal-2-secondWorld" style="margin-left: 20px">昨日新增</div>
          </div>
          <div class="deal-2chis-part">
            <div class="deal-2-thirdNumber">{{this.stateList.monthUserCount}}</div>
            <div class="deal-2-thirdWorld">本月新增</div>
          </div>
          <div class="deal-2chis-part">
            <div class="deal-2-forthNumber">{{this.stateList.allUserCount}}</div>
            <div class="deal-2-forthWorld">会员总数</div>
          </div>
        </div>
      </div>
    </div>
    <!--订单管理-->
    <div class="order-Sta">
      <div class="order-Sta-Chi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单统计</div>
      <div class="order-Sta-lef">
        <div style="padding-top:30px;text-align: center">
          <p>本周订单总数</p>
          <p style="font-size: 28px">{{this.orderPro.thisWeek}}</p>
          <p><span style="color:red;">{{this.orderPro.percentWeek}}↑</span>同比上周</p>
        </div>
        <div style="padding-top:30px;text-align: center">
          <p>本月订单总数</p>
          <p style="font-size: 28px">{{this.orderPro.thisMonth}}</p>
          <p><span style="color:green;">{{this.orderPro.thisMonth}}↓</span>同比上周</p>
        </div>
      </div>
      <div class="order-Sta-rig tableFunc">
        <div class="date">
          <div class="flex">
            <div :class="[sum==true?'Xfonts':'']" @click="Xsum()">
              <div class="state2 fontS Mouse">本周</div>
            </div>
            <div :class="[month==true?'Xfonts':'']" style="margin-left: 0px" @click="Xmonth()">
              <div class="state2 fontS Mouse">本月</div>
            </div>
          </div>
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="Ostimie"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div>
            <ve-line :data="chartData"></ve-line>
          </div>
        </div>
      </div>
    </div>
    <div class="sales-Sta">
      <div class="sales-Sta-Chi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销售统计</div>
      <div class="sales-Sta-lef">
        <div style="padding-top:30px;text-align: center">
          <p>本周销售总额</p>
          <p style="font-size: 28px">{{this.markPro.thisWeek}}</p>
          <p><span style="color:red;">{{this.markPro.percentWeek}}↑</span>同比上周</p>
        </div>
        <div style="padding-top:30px;text-align: center">
          <p>本月销售总额</p>
          <p style="font-size: 28px">{{this.markPro.thisMonth}}</p>
          <p><span style="color:green;">{{this.markPro.percentMonth}}↓</span>同比上月</p>
        </div>
      </div>
      <div class="sales-Sta-rig tableFunc">
        <div class="date">
          <div class="flex">
            <div :class="[Wsell==true?'Xfonts':'']" @click="XWsell()">
              <div class="state2 fontS Mouse">本周</div>
            </div>
            <div :class="[Msell==true?'Xfonts':'']" style="margin-left: 0px" @click="XMsell()">
              <div class="state2 fontS Mouse">本月</div>
            </div>
          </div>
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="Xstime"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div>
            <ve-line :data="sellData"></ve-line>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "homePage",
    data() {
      this.chartSettings = {
        xAxisType: 'time'
      }
      return {
        value6: '',
        statistic: {},
        affairList: {},
        stateList: {},
        orderPro: {},
        markPro: {},
        weekList: [],
        chartData: {
          columns: ['日期', '订单总数'],
          rows: []
        },
        sellData: {
          columns: ['日期', '订单总数'],
          rows: []
        },
        //背景选择
        sum: true,
        month: false,
        Wsell: false,
        Msell: false,
        Ostimie: [],
        Xstime: []
      }
    },
    watch: {
      Ostimie(v, o) {
        this.Ostimes();
      },
      Xstime(v, o) {
        this.Xstimes();
      },
      
    },
    methods: {
      //数据统计
      getStatistic() {
        this._getData('/api/v1/data_statistics/a', {},
          data => {
            this.statistic = data;
          })
      },
      //待处理事务
      affair() {
        this._getData('/api/v1/data_statistics/b', {},
          data => {
          console.log('处理事务')
          console.log(data);
            this.affairList = data;
          })
      },
      //  会员统计
      getstate() {
        this._getData('/api/v1/data_statistics/c', {},
          data => {
            this.stateList = data;
          })
      },
      //  统计概率
      orderProbability() {
        this._getData('/api/v1/data_statistics/d', {},
          data => {
            this.orderPro = data;
          })
      },
      //  销售概率
      markProbability() {
        this._getData('/api/v1/data_statistics/h', {},
          data => {
            this.markPro = data;
          })
      },
      //  订单统计  折标图
      weekOrder() {
        var box = [];
        this._getData('/api/v1/data_statistics/e', {},
          data => {
            this.weekList = data;
            for (let i = 0; i < data.length; i++) {
              box.push({
                '日期': data[i].date,
                '订单总数': data[i].data
              })
            }
            this.chartData.rows = box;
          })
      },
      monthOrder() {
        var box = [];
        this._getData('/api/v1/data_statistics/j', {},
          data => {
            this.weekList = data;
            for (let i = 0; i < data.length; i++) {
              box.push({
                '日期': data[i].date,
                '订单总数': data[i].data
              })
            }
            this.chartData.rows = box;
          })
      },
      Ostimes() {
        var datas = {
          start_time: this.Ostimie[0],
          end_time: this.Ostimie[1],
        }
        var box = [];
        this._getData('/api/v1/data_statistics/g', datas,
          data => {
            this.weekList = data;
            for (let i = 0; i < data.length; i++) {
              box.push({
                '日期': data[i].date,
                '订单总数': data[i].data
              })
            }
            this.chartData.rows = box;
          })
      },
      //销售统计
      weekSell() {
        var box = [];
        this._getData('/api/v1/data_statistics/i', {},
          data => {
            this.weekList = data;
            for (let i = 0; i < data.length; i++) {
              box.push({
                '日期': data[i].date,
                '订单总数': data[i].data
              })
            }
            this.sellData.rows = box;
          })
      },
      monthSell() {
        var box = [];
        this._getData('/api/v1/data_statistics/j', {},
          data => {
            this.weekList = data;
            for (let i = 0; i < data.length; i++) {
              box.push({
                '日期': data[i].date,
                '订单总数': data[i].data
              })
            }
            this.sellData.rows = box;
          })
      },
      Xstimes() {
        var datas = {
          start_time: this.Xstime[0],
          end_time: this.Xstime[1],
        }
        var box = [];
        this._getData('/api/v1/data_statistics/k', datas,
          data => {
            for (let i = 0; i < data.length; i++) {
              box.push({
                '日期': data[i].date,
                '订单总数': data[i].data
              })
            }
            this.sellData.rows = box;
          })
      },
      //  选择背景  折标图
      Xsum() {
        this.weekOrder();
        this.select(1);
      },
      Xmonth() {
        this.monthOrder();
        this.select(2);
      },
      //销售统计
      XWsell() {
        this.weekSell();
        this.select(3);
      },
      XMsell() {
        this.monthSell();
        this.select(4);
      },
      select(flag) {
        this.sum = false;
        this.month = false;
        this.Wsell = false;
        this.Msell = false;
        switch (flag) {
          case 1:
            this.sum = true;
            break;
          case 2:
            this.month = true;
            break;
          case 3:
            this.Wsell = true;
            break;
          case 4:
            this.Msell = true;
            break;
        }
      },
    },
    created() {
      this.getStatistic();
      this.affair();
      this.getstate();
      this.orderProbability();
      this.markProbability();
      this.weekOrder();
      this.weekSell();
    }
  }
</script>

<style scoped>
  .homePage {
    width: 95%;
    margin: 0 auto;
    margin-top: 20px;
    height: 1725px;
    overflow-y: visible;
  }
  
  .fontS {
    font-size: 20px;
    margin: 10px 0px 0px 20px;
  }
  
  .Xfonts {
    color: green;
  }
  
  .appUp {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    height: 162px;
    margin-bottom: 20px;
  }
  
  .appUp-1, .appUp-2, .appUp-3, .appUp-4 {
    margin-left: 30px;
    height: 148px;
    width: 20%;
    border: 1px solid #e5e5e5;
    box-shadow: 5px 5px 5px rgba(204, 204, 204, 0.3490196078431);
  }
  
  .appUp-1-lef, .appUp-2-lef, .appUp-3-lef, .appUp-4-lef {
    height: 90px;
    width: 80px;
    /*border: 1px solid lightgray;*/
    float: left;
    margin: 20px 15px 10px 20px;
  }
  
  .appUp-1-rig, .appUp-2-rig, .appUp-3-rig, .appUp-4-rig {
    height: 70px;
    width: 97px;
    float: left;
    margin: 20px 0px 0px 0;
  }
  
  .img-all {
    width: 150px;
    color: #999999;
    font-size: 16px;
    text-align: left;
    margin-top: 28px;
  }
  
  .number {
    color: #1ABC9C;
    font-size: 18px;
    text-align: left;
  }
  
  .deal {
    display: flex;
    /*justify-content: space-between;*/
    width: 100%;
    margin: 0 auto;
    height: 228px;
    margin-bottom: 20px;
  }
  
  .deal-1 {
    height: 227px;
    width: 45%;
    margin-left: 30px;
    border: 1px solid lightgray;
    box-shadow: 5px 5px 5px rgba(204, 204, 204, 0.3490196078431);
  }
  
  .deal-2 {
    height: 227px;
    width: 45%;
    margin-left: 68px;
    border: 1px solid lightgray;
    box-shadow: 5px 5px 5px rgba(204, 204, 204, 0.3490196078431);
  }
  
  .deal-1chi, .deal-2chi {
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(242, 242, 242, 1);
    text-align: left;
    font-size: 16px;
    font-weight: 700;
  }
  
  .deal-1-bot {
    display: flex;
    justify-content: space-between;
    height: 147px;
    width: 100%;
  }
  
  .deal-1-lef, .deal-1-rig {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 48%;
    height: 145px;
  }
  
  .need, .needs {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    border-bottom: 1px solid rgba(242, 242, 242, 1);
    margin-top: 10px;
  }
  
  .need-lef, .needs-lef, .need-lef-ano, .needs-lef-ano {
    width: 60%;
    height: 48px;
    font-size: 15px;
    text-align: left;
    padding-top: 14px;
    padding-left: 15px;
  }
  
  .need-rig, .needs-rig, .need-rig-ano, .needs-rig-ano {
    width: 15%;
    height: 48px;
    font-size: 15px;
    padding-top: 14px;
    text-align: left;
  }
  
  .deal-2chis {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 150px;
    width: 100%;
    /*background-color: #ffd8f2;*/
  }
  
  .deal-2chis-part {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 20%;
    /*border: 1px solid red*/
  }
  
  .deal-2-firstNumber, .deal-2-secondNumber, .deal-2-thirdNumber, .deal-2-forthNumber {
    width: 50%;
    font-size: 25px;
    color: #1ABC9C;
    padding: 5px;
  }
  
  .deal-2-firstWorld, .deal-2-secondWorld, .deal-2-thirdWorld, .deal-2-forthWorld {
    width: 80%;
    font-size: 14px;
    /*border: 1px solid gray;*/
    padding: 5px;
  }
  
  .order-Sta {
    width: 98%;
    margin: 0 auto;
    height: 600px;
    border: 1px solid lightgray;
    margin-bottom: 20px;
    margin-left: 30px;
  }
  
  .sales-Sta {
    width: 98%;
    margin: 0 auto;
    height: 600px;
    border: 1px solid lightgray;
    margin-bottom: 20px;
    margin-left: 30px;
  }
  
  .order-Sta-Chi, .sales-Sta-Chi {
    height: 60px;
    line-height: 60px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 20px;
    background-color: rgba(242, 242, 242, 1);
    text-align: left;
    font-weight: 700;
    font-size: 17px;
  }
  
  .order-Sta-lef, .sales-Sta-lef {
    width: 15%;
    height: 540px;
    border-right: 1px solid lightgray;
    float: left;
  }
  
  .order-Sta-rig, .sales-Sta-rig {
    width: 84%;
    float: right;
  }

</style>
