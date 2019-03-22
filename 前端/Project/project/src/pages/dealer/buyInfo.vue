<template>
  <div class="body">
    <!--标头-->
    <div class="spaces">
      <div class="clos" @click="remark()">备注订单</div>
      <router-link to="/dealer/dealerManage">
        <div class="clos" style="margin-right: 30px">返回列表</div>
      </router-link>
    </div>
    <!--表格-->
    <!--订单信息-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单信息</div>
    </div>
    <div class="flex xiu" style="height: 200px">
      <div class="sequence">
        <div class="flex dfont" style="margin-top: 35px">
          <div>订单编号：</div>
          <div>{{this.orderInfo.order_code}}</div>
        </div>
        <div class="flex dfont" style="margin-top: 35px">
          <div>创建时间：</div>
          <div>{{this.orderInfo.create_time}}</div>
        </div>
        <div class="flex dfont" style="margin-top: 35px">
          <div>付款时间：</div>
          <div>{{this.orderInfo.payment_time}}</div>
        </div>
        <div class="flex dfont">
          <div>用户账户：</div>
          <div>{{this.orderInfo.mobile}}</div>
        </div>
        <div class="flex dfont">
          <div>支付时间：</div>
          <div>{{this.orderInfo.payment_time}}</div>
        </div>
        <div class="flex dfont">
          <div>交易号：</div>
          <div>{{this.orderInfo.order_uuid}}</div>
        </div>
        <div class="flex dfont" style="width: 100%;">
          <div>用户备注：</div>
          <div>{{this.orderInfo.remark}}</div>
        </div>
      </div>
    </div>
    
    <!--商品信息-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品信息</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <el-table
        :data="goodInfo"
        border
        style="width: 100%">
        <el-table-column
          label="图片"
          align="center"
          min-width="180">
          <template slot-scope="scope">
            <div>
              <img :src="imggerUrl+scope.row.list_img" class="imgs">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="price"
          align="center"
          min-width="130"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="goods_count"
          label="小计"
          align="center"
          min-width="180">
        </el-table-column>
      </el-table>
    </div>
    
    <!--回购信息-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回购信息</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <el-table
        :data="jionList"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          label="图片"
          min-width="180">
          <template slot-scope="scope">
            <div>
              <img :src="imggerUrl+scope.row.list_img" class="imgs">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="stock"
          align="center"
          min-width="180"
          label="剩余库存">
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          label="操作"
          min-width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.buyBack=='1'" style="color: deepskyblue;" @click="back(scope.row)">回购</div>
            <div v-if="scope.row.buyBack=='0'" style="color: deepskyblue;">不可回购</div>
            <div v-else style="color: deepskyblue;">{{scope.row.buyBack}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!--备注-->
    <div>
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="xiu">
          <div class="edit">修改备注</div>
          <div class="flex futext">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <div class="flex">
            <div class="logBtn1" style="margin: 20px 0px 0px 30%;" @click="submit()">
              <el-button size="medium" type="primary">提交</el-button>
            </div>
            <div class="logBtn2" style="margin-top: 20px">
              <el-button size="medium" @click="esc">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        textarea: '',
        //  备注订单
        centerDialogVisible: false,
        orderInfo: [],
        goodInfo: [],
        jionList: [],
        //强制回购条件
        orderCode: '',
        orderId:''
      }
    },
    methods: {
      //获取订单信息
      getOrder() {
        this._getData('/api/v1/order/show', {
          id: sessionStorage.getItem('dealID')
        }, data => {
          this.goodInfo = [];
          this.orderInfo = data;
          for (var x in data.goods) {
            this.goodInfo.push(data.goods[x])
          }
          this.orderCode = data.order_code;
          this.orderId = data.id;
          // 获取回购信息
          this._getData('/api/v1/dealer/order', {
            orderCode: data.order_code
          }, data => {
            this.jionList = data[0].goodsInfo;
          })
        })
      },
      //修改备注信息
      remark() {
        this.centerDialogVisible = true;
      },
      esc() {
        this.centerDialogVisible = false;
      },
      submit(){
        this._getData('/api/v1/order/mark', {
            id: this.orderId,
            mark:this.textarea,
          },
          data => {
            this.getOrder();
            this.centerDialogVisible=false;
          })
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      },
      //  回购信息
      back(val) {
        this.$confirm('是否回购这些商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/buyback_record/coerce', {
              user_code: sessionStorage.get('userCode'),
              order_code: this.orderCode,
              goodsId: val.goods_id,
              num: val.num,
              price: val.price
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.getOrder();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    created() {
      this.getOrder();
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
    margin: 10px 0px 0px 10px;
    width: 95%;
  }
</style>
