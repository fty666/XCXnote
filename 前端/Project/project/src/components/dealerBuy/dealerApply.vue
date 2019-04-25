<template>
  <div>
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">账号：</div>
      <div class="input">
        <el-input v-model="user_mobile" placeholder="输入账号"></el-input>
      </div>
      
      <div class="font">名称：</div>
      <div class="input">
        <el-input v-model="goods_name" placeholder="输入商品名称"></el-input>
      </div>
      
      <div class="font">购入日期：</div>
      <div class="input">
        <el-date-picker
          v-model="Stime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <!--按钮-->
      <div class="btn" style="margin-left:20%" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    <!--经销商申请回购-->
    <div class="head join">
    </div>
    <el-table
      ref="multipleTable"
      :data="Jterrace"
      tooltip-effect="dark"
      style="width: 100%"
      border>
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        label="申请时间"
        prop="create_time"
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="user_id"
        label="用户ID"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="user_mobile"
        label="账号"
        min-width="120"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品信息"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品单价"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="goods_integral"
        label="商品可获得积分"
        align="center"
        min-width="130">
      </el-table-column>
      <el-table-column
        prop="order_time"
        label="购入时间"
        align="center"
        min-width="110">
      </el-table-column>
      <el-table-column
        prop="num"
        label="回购数量"
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="100"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="flex">
            <div style="color: #0099ce;" class="Mouse" @click="pass(scope.row.id)">&nbsp;&nbsp;通过</div>
            <div style="color: #0099ce;" class="Mouse" @click="down(scope.row)">&nbsp;&nbsp;驳回</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pag">
      <el-pagination
        @size-change="JPhandleSizeChange"
        @current-change="JPhandleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total=Jtotal>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        //页码参数
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        Jtotal: 10,
        //集合
        Jterrace: [],
        user_mobile: '',
        goods_name: '',
        Stime: []
      }
    },
    methods: {
      manage() {
        this.centerDialogVisible = true;
      },
      //经销商页面
      JPhandleSizeChange(val) {
        this.pageSize = val;
        if (this.goods_name != '' || this.user_mobile != '') {
          var data = {};
          if (this.goods_name != '') {
            data.goods_name = this.goods_name;
          }
          if (this.user_mobile != '') {
            data.user_mobile = this.user_mobile;
          }
          if (this.Stime == null) {
          } else {
            if (this.Stime.length > 0) {
              data.start_time = this.Stime[0];
              data.end_time = this.Stime[1];
            }
          }
          data.page = this.page;
          data.pageSize = this.pageSize;
          //获取平台
          this._getData('/api/v1/buyback_record/dealerApply', data, data => {
            this.Jterrace = data.data;
            this.Jtotal = data.Jtotal;
          })
        } else {
          this.getJin();
        }
      },
      //第几页
      JPhandleCurrentChange(val) {
        this.page = val;
        if (this.goods_name != '' || this.user_mobile != ''||this.Stime!='') {
          this.Xpag();
        } else {
          this.getJin();
        }
      },
      //获取销商申请回购
      getJin() {
        var datas = {};
        datas.page = this.page;
        datas.pageSize = this.pageSize;
        this.getinfos(datas);
      },
      getinfos(datas) {
        this._getData('/api/v1/buyback_record/dealerApply', datas, data => {
          this.Jterrace = data.data;
          this.Jtotal = data.total;
        })
      },
      //搜索
      search() {
        this.page = 1;
        var data = {};
        if (this.goods_name != '') {
          data.goods_name = this.goods_name;
        }
        if (this.user_mobile != '') {
          data.user_mobile = this.user_mobile;
        }
        if (this.Stime == null) {
        } else {
          if (this.Stime.length > 0) {
            data.start_time = this.Stime[0];
            data.end_time = this.Stime[1];
          }
        }
        data.page = this.page;
        data.pageSize = this.pageSize;
        //获取平台
        this._getData('/api/v1/buyback_record/dealerApply', data, data => {
          this.Jterrace = data.data;
          this.Jtotal = data.Jtotal;
        })
      },
      Xpag() {
        var data = {};
        if (this.goods_name != '') {
          data.goods_name = this.goods_name;
        }
        if (this.user_mobile != '') {
          data.user_mobile = this.user_mobile;
        }
        if (this.Stime == null) {
        } else {
          if (this.Stime.length > 0) {
            data.start_time = this.Stime[0];
            data.end_time = this.Stime[1];
          }
        }
        data.page = this.page;
        data.pageSize = this.pageSize;
        //获取平台
        this._getData('/api/v1/buyback_record/dealerApply', data, data => {
          this.Jterrace = data.data;
          this.Jtotal = data.Jtotal;
        })
      },
      //重置
      res() {
        this.goods_name = '';
        this.user_mobile = '';
        this.Stime = [];
        this.page = 1;
      },
      //  通过
      pass(val) {
        this.$confirm('是否通过经销商?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/dealer/pass', {
            id: val,
          }, data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.getJin();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //  拒绝
      down(val) {
        this.$confirm('是否拒绝经销商?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/dealer/reject', {
            userCode: val.user_code,
            createTime: val.create_time
          }, data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.getJin();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    created() {
      this.getJin();
    }
  }
</script>

<style scoped>
</style>
