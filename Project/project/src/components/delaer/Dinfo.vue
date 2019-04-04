<template>
  <div class="body" style="width: 98%;margin-left: 10px">
    <!--银行卡信息-->
    <div class="head">
      <div class="backfont"> 银行卡信息</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <el-table
        :data="cards"
        border
        style="width: 100%;height: auto;">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="持卡人"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="bank_card_number"
          label="卡号"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="bank_card"
          label="银行"
          align="center"
          min-width="247">
        </el-table-column>
        <el-table-column
          prop="type"
          label="卡类型"
          align="center"
          min-width="180">
        </el-table-column>
      </el-table>
    </div>
    
    <!--经销商库存-->
    <div class="head">
      <div class="backfont"> 经销商库存</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <el-table
        :data="inventoryList"
        border
        style="width: 100%;height: auto;">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="id"
          label="商品编号"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品图片"
          align="center"
          min-width="200">
          <template slot-scope="scope">
            <div>
              <img :src="imggerUrl+scope.row.goods.list_img" class="imgs">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          align="center"
          min-width="247">
          <template slot-scope="scope">
            <div>{{scope.row.goods.goods_name}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="经销商库存"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="更新时间"
          align="center"
          min-width="180">
        </el-table-column>
      </el-table>
    </div>
    
    <!--购入管理-->
    <div class="head">
      <div class="backfont"> 购入记录</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <div style="width: 100%;height: auto;">
        <el-table
          :data="purchaseList"
          border
          style="width: 100%">
          <el-table-column
            prop="type"
            label="订单类型"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="order_code"
            label="订单编号"
            align="center"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="提交时间"
            min-width="147"
            align="center">
          </el-table-column>
          <el-table-column
            prop="goodsInfo"
            label="商品信息"
            align="center"
            min-width="250">
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
            min-width="100">
          </el-table-column>
          <el-table-column
            min-width="120"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <div class="flex">
                <div style="color: #0099ce;padding-left: 38px" @click="info(scope.row.id)">查看</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
    <!--卖出记录-->
    <div class="head">
      <div class="backfont"> 卖出记录</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <div style="width: 100%">
        <el-table
          :data="saleList"
          border
          style="width: 100%">
          <el-table-column
            prop="type"
            label="订单类型"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="order_code"
            label="订单编号"
            align="center"
            min-width="200">
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
            min-width="217">
          </el-table-column>
          <el-table-column
            prop="payment_price"
            label="金额"
            align="center"
            min-width="110">
          </el-table-column>
          <el-table-column
            prop="status"
            label="订单状态"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            min-width="80"
            align="center">
            <template slot-scope="scope">
              <div style="color: #0099ce;" @click="info(scope.row.id)">查看</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        //记录
        dealerList: {},
        inventoryList: [],
        purchaseList: [],
        saleList: [],
        cards: []
      }
    },
    methods: {
      //银行卡信息
      getCards() {
        this._getData('/api/v1/bank_card/getUserCard', {
            user_code: sessionStorage.getItem('userCode'),
          },
          data => {
            this.cards = data;
          })
      },
      //经销商库存
      inventory() {
        this._getData('/api/v1/dealer_warehouse/dealerGoods', {
            userCode: sessionStorage.getItem('userCode'),
          },
          data => {
            this.inventoryList = data.data;
          })
      },
      //购入记录
      purchase() {
        this._getData('/api/v1/dealer/buy', {
            userCode: sessionStorage.getItem('userCode'),
            order_status: 'desc'
          },
          data => {
            this.purchaseList = data.data;
          })
      },
      //卖出记录
      getSale() {
        this._getData('/api/v1/dealer/sale', {
            userCode: sessionStorage.getItem('userCode'),
          },
          data => {
            this.saleList = data.data;
          })
      },
      info() {
        this.$router.push({name: 'buyInfo'})
      },
    },
    created() {
      this.inventory();
      this.purchase();
      this.getSale();
      this.getCards();
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
  
  .xfont {
    margin: 20px 0px 0px 30px;
    font-size: 14px;
  }
  
  .xfont2 {
    width: 200px;
    margin: 20px 0px 0px 0px;
    text-align: left;
    font-size: 14px;
  }
  
  .sou {
    width: 100%;
    height: 50px;
    padding: 20px 0px 0px 35px;
    font-size: 15px;
    color: #999999;;
  }
</style>
