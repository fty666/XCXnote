<template>
  <div class="body">
    <div class="flex xiu" style="height: 120px;margin-top: 40px">
      <div class="imgs" style="margin-left: 60px"></div>
      <div class="sequence" style="width: 85%;margin: 30px 0px 0px 0px">
        <div class="flex pian" style="margin-left: 20px">
          <div>用户ID：</div>
          <div>高级会员</div>
        </div>
        <div class="flex pian">
          <div>用户账号：</div>
          <div>高级会员</div>
        </div>
        <div class="flex pian">
          <div>注册时间：</div>
          <div>高级会员</div>
        </div>
        <div class="flex pian" style="margin-left: 20px">
          <div>所属地区：</div>
          <div>高级会员</div>
        </div>
        <div class="flex pian" style="margin-left: 20px">
          <div>昵称：</div>
          <div>高级会员</div>
        </div>
        <div class="flex pian" >
          <div>生日：</div>
          <div>高级会员</div>
        </div>
        <div class="flex pian" >
          <div>性别：</div>
          <div>高级会员</div>
        </div>
      </div>
    </div>
    <!--选择信息-->
    <div class="flex" style="margin-top: 30px;">
      <div :class="[ 'state','flex', dealer==true?'bj':'']" @click="dealerInfo()">
        <div class="state2" >经销商信息</div>
      </div>
      <div :class="[ 'state','flex', members==true?'bj':'']" @click="member()" style="margin-left: 0px">
        <div class="state2" >会员信息</div>
      </div >
    </div>
    <!--经销商信息-->
    <div v-if="dealer==true">
      <wineSincere></wineSincere>
    </div>
    <div v-else>
      <auditInfo></auditInfo>
    </div>
  </div>
</template>

<script>
  import wineSincere from '@/components/delaer/wineSincere'
  import auditInfo from '@/components/delaer/auditInfo'
  export default {
    name: "",
    components: {
      wineSincere,
      auditInfo
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: '',
        //  经销商信息选择
        dealer:true,
        members:false
      }
    },
    methods:{
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
    text-align: left;
    /*margin-left: 10px;*/
  }
</style>
