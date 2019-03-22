<template>
  <div class="body">
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div :class="['state', 'flex',sum==true?'bj':'']" @click="Xsum()">
        <div class="state2">总营业额统计</div>
        <div class="state3" style="color: white">(1000)</div>
      </div>
      <div :class="['state', 'flex',month==true?'bj':'']" style="margin-left: 0px" @click="Xmonth()">
        <div class="state2">月营业额统计</div>
      </div>
      <div :class="['state', 'flex',day==true?'bj':'']" style="margin-left: 0px" @click="Xday()">
        <div class="state2">日营业额统计</div>
      </div>
      <div :class="['state', 'flex',bshop==true?'bj':'']" style="margin-left: 0px" @click="Xshop()">
        <div class="state2">商品成本列表</div>
      </div>
    </div>
    <!--表格-->
    <!--总统计额-->
    <div v-if="sum==true">
      <sumStat></sumStat>
    </div>
    <!--月营业额-->
    <div v-if="month==true">
      <monthStat></monthStat>
    </div>
    <!--日营业额-->
    <div v-if="day==true">
      <dayStat></dayStat>
    </div>
    <!--商品成本列表-->
    <div v-if="bshop==true">
      <shopStat></shopStat>
    </div>
  </div>
</template>

<script>
  import sumStat from '@/components/stat/sumStat'
  import monthStat from '@/components/stat/monthStat'
  import dayStat from '@/components/stat/dayStat'
  import shopStat from '@/components/stat/shopStat'
  
  export default {
    name: "",
    data() {
      return {
        input: '',
        value1: '',
        value6: '',
        //背景选择
        sum: true,
        month: false,
        day: false,
        bshop: false
      }
    },
    components: {
      sumStat,
      monthStat,
      dayStat,
      shopStat
    },
    methods: {
      //  选择背景
      Xsum() {
        this.select(1);
      },
      Xmonth() {
        this.select(2);
      },
      Xday() {
        this.select(3);
      },
      Xshop() {
        this.select(4);
      },
      select(flag) {
        this.sum = false;
        this.month = false;
        this.day = false;
        this.bshop = false;
        switch (flag) {
          case 1:
            this.sum = true;
            break;
          case 2:
            this.month = true;
            break;
          case 3:
            this.day = true;
            break;
          case 4:
            this.bshop = true;
            break;
        }
      }
    }
  }
</script>

<style scoped>
  
  .bj {
    background-color: rgba(0, 153, 153, 1);
    color: white;
  }
</style>
