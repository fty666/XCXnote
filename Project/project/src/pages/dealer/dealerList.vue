<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">ID：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入ID"></el-input>
      </div>
      
      <div class="font">账号：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入账号"></el-input>
      </div>
      
      <div class="font">昵称：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入昵称"></el-input>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 30%">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    
    <!--表格头-->
    <div class="head right">
      <div class="head1">导出数据</div>
      <div class="head1">批量删除</div>
    </div>
    
    <!--表格-->
    <div>
      <el-table
        ref="multipleTable"
        :data="dealerList"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          min-width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="用户ID"
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
          prop="status"
          min-width="150">
          <template slot-scope="scope">
            <div class="flex" v-if="scope.row.status=='关闭'">
              <div>&nbsp;&nbsp;已禁用</div>
              <div @click="start(scope.row.id)" class="operate">&nbsp;&nbsp;启用</div>
            </div>
            <div v-else class="flex">
              <div>&nbsp;&nbsp;已启用</div>
              <div @click="disable(scope.row.id)" class="operate">&nbsp;&nbsp;禁用</div>
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
            <div style="color: #0099ce;" @click="info(scope.row.id)">查看详情</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        input: '',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        //  参数
        dealerList: [],
        //页码参数
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 20
      }
    },
    methods: {
      //  获取经销商
      getDear() {
        this._getData(' /api/v1/dealer/index', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          console.log(data)
          this.dealerList=data.data;
          this.totals=data.total;
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
      info() {
        this.$router.push({name: 'dealerInfo'})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    created(){
      this.getDear();
    }
  }
</script>

<style scoped>
</style>
