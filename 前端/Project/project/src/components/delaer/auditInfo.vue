<template>
  <div class="body" style="margin-left: 10px;width: 98%;">
    
    <!--经销商库存-->
    <div class="head">
      <div class="backfont"> 统计信息</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="消费总额"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单总数"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          min-width="207"
          label="商品评价">
        </el-table-column>
        <el-table-column
          prop="name"
          label="退货次数"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="name"
          label="登录次数"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="name"
          label="收藏商品"
          align="center"
          min-width="210">
        </el-table-column>
        <el-table-column
          prop="name"
          label="邀请好友数"
          align="center"
          min-width="130">
        </el-table-column>
      </el-table>
    </div>
    
    <!--收货地址-->
    <div class="head">
      <div class="backfont"> 收货地址</div>
    </div>
    <div class="flex xiu" style="height:auto">
      <div style="width: 100%">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="姓名"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="手机号"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="详细地址"
            align="center"
            min-width="408">
          </el-table-column>
          <el-table-column
            prop="name"
            label="邮编"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            min-width="120"
            align="center"
            label="默认地址">
            <template slot-scope="scope">
                <div style="color: #0099ce;" @click="info(scope.row.id)">是</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--订单记录-->
    <div class="head">
      <div class="backfont"> 订单记录</div>
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
            min-width="130">
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
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="address"
            label="商品信息"
            align="center"
            min-width="218">
          </el-table-column>
          <el-table-column
            prop="address"
            label="金额"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="address"
            label="订单状态"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="address"
            min-width="120"
            align="center"
            label="地址">
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
        value: ''
      }
    },
    methods:{
      info(){
        this.$router.push({name:'buyInfo'})
      }
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
  
  .xfont{
    margin: 20px 0px 0px 30px;
    font-size: 14px;
  }
  .xfont2{
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
