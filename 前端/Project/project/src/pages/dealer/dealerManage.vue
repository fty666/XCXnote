<template>
  <div class="body">
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div :class="['state','Mouse', 'flex',sum==true?'Xbj':'']" @click="Xsum()">
        <div class="state2">全部订单</div>
        <div class="state3">({{this.wineState.allCount}})</div>
      </div>
      <div :class="['state','Mouse', 'flex',month==true?'Xbj':'']" style="margin-left: 0px" @click="Xmonth()">
        <div class="state2">待付款</div>
        <div class="state3">({{this.wineState.goodsUp}})</div>
      </div>
      <div :class="['state', 'Mouse','flex',day==true?'Xbj':'']" style="margin-left: 0px" @click="Xday()">
        <div class="state2">待发货</div>
        <div class="state3">({{this.wineState.goodsDown}})</div>
      </div>
      <div :class="['state', 'Mouse','flex',bshop==true?'Xbj':'']" style="margin-left: 0px" @click="Xshop()">
        <div class="state2">已发货</div>
        <div class="state3">({{this.wineState.dealer}})</div>
      </div>
    </div>
    <!--搜索-->
    <div class="flex whiteT" style="height: 120px">
      <div class="sequence" style="width: 70%;">
        <div style="width: 30%;display: flex;">
          <div class="font" style="margin-left: 17%">订单单号：</div>
          <div class="input">
            <el-input v-model="order_code" style="width: 150px" placeholder="请输入订单单号"></el-input>
          </div>
        </div>
        <div  style="width: 30%;display: flex;">
          <div class="font" style="margin-left: 15%">用户名：</div>
          <div class="input">
            <el-input v-model="nickname" style="width: 150px" placeholder="请输入用户名"></el-input>
          </div>
        </div>
        <div style="width: 30%;display: flex;">
          <div class="font" style="margin-left: 10%">商品名称：</div>
          <div class="input">
            <el-input v-model="goods_name" style="width: 150px" placeholder="请输入商品名称"></el-input>
          </div>
        </div>
        <div class="font" style="margin-left: 5%">提交时间：</div>
        <div class="input">
          <el-date-picker
            v-model="start_time"
            style="width: 160px;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="font" style="margin-left: 55px">至</div>
        <div class="input">
          <el-date-picker
            v-model="end_time"
            style="width: 160px;margin-left: 15px"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <!--按钮-->
      <div class="btn" style="margin-left: 88px;margin-top: 30px" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px;margin-top: 30px" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格头-->
    <div class="head right">
      <div class="head1 Mouse" @click="batchDel()">批量删除</div>
      <div class="head1 Mouse" @click="exportFunc('dealerTable','购入列表')">导出订单</div>
    </div>
    <!--表格-->
    <div id="dealerTable">
      <el-table
        ref="multipleTable"
        :data="dealerList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change='sortChange'
        border>
        <el-table-column
          type="selection"
          min-width="55">
        </el-table-column>
        <el-table-column
          label="订单编号"
          prop="order_code"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="提交时间"
          sortable
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="goods_info"
          label="商品信息"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="payment_price"
          label="贷款"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="mode"
          label="支付方式"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="user_mobile"
          label="用户账户"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          sortable="custom"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="137"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <div class="Mouse" style="color: #0099ce;padding-left: 0px" @click="look(scope.row)">查看订单</div>
              <div class="Mouse" style="color: #0099ce;padding-left: 4px" @click="del(scope.row)">删除订单</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pag">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[20, 50, 100]"
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
        order_code: '',
        nickname: '',
        start_time: '',
        end_time: '',
        goods_name: '',
        multipleSelection: '',
        //页码参数
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 10,
        dealerList: [],
        wineState: {},
        Status: 'desc',
        //背景选择
        sum: true,
        month: false,
        day: false,
        bshop: false,
        putaway: ''
      }
    },
    methods: {
      //批量删除
      handleSelectionChange(val) {
        for (let i = 0; i < val.length; i++) {
          this.multipleSelection += val[i].id + ',';
        }
      },
      batchDel() {
        this.$confirm('是否删除此订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/order/batchDelete', {
              ids: this.multipleSelection
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.buyList();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //查看统计
      getState() {
        this._getData('/api/v1/goods/goodsUpDownStatistics', {}, data => {
          console.log(data)
          this.wineState = data;
        })
      },
      //  查看购入
      buyList() {
        var datas = {};
        this.getInfos(datas);
      },
      getInfos(datas) {
        datas.page = this.page;
        datas.pageSize = this.pageSize;
        this._getData('/api/v1/dealer/dealerBuy', datas, data => {
          this.dealerList = data.data;
          this.totals = data.total;
        })
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.order_code != '' || this.nickname != '' || this.goods_name != '' ||
          this.start_time != '' || this.end_time != '') {
          this.search();
        } else {
          this.buyList();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.order_code != '' || this.nickname != '' || this.goods_name != '' ||
          this.start_time != '' || this.end_time != '') {
          this.search();
        } else {
          this.buyList();
        }
      },
      //  查看订单
      look(val) {
        sessionStorage.setItem('dealID', val.id)
        sessionStorage.setItem('userCode', val.user_code)
        this.$router.push({name: 'buyInfo'})
      },
      //  删除订单
      del(val) {
        this.$confirm('是否删除此订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/order/delete', {
              id: val.id
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.buyList();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      // 搜索
      search() {
        var datas = {};
        if (this.order_code != '') {
          if (this.order_code.length < 16 || this.order_code.length > 16) {
            this.$message({
              type: 'info',
              message: '订单编号需是16位'
            })
          } else {
            datas.order_code = this.order_code;
          }
        }
        if (this.nickname != '') {
          datas.nickname = this.nickname;
        }
        if (this.goods_name != '') {
          datas.goods_name = this.goods_name;
        }
        if (this.start_time != '') {
          datas.start_time = this.start_time;
        }
        if (this.end_time != '') {
          datas.end_time = this.end_time;
        }
        this.getInfos(datas);
      },
      res() {
        this.order_code = '';
        this.nickname = '';
        this.goods_name = '';
        this.start_time = '';
        this.end_time = '';
        this.buyList();
      },
      //  排序
      sortChange(column, prop, order) {
        var datas = {};
        if (this.Status == 'asc') {
          this.Status = 'desc';
        } else {
          this.Status = 'asc';
        }
        datas.order_status = this.Status;
        this.getInfos(datas);
      },
      //  选择背景
      Xsum() {
        this.buyList();
        this.select(1);
      },
      Xmonth() {
        this.putaway = 1;
        var datas = {status: 1};
        this.getInfos(datas);
        this.select(2);
      },
      Xday() {
        var datas = {status: 2};
        this.getInfos(datas);
        this.select(3);
      },
      Xshop() {
        var datas = {status: 3};
        this.getInfos(datas);
        this.select(4);
      },
      select(flag) {
        this.sum = false;
        this.month = false;
        this.day = false;
        this.bshop = false;
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
        }
      }
    },
    created() {
      this.buyList();
      this.getState();
    }
  }
</script>

<style scoped>
</style>
