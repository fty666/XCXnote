<template>
  <div class="body" style="width: 98%;margin-left: 10px">
    <!--银行卡信息-->
    <div class="head">
      <div class="backfont"> 银行卡信息</div>
    </div>
    <div class="flex xiu" style="height: 80px">
      <div class="xfont">持卡人：</div>
      <div class="xfont2">范腾远</div>
      <div class="xfont">卡号：</div>
      <div class="xfont2">范腾远</div>
      <div class="xfont">银行：</div>
      <div class="xfont2">范腾远</div>
      <div class="xfont">卡类型：</div>
      <div class="xfont2" style="width: 150px">范腾远</div>
    </div>
    
    <!--经销商库存-->
    <div class="head">
      <div class="backfont"> 经销商库存</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <el-table
        :data="tableData"
        border
        style="width: 100%;height: auto;">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="date"
          label="商品编号"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品图片"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          min-width="247">
        </el-table-column>
        <el-table-column
          prop="name"
          label="经销商库存"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="name"
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
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="订单类型"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="订单编号"
            align="center"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="address"
            label="提交时间"
            min-width="147"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品信息"
            align="center"
            min-width="250">
          </el-table-column>
          <el-table-column
            prop="name"
            label="金额"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="订单状态"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="address"
            min-width="120"
            align="center"
            label="地址">
            <template slot-scope="scope">
              <div class="flex">
                <div style="color: #0099ce;padding-left: 38px" @click="info(scope.row.id)">查看</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
    <!--积分记录-->
    <div class="head">
      <div class="backfont"> 卖出记录</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <div style="width: 100%">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="订单类型"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="订单编号"
            align="center"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="提交时间"
            align="center"
            min-width="160">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品信息"
            align="center"
            min-width="217">
          </el-table-column>
          <el-table-column
            prop="name"
            label="金额"
            align="center"
            min-width="110">
          </el-table-column>
          <el-table-column
            prop="name"
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
        dealerList: {}
      }
    },
    methods: {
      info() {
        this.$router.push({name: 'buyInfo'})
      },
    },
    created() {
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
