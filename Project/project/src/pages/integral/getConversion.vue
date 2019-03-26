<template>
  <div class="body">
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div class="state flex" style="background-color:rgba(0, 153, 153, 1);">
        <div class="state2" style="color: white">全部商品</div>
        <div class="state3" style="color: white">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">未配货</div>
        <div class="state3">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">已配货</div>
        <div class="state3">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">已发货</div>
        <div class="state3">(1000)</div>
      </div>
    </div>
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户账户：</div>
      <div class="input">
        <el-input v-model="user_mobile" placeholder="输入用户账户"></el-input>
      </div>
      
      <div class="font">商品名称：</div>
      <div class="input">
        <el-input v-model="goods_name" placeholder="输入商品名称"></el-input>
      </div>
      
      <div class="font">提交时间：</div>
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
      <div class="btn" style="margin-left: 15%" @click="submit()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1">导出数据</div>
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
          label="序号"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          label="兑换方式"
          align="center"
          prop="type"
          min-width="110">
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
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="goodsInfo"
          label="商品信息"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="用户账户"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="use_integral"
          label="消耗积分"
          align="center"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="integral_money"
          label="抵扣金额"
          align="center"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="100"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="color: #0099ce;" @click="del(scope.row.id)">查看订单</div>
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
        :page-size="5"
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
        pageSize: 10,
        currentPage4: 1,
        totals: 10,
        orderList:[],
        user_mobile:'',
        goods_name:'',
        times:''
      }
    },
    methods: {
      //获取兑换订单
      getConversion() {
        this._getData('/api/v1/integral_record/exchangeIntegral', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          this.orderList=data.data;
          this.totals=data.total;
          this.goods_name='';
          this.user_mobile='';
          this.times='';
        })
      },
      //提交
      submit(){
        var data={};
        if(this.user_mobile!=''){
          data.user_mobile=this.user_mobile;
        }
        if(this.goods_name!=''){
          data.goods_name=this.goods_name;
        }
        if(this.times!=''){
          data.start_time=this.times[0];
          data.end_time=this.times[1];
        }
        this._getData('/api/v1/integral_record/exchangeIntegral', {
          page: this.page,
          pageSize: this.pageSize,
          end_time:data.end_time,
          start_time:data.start_time,
          goods_name:data.goods_name,
          user_mobile:data.user_mobile,
        }, data => {
          this.orderList=data.data;
          this.totals=data.total;
        })
        
      },
      //重置
      res(){
        this.goods_name='';
        this.user_mobile='';
        this.times='';
        this.getConversion();
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getConversion();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getConversion();
      },
    },
    created(){
      this.getConversion();
    }
  }
</script>

<style scoped>
</style>
