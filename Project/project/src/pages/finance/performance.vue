<template>
  <div class="body">
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div :class="['state', 'flex',membe==true?'bj':'']" @click="Xmembe()">
        <div class="state2">会员统计</div>
      </div>
      <div :class="['state', 'flex',membe==false?'bj':'']" style="margin-left: 0px" @click="Xorder()">
        <div class="state2">订单统计</div>
      </div>
    </div>
    <div v-if="membe==true">
      <memberstate></memberstate>
    </div>
    <div v-if="membe==false">
      <orderstate></orderstate>
    </div>
  </div>
</template>

<script>
  import memberstate from '@/components/allianceState/memberState'
  import orderstate from '@/components/allianceState/orderState'
  export default {
    name: "",
    data(){
      return{
        membe:true
      }
    },
    components:{
      memberstate,
      orderstate
    },
    methods: {
    //  会员选择
      Xmembe(){
        this.membe=true;
      },
      Xorder(){
        this.membe=false;
      }
    }
  }
</script>

<style scoped>
  .font{
    text-align: left;
    margin: 0px 0px 0px 30px;
    color: black;
    font-weight:700 ;
    font-size: 16px;
  }
  .tables{
    width: 90%;
    margin: 40px 0px 0px 6%;
  }
  .bj {
    background-color: rgba(0, 153, 153, 1);
    color: white;
  }
</style>
