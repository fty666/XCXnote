<template>
  <div class="homePage">
    <!--头部总数-->
    <div class="appUp">
      <div class="appUp-1">
        <div class="appUp-1-lef"><img src="" alt=""></div>
        <div class="appUp-1-rig">
          <p class="img-all">今日订单总数</p>
          <p class="number">200</p>
        </div>
      </div>
      <div class="appUp-2">
        <div class="appUp-2-lef"><img src="" alt=""></div>
        <div class="appUp-2-rig">
          <p class="img-all">今日销售总额</p>
          <p class="number">￥200</p>
        </div>
      </div>
      <div class="appUp-3">
        <div class="appUp-3-lef"><img src="" alt=""></div>
        <div class="appUp-3-rig">
          <p class="img-all">昨日销售总额</p>
          <p class="number">￥200</p>
        </div>
      </div>
      <div class="appUp-4">
        <div class="appUp-4-lef"><img src="" alt=""></div>
        <div class="appUp-4-rig">
          <p class="img-all">近7日销售总额</p>
          <p class="number">￥200</p>
        </div>
      </div>
    </div>
    <!--处理事务-->
    <div class="deal">
      <div class="deal-1">
        <div class="deal-1chi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;待处理事务</div>
        <div class="deal-1-bot">
          <div class="deal-1-lef">
            <div class="need">
              <div class="need-lef">待发货订单</div>
              <div class="need-rig">(10)</div>
            </div>
            
            <div class="needs">
              <span class="needs-lef">待发货配货订单</span>
              <span class="needs-rig">(10)</span>
            </div>
          </div>
          <div class="deal-1-rig">
            <div class="need">
              <div class="need-lef-ano">待确认退款信息</div>
              <div class="need-rig-ano">(10)</div>
            </div>
            
            <div class="needs">
              <span class="needs-lef-ano">缺货商品</span>
              <span class="needs-rig-ano">(10)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="deal-2">
        <div class="deal-2chi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;会员统计</div>
        <div class="deal-2chis">
          <div class="deal-2chis-part">
            <div class="deal-2-firstNumber" style="margin-left:21px;">200</div>
            <div class="deal-2-firstWorld" style="margin-left: 20px">今日新增</div>
          </div>
          <div class="deal-2chis-part">
            <div class="deal-2-secondNumber" style="margin-left:21px;">200</div>
            <div class="deal-2-secondWorld" style="margin-left: 20px">昨日新增</div>
          </div>
          <div class="deal-2chis-part">
            <div class="deal-2-thirdNumber">1000</div>
            <div class="deal-2-thirdWorld">本月新增</div>
          </div>
          <div class="deal-2chis-part">
            <div class="deal-2-forthNumber">5000</div>
            <div class="deal-2-forthWorld">会员总数</div>
          </div>
        </div>
      </div>
    </div>
    <!--订单管理-->
    <div class="order-Sta" >
      <div class="order-Sta-Chi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单统计</div>
      <div class="order-Sta-lef">
        <div style="padding-top:30px;text-align: center">
          <p>本周订单总数</p>
          <p style="font-size: 28px">1000</p>
          <p><span style="color:red;">100%↑</span>同比上周</p>
        </div>
        <div style="padding-top:30px;text-align: center">
          <p>本月订单总数</p>
          <p style="font-size: 28px">10000</p>
          <p><span style="color:green;">10%↓</span>同比上周</p>
        </div>
      </div>
      <div class="order-Sta-rig tableFunc">
        <div class="date"><span>今日&nbsp &nbsp</span><span style="color:green">本周</span><span>&nbsp &nbsp本月</span>
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value6"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>
    <div class="sales-Sta">
      <div class="sales-Sta-Chi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销售统计</div>
      <div class="sales-Sta-lef">
        <div style="padding-top:30px;text-align: center">
          <p>本周销售总额</p>
          <p style="font-size: 28px">1000</p>
          <p><span style="color:red;">10%↑</span>同比上周</p>
        </div>
        <div style="padding-top:30px;text-align: center">
          <p>本月销售总额</p>
          <p style="font-size: 28px">60000</p>
          <p><span style="color:green;">10%↓</span>同比上月</p>
        </div>
      </div>
      <div class="sales-Sta-rig tableFunc">
        <div class="date"><span>今日&nbsp &nbsp</span><span style="color:green">本周</span><span>&nbsp &nbsp本月</span>
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value6"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
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
      return {
        value6:'',
      }
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
    height: 70px;
    width: 68px;
    border: 1px solid lightgray;
    float: left;
    margin: 43px 15px 0px 20px;
    
  }
  
  .appUp-1-rig, .appUp-2-rig, .appUp-3-rig, .appUp-4-rig {
    height: 70px;
    width: 97px;
    float: left;
    margin: 20px 20px 0px 0;
  }
  
  .img-all {
    width:150px;
    color: #999999;
    font-size: 18px;
    
  }
  
  .number {
    color: #1ABC9C;
    font-size: 28px;
  }
  
  .deal {
    display: flex;
    /*justify-content: space-between;*/
    width: 100%;
    margin: 0 auto;
    height: 228px;
    margin-bottom: 20px;
  }
  
  .deal-1{
    height: 227px;
    width: 40%;
    margin-left: 30px;
    border: 1px solid lightgray;
    box-shadow: 5px 5px 5px rgba(204, 204, 204, 0.3490196078431);
  }
  .deal-2{
    height: 227px;
    width: 40%;
    margin-left: 200px;
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
    width: 45%;
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
    margin-left: 10px;
    width: 47%;
    height: 48px;
    font-size: 17px;
    text-align: left;
    padding-top: 14px;
    padding-left:18px;
  }
  
  .need-rig, .needs-rig, .need-rig-ano, .needs-rig-ano {
    width: 15%;
    height: 48px;
    font-size: 17px;
    padding-top: 14px;
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
  
  .deal-2-firstNumber,.deal-2-secondNumber,.deal-2-thirdNumber,.deal-2-forthNumber{
    width: 50%;
    font-size: 26px;
    color:#1ABC9C;
    padding:5px;
  }
  
  .deal-2-firstWorld,.deal-2-secondWorld,.deal-2-thirdWorld,.deal-2-forthWorld {
    width: 48%;
    font-size: 16px;
    /*border: 1px solid gray;*/
    padding:5px;
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
  
  .order-Sta-rig,.sales-Sta-rig {
    width: 84%;
    float: right;
  }

</style>
