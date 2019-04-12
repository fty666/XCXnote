<template>
  <div class="body">
    <!--统计信息-->
    <div class="head">
      <div class="font"> 统计信息</div>
    </div>
    <div class="flex xiu" style="height: 120px">
      <el-table
        :data="userInfo.count"
        border
        style="width:100%">
        <el-table-column
          prop="payment_total"
          label="消费总额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_count"
          align="center"
          label="订单总数">
        </el-table-column>
        <el-table-column
          prop="wallet"
          align="center"
          label="可用积分">
        </el-table-column>
        <el-table-column
          prop="comment"
          align="center"
          label="商品评价数"
        >
        </el-table-column>
        <el-table-column
          prop="back_total"
          align="center"
          label="退货次数">
        </el-table-column>
        <el-table-column
          prop="collect"
          align="center"
          label="收藏商品">
        </el-table-column>
        <el-table-column
          prop="invite"
          align="center"
          label="邀请好友数">
        </el-table-column>
      </el-table>
    </div>
    
    <!--收货地址-->
    <div class="head">
      <div class="font"> 收货地址</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <el-table
        :data="userInfo.address"
        border
        style="width: 100%;margin-bottom: 30px">
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="收货地址"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="city"
          label="详细地址"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          label="默认地址"
          align="center"
          min-width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.defaults=='1'">是</div>
            <div v-else>否</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!--订单记录-->
    <div class="head">
      <div class="font"> 订单记录</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <div class="flex sou">
        <div style="margin-top: 10px">订单类型：</div>
        <div>
          <el-select v-model="Otype" placeholder="请选择">
            <el-option size="small" label="经销商订单" value="2"></el-option>
            <el-option size="small" label="自提订单" value="4"></el-option>
            <el-option size="small" label="会员订单" value="1"></el-option>
            <el-option size="small" label="积分兑换" value="3"></el-option>
          </el-select>
        </div>
        <div class="btn" style="margin: -8px 0px 0px 40px" @click="rest()">
          <el-button type="primary" size="small" icon="el-icon-refresh">重置</el-button>
        </div>
      </div>
      <div style="width: 100%">
        <el-table
          :data="orderList"
          border
          style="width: 100%">
          <el-table-column
            prop="type"
            label="订单类型"
            align="center"
            min-width="140">
          </el-table-column>
          <el-table-column
            prop="user_code"
            label="订单编号"
            align="center"
            min-width="140">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="提交时间"
            align="center"
            min-width="140">
          </el-table-column>
          <el-table-column
            prop="goods_names"
            label="商品信息"
            align="center"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="payment_price"
            label="金额"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            label="订单状态"
            align="center"
            min-width="90">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <div class="Mouse" style="color: deepskyblue" @click="look(scope.row)">查看</div>
            </template>
          </el-table-column>
        
        </el-table>
      </div>
      <div class="pags" style="margin-left: 10%">
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
    
    <!--积分记录-->
    <div class="head">
      <div class="font"> 积分记录</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <div style="width: 100%;margin-bottom: 30px">
        <el-table
          :data="integralList"
          border
          style="width: 100%">
          <el-table-column
            prop="create_time"
            label="日期"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="mold"
            label="项目"
            align="center"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="Integral"
            align="center"
            label="积分变动"
            min-width="180">
          </el-table-column>
        </el-table>
        <div class="pags">
          <el-pagination
            @size-change="JhandleSizeChange"
            @current-change="JhandleCurrentChange"
            :current-page="JcurrentPage4"
            :page-sizes="[20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total=interTotal>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        options: [],
        value: '',
        //参数
        userInfo: [],
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 10,
        orderList: [],
        Otype: '',
        //积分
        integralList: [],
        interTotal: 10,
        Jpage: 1,
        JpageSize: 10,
        JcurrentPage4: 1,
      }
    },
    watch: {
      Otype(v, o) {
        this.selec();
      }
    },
    methods: {
      //用户信息
      userIn() {
        this.uId = sessionStorage.getItem('dealerId');
        this._getData('/api/v1/user/show', {
          id: sessionStorage.getItem('dealerId'),
        }, data => {
          this.userInfo = data;
          this.getorder();
        })
      },
      //积分记录
      getInter() {
        this._getData('/api/v1/integral_record/index', {
          page: this.Jpage,
          pageSize: this.JpageSize,
          user_code: this.userInfo.user_code,
        }, data => {
          this.integralList = data.data;
          this.interTotal = data.total;
        })
      },
      //订单记录
      getorder() {
        this._getData('/api/v1/order/index', {
          page: this.page,
          pageSize: this.pageSize,
          user_mobile: this.userInfo.mobile
        }, data => {
          this.orderList = data.data;
          this.totals = data.total;
        })
      },
      //选择
      selec() {
        this._getData('/api/v1/order/index', {
          page: this.page,
          pageSize: this.pageSize,
          type: this.Otype,
          user_mobile: this.userInfo.mobile
        }, data => {
          this.orderList = data.data;
          this.totals = data.total;
        })
      },
      rest() {
        this.getorder();
        this.Otype = '';
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.Otype != '') {
          this.selec();
        } else {
          this.getorder()
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.Otype != '') {
          this.selec();
        } else {
          this.getorder()
        }
      },
      //每页显示多少数据
      JhandleSizeChange(val) {
        this.JpageSize = val;
        this.getInter();
      },
      //第几页
      JhandleCurrentChange(val) {
        this.Jpage = val;
        this.getInter();
      },
      //  查看订单
      look(val) {
        sessionStorage.setItem('orderId', val.id);
        if (sessionStorage.getItem('page') == '资质审核') {
          sessionStorage.setItem('page', '资质审核')
        } else {
          sessionStorage.setItem('page', '经销商信息')
        }
        this.$router.push({name: 'orderInfo'})
      }
    },
    created() {
      this.userIn();
      this.getInter();
    }
  }
</script>

<style scoped>
  .clos {
    text-align: left;
    width: 130px;
    height: 30px;
    border: 1px solid black;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
    margin: 30px 0px 0px 0px;
  }
  
  .font {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    line-height: 50px;
  }
  
  /*用户信息*/
  .imgs {
    border: 1px solid #ddd;
    width: 80px;
    height: 80px;
    margin-top: 20px;
  }
  
  .pian {
    width: 20%;
    margin-left: 5%;
  }
  
  .sou {
    width: 100%;
    height: 50px;
    padding: 20px 0px 0px 35px;
    font-size: 15px;
    color: #999999;;
  }
</style>
