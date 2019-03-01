<template>
  <div>
    <el-container>
      <el-header style='background-color:#373d41' class='main-header'>
        <div class="main-img-box">
          <span class="merchant">管理员页面</span>
        </div>
        <div class="main-func-box">
          <router-link to="/"></router-link>
          <span style="color:#ebeef5; font-size: 14px;">你好！</span>
          <el-tooltip class="item main-func" effect="dark" content="退出系统" placement="bottom-end"  >
            <img src="../assets/img/exit.png" alt="" @click="exit">
          </el-tooltip>
        </div>
      </el-header>
      <el-container>
        <el-aside style="width:200px;overflow: hidden;">
          <el-menu class="el-menu-vertical-demo" :collapse-transition="true" :unique-opened='true'
                   @select="handleSelect" :collapse="isCollapse" background-color="#545c64" text-color="#fff"
                   active-text-color="#24c8ac" :default-openeds="openeds">
            <!--成员管理-->
            <el-submenu index="1">
              <template slot="title">
                <i style="padding-right:10px;"><img src="../assets/img/1.png"></i>
                <span slot="title">成员管理</span>
              </template>
              <el-menu-item index="/list/index">成员列表</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <router-view/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        //控制打开第几个导航栏
        openeds: [],
        authBox: [],
        adminName: '',
      };
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
    },
    created() {
      this.adminName = sessionStorage.getItem('admin_name')
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
  }
  
  .merchant {
    display: inline-block;
    width: 100%;
    color: #fff;
    text-align: center;
  }
</style>
