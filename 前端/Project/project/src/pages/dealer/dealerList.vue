<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">ID：</div>
      <div class="input">
        <el-input v-model="id" placeholder="请输入ID"></el-input>
      </div>
      
      <div class="font">账号：</div>
      <div class="input">
        <el-input v-model="mobile" placeholder="请输入账号"></el-input>
      </div>
      
      <div class="font">昵称：</div>
      <div class="input">
        <el-input v-model="nickname" placeholder="请输入昵称"></el-input>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 30%" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    
    <!--表格头-->
    <div class="head right">
      <div class="head1 Mouse" @click="exportFunc('dealerTable','经销商列表')">导出数据</div>
      <!--<div class="head1">批量删除</div>-->
    </div>
    
    <!--表格-->
    <div id="dealerTable">
      <el-table
        ref="multipleTable"
        :data="dealerList"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        @sort-change='sortChange'>
        <el-table-column
          type="selection"
          min-width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="用户ID"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="账户"
          align="center"
          min-width="167">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="wallet.balance"
          label="账户余额"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="经销商身份"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          label="账户状态"
          align="center"
          sortable="custom"
          prop="status"
          min-width="150">
          <template slot-scope="scope">
            <div class="flex" v-if="scope.row.status=='禁用'">
              <div>&nbsp;&nbsp;已禁用</div>
              <div @click="start(scope.row.id)" class="operate Mouse">&nbsp;&nbsp;启用</div>
            </div>
            <div class="flex" v-if="scope.row.status=='启用'">
              <div>&nbsp;&nbsp;已启用</div>
              <div @click="disable(scope.row.id)" class="operate Mouse">&nbsp;&nbsp;禁用</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="100"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="Mouse" style="color: #0099ce;" @click="info(scope.row)">查看详情</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pag">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-sizes="[10, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total=totals>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        input: '',
        multipleSelection: [],
        //  参数
        dealerList: [],
        //页码参数
        page: 1,
        pageSize: 10,
        totals: 20,
        id: '',
        mobile: '',
        nickname: '',
        //  排序
        Status: 'desc'
      }
    },
    methods: {
      //  获取经销商
      getDear() {
        this._getData('/api/v1/dealer/index', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          this.dealerList = data.data;
          this.totals = data.total;
        })
      },
      //  禁用
      disable(val) {
        this.$confirm('是否禁用此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/dealer/dealerClose', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getDear();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //  启用
      start(val) {
        this.$confirm('是否启用此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/dealer/dealerOpen', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getDear();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //  查看详情
      info(val) {
        sessionStorage.setItem('dealerId', val.id)
        sessionStorage.setItem('userCode', val.user_code)
        this.$router.push({name: 'dealerInfo'})
      },
      //搜索
      search() {
        this.page = 1;
        var data = {};
        if (this.id != '') {
          data.id = this.id;
        }
        if (this.mobile != '') {
          data.mobile = this.mobile;
        }
        if (this.nickname != '') {
          data.nickname = this.nickname;
        }
        this._getData('/api/v1/dealer/index', {
          page: this.page,
          pageSize: this.pageSize,
          id: data.id,
          mobile: data.mobile,
          nickname: data.nickname
        }, data => {
          this.dealerList = data.data;
          this.totals = data.total;
          this.id = '';
          this.mobile = '';
          this.nickname = '';
        })
      },
      //重置
      res() {
        this.page = 1;
        this.id = '';
        this.mobile = '';
        this.nickname = '';
        this.getDear();
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.id != '' || this.mobile != '' || this.nickname != '') {
          this.search();
        } else {
          this.getDear();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.id != '' || this.mobile != '' || this.nickname != '') {
          var data = {};
          if (this.id != '') {
            data.id = this.id;
          }
          if (this.mobile != '') {
            data.mobile = this.mobile;
          }
          if (this.nickname != '') {
            data.nickname = this.nickname;
          }
          this._getData('/api/v1/dealer/index', {
            page: this.page,
            pageSize: this.pageSize,
            id: data.id,
            mobile: data.mobile,
            nickname: data.nickname
          }, data => {
            this.dealerList = data.data;
            this.totals = data.total;
            this.id = '';
            this.mobile = '';
            this.nickname = '';
          })
        } else {
          this.getDear();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      sortChange(column, prop, order) {
        if (this.Status == 'asc') {
          this.Status = 'desc';
        } else {
          this.Status = 'asc';
        }
        this._getData('/api/v1/dealer/index', {
          page: this.page,
          pageSize: this.pageSize,
          order_status: this.Status
        }, data => {
          this.dealerList = data.data;
          this.totals = data.total;
        })
      },
    }
    ,
    created() {
      this.getDear();
    }
  }
</script>

<style scoped>
</style>
