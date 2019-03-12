<template>
  <div class="body">
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div class="state flex" style="background-color:rgba(0, 153, 153, 1);">
        <div class="state2" style="color: white">全部商品</div>
        <div class="state3" style="color: white">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">未配货</div>
        <div class="state3">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">已配货</div>
        <div class="state3">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">已发货</div>
        <div class="state3">(1000)</div>
      </div>
    </div>
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户账户：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="输入用户账户"></el-input>
      </div>
      
      <div class="font">商品名称：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="输入商品名称"></el-input>
      </div>
      
      <div class="font">提交时间：</div>
      <div class="input">
        <el-date-picker
          v-model="value6"
          type="datetimerange"
          style="width: 200px"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 20%">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1">导出数据</div>
      <div class="head1">显示条数</div>
      <div class="head1">排列方式</div>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        border>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          label="订单编号"
          align="center"
          min-width="150">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="提交时间"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品信息"
          align="center"
          min-width="246">
        </el-table-column>
        <el-table-column
          prop="name"
          label="实收款"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户账户"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="领取积分"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">
              <div style="color: #0099ce;" @click="del(scope.row.id)">查看订单</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[20, 50, 100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total=totals>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return{
        input:'',
        value1:'',
        value6:'',
        //页码参数
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 20,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }],
        multipleSelection: []
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getService();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getService();
      },
    }
  }
</script>

<style scoped>
</style>
