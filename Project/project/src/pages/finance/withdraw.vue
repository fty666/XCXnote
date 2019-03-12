<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户ID：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="输入用户ID"></el-input>
      </div>
      
      <div class="font">用户手机号：</div>
      <div class="input">
        <el-input v-model="input"  placeholder="输入手机号"></el-input>
      </div>
      
      
      <div class="font">申请时间：</div>
      <div class="input" >
        <el-date-picker
          v-model="value1"
          style="width: 150px;"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      
      <div class="font" style="margin-left: 40px">至</div>
      <div class="input" >
        <el-date-picker
          v-model="value1"
          style="width: 150px;margin-left: 10px"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 6%">
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px">
        <el-button class="buttons3" size="small" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    <!--表格头-->
    <div class="head right">
      <div class="head1">导出数据</div>
      <div class="head1">显示条数</div>
    </div>
    <!--表格-->
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        border>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          label="申请时间"
          align="center"
          min-width="150">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户ID"
          align="center"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="address"
          label="用户账户"
          align="center"
          min-width="110"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="银行卡信息"
          align="center"
          min-width="250">
        </el-table-column>
        <el-table-column
          prop="name"
          label="账户余额"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="申请提现金额"
          align="center"
          min-width="116">
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="100"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <div style="color: #0099ce;padding-left: 10px" @click="del(scope.row.id)">通过</div>
              <div style="color: #0099ce;padding-left: 10px" @click="del(scope.row.id)">驳回</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
      }
    }
  }
</script>

<style scoped>
</style>
