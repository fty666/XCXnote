<template>
  <div>
    <el-container>
      <!--顶部样式，内容-->
      <el-header style='background-color:#373d41' class='main-header'>
        <div class="main-img-box"><span class="merchant">商家管理系统</span></div>
        <div class="main-func-box">
          <!--<el-tooltip class="item main-func" effect="dark" content="版本号" placement="bottom-start">-->
            <!--<img src="../assets/img/help.png" alt="">-->
          <!--</el-tooltip>-->
          <el-tooltip class="item main-func" effect="dark" content="退出系统" placement="bottom-end">
            <img src="../assets/img/exit.png" alt="">
          </el-tooltip>
        </div>
      </el-header>
      <!--顶部内容完-->

      <!--左侧内容-->
      <el-container>
        <el-aside style="width:200px;overflow: hidden;">
          <el-menu class="el-menu-vertical-demo" :collapse-transition="true" :unique-opened='true' @select="handleSelect" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#24c8ac" :default-openeds="openeds" >
            <el-submenu index="1">
              <!--总开关-->
              <template slot="title">
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">商家管理</span>
              </template>
              <!--总开关完-->
              <el-menu-item index="/commodity/commodityList" >权限管理</el-menu-item>
              <el-menu-item index="/classification" >项目审批</el-menu-item>
              <el-menu-item index="/waitingList">分配项目</el-menu-item>
              <el-menu-item index="/order">项目发布</el-menu-item>
              <el-menu-item index="/couponsList">项目查询</el-menu-item>
              <el-menu-item index="/reductionList">项目核准</el-menu-item>
              <el-menu-item index="/evaluationList">评价列表</el-menu-item>
              <el-menu-item index="/merchantsList">店铺信息</el-menu-item>
              <el-menu-item index="/withdrawal">提现</el-menu-item>
              <el-menu-item index="/bankCard">银行卡管理</el-menu-item>
            </el-submenu>


          </el-menu>
        </el-aside>
        <!-- <el-main> <router-view></router-view></el-main> -->
        <router-view/>
      </el-container>
      <!--左侧内容完-->
    </el-container>
  </div>
</template>
<!--@passValue="passValue"@passValues="passValues" :datas="passval" :data="passvals"-->

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        passval: [],
        saveBox: {
          sale_id: "",
          sale_status: "",
        },
        openeds:["1"],
      };
    },
    methods: {
      beforeunloadHandler (e) {
        // ...
        alert(11111);
      },
      handleSelect: function (index, indexPath) {
        console.log(index);
        console.log(indexPath);
        //路由跳转方法
        this.$router.push({path: index});
      }
    },
    created() {
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
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
  .main-img-box img {
    width: auto;
    height: 40px;
    margin-left: 34px;
  }
  .main-func-box {
    display: flex;
    width: 100px;
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
  }
  /*.tableFunc {*/
    /*text-align: right;*/
  /*}*/
.tableFunc div{
  display: inline-block;
  width: 100%;
  float:right;
}
  .merchant{
    display: inline-block;
    width: 100%;
    color: #fff;
    text-align: center;
  }
.listBox{
  display: inline-block;
}
</style>
