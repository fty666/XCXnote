<template>
  <div class="body">
    <!--回购-->
    <div class="flex" style="margin-top: 30px;">
      <router-link to="/dealer/dealerBuy">
        <div :class="[ 'state','flex']" style="text-align: center">
          <div class="state2">返回</div>
        </div>
      </router-link>
    </div>
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">账号：</div>
      <div class="input">
        <el-input v-model="user_mobile" placeholder="输入账号"></el-input>
      </div>
      
      <div class="font">名称：</div>
      <div class="input">
        <el-input v-model="goods_name" placeholder="输入商品名称"></el-input>
      </div>
      
      <div class="font">购入日期：</div>
      <div class="input">
        <el-date-picker
          v-model="stime"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <!--按钮-->
      <div class="btn" style="margin-left:15%" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    <!--经销商申请回购-->
    <div>
      <div class="head join">
      </div>
      <el-table
        ref="multipleTable"
        :data="Jterrace"
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
          label="用户ID"
          prop="user_id"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="user_mobile"
          label="账号"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品信息"
          min-width="150"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品单价"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="goods_integral"
          label="商品可获得积分"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="order_time"
          label="购入时间"
          align="center"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="num"
          label="回购数量"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="回购时间"
          align="center"
          min-width="110">
        </el-table-column>
      </el-table>
      
      <div class="pag">
        <el-pagination
          @size-change="JPhandleSizeChange"
          @current-change="JPhandleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total=Jtotal>
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
        value1: '',
        stime: '',
        multipleSelection: [],
        centerDialogVisible: false,
        //页码参数
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 10,
        Jtotal: 10,
        //集合
        Jterrace: [],
        user_mobile: '',
        goods_name: '',
        value2: ''
      }
    },
    methods: {
      JPhandleSizeChange(val) {
        this.pageSize = val;
        if (this.goods_name != '' || this.user_mobile != '' || this.Stime != '') {
          this.Xpag()
        } else {
          this.getJin();
        }
      },
      //第几页
      JPhandleCurrentChange(val) {
        this.page = val;
        if (this.goods_name != '' || this.user_mobile != '' || this.Stime != '') {
          this.Xpag()
        } else {
          this.getJin();
        }
      },
      //获取销商申请回购
      getJin() {
        this._getData('/api/v1/buyback_record/index', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          console.log('经销商回购')
          console.log(data)
          this.Jterrace = data.data;
          this.Jtotal = data.total;
        })
      },
      //搜索
      search() {
        this.page = 1;
        var data = this.goods_name;
        if (this.goods_name != '') {
          data.goods_name = this.goods_name;
        }
        if (this.user_mobile != '') {
          data.user_mobile = this.user_mobile;
        }
        if (this.Stime == null) {
        } else {
          if (this.Stime.length > 0) {
            data.start_time = this.Stime[0];
            data.end_time = this.Stime[1];
          }
        }
        //获取平台
        this._getData('/api/v1/buyback_record/dealerApply', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          this.Jterrace = data.data;
          this.totals = data.total;
        })
      },
      Xpag() {
        var data = this.goods_name;
        if (this.goods_name != '') {
          data.goods_name = this.goods_name;
        }
        if (this.user_mobile != '') {
          data.user_mobile = this.user_mobile;
        }
        if (this.Stime == null) {
        } else {
          if (this.Stime.length > 0) {
            data.start_time = this.Stime[0];
            data.end_time = this.Stime[1];
          }
        }
        //获取平台
        this._getData('/api/v1/buyback_record/dealerApply', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          this.Jterrace = data.data;
          this.totals = data.total;
        })
      },
      res() {
        this.goods_name = '';
        this.user_mobile = '';
        this.Stime = '';
        this.page = 1;
        this.getJin();
      }
    },
    created() {
      this.getJin();
    }
  }
</script>

<style scoped>
</style>
