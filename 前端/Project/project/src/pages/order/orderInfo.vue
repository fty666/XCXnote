<template>
  <div class="body">
    <!--头部-->
    <div class="spaces whiteT kuan">
      <div style="width: 80%">
        <div class="font1">当前订单转态：{{this.orderList}}</div>
        <div class="flex">
          <div class="bian">发货</div>
          <div class="bian">修改收货信息</div>
          <div class="bian">备注订单</div>
          <div class="bian">修改归属</div>
          <div class="bian">发起配货</div>
          <div class="bian">订单退款</div>
        </div>
      </div>
      <router-link to="/order/orderList" v-if="orderManag==1">
        <div class="bian" style="margin: 40px 20px 0px 0px">返回列表</div>
      </router-link>
      <router-link to="/integral/getIntegral" v-if="orderManag==2">
        <div class="bian" style="margin: 40px 20px 0px 0px">返回列表</div>
      </router-link>
      <router-link to="/integral/getConversion" v-if="orderManag==3">
        <div class="bian" style="margin: 40px 20px 0px 0px">返回列表</div>
      </router-link>
    </div>
    <!--订单信息-->
    <!--选择信息-->
    <div class="flex" style="margin-top: 30px;">
      <div :class="[ 'state','flex', dealer==true?'bj':'']" @click="dealerInfo()">
        <div class="state2">订单信息</div>
      </div>
      <div :class="[ 'state','flex', members==true?'bj':'']" @click="member()" style="margin-left: 0px">
        <div class="state2">收货信息</div>
      </div>
    </div>
    <!--订单信息-->
    <div v-if="dealer==true">
      <orderInfo ref="headerChild" v-on:Status="Status"></orderInfo>
    </div>
    <!--收货信息-->
    <div v-else>
      <div class="head">
        <div class="backfont"> 物流信息</div>
      </div>
      <div class="flex xiu" style="height: 140px;width: 100%">
        <div class="sfont">
          收货地址：{{this.$refs.headerChild.orderInfo.address}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import orderInfo from '@/components/order/orderInfo'
  
  export default {
    data() {
      return {
        dealer: true,
        members: false,
        orderManag: false,
        orderList: {}
      }
    },
    components: {
      orderInfo
    },
    methods: {
      Status(Status) {
        console.log(Status)
        this.orderList = Status;
      },
      //经销商信息
      dealerInfo() {
        this.dealer = true;
        this.members = false;
      },
      //  会员信息
      member() {
        this.dealer = false;
        this.members = true;
      },
      //  页面跳转
      skip(val) {
        switch (val) {
          case '订单管理':
            this.orderManag = '1';
            break;
          case'已领取积分订单':
            this.orderManag = '2';
            break;
          case'已兑换积分订单':
            this.orderManag = '3';
            break;
        }
      }
    },
    created() {
      this.Status();
      this.skip(sessionStorage.getItem('page'))
    }
  }
</script>

<style scoped>
  .kuan {
    background-color: rgba(255, 204, 204, 0.498039215686275);
    height: 110px;
    border: 1px solid rgba(255, 204, 204, 1);
  }
  
  .font1 {
    text-align: left;
    margin: 20px 0px 0px 30px;
    font-size: 16px;
    color: black;
    font-weight: 600;
  }
  
  .bian {
    text-align: left;
    width: 100px;
    height: 30px;
    border: 1px solid black;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
    margin: 20px 0px 0px 30px;
    background-color: rgba(255, 255, 255, 1);
  }
  
  .sfont {
    margin: 20px 0px 0px 20px;
    text-align: left;
    font-size: 15px;
  }
</style>
