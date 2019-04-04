<template>
  <div class="body">
    <!--回购-->
    <div class="flex" style="margin-top: 30px;">
      <div :class="[ 'state','Mouse','flex', dealer==true?'bj':'']" @click="dealerInfo()">
        <div class="state2">平台强制回购</div>
      </div>
      <div :class="[ 'state','Mouse','flex', members==true?'bj':'']" @click="member" style="margin-left: 0px">
        <div class="state2">经销商申请回购</div>
      </div>
      <router-link to="/dealer/buyRecord">
        <div :class="[ 'state','Mouse','flex']" style="margin-left: 0px">
          <div class="state2">回购记录</div>
        </div>
      </router-link>
    </div>
    <!--表格头  平台强制回购 -->
    <div v-if="dealer==true">
      <platDealer></platDealer>
    </div>
    <!--经销商申请回购-->
    <div v-else>
      <dealerApply ref="child1"></dealerApply>
    </div>
  </div>
</template>

<script>
  import platDealer from '@/components/dealerBuy/platDealer'
  import dealerApply from '@/components/dealerBuy/dealerApply'
  
  export default {
    data() {
      return {
        //  经销商信息选择
        dealer: true,
        members: false,
      }
    },
    components: {
      platDealer,
      dealerApply
    },
    methods: {
      manage() {
        this.centerDialogVisible = true;
      },
      //平台申请
      dealerInfo() {
        this.dealer = true;
        this.members = false;
      },
      //  经销商申请回购
      member() {
        this.dealer = false;
        this.members = true;
      }
    },
    created() {
    }
  }
</script>

<style scoped>
</style>
