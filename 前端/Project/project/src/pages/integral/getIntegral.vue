<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户账户：</div>
      <div class="input">
        <el-input v-model="user_mobile" placeholder="输入用户账户"></el-input>
      </div>
      
      <div class="font">商品名称：</div>
      <div class="input">
        <el-input v-model="goods_name" placeholder="输入商品名称" style="width: 200px"></el-input>
      </div>
      
      <div class="font" style="margin-left:8%;">提交时间：</div>
      <div class="input">
        <el-date-picker
          v-model="times"
          type="datetimerange"
          style="width: 230px"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :default-time="['12:00:00']">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 15%" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1">导出数据</div>
      <div class="head1">显示条数</div>
      <div class="head1">排列方式</div>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="orderList"
        tooltip-effect="dark"
        style="width: 100%"
        border>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          prop="order_code"
          label="订单编号"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="提交时间"
          align="center"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="goodsInfo"
          label="商品信息"
          align="center"
          min-width="246">
        </el-table-column>
        <el-table-column
          prop="money"
          label="实收款"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="用户账户"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="get_integral"
          label="领取积分"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="color: #0099ce;" @click="look(scope.row.id)">查看订单</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
</template>

<script>
  export default {
    data() {
      return {
        //参数
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 20,
        orderList: [],
        user_mobile: '',
        goods_name: '',
        times: '',
        multipleSelection: [],
        orderStatus: [],
      }
    },
    methods: {
      //订单发货状态
      Status() {
        this._getData('/api/v1/order/status', {}, data => {
          console.log(data)
          this.orderStatus = data;
        })
      },
      //查看积分订单
      IntegralOrder() {
        this._getData('/api/v1/integral_record/getOrderIntegral', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          this.orderList = data.data;
          this.totals = data.total;
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.user_mobile != '' || this.goods_name != '' || this.times != '') {
          this.search();
        } else {
          this.IntegralOrder();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.user_mobile != '' || this.goods_name != '' || this.times != '') {
          this.search();
        } else {
          this.IntegralOrder();
        }
      },
      //  搜索
      search() {
        var data = {};
        if (this.user_mobile != '') {
          data.user_mobile = this.user_mobile;
        }
        if (this.goods_name != '') {
          data.goods_name = this.goods_name;
        }
        if (this.times != '') {
          data.start_time = this.times[0];
          data.end_time = this.times[1];
        }
        this._getData('/api/v1/integral_record/getOrderIntegral', {
          page: this.page,
          pageSize: this.pageSize,
          goods_name: data.goods_name,
          user_mobile: data.user_mobile,
          start_time: data.start_time,
          end_time: data.end_time
        }, data => {
          this.orderList = data.data;
          this.totals = data.total;
        })
      },
      //  重置
      res() {
        this.user_mobile = '';
        this.goods_name = '';
        this.times = '';
        this.IntegralOrder();
      },
      //  查看订单
      look(val) {
        sessionStorage.setItem('orderId', val);
        sessionStorage.setItem('page', '已领取积分订单')
        this.$router.push({name: 'orderInfo'})
      },
    },
    created() {
      this.IntegralOrder();
      this.Status();
    }
  }
</script>

<style scoped>
</style>
