<template>
  <div class="body" style="width: 99.8%;margin-left: 0px">
    <div class="flex whiteT">
      <div class="font">订单编号：</div>
      <div class="Xinput">
        <el-input v-model="input" size="small" placeholder="输入订单编号"></el-input>
      </div>
      
      <div class="font">用户账号：</div>
      <div class="Xinput">
        <el-input v-model="input" size="small" placeholder="输入用户账号"></el-input>
      </div>
      
      <div class="font">提交时间：</div>
      <div class="input">
        <el-date-picker
          v-model="value6"
          size="small"
          style="width: 250px;margin-top: 5px"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 20%">
        <el-button type="primary"  icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <div style="margin-top: 20px">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="data"
          label="商品编号"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="商品图片"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          min-width="250"
          align="center"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="address"
          min-width="180"
          align="center"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="address"
          min-width="150"
          align="center"
          label="成本价">
          <template slot-scope="scope">
            <div>
              <el-input v-model="input"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          min-width="100"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <div style="color:deepskyblue">保存</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag">
      <pages></pages>
    </div>
  </div>
</template>

<script>
  import pages from '@/components/page'
  export default {
    name: "",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        input: '',
        value6: ''
      }
    },
    components:{
      pages,
    }
  }
</script>

<style scoped>
</style>
