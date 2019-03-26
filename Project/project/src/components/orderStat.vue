<template>
  <!--数量管理-->
  <div class="flex" style="margin-top: 20px;">
    <div class="state flex" style="background-color:rgba(0, 153, 153, 1);">
      <div class="state2" style="color: white">全部商品</div>
      <div class="state3" style="color: white">({{this.orderStatus[7]['cnt']}})</div>
    </div>
    <div class="state flex">
      <div class="state2">待付款</div>
      <div class="state3">({{this.orderStatus[0]['cnt']}})</div>
    </div>
    <div class="state flex">
      <div class="state2">待发货</div>
      <div class="state3">({{this.orderStatus[2]['cnt']}})</div>
    </div>
    <div class="state flex">
      <div class="state2">已发货</div>
      <div class="state3">({{this.orderStatus[3]['cnt']}})</div>
    </div>
    <div class="state flex">
      <div class="state2">已完成</div>
      <div class="state3">({{this.orderStatus[5]['cnt']}})</div>
    </div>
    <div class="state flex">
      <div class="state2">已关闭</div>
      <div class="state3">({{this.orderStatus[0]['cnt']}})</div>
    </div>
    <div class="state flex">
      <div class="state2">平台订单</div>
      <div class="state3">({{this.orderStatus[8]['cnt']}})</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "orderStat",
    data() {
      return {
        orderStatus: [],
      }
    },
    methods: {
      //订单发货状态
      Status() {
        this._getData('/api/v1/order/status', {}, data => {
          console.log(data)
          this.orderStatus = data;
        })
      }
    },
    created() {
      this.Status();
    }
  
  }
</script>

<style scoped>

</style>
