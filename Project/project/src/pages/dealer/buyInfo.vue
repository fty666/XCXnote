<template>
  <div class="body">
    <!--标头-->
    <div class="spaces">
      <div class="clos" @click="remark()">备注订单</div>
      <router-link to="/dealer/dealerInfo">
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
          <div>支付时间：</div>
          <div>订单的信息</div>
        </div>
        <div class="flex dfont">
          <div>交易号：</div>
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
    
    <!--商品信息-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品信息</div>
    </div>
    <div class="flex xiu" style="height: auto">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="图片"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          min-width="130"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="date"
          label="数量"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="date"
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
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          align="center"
          label="图片"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          min-width="180"
          label="剩余库存">
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          label="操作"
          min-width="180">
          <template slot="">
            <div style="color: deepskyblue;">回购</div>
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
          <div class="flex" >
            <div class="logBtn1" style="margin: 20px 0px 0px 30%;">
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
        textarea:'',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
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
        centerDialogVisible: false
      }
    },
    methods: {
      //修改备注信息
      remark() {
        this.centerDialogVisible = true;
      },
      esc(){
        this.centerDialogVisible=false;
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
  .futext{
    margin: 10px 0px 0px 10px;
    width: 95%;
  }
</style>
