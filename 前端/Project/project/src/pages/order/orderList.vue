<template>
  <div class="body">
    <div class="flex" style="margin-top: 20px;">
      <div :class="['state', 'flex',sum==true?'Xbj':'']" @click="Xsum()">
        <div class="state2">全部订单</div>
        <div class="state3">({{this.orderStatus[7]}})</div>
      </div>
      <div :class="['state', 'flex',month==true?'Xbj':'']" style="margin-left: 0px" @click="Xmonth()">
        <div class="state2">待付款</div>
        <div class="state3">({{this.orderStatus[0]}})</div>
      </div>
      <div :class="['state', 'flex',day==true?'Xbj':'']" style="margin-left: 0px" @click="Xday()">
        <div class="state2">待发货</div>
        <div class="state3">({{this.orderStatus[2]}})</div>
      </div>
      <div :class="['state', 'flex',bshop==true?'Xbj':'']" style="margin-left: 0px" @click="Xshop()">
        <div class="state2">已发货</div>
        <div class="state3">({{this.orderStatus[3]}})</div>
      </div>
      <div :class="['state', 'flex',finish==true?'Xbj':'']" style="margin-left: 0px" @click="Xfinish()">
        <div class="state2">已完成</div>
        <div class="state3">({{this.orderStatus[5]}})</div>
      </div>
      <div :class="['state', 'flex',Close==true?'Xbj':'']" style="margin-left: 0px" @click="Xclose()">
        <div class="state2">已关闭</div>
        <div class="state3">({{this.orderStatus[0]}})</div>
      </div>
    </div>
    <!--搜索-->
    <div class="flex whiteT" style="height: 120px">
      <div class="sequence" style="width: 75%;">
        <div class="font">订单类型：</div>
        <div class="input">
          <el-input v-model="type" placeholder="输入订单类型"></el-input>
        </div>
        
        <div class="font" style="margin-left: 4%">输入地区：</div>
        <div class="input">
          <el-select v-model="consigner_type" placeholder="请选择">
            <el-option label="平台" value="1"></el-option>
            <el-option label="加盟商" value="2"></el-option>
            <el-option label="经销商" value="3"></el-option>
          </el-select>
        </div>
        
        <div class="font" style="margin-left: 3%">提交时间：</div>
        <el-date-picker
          v-model="stimes"
          style="width: 230px;margin-top: 10px"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        
        <div class="font">商品名称：</div>
        <div class="input">
          <el-input v-model="goods_name" placeholder="输入商品名称"></el-input>
        </div>
        
        <div class="font">用户账户：</div>
        <div class="input">
          <el-input v-model="user_mobile" placeholder="输入用户账户"></el-input>
        </div>
        
        <div class="font" style="margin-left: 5%">订单编号：</div>
        <div class="input">
          <el-input v-model="order_code" style="width: 150px" placeholder="输入订单编号"></el-input>
        </div>
        
        <div class="font" style="margin-left: 5%">商品名称：</div>
        <div class="input">
          <el-input v-model="goods_name" placeholder="输入商品名称"></el-input>
        </div>
      </div>
      <!--按钮-->
      <div class="btn" style="margin-left:5%;margin-top: 30px" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px;margin-top: 30px" @click="res()">
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
                <div style="color: #0099ce;padding-left: 5px" @click="editAff(scope.row)">修改归属</div>
                <div style="color: #0099ce;padding-left: 10px" @click="refund(scope.row.id)">订单退款</div>
              </div>
              <div class="sequence" v-if="scope.row.status=='待收货'">
                <div style="color: #0099ce;padding-left: 10px" @click="infos(scope.row.id)">查看订单</div>
                <div style="color: #0099ce;padding-left: 10px" @click="send(scope.row.id)">物流信息</div>
                <div style="color: #0099ce;padding-left: 10px" @click="refund(scope.row.id)">订单退款</div>
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
              <div class="sequence" v-if="scope.row.status=='取消订单'">
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
    <!--订单发货-->
    <div>
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        width="34%"
        center>
        <delivergoods @closeSend="closeSend" :orderInfo="deliverGood"></delivergoods>
      
      </el-dialog>
    </div>
    <!--修改归属-->
    <div>
      <el-dialog
        title=""
        :visible.sync="affiliation"
        width="34%"
        center>
        <affiliationGoods @closeAff="closeAff" @getOrder="getOrder" :deliverGood="deliverGood"></affiliationGoods>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import delivergoods from '@/components/order/deliverGoods'
  import alloctiongoods from '@/components/order/allocationGoods'
  import affiliationGoods from '@/components/order/affiliationGoods'
  
  export default {
    data() {
      return {
        type: '',
        stimes: '',
        order_code: '',
        goods_name: '',
        alliance_id: '',
        user_mobile: '',
        consigner_type: '',
        multipleSelection: [],
        //页码参数
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 20,
        orderList: [],
        ids: '',
        //背景选择
        orderStatus: [],
        sum: true,
        month: false,
        day: false,
        bshop: false,
        finish: false,
        Close: false,
        all: false,
        Status: '',
        //  操作
        //订单退货
        centerDialogVisible: false,
        //发起配货
        sendPicking: false,
        affiliation: false,
        deliverGood: [],
        pickingId: '',
        orderID: '',
      }
    },
    components: {
      delivergoods,
      alloctiongoods,
      affiliationGoods
    },
    methods: {
      //查看订单详情
      getOrder() {
        var datas = {};
        this.getInfo(datas);
      },
      getInfo(datas) {
        datas.page = this.page;
        datas.pageSize = this.pageSize;
        this._getData('/api/v1/order/index', datas, data => {
          this.orderList = data.data;
          console.log(data.data)
          this.totals = data.total;
        })
      },
      //订单发货状态
      getStatus() {
        this._getData('/api/v1/order/status', {}, data => {
          for (let i = 0; i < data.length; i++) {
            this.orderStatus.push(data[i].cnt)
          }
        })
      },
      //搜索
      search() {
        var datas = {};
        if (this.type != '') {
          datas.type = this.type;
        }
        if (this.stimes != '') {
          datas.start_time = this.stimes[0];
          datas.end_tiem = this.stimes[1];
        }
        if (this.order_code != '') {
          datas.order_code = this.order_code;
        }
        if (this.goods_name != '') {
          datas.goods_name = this.goods_name;
        }
        if (this.consigner_type != '') {
          datas.consigner_type = this.consigner_type;
        }
        if (this.user_mobile != '') {
          datas.user_mobile = this.user_mobile;
        }
        this.getInfo(datas);
      },
      res() {
        this.type = '';
        this.stimes = '';
        this.order_code = '';
        this.goods_name = '';
        this.consigner_type = '';
        this.user_mobile = '';
        this.getOrder();
      },
      //查看订单详情
      infos(val) {
        sessionStorage.setItem('orderId', val);
        sessionStorage.setItem('page', '订单管理')
        this.$router.push({name: 'orderInfo'})
      },
      //订单发货
      send(val) {
        console.log(val)
        this.deliverGood = val;
        this.centerDialogVisible = true;
      },
      closeSend() {
        this.centerDialogVisible = false;
      },
      //发起配货
      picking(val) {
        console.log(val)
        this.sendPicking = true;
        this.pickingId = val;
      },
      closealloction() {
        this.sendPicking = false;
      },
      //修改归属
      editAff(val) {
        this.deliverGood = val;
        this.affiliation = true;
      },
      closeAff() {
        this.affiliation = false;
      },
      //订单退款
      refund(val) {
        this.$confirm('是否退款此订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/order/refund', {
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
      batch() {
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
        var ids = '';
        for (let i = 0; i < val.length; i++) {
          ids += val[i].id + ',';
        }
        this.ids = ids;
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
      //  选择背景
      Xsum() {
        this.getOrder();
        this.select(1);
      },
      Xmonth() {
        var datas = {status: 1};
        this.Status = 1;
        this.getInfo(datas);
        this.select(2);
      },
      Xday() {
        var datas = {status: 2};
        this.Status = 2;
        this.getInfo(datas);
        this.select(3);
      },
      Xshop() {
        var datas = {status: 3};
        this.Status = 3;
        this.getInfo(datas);
        this.select(4);
      },
      Xfinish() {
        var datas = {status: 4};
        this.Status = 4;
        this.getInfo(datas);
        this.select(5)
      },
      Xclose() {
        var datas = {status: 5};
        this.Status = 5;
        this.getInfo(datas);
        this.select(6)
      },
      // Xall() {
      //   var datas={consigner_type:1};
      //   this.getInfo(datas);
      //   this.select(7)
      // },
      select(flag) {
        this.sum = false;
        this.month = false;
        this.day = false;
        this.bshop = false;
        this.finish = false;
        this.Close = false;
        this.all = false;
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
            this.finish = true;
            break;
          case 6:
            this.Close = true;
            break;
          case 7:
            this.all = true;
            break;
        }
      }
    },
    created() {
      this.getOrder();
      this.getStatus();
    }
  }
</script>

<style scoped>
  .address {
    margin: 20px 0px 0px 25px;
  }

</style>
