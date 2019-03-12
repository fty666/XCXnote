<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户ID：</div>
      <div class="input">
        <el-input v-model="id" placeholder="输入内容"></el-input>
      </div>
      
      <div class="font" style="margin-left: 10px">用户手机号：</div>
      <div class="input">
        <el-input v-model="mobile" placeholder="输入手机号码"></el-input>
      </div>
      
      <div class="font">昵称：</div>
      <div class="input">
        <el-input v-model="nickname" placeholder="输入昵称"></el-input>
      </div>
      
      <div class="font">注册时间：</div>
      <div class="input" style="width: 100px">
        <el-date-picker
          v-model="value6"
          style="width: 230px"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 13%" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 0px">
        <el-button class="buttons3" icon="el-icon-refresh" @click="res()">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1">导出数据</div>
      <div class="head1" @click="batch()">批量禁用</div>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
          align="center"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="用户ID"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="用户账号"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="注册时间"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="alliance[0].district"
          label="所属地区"
          align="center"
          min-width="102">
        </el-table-column>
        <el-table-column
          prop="order[0].order_count"
          label="订单数"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="order[0].pay_sum"
          label="消费金额"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="账户启用状态"
          align="center"
          min-width="110">
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
          min-width="80"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <div style="color: #0099ce;" @click="look(scope.row)">查看</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pag">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[20, 50, 100]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total=totals>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //参数
        userList: [],
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 10,
        id: '',
        mobile: '',
        nickname: '',
        value6: '',
        start_time: '',
        end_time: "",
        //批量删除
        multipleSelection: '',
        ids: ''
      };
    },
    methods: {
      //获取用户
      getUser() {
        this._getData('api/v1/user/index', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          console.log(data)
          this.userList = data.data;
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
          this._getData('api/v1/user/userClose', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getUser();
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
          this._getData('/api/v1/user/userOpen', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getUser();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //搜索
      search() {
        console.log(this.value6);
        this._getData('api/v1/user/index', {
          page: this.page,
          pageSize: this.pageSize,
          id: this.id,
          mobile: this.mobile,
          nickname: this.nickname,
          start_time: this.value6[0],
          end_time: this.value6[1]
        }, data => {
          console.log(data)
          this.userList = data.data;
          this.totals = data.total;
        })
      },
      //重置
      res() {
        this.id = '';
        this.mobile = '';
        this.nickname = '';
        this.value6 = '';
        this.getUser();
      },
      //查看信息
      look(val) {
        sessionStorage.setItem('userId', val.id);
        sessionStorage.setItem('mobile', val.mobile);
        this.$router.push({name: 'memberInfo'})
      },
      //批量删除
      handleSelectionChange(val) {
        var ids='';
        var arr = val;
        for (var i = 0; i < arr.length; i++) {
          ids = ids+arr[i].id + ',';
        }
        this.ids=ids;
      },
      batch(){
        console.log(this.ids)
        this.$confirm('是否禁用这些用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/user/batchClose', {
              ids: this.ids,
            }, data => {
            this.getUser();
            this.ids='';
            this.$message({
                type: 'success',
                message: '操作成功'
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getUser();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getUser();
      },
    },
    created() {
      this.getUser();
    }
  }
</script>

<style scoped>
</style>
