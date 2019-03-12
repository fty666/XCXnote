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
    <div class="flex xiu" style="height: 300px">
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="图片"
            align="center"
            min-width="200px">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            align="center"
            min-width="300px">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            min-width="190px"
            label="单价">
          </el-table-column>
          <el-table-column
            prop="name"
            label="数量"
            align="center"
            min-width="250px">
          </el-table-column>
          <el-table-column
            prop="name"
            label="小计"
            align="center"
            min-width="150px">
          </el-table-column>
        </el-table>
      </div>
      <div class="flex">
        <div style="margin: 20px 0px 50px 350px">运费：0</div>
        <div style="margin: 20px 0px 50px 100px">运险费：0</div>
        <div class="flex" style="margin: 20px 0px 50px 100px">
          <div>应付金额：</div>
          <div style="color: red;margin-top: 3px">0</div>
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
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="margin-top: 35px">
          <div>用户账户：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="margin-top: 35px">
          <div>申请时间：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont">
          <div>申请状态：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont">
          <div>订单金额：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont">
          <div>确认退款金额：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="width: 100%;">
          <div>退款方式：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="width: 100%;">
          <div>退款原因：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="width: 100%;">
          <div>用户说明：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="width: 100%;">
          <div>凭证照片：</div>
          <div>订单的信息</div>
        </div>
      </div>
      <div class="tui flex" style="height: 70px">
        <div class="fonts">处理备注：</div>
        <div>
          <el-input v-model="input" class="inpu" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="btn" style="margin:30px 0px 5% 30% ">
        <el-button type="primary">确认退款</el-button>
      </div>
      <div class="btn2" style="margin:30px 0px 5% 2% ">
        <el-button type="danger">拒绝退款</el-button>
      </div>
    </div>
    <!--订单信息-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单信息</div>
    </div>
    <div class="flex xiu" style="height: 200px">
      <div class="sequence">
        <div class="flex dfont" style="margin-top: 35px">
          <div>订单编号：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="margin-top: 35px">
          <div>创建时间：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="margin-top: 35px">
          <div>付款时间：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont">
          <div>用户账户：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont">
          <div>支付方式：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont">
          <div>交易号：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont">
          <div>发货状态：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont">
          <div>物流单号：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="width: 100%;">
          <div>用户备注：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="width: 100%;">
          <div>操作备注：</div>
          <div>订单的信息</div>
        </div>
      </div>
    </div>
    
    <!--发票信息-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发票信息</div>
    </div>
    <div class="flex xiu" style="height: 130px">
      <div class="sequence">
        <div class="flex dfont" style="margin-top: 35px">
          <div>发票类型：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="margin-top: 35px">
          <div>发票抬头：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="width: 100%;">
          <div>商品明细：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont" style="width: 100%;">
          <div>收票人信息：</div>
          <div>订单的信息</div>
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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: '',
        //  备注订单
        centerDialogVisible: false,
        input: ''
      }
    },
    methods: {
      //修改备注信息
      remark() {
        this.centerDialogVisible = true;
      },
      esc() {
        this.centerDialogVisible = false;
      }
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
