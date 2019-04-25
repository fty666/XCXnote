<template>
  <div>
    <el-container>
      <el-header style='background-color:rgb(0, 153, 153)' class='main-header'>
        <div class="main-img-box flex">
          <div class="merchant">你好！管理员{{adminName}}</div>
          <div><img src="../assets/logo.png" alt=""></div>
        </div>
        <div class="main-func-box">
          <el-tooltip class="item main-func" effect="dark" content="退出系统" placement="bottom-end">
            <el-button @click="exit()">&nbsp;&nbsp;&nbsp;&nbsp;退出&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </el-tooltip>
          <el-tooltip class="item main-func" style="margin-right: 30px" effect="dark" content="修改密码"
                      placement="bottom-end">
            <el-button @click="editPass()">修改密码</el-button>
          </el-tooltip>
        </div>
      </el-header>
      <el-container>
        <el-aside style="width:200px;overflow:hidden;">
          <el-menu class="el-menu-vertical-demo" :collapse-transition="true" :unique-opened='true'
                   @select="handleSelect" :collapse="isCollapse" background-color="rgba(118, 121, 128, 1)"
                   text-color="#fff"
                   active-text-color="#24c8ac" :default-openeds="openeds">
            <!--首页-->
            <el-submenu index="1">
              <template slot="title">
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">首页</span>
              </template>
              <el-menu-item class="Mfont" index="/list/index">首页</el-menu-item>
            </el-submenu>
            <!--商品管理-->
            <el-submenu index="2" v-if="authBox.includes('商品管理')==true">
              <template slot="title">
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <!--<i style="padding-right:10px;"></i>-->
                <span slot="title">商品管理</span>
              </template>
              <el-menu-item class="Mfont" index="/shop/shopList">商品列表</el-menu-item>
              <el-menu-item  class="Mfont" index="/shop/addShop">添加商品</el-menu-item>
              <el-menu-item  class="Mfont" index="/shop/shopClass">商品分类管理</el-menu-item>
            </el-submenu>
            <!--会员-->
            <el-submenu index="3" v-if="authBox.includes('会员管理')==true">
              <template slot="title">
                <!--<i style="padding-right:10px;"></i>-->
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">会员管理</span>
              </template>
              <el-menu-item index="/member/member">会员列表</el-menu-item>
            </el-submenu>
            <!--加盟商管理-->
            <el-submenu index="4" v-if="authBox.includes('加盟商管理')==true">
              <template slot="title">
                <!--<i style="padding-right:10px;"></i>-->
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">加盟商管理</span>
              </template>
              <el-menu-item index="/join/join">加盟商列表</el-menu-item>
            </el-submenu>
            <!--经销商管理-->
            <el-submenu index="5" v-if="authBox.includes('经销商管理')==true">
              <template slot="title">
                <!--<i style="padding-right:10px;"></i>-->
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">经销商管理</span>
              </template>
              <el-menu-item index="/dealer/dealerList">经销商列表</el-menu-item>
              <el-menu-item index="/dealer/dealerAudit">资质审核</el-menu-item>
              <el-menu-item index="/dealer/dealerManage">购入管理</el-menu-item>
              <el-menu-item index="/dealer/dealerBuy">回购管理</el-menu-item>
            </el-submenu>
            <!--订单管理-->
            <el-submenu index="6" v-if="authBox.includes('订单管理')==true">
              <template slot="title">
                <!--<i style="padding-right:10px;"></i>-->
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">订单管理</span>
              </template>
              <el-menu-item index="/order/orderList">订单管理</el-menu-item>
              <!--<el-menu-item index="/order/orderManage">配货管理</el-menu-item>-->
              <el-menu-item index="/order/orderRefund">退款处理</el-menu-item>
            </el-submenu>
            <!--积分管理-->
            <el-submenu index="7" v-if="authBox.includes('积分管理')==true">
              <template slot="title">
                <!--<i style="padding-right:10px;"></i>-->
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">积分管理</span>
              </template>
              <el-menu-item index="/integral/integralConvert">积分兑换设置</el-menu-item>
              <el-menu-item index="/integral/getIntegral">已领取积分订单</el-menu-item>
              <el-menu-item index="/integral/getConversion">已兑换积分订单</el-menu-item>
              <el-menu-item index="/integral/integralStat">积分统计</el-menu-item>
            </el-submenu>
            <!--仓库管理-->
            <el-submenu index="8" v-if="authBox.includes('仓库管理')==true">
              <template slot="title">
                <!--<i style="padding-right:10px;"></i>-->
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">仓库管理</span>
              </template>
              <el-menu-item index="/warehouse/warehouseList">仓库总览</el-menu-item>
              <el-menu-item index="/warehouse/warehouseManage">仓库管理</el-menu-item>
            </el-submenu>
            <!--内容管理-->
            <el-submenu index="9" v-if="authBox.includes('内容管理')==true">
              <template slot="title">
                <!--<i style="padding-right:10px;"></i>-->
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">内容管理</span>
              </template>
              <el-menu-item index="/content/contentManage">分类图标管理</el-menu-item>
              <el-menu-item index="/content/bannerList">BANNER列表</el-menu-item>
              <el-menu-item index="/content/shopManage">橱窗商品管理</el-menu-item>
              <el-menu-item index="/content/searchManage">热门搜索管理</el-menu-item>
              <el-menu-item index="/content/contentRule">规则提示弹窗管理</el-menu-item>
            </el-submenu>
            <!--反馈设置-->
            <el-submenu index="10" v-if="authBox.includes('反馈管理')==true">
              <template slot="title">
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">反馈管理</span>
              </template>
              <el-menu-item index="/feedback/feedbackAdd">反馈设置</el-menu-item>
              <el-menu-item index="/feedback/feedbackUser">用户反馈查看</el-menu-item>
            </el-submenu>
            <!--财务统计-->
            <el-submenu index="11" v-if="authBox.includes('财务统计')==true">
              <template slot="title">
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">财务统计</span>
              </template>
              <el-menu-item index="/finance/financeList">平台营业额统计</el-menu-item>
              <el-menu-item index="/finance/performance">加盟商业绩统计</el-menu-item>
              <el-menu-item index="/finance/withdraw">提现记录</el-menu-item>
            </el-submenu>
            <!--数据统计-->
            <el-submenu index="12" v-if="authBox.includes('数据统计')==true">
              <template slot="title">
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">数据统计</span>
              </template>
              <el-menu-item index="/stat/dealStat">交易统计</el-menu-item>
              <el-menu-item index="/stat/wineStat">酒品统计</el-menu-item>
            </el-submenu>
            <!--权限管理-->
            <el-submenu index="13" v-if="authBox.includes('权限管理')==true">
              <template slot="title">
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">权限管理</span>
              </template>
              <el-menu-item index="/power/power">权限管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <router-view/>
      </el-container>
      <!--修改密码-->
      <div>
        <el-dialog
          title=""
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <editpass @close="Eclose"></editpass>
        </el-dialog>
      </div>
    </el-container>
  </div>
