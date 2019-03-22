<template>
  <div class="body" style="width: 98%;margin-left: 10px">
    <!--经销商库存-->
    <div class="head">
      <div class="backfont"> 申请酒款</div>
    </div>
    <div class="flex xiu" style="height:auto">
      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-bottom: 25px">
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
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          min-width="265"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品可获得积分"
          align="center"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="name"
          label="价格"
          align="center"
          min-width="203">
        </el-table-column>
      </el-table>
    </div>
    <!--按钮-->
    <!--按钮-->
    <div class="flex">
      <div class="font" style="margin: 42px 0px 50px 40%">
        <el-button class="buttons" plain style="background-color: rgba(0, 153, 153, 1);color: white">通过</el-button>
      </div>
      <div style="margin: 50px 0px 100px 60px">
        <el-button class="buttons" plain>驳回</el-button>
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
  }
</script>

<style scoped>
</style>
