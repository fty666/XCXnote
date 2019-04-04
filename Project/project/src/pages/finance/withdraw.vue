<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户ID：</div>
      <div class="input">
        <el-input v-model="user_id" placeholder="输入用户ID"></el-input>
      </div>
      
      <div class="font">用户手机号：</div>
      <div class="input">
        <el-input v-model="mobile" placeholder="输入手机号"></el-input>
      </div>
      
      
      <div class="font">申请时间：</div>
      <div class="input">
        <el-date-picker
          v-model="start_time"
          style="width: 150px;"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      
      <div class="font" style="margin-left: 40px">至</div>
      <div class="input">
        <el-date-picker
          v-model="end_time"
          value-format="yyyy-MM-dd"
          style="width: 150px;margin-left: 10px"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 6%" @click="search()">
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px" @click="res()">
        <el-button class="buttons3" size="small" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格头-->
    <div class="head right">
      <div class="head1 Mouse"  @click="exportFunc('withList','提现记录清单')">导出数据</div>
    </div>
    <!--表格-->
    <div id="withList">
      <el-table
        ref="multipleTable"
        :data="drawList"
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
          align="center"
          prop="create_time"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="user_id"
          label="用户ID"
          align="center"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="用户账户"
          align="center"
          min-width="110"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="card"
          label="银行卡信息"
          align="center"
          min-width="250">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="账户余额"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="draw_money"
          label="申请提现金额"
          align="center"
          min-width="116">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="100"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <div v-if="scope.row.status=='通过'" class="btns Mouse" @click="affirm(scope.row.id)">确认打款</div>
              <div v-if="scope.row.status=='打款'" class="btns Mouse" @click="del()">删除</div>
              <div v-if="scope.row.status=='拒绝'" class="btns">已驳回</div>
              <div v-if="scope.row.status=='删除'" class="btns ">已删除</div>
              <div v-if="scope.row.status=='提交'">
                <div class="btns Mouse" @click="pass(scope.row.id)">通过</div>
                <div class="btns Mouse" @click="down(scope.row.id)">驳回</div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pags">
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
    name: "",
    data() {
      return {
        multipleSelection: [],
        drawList: [],
        user_id: '',
        mobile: '',
        start_time: '',
        end_time: '',
        //页码参数
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 20
      }
    },
    methods: {
      //获取提现记录
      getDraw() {
        this._getData('/api/v1/user_draw/index', {
            page: this.page,
            pageSize: this.pageSize
          },
          data => {
            console.log(data)
            this.drawList = data.data;
            this.totals = data.total;
          })
      },
      //通过
      pass(val) {
        this.$confirm('是否通过此次提现?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/user_draw/pass', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getDraw();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //拒绝
      down(val) {
        this.$confirm('是否拒绝这次提现?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/user_draw/reject', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getDraw();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //打款
      affirm(val) {
        this.$confirm('是否给这条记录打款?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/user_draw/makeMoney', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getDraw();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //删除
      del(val) {
        this.$confirm('是否给删除这条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/user_draw/delete', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getDraw();
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
        if (this.user_id != '') {
          data.user_id = this.user_id;
        }
        if (this.mobile != '') {
          data.mobile = this.mobile;
        }
        if (this.start_time != '') {
          data.start_time = this.start_time;
        }
        if (this.end_time != '') {
          data.end_time = this.end_time;
        }
        data.page = this.page;
        data.pageSize = this.pageSize;
        this._getData('/api/v1/user_draw/index', data,
          data => {
            this.drawList = data.data;
            this.totals = data.total;
          })
      },
      res() {
        this.user_id = '';
        this.mobile = '';
        this.start_time = '';
        this.end_time = '';
        this.getDraw();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.user_id != '' || this.mobile != '' || this.start_time != '' || this.end_time != '') {
          this.search();
        } else {
          this.getDraw();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.user_id != '' || this.mobile != '' || this.start_time != '' || this.end_time != '') {
          this.search();
        } else {
          this.getDraw();
        }
      },
    },
    created() {
      this.getDraw();
    }
  }
</script>

<style scoped>
  .btns {
    color: #0099ce;
    padding-left: 10px
  }
</style>
