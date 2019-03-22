<template>
  <div class="body">
    <div>
      <Ostate></Ostate>
    </div>
    <!--搜索-->
    <div class="flex whiteT" style="height: 120px">
      <div class="sequence" style="width: 75%;">
        <div class="font">订单类型：</div>
        <div class="input">
          <el-input v-model="input" placeholder="输入配货单号"></el-input>
        </div>
        
        <div class="font" style="margin-left: 4%">选择地区：</div>
        <div class="input">
          <el-input v-model="input" placeholder="输入用户名"></el-input>
        </div>
        
        <div class="font" style="margin-left: 3%">提交时间：</div>
        <div class="input">
          <el-date-picker
            v-model="value1"
            style="width: 140px;"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        
        <div class="font" style="margin-left: 25px">至</div>
        <div class="input">
          <el-date-picker
            v-model="value1"
            style="width: 140px;margin-left: 5px"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        
        <div class="font">商品名称：</div>
        <div class="input">
          <el-input v-model="input" placeholder="输入商品名称"></el-input>
        </div>
        
        <div class="font" style="margin-left: 5%">订单编号：</div>
        <div class="input">
          <el-input v-model="input" placeholder="输入订单编号"></el-input>
        </div>
        
        <div class="font" style="margin-left: 5%">商品名称：</div>
        <div class="input">
          <el-input v-model="input" placeholder="输入商品名称"></el-input>
        </div>
      </div>
      <!--按钮-->
      <div class="btn" style="margin-left:5%;margin-top: 30px">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px;margin-top: 30px">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表头-->
    <div class="head right">
      <div class="head1" @click="batch()">批量删除</div>
      <div class="head1" @click="exportFunc('orderTable','订单列表')">导出订单</div>
      <div class="head1">显示条数</div>
      <div class="head1">排序方式</div>
    </div>
    <!--表格-->
    <div id="orderTable">
      <el-table
        ref="multipleTable"
        :data="orderList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
          min-width="55">
        </el-table-column>
        <el-table-column
          label="所属地区"
          prop="consigner_type"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="订单类型"
          prop="type"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="order_code"
          label="订单编号"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          label="提交时间"
          prop="create_time"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          label="商品信息"
          prop="goods_names"
          align="center"
          min-width="147">
        </el-table-column>
        <el-table-column
          label="实付款"
          prop="payment_price"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="支付方式"
          prop="mode"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="用户账户"
          prop="user_mobile"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          label="订单状态"
          prop="status"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="150"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              <div v-if="scope.row.status=='待支付'">
                <div style="color: #0099ce;padding-left: 10px" @click="infos(scope.row.id)">查看订单</div>
              </div>
              <div class="sequence" v-if="scope.row.status=='待发货'">
                <div style="color: #0099ce;padding-left: 10px" @click="infos(scope.row.id)">查看订单</div>
                <div style="color: #0099ce;padding-left: 5px" @click="send(scope.row)">订单发货</div>
                <div style="color: #0099ce;padding-left: 10px" @click="picking(scope.row.id)">发起配货</div>
                <div style="color: #0099ce;padding-left: 5px" @click="editBelong(scope.row)">修改归属</div>
                <div style="color: #0099ce;padding-left: 10px" @click="send(scope.row.id)">订单退款</div>
              </div>
              <div class="sequence" v-if="scope.row.status=='待收货'">
                <div style="color: #0099ce;padding-left: 10px" @click="infos(scope.row.id)">查看订单</div>
                <div style="color: #0099ce;padding-left: 10px" @click="send(scope.row.id)">物流信息</div>
                <div style="color: #0099ce;padding-left: 10px" @click="send(scope.row.id)">订单退款</div>
              </div>
              <div class="sequence" v-if="scope.row.status=='待评价'">
                <div style="color: #0099ce;padding-left: 10px" @click="infos(scope.row.id)">查看订单</div>
                <div style="color: #0099ce;padding-left: 10px" @click="del(scope.row.id)">删除订单</div>
              </div>
              
              <div class="sequence" v-if="scope.row.status=='完成'">
                <div style="color: #0099ce;padding-left: 10px" @click="infos(scope.row.id)">查看订单</div>
                <div style="color: #0099ce;padding-left: 10px" @click="del(scope.row.id)">删除订单</div>
              </div>
              
              <div class="sequence" v-if="scope.row.status=='前台删除'">
                <div style="color: #0099ce;padding-left: 10px" @click="infos(scope.row.id)">查看订单</div>
                <div style="color: #0099ce;padding-left: 10px" @click="del(scope.row.id)">删除订单</div>
              </div>
            </div>
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
  import Ostate from '@/components/orderStat'
  export default {
    data() {
      return {
        input: '',
        value1: '',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }],
        options: [{
          value: '1',
          label: '平台'
        }, {
          value: '3',
          label: '经销商'
        }],
        consignerType: '',
        multipleSelection: [],
        //订单退货
        centerDialogVisible: false,
        //  发起配货
        sendPicking: false,
        //  修改归属
        belong: false,
        //  订单退款
        orderState: false,
        //页码参数
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 20,
        orderList: [],
        //  修改归属
        editinfo: {},
        value: '',
        orderInfo: [{address: ''}],
        ids:'',
        //库存
        inventory:[],
        trans_company: [],
      }
    },
    components:{
      Ostate
    },
    methods: {
      //查看订单详情
      getOrder() {
        this._getData('/api/v1/order/index', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          console.log(data)
          this.orderList = data.data;
          this.totals = data.total;
        })
      },
      //查看订单详情
      infos(val) {
        sessionStorage.setItem('orderId', val);
        this.$router.push({name: 'orderInfo'})
      },
      //修改归属
      submit() {
        this._getData('/api/v1/order/editBelong', {
          id: this.editinfo.id,
          consignerType: this.consignerType,
          userCode: this.editinfo.user_code
        }, data => {
          this.getOrder();
          this.belong = false;
          this.$message({
            type: 'success',
            message: '操作成功'
          });
        })
      },
      esc() {
        this.belong = false;
      },
      //删除订单
      del(val) {
        this.$confirm('是否此订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/order/delete', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getOrder();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //批量删除
      batch(){
        this.$confirm('是否删除这些订单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/order/batchDelete', {
              ids: this.ids,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getOrder();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleSelectionChange(val) {
        var ids='';
        for(let i=0;i<val.length;i++){
          ids+=val[i].id + ',';
        }
        this.ids=ids;
      },
      //  订单发货
      send(val) {
        console.log(val)
        //查看订单
        this._getData('/api/v1/order/index', {
          order_code: val.order_code,
        }, data => {
          console.log(data)
          this.orderInfo = data.data;
        })
        //选择库存
        this._getData('/api/v1/order/getWarehouse', {
          id: val.id,
        }, data => {
          console.log(data)
          this.inventory = data;
        })
        //查看物流
        this._getData('/api/v1/trans_company/index', {
        }, data => {
          console.log(data)
          this.trans_company = data;
        })
        this.centerDialogVisible = true;
      },
      //  发起配货
      picking() {
        this.sendPicking = true;
      },
      //  修改归属
      editBelong(val) {
        console.log(val)
        this.editinfo = val;
        this.belong = true;
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getOrder();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getOrder();
      },
    },
    created() {
      this.getOrder();
    }
  }
</script>

<style scoped>
  .address {
    margin: 20px 0px 0px 25px;
  }

</style>
