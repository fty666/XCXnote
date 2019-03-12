<template>
  <div class="body">
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div :class="['state', 'flex',membe==true?'bj':'']" @click="Xmembe()">
        <div class="state2">会员统计</div>
      </div>
      <div :class="['state', 'flex',membe==false?'bj':'']" style="margin-left: 0px" @click="Xorder()">
        <div class="state2">订单统计</div>
      </div>
    </div>
    <!--表格-->
    <div class="head flex">
      <div class="font" style="width: 30%" v-if="membe==false">订单统计</div>
      <div class="font" style="width: 30%" v-else>会员统计</div>
      <div style="width: 60%">
        <zynq></zynq>
      </div>
    </div>
    <div style="border: 1px solid #ddd;height: 600px;">
      <!--订单统计-->
      <div class="tables" v-if="membe==false">
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          border>
          <el-table-column
            label="排名(营业额)"
            type="index"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            label="加盟商名称"
            align="center"
            min-width="200">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="总订单数"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="有效订单数"
            min-width="120"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="name"
            label="无效订单数"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="总营业额"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="已退款金额"
            align="center"
            min-width="150">
          </el-table-column>
        </el-table>
      </div>
      <!--订单统计完-->
      <!-- 会员统计-->
      <div class="tables" v-else>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          border>
          <el-table-column
            label="排名"
            type="index"
            width="100px"
            align="center">
          </el-table-column>
          <el-table-column
            label="加盟商名称"
            align="center"
            min-width="180">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="新增会员数"
            align="center"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="address"
            label="全部会员数"
            align="center"
            min-width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="name"
            label="有订单会员数"
            align="center"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="购买率"
            align="center"
            min-width="200">
          </el-table-column>
        </el-table>
      </div>
      <!--会员统计完-->
    </div>
  </div>
</template>

<script>
  import zynq from '@/components/data/zynq'
  export default {
    name: "",
    data(){
      return{
        input:'',
        value1:'',
        value6:'',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }],
        membe:true
      }
    },
    components:{
      zynq,
    },
    methods: {
    //  会员选择
      Xmembe(){
        this.membe=true;
      },
      Xorder(){
        this.membe=false;
      }
    }
  }
</script>

<style scoped>
  .font{
    text-align: left;
    margin: 0px 0px 0px 30px;
    color: black;
    font-weight:700 ;
    font-size: 16px;
  }
  .tables{
    width: 90%;
    margin: 40px 0px 0px 6%;
  }
  .bj {
    background-color: rgba(0, 153, 153, 1);
    color: white;
  }
</style>
