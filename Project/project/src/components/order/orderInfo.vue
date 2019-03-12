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
          <div>编号007</div>
        </div>
        <div class="fonts flex">
          <div>创建时间：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex">
          <div>付款时间：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex">
          <div>订单归属：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex">
          <div>用户账户：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex">
          <div>支付方式：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex">
          <div>交易号：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex">
          <div>获得积分：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex">
          <div>发货转态：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex">
          <div>物流单号：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex" style="width: 100%;">
          <div>用户备注：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex" style="width: 100%;">
          <div>操作备注：</div>
          <div>编号007</div>
        </div>
      </div>
    </div>
    
    <!--发票信息-->
    <div class="head">
      <div class="backfont"> 订单信息</div>
    </div>
    <div class="flex xiu" style="height: 140px;width: 100%">
      <div class="sequence kuan">
        <div class="fonts flex">
          <div>发货类型：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex">
          <div>发票抬头：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex" style="width: 100%;">
          <div>商品信息：</div>
          <div>编号007</div>
        </div>
        <div class="fonts flex" style="width: 100%;">
          <div>收票人信息：</div>
          <div>编号007</div>
        </div>
      </div>
    </div>
    
    <!--商品信息-->
    <div class="head">
      <div class="backfont"> 商品信息</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="图片"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="商品名称"
            align="center"
            min-width="263">
          </el-table-column>
          <el-table-column
            prop="date"
            label="单价"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            label="数量"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            label="小计"
            align="center"
            min-width="150">
          </el-table-column>
        </el-table>
      </div>
      <div class="flex" style="margin: 30px 0px 30px 0px">
        <div style="margin: 30px 0px 30px 150px">积分抵扣：￥1.55</div>
        <div style="margin: 30px 0px 30px 100px">运费：0</div>
        <div class="flex" style="margin: 30px 30px 30px 150px">
            <div>应付金额：</div>
            <div style="color: red;">￥18654</div>
        </div>
      </div>
    </div>
    
    <!--订单评价-->
    <div class="head">
      <div class="backfont"> 订单评价</div>
    </div>
    <div class="xiu" style="height: auto;">
      <!--评分-->
      <div class="flex" style="margin: 20px 0px 0px 30px">
        <div class="pfont" style="width: 100%;">评价日期：</div>
        <div class="flex pfont">
          <div>描述相符:</div>
          <div>
            <img src="@/img/xin.png" style="width: 10px;height: 10px" alt="">
          </div>
        </div>
        
        <div class="flex pfont pian">
          <div>物流服务:</div>
          <div>
            <img src="@/img/xin.png" style="width: 10px;height: 10px" alt="">
          </div>
        </div>
        
        <div class="flex pfont pian">
          <div>服务态度:</div>
          <div>
            <img src="@/img/xin.png" style="width: 10px;height: 10px" alt="">
          </div>
        </div>
      </div>
      <!--内容-->
      <div class="content flex">
        <div class="cfont">评价商品：</div>
        <div class="cfont ckuan">干红葡萄酒</div>
        
        <div class="cfont">评价正文：</div>
        <div class="cfont ckuan">很好好好</div>
        <div>
          <img src="@/img/to.png" class="imgs" alt="">
        </div>
        <div class="cfont" style="margin-left: 0px">回复评价：</div>
        <div style="width: 90%">
          <div class="cfont ckuan" style="width: 20%">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
        </div>
        <div style="width: 100%">
          <div class="cfont">
            <el-button class="buttons" type="primary" size="small">确认</el-button>
          </div>
        </div>
        <div class="show">注：回复内容会在前台显示</div>
        <div class="selects">
          <el-checkbox v-model="checked2">显示此评价</el-checkbox>
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
        //  经销商信息选择
        dealer: true,
        members: false,
        textarea: '',
        checked2:''
      }
    },
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
  
  .imgs{
    width: 20px;
    height: 20px;
    margin: 10px 0px 0px 20px;
  }
  .show{
    width: 100%;
    text-align: left;
    margin: 5px 0px 0px 20px;
    font-size: 12px;
    color: #999999;
  }
  .selects{
    margin: 10px 0px 20px 20px;
    
  }
</style>
