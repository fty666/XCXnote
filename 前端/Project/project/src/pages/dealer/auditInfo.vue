<template>
  <div class="body">
    <div class="flex xiu" style="height: 120px;margin-top: 40px">
      <div style="margin-left: 60px">
        <img :src="imggerUrl+this.dealerList.photo"  class="imgs">
      </div>
      <div class="sequence" style="width: 72%;margin: 30px 0px 0px 0px">
        <div class="flex pian" style="margin-left: 30px">
          <div class="fh">用户ID：</div>
          <div>{{this.dealerList.id}}</div>
        </div>
        <div class="flex pian">
          <div>用户账号：</div>
          <div class="fh">{{this.dealerList.mobile}}</div>
        </div>
        <div class="flex pian" style="margin-left: 20px">
          <div>所属地区：</div>
          <div>{{this.dealerList.alliance}}</div>
        </div>
        <div class="flex pian">
          <div>昵称：</div>
          <div>{{this.dealerList.nickname}}</div>
        </div>
        <div class="flex pian">
          <div>生日：</div>
          <div class="fh">{{this.dealerList.birthday}}</div>
        </div>
        <div class="flex pian">
          <div>性别：</div>
          <div>{{this.dealerList.sex}}</div>
        </div>
        <div class="flex" >
          <div>注册时间：</div>
          <div class="fh">{{this.dealerList.create_time}}</div>
        </div>
      </div>
      <router-link to="/dealer/dealerAudit">
        <div class="clos">返回列表</div>
      </router-link>
    </div>
    <!--选择信息-->
    <div class="flex" style="margin-top: 30px;">
      <div :class="[ 'state','flex','Mouse', dealer==true?'bj':'']" @click="dealerInfo()">
        <div class="state2" >经销商信息</div>
      </div>
      <div :class="[ 'state','flex','Mouse', members==true?'bj':'']" @click="member()" style="margin-left: 0px">
        <div class="state2" >会员信息</div>
      </div >
    </div>
    <!--经销商信息-->
    <div v-if="dealer==true">
      <wineSincere></wineSincere>
    </div>
    <div v-else>
      <MemberInfo ></MemberInfo>
    </div>
  </div>
</template>

<script>
  import wineSincere from '@/components/delaer/wineSincere'
  import auditInfo from '@/components/delaer/auditInfo'
  import MemberInfo from '@/components/delaer/MemberInfo'
  export default {
    name: "",
    components: {
      wineSincere,
      auditInfo,
      MemberInfo
    },
    data() {
      return {
        //  经销商信息选择
        dealer:true,
        members:false,
        dealerList:{}
      }
    },
    methods:{
      //  获取经销商信息
      getDealer() {
        this._getData('/api/v1/user/show', {
          id: sessionStorage.getItem('dealerId'),
        }, data => {
          this.dealerList=data;
        })
      },
      //经销商信息
      dealerInfo(){
        this.dealer=true;
        this.members=false;
      },
      //  会员信息
      member(){
        this.dealer=false;
        this.members=true;
      }
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
    width: 20%;
    text-align: left;
    margin-left: 3%;
  }
  .fh{
    line-height: 22px;
  }
</style>