</template>

<script>
  import editpass from '@/components/editPass'
  export default {
    data() {
      return {
        isCollapse: false,
        //控制打开第几个导航栏
        openeds: [],
        authBox: [],
        adminName: '',
        centerDialogVisible: false,
      };
    },
    components: {
      editpass
    },
    methods: {
      //菜单点击事件
      handleSelect: function (index, indexPath) {
        //路由跳转方法
        this.$router.push({path: index});
      },
      //退出系统
      exit() {
        this.$confirm('确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //清空缓存
          sessionStorage.clear('adminUserId');
          sessionStorage.clear('admin_name');
          sessionStorage.clear('admin_user_code');
          this.$message({
            message: '退出成功',
            type: 'success'
          });
          this.$router.push({path: '/', name: 'login'})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },
      //  修改密码
      editPass() {
        this.centerDialogVisible = true;
      },
      Eclose(){
        this.centerDialogVisible = false;
      }
    },
    created() {
      this.adminName = sessionStorage.getItem('admin_name');
      let Boxs = JSON.parse(sessionStorage.getItem("userInfo"))
      for (let i = 0; i < Boxs.length; i++) {
        this.authBox.push(Boxs[i].name);
      }
    }
  }
</script>

<style scoped>
  .main-header {
    display: flex;
    justify-content: space-between;
    padding: 0;
    height: 50px !important;
  }
  
  .main-img-box {
    width: 500px;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
  
  .main-img-box img {
    width: 50px;
    height: 50px;
    margin-left: 34px;
  }
  
  .main-func-box {
    display: flex;
    width: 200px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    height: 50px;
  }
  
  .main-func-box img {
    margin-right: 14px;
    padding-left: 10px;
    width: 22px;
    height: 22px;
  }
  
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: calc(100vh - 50px);
    height: 100%;
  }
  
  .merchant {
    display: inline-block;
    color: #fff;
    text-align: center;
    margin-left: 14px;
  }
</style>
