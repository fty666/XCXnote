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
      <div class="head1 Mouse" @click="exportFunc('memberList','会员列表')">导出数据</div>
      <div class="head1 Mouse" @click="batch()">批量禁用</div>
    </div>
    <div id="memberList">
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change='sortChange'
        border>
        <el-table-column
          type="selection"
          align="center"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="用户ID"
          sortable
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
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="district"
          label="所属地区"
          sortable="custom"
          align="center"
          min-width="102">
        </el-table-column>
        <el-table-column
          prop="order_count"
          label="订单数"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="pay_sum"
          label="消费金额"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="账户启用状态"
          align="center"
          sortable="custom"
          min-width="110">
          <template slot-scope="scope">
            <div class="flex" v-if="scope.row.status=='关闭' || scope.row.status=='禁用'|| scope.row.status=='2' ">
              <div>&nbsp;&nbsp;已禁用</div>
              <div @click="start(scope.row.id)"  class="operate Mouse">&nbsp;&nbsp;启用</div>
            </div>
            <div v-else class="flex">
              <div>&nbsp;&nbsp;已启用</div>
              <div @click="disable(scope.row.id)" class="operate Mouse">&nbsp;&nbsp;禁用</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="80"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <div style="color: #0099ce;" class="Mouse" @click="look(scope.row)">查看</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pag">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
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
        ids: '',
        //  排序
        district: 'desc',
        status: 'desc'
      };
    },
    methods: {
      //地区排序
      sortChange(column, prop, order) {
        var datas = {};
        switch (column.prop) {
          case'district':
            if (this.district == 'asc') {
              this.district = 'desc';
            } else {
              this.district = 'asc';
            }
            datas.order_district = this.district;
            this.getInfo(datas);
            break;
          case'status':
            if (this.status == 'asc') {
              this.status = 'desc';
            } else {
              this.status = 'asc';
            }
            datas.order_user_status = this.status;
            this.getInfo(datas);
            break;
        }
      },
      getInfo(datas) {
        datas.page = this.page;
        datas.pageSize = this.pageSize;
        this._getData('/api/v1/user/index', datas, data => {
          this.userList = data.data;
          this.totals = data.total;
        })
      },
      //获取用户
      getUser() {
        var datas={};
        this.getInfo(datas);
      },
      //  禁用
      disable(val) {
        this.$confirm('是否禁用此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/user/userClose', {
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
        if (this.value6 != '') {
          data.start_time = this.value6[0];
          data.end_time = this.value6[0];
        }
        this._getData('/api/v1/user/index', {
          page: this.page,
          pageSize: this.pageSize,
          id: data.id,
          mobile: data.mobile,
          nickname: data.nickname,
          start_time: data.start_time,
          end_time: data.end_time
        }, data => {
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
        var ids = '';
        var arr = val;
        for (var i = 0; i < arr.length; i++) {
          ids = ids + arr[i].id + ',';
        }
        this.ids = ids;
      },
      batch() {
        this.$confirm('是否禁用这些用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/user/batchClose', {
            ids: this.ids,
          }, data => {
            this.getUser();
            this.ids = '';
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
        if (this.id != '' || this.mobile != '' || this.nickname != '' || this.value6 != '') {
          this.search();
        } else {
          this.getUser();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.id != '' || this.mobile != '' || this.nickname != '' || this.value6 != '') {
          this.search();
        } else {
          this.getUser();
        }
      },
    },
    created() {
      this.getUser();
    }
  }
</script>

<style scoped>
</style>
