<template>
  <div class="body">
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div :class="['state','Mouse', 'flex',sum==true?'Xbj':'']" @click="Xsum()">
        <div class="state2">全部申请</div>
        <!--<div class="state3">(1000)</div>-->
      </div>
      <div :class="['state', 'Mouse', 'flex',month==true?'Xbj':'']" style="margin-left: 0px" @click="Xmonth()">
        <div class="state2">待处理</div>
        <!--<div class="state3">(1000)</div>-->
      </div>
      <div :class="['state', 'Mouse', 'flex',day==true?'Xbj':'']" style="margin-left: 0px" @click="Xday()">
        <div class="state2">退货中</div>
        <!--<div class="state3">(1000)</div>-->
      </div>
      <div :class="['state','Mouse', 'flex',bshop==true?'Xbj':'']" style="margin-left: 0px" @click="Xshop()">
        <div class="state2">已完成</div>
        <!--<div class="state3">(1000)</div>-->
      </div>
      <div :class="['state','Mouse', 'flex',down==true?'Xbj':'']" style="margin-left: 0px" @click="Xdown()">
        <div class="state2">已拒绝</div>
        <!--<div class="state3">(1000)</div>-->
      </div>
      <div :class="['state','Mouse', 'flex',all==true?'Xbj':'']" style="margin-left: 0px" @click="Xall()">
        <div class="state2">平台订单</div>
        <!--<div class="state3">(1000)</div>-->
      </div>
    </div>
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">订单编号：</div>
      <div class="input">
        <el-input v-model="order_code" style="width: 200px" placeholder="输入订单编号"></el-input>
      </div>
      
      <div class="font" style="margin-left: 100px">用户账号：</div>
      <div class="input">
        <el-input v-model="mobile" placeholder="输入用户账号"></el-input>
      </div>
      
      <div class="font">提交时间：</div>
      <div class="input">
        <el-date-picker
          v-model="value6"
          style="width: 230px"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <!--按钮-->
      <div class="btn" style="margin-left: 12%" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1 Mouse" @click="exportFunc('refund','退款列表')">导出数据</div>
      <div class="head1 Mouse" @click="batch()">批量删除</div>
    </div>
    <div id="refund">
      <el-table
        ref="multipleTable"
        :data="refundList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change='sortChange'
        border>
        <el-table-column
          type="selection"
          align="center"
          min-width="55">
        </el-table-column>
        <el-table-column
          label="所属地区"
          prop="consigner"
          sortable="custom"
          min-width="100"
          align="center">
        </el-table-column>
        <el-table-column
          label="订单编号"
          prop="order_code"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="apply_time"
          align="center"
          sortable
          label="申请时间"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="mobile"
          align="center"
          label="用户账户"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="refund_price"
          align="center"
          label="退款金额"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="tel"
          align="center"
          label="联系电话"
          min-width="100">
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="status"
          label="申请状态"
          min-width="110">
          <template slot-scope="scope">
            {{scope.row.status|status}}
          </template>
        </el-table-column>
        <el-table-column
          prop="update_time"
          align="center"
          label="处理时间"
          sortable
          min-width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="87"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <div class="Mouse" style="color: #0099ce;padding-left: 10px" @click="look(scope.row)">查看订单</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total=totals>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    filters: {
      status: function (arg) {
        switch (arg) {
          case 2:
            return "退款完成";
          case 3:
            return "退货完成";
          case 4:
            return "申请退款";
          case 5:
            return "拒绝";
          case 6:
            return "换货中";
        }
      }
    },
    data() {
      return {
        order_code: '',
        input: '',
        mobile: '',
        value6: '',
        //页码参数
        page: 1,
        pageSize: 20,
        totals: 20,
        refundList: [],
        multipleSelection: [],
        status: '',
        //背景选择
        sum: true,
        month: false,
        day: false,
        bshop: false,
        all: false,
        down: false,
        //  排序
        district: 'desc',
        Otypes: 'desc'
      }
    },
    methods: {
      //获取退款处理
      getRefund() {
        var datas = {};
        this.gain(datas);
      },
      //搜索
      search() {
        var datas = {};
        if (this.order_code != '') {
          datas.order_code = this.order_code;
        }
        if (this.mobile != '') {
          datas.mobile = this.mobile;
        }
        if (this.value6 != null) {
          if (this.value6 != '') {
            datas.start_time = this.value6[0];
            datas.end_time = this.value6[1];
          }
        }
        this.page = 1;
        this.gain(datas);
      },
      //重置
      res() {
        this.order_code = '';
        this.mobile = '';
        this.value6 = '';
        this.page = 1;
        this.getRefund();
      },
      //批量删除
      batch() {
        var datas = '';
        for (let i = 0; i < this.multipleSelection.length; i++) {
          datas += this.multipleSelection.id + ',';
        }
        this.$confirm('是否删除这些订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/order/batchDelete', {
              ids: datas,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getRefund();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.order_code != '' || this.mobile != '' || this.value6 != '') {
          var datas = {};
          if (this.order_code != '') {
            datas.order_code = this.order_code;
          }
          if (this.mobile != '') {
            datas.mobile = this.mobile;
          }
          if (this.value6 != null) {
            if (this.value6 != '') {
              datas.start_time = this.value6[0];
              datas.end_time = this.value6[1];
            }
          }
          this.page = this.page;
          this.gain(datas);
        } else if (this.status != '') {
          var datas = {status: this.status};
          this.gain(datas);
        } else {
          this.getRefund();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.order_code != '' || this.mobile != '' || this.value6 != '') {
          var datas = {};
          if (this.order_code != '') {
            datas.order_code = this.order_code;
          }
          if (this.mobile != '') {
            datas.mobile = this.mobile;
          }
          if (this.value6 != '') {
            datas.start_time = this.value6[0];
            datas.end_time = this.value6[1];
          }
          this.gain(datas);
        } else if (this.status != '') {
          var datas = {status: this.status};
          this.gain(datas);
        } else {
          this.getRefund();
        }
      },
      //  查看退款信息
      look(val) {
        console.log(val);
        sessionStorage.setItem('refoundId', val.id);
        sessionStorage.setItem('StatusD', val.status)
        this.$router.push({name: 'RefundInfo'})
      },
      //  选择背景
      Xsum() {
        this.getRefund();
        this.select(1);
      },
      Xmonth() {
        var datas = {status: 4};
        this.gain(datas);
        this.status = 4;
        this.select(2);
      },
      Xday() {
        var datas = {status: 6};
        this.gain(datas);
        this.status = 6;
        this.select(3);
      },
      Xshop() {
        var datas = {status: 3};
        this.gain(datas);
        this.status = 3;
        this.select(4);
      },
      Xall() {
        this.getRefund();
        this.select(5);
      },
      Xdown() {
        var datas = {status: 5};
        this.gain(datas);
        this.status = 5;
        this.select(6);
      },
      select(flag) {
        this.sum = false;
        this.month = false;
        this.day = false;
        this.bshop = false;
        this.all = false;
        this.down = false;
        switch (flag) {
          case 1:
            this.sum = true;
            break;
          case 2:
            this.month = true;
            break;
          case 3:
            this.day = true;
            break;
          case 4:
            this.bshop = true;
            break;
          case 5:
            this.all = true;
            break;
          case 6:
            this.down = true;
            break;
        }
      },
      gain(datas) {
        datas.page = this.page;
        datas.pageSize = this.pageSize;
        this._getData('/api/v1/order_detail/refund', datas,
          data => {
            console.log(data)
            this.refundList = data.data;
            this.totals = data.total;
          })
      },
      //  排序
      sortChange(column, prop, order) {
        if (column.prop == 'consigner') {
          var datas = {};
          if (this.district == 'asc') {
            this.district = 'desc';
          } else {
            this.district = 'asc';
          }
          datas.order_consigner = this.district;
          this.gain(datas);
        }
        if (column.prop == 'status') {
          var datas = {};
          if (this.Otypes == 'asc') {
            this.Otypes = 'desc';
          } else {
            this.Otypes = 'asc';
          }
          datas.order_status = this.Otypes;
          this.gain(datas);
        }
      },
    },
    created() {
      this.getRefund();
    }
  }
</script>

<style scoped>
</style>
