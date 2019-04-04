<template>
  <div class="body">
    <div class="flex xiu" style="height: 120px;margin-top: 40px">
      <div style="margin-left: 60px">
        <img :src="imggerUrl+this.dealerList.photo"  class="imgs">
      </div>
      <div class="sequence" style="width: 70%;margin: 30px 0px 0px 0px">
        <div class="flex pian" style="margin-left: 30px">
          <div>用户ID：</div>
          <div>{{this.dealerList.id}}</div>
        </div>
        <div class="flex pian">
          <div>用户账号：</div>
          <div>{{this.dealerList.mobile}}</div>
        </div>
        <div class="flex pian">
          <div>注册时间：</div>
          <div>{{this.dealerList.create_time}}</div>
        </div>
        <div class="flex pian">
          <div>所属地区：</div>
          <div>{{this.dealerList.alliance}}</div>
        </div>
        <div class="flex pian" style="margin-left: 32px;">
          <div>昵称：</div>
          <div>{{this.dealerList.nickname}}</div>
        </div>
        <div class="flex pian">
          <div>生日：</div>
          <div>{{this.dealerList.birthday}}</div>
        </div>
        <div class="flex pian">
          <div>性别：</div>
          <div>{{this.dealerList.sex}}</div>
        </div>
        <div class="flex pian">
          <div>余额：</div>
          <div>{{this.dealerList.mobile}}</div>
        </div>
      </div>
      <router-link to="/dealer/dealerList">
        <div class="clos">返回列表</div>
      </router-link>
    </div>
    <!--选择信息-->
    <div class="flex" style="margin-top: 30px;">
      <div :class="[ 'state','Mouse','flex', dealer==true?'bj':'']" @click="dealerInfo()">
        <div class="state2">经销商信息</div>
      </div>
      <div :class="[ 'state','Mouse','flex', members==true?'bj':'']" @click="member()" style="margin-left: 0px">
        <div class="state2">会员信息</div>
      </div>
    </div>
    <!--经销商信息-->
    <div v-if="dealer==true">
      <Dinfo ref="headerChild" :deInfo="dealerList"></Dinfo>
    </div>
    <div v-else>
      <MemberInfo ></MemberInfo>
    </div>
  </div>
</template>

<script>
  import Dinfo from '@/components/delaer/Dinfo'
  import MemberInfo from '@/components/delaer/MemberInfo'
  
  export default {
    components: {
      Dinfo,
      MemberInfo
    },
    data() {
      return {
        value: '',
        //  经销商信息选择
        dealer: true,
        members: false,
        dealerList:{}
      }
    },
    methods: {
      //经销商信息
      dealerInfo() {
        this.dealer = true;
        this.members = false;
      },
      //  获取经销商信息
      getDealer() {
        this._getData('/api/v1/user/show', {
          id: sessionStorage.getItem('dealerId'),
        }, data => {
          this.dealerList=data;
        })
      },
      //  会员信息
      member() {
        this.dealer = false;
        this.members = true;
      },
    },
    created(){
      this.getDealer();
    }
  }
</script>

<style scoped>
  
  .font {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    line-height: 50px;
  }
  
  /*用户信息*/
  .imgs {
    border: 1px solid #ddd;
    width: 80px;
    height: 80px;
    margin-top: 20px;
  }
  
  .pian {
    width: 23%;
    font-size: 15px;
    /*margin-left: 10%;*/
  }
  
  .bj {
    background-color: rgba(134, 134, 134, 1);
    color: white
  }
</style>
