<template>
  <div class="body">
    <!--经销商库存-->
    <div class="head">
      <div class="backfont"> 订单信息</div>
    </div>
    <div class="flex xiu" style="height: 200px;width: 100%">
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
        <!--<div class="fonts flex">-->
          <!--<div>用户账户：</div>-->
          <!--<div>{{this.orderInfo.user.mobile}}</div>-->
        <!--</div>-->
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
    <!--商品信息-->
    <div class="head">
      <div class="backfont"> 商品信息</div>
    </div>
    <div class="xiu" style="height: auto">
      <el-table
        :data="goodsList"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="图片"
          align="center"
          min-width="180">
          <template slot-scope="scope">
            <img :src="imggerUrl+scope.row.list_img" style="width: 150px;height: 150px">
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          align="center"
          min-width="250">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="goods_count"
          label="小计"
          align="center"
          min-width="150">
        </el-table-column>
      </el-table>
      <div class="flex" style="margin: 30px 0px 30px 0px">
        <div style="margin: 30px 0px 30px 150px">积分抵扣：{{orderInfo.integral}}</div>
        <div class="flex" style="margin: 30px 30px 30px 150px">
          <div>应付金额：</div>
          <div style="color: red;">￥{{orderInfo.payment_price}}</div>
        </div>
      </div>
    </div>
    <!--订单评价-->
    <div class="head">
      <div class="backfont"> 订单评价</div>
    </div>
    <div class="xiu" style="height: auto;">
      <!--评分-->
      <div v-for="(item,index) in this.orderInfo.comment" :key="index">
        <div class="flex" style="margin: 20px 0px 0px 30px">
          <div class="pfont" style="width: 100%;">评价日期：{{item.create_time}}</div>
          <div class="flex pfont">
            <div>描述相符:</div>
            <div>
              <el-rate v-model="item.grade"></el-rate>
            </div>
          </div>
          
          <div class="flex pfont pian">
            <div>物流服务:</div>
            <div>
              <el-rate v-model="item.grade1"></el-rate>
            </div>
          </div>
          
          <div class="flex pfont pian">
            <div>服务态度:</div>
            <div>
              <el-rate v-model="item.grade2"></el-rate>
            </div>
          </div>
        </div>
        <!--内容-->
        <div class="content flex">
          <div class="cfont">评价商品：</div>
          <div class="cfont ckuan">{{item.goods_name}}</div>
          
          <div class="cfont">评价正文：</div>
          <div class="cfont ckuan" >{{item.content}}</div>
          <div style="width: 100%" class="flex">
            <div v-for="(items,index) in item.img.split(',')" :key="index" style="margin:15px 0px 0px 20px">
              <img :src="imggerUrl+items" style="width: 100px;height: 100px">
            </div>
          </div>
          <!--<div class="cfont" style="margin-left: 0px">回复评价：</div>-->
          <!--<div style="width: 90%">-->
            <!--<div class="cfont ckuan" style="width: 20%">-->
              <!--<el-input-->
                <!--type="textarea"-->
                <!--:rows="5"-->
                <!--placeholder="请输入内容"-->
                <!--v-model="textarea">-->
              <!--</el-input>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div style="width: 100%">-->
            <!--<div class="cfont">-->
              <!--<el-button class="buttons" type="primary" size="small">确认</el-button>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="show">注：回复内容会在前台显示</div>-->
          <!--<div class="selects">-->
            <!--<el-checkbox v-model="checked2">显示此评价</el-checkbox>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //  经销商信息选择
        dealer: true,
        members: false,
        textarea: '',
        checked2: '',
        orderInfo: {},
        bill: false,
        goodsList: []
      }
    },
    methods: {
      //  获取订单详情
      getInfo() {
        this._getData('/api/v1/order/show', {
          id: sessionStorage.getItem('orderId'),
        }, data => {
          console.log(data)
          if (data.invoice != null) {
            this.bill = true;
          }
          this.orderInfo = data;
          for (let i in data.goods) {
            this.goodsList.push(data.goods[i])
          }
          this.$emit('Status',this.orderInfo.status)
        })
      }
    },
    created() {
      this.getInfo();
    }
  }
</script>

<style scoped>
  .kuan {
    width: 100%;
    margin: 20px 0px 0px 20px;
  }
  
  .fonts {
    width: 20%;
    font-size: 14px;
    margin: 0px 0px 0px 10px;
  }
  
  /*评价*/
  .pfont {
    text-align: left;
    font-size: 13px;
    line-height: 30px;
  }
  
  .pian {
    margin-left: 50px;
  }
  
  .content {
    width: 95%;
    border: 1px solid #ddd;
    margin: 10px 0px 30px 30px;
  }
  
  .cfont {
    margin: 10px 0px 0px 5px;
    font-size: 14px;
    width: 10%;
  }
  
  .ckuan {
    text-align: left;
    width: 85%;
  }
  
  .imgs {
    width: 20px;
    height: 20px;
    margin: 10px 0px 0px 20px;
  }
  
  .show {
    width: 100%;
    text-align: left;
    margin: 5px 0px 0px 20px;
    font-size: 12px;
    color: #999999;
  }
  
  .selects {
    margin: 10px 0px 20px 20px;
    
  }
</style>
