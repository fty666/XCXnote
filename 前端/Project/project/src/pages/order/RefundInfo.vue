<template>
  <div class="body">
    <!--标头-->
    <div class="spaces">
      <router-link to="/order/orderRefund">
        <div class="clos" style="margin-right: 30px">返回列表</div>
      </router-link>
    </div>
    <!--商品信息-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品信息</div>
    </div>
    <div class=" xiu" style="height: auto">
      <div>
        <el-table
          :data="goodList"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="图片"
            align="center"
            min-width="200px">
            <template slot-scope="scope">
              <img :src="imggerUrl+scope.row.list_img" class="imgs">
            </template>
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            align="center"
            min-width="300px">
          </el-table-column>
          <el-table-column
            prop="price"
            align="center"
            min-width="190px"
            label="单价">
          </el-table-column>
          <el-table-column
            prop="num"
            label="数量"
            align="center"
            min-width="250px">
          </el-table-column>
          <el-table-column
            label="小计"
            align="center"
            min-width="150px">
            <template slot-scope="scope">
              {{scope.row.num*scope.row.price}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex">
        <div class="flex" style="margin: 20px 0px 50px 100px">
          <div>应付金额：</div>
          <div style="color: red;margin-top: 3px">{{this.orderInfo.payment_price}}</div>
        </div>
      </div>
    </div>
    
    <!--退款信息-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;退款信息</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <div class="tui sequence">
        <div class="flex dfont" style="margin-top: 35px">
          <div>订单编号：</div>
          <div>{{this.orderInfo.order_code}}</div>
        </div>
        <div class="flex dfont" style="margin-top: 35px">
          <div>用户账户：</div>
          <div>{{this.orderInfo.mobile}}</div>
        </div>
        <div class="flex dfont" style="margin-top: 35px">
          <div>申请时间：</div>
          <div>{{this.orderInfo.create_time}}</div>
        </div>
        <div class="flex dfont">
          <div>申请状态：</div>
          <div>{{this.orderInfo.status}}</div>
        </div>
        <div class="flex dfont">
          <div>订单金额：</div>
          <div>{{this.orderInfo.payment_price}}</div>
        </div>
        <div class="flex dfont">
          <div>确认退款金额：</div>
          <div>{{this.orderInfo.payment_price}}</div>
        </div>
        <div class="flex dfont" style="width: 100%;">
          <div>退款方式：</div>
          <div>退回到原支付渠道</div>
        </div>
        <div class="flex dfont" style="width: 100%;">
          <div>用户说明：</div>
          <div>{{this.orderInfo. remark}}</div>
        </div>
      </div>
      <div class="btn" style="margin:30px 0px 5% 30% " @click="submit()" v-if="refunds==4">
        <el-button type="primary">确认退款</el-button>
      </div>
      <div class="btn2" style="margin:30px 0px 5% 2% " @click="esc()" v-if="refunds==4">
        <el-button type="danger">拒绝退款</el-button>
      </div>
    </div>
    <!--订单信息-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单信息</div>
    </div>
    <div class="flex xiu" style="height: 200px">
      <div class="sequence kuan">
        <div class="fonts flex">
          <div>订单编号：</div>
          <div>{{this.orderInfo.order_code}}</div>
        </div>
        <div class="fonts flex">
          <div>创建时间：</div>
          <div>{{this.orderInfo.create_time}}</div>
        </div>
        <div class="fonts flex">
          <div>付款时间：</div>
          <div>{{this.orderInfo.payment_time}}</div>
        </div>
        <div class="fonts flex">
          <div>订单归属：</div>
          <div>{{this.orderInfo.type}}</div>
        </div>
        <div class="fonts flex">
          <div>用户账户：</div>
          <div>{{this.orderInfo.mobile}}</div>
        </div>
        <div class="fonts flex">
          <div>支付方式：</div>
          <div>{{this.orderInfo.mode}}</div>
        </div>
        <div class="fonts flex">
          <div>交易号：</div>
          <div>{{this.orderInfo.business_no}}</div>
        </div>
        <div class="fonts flex">
          <div>获得积分：</div>
          <div>{{this.orderInfo.integral}}</div>
        </div>
        <div class="fonts flex">
          <div>发货状态：</div>
          <div>{{this.orderInfo.status}}</div>
        </div>
        <div class="fonts flex">
          <div>物流单号：</div>
          <div>{{this.orderInfo.transNO}}</div>
        </div>
        <div class="fonts flex" style="width: 100%;">
          <div>用户备注：</div>
          <div>{{this.orderInfo.remark}}</div>
        </div>
      </div>
    </div>
    
    <!--发票信息-->
    <div class="head">
      <div class="backfont"> 发票信息</div>
    </div>
    <div class="flex xiu" style="height: 140px;width: 100%">
      <div class="sequence kuan" v-if="this.bill==true">
        <div class="fonts flex">
          <div>发货类型：</div>
          <div>{{this.orderInfo.invoice.type}}</div>
        </div>
        <div class="fonts flex">
          <div>发票抬头：</div>
          <div>{{this.orderInfo.invoice.rise}}</div>
        </div>
        <div class="fonts flex" style="width: 100%;">
          <div>商品信息：</div>
          <div class="flex">
            <div v-for="(item,index) in orderInfo.goods" :key='index'>
              <div>
                {{item.goods_name}}&
              </div>
            </div>
          </div>
        </div>
        <div class="fonts flex" style="width: 100%;">
          <div>收票人信息：</div>
          <div>{{this.orderInfo.invoice.mobile}}&nbsp;&nbsp;&nbsp;{{this.orderInfo.invoice.mail}}</div>
        </div>
      </div>
      <div class="sequence kuan" v-else>
        <div class="fonts flex">
          该订单没有开发票
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
        textarea: '',
        value: '',
        orderInfo: {},
        goodList: [],
        input: '',
        bill: false,
        detailId: "",
        refunds: ''
      }
    },
    methods: {
      //获取订单
      getOrder() {
        this._getData('/api/v1/order/show', {
            id: sessionStorage.getItem('refoundId'),
          },
          data => {
            for (let i in data.goods) {
              this.goodList.push(data.goods[i]);
              this.detailId = this.goodList[0].detail_id;
            }
            if (data.invoice != null) {
              this.bill = true;
            }
            this.orderInfo = data;
          })
      },
      //  确认退款订单
      submit() {
        this.$confirm('是否退款此订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/order/refund', {id: this.detailId},
            data => {
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
      esc() {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      },
    },
    created() {
      this.getOrder();
      this.refunds = sessionStorage.getItem('StatusD')
    }
  }
</script>

<style scoped>
  .dfont {
    margin: 0px 0px 0px 20px;
    width: 30%;
    height: 10px;
    font-size: 14px;
  }
  
  .futext {
    margin: 20px 0px 0px 20px;
    width: 95%;
  }
  
  /*退款信息*/
  .tui {
    width: 95%;
    height: 250px;
    margin: 10px 0px 0px 10px;
    border: 1px solid #ddd;
  }
  
  .fonts {
    font-size: 15px;
    margin: 25px 0px 0px 100px;
  }
  
  .inpu {
    margin: 16px 0px 0px 40px;
    width: 500px;
  }
</style>
