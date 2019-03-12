<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT" style="height: 120px">
      <div class="sequence" style="width: 71%;">
        <div class="font" style="margin-left: 50px">ID：</div>
        <div class="input">
          <el-input v-model="input" style="width: 150px" placeholder="输入ID"></el-input>
        </div>
      
        <div class="font" style="margin-left: 12%">账号：</div>
        <div class="input">
          <el-input v-model="input" style="width: 150px" placeholder="输入账号"></el-input>
        </div>
  
        <div class="font" style="margin-left: 12%">昵称：</div>
        <div class="input">
          <el-input v-model="input" style="width: 150px" placeholder="输入昵称"></el-input>
        </div>
  
        <div class="font" style="margin-left: 6%">地区：</div>
        <div class="input">
          <el-input v-model="input" style="width: 150px" placeholder="输入地区"></el-input>
        </div>
        
        <div class="font" style="margin-left: 10%">提交时间：</div>
        <div class="input">
          <el-date-picker
            v-model="value1"
            style="width: 140px;"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      
        <div class="font" style="margin-left: 25px">至</div>
        <div class="input">
          <el-date-picker
            v-model="value1"
            style="width: 140px;margin-left: 15px"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        
      </div>
      <!--按钮-->
      <div class="btn" style="margin-left: 88px;margin-top: 30px">
        <el-button type="primary"  icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px;margin-top: 30px">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    
    <!--表格头部-->
    <div class="head right">
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
          prop="name"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户ID"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="name"
          label="账号"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属地区"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="身份"
          align="center"
          min-width="105">
        </el-table-column>
        <el-table-column
          prop="name"
          label="审核状态"
          align="center"
          min-width="102">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <div style="color: #0099ce;padding-left: 5px" @click="infos(scope.row.id)">详情</div>
              <div style="color: #0099ce;padding-left: 5px" @click="del(scope.row.id)">通过</div>
              <div style="color: #0099ce;padding-left: 5px" @click="del(scope.row.id)">驳回</div>
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
    data() {
      return {
        input: '',
        value1: '',
        tableData3: [{
          date: '2016',
          name: '王小虎',
          address: '上海市'
        }],
      }
    },
    methods: {
      infos() {
        this.$router.push({name: 'auditInfo'})
      }
    }
  }
</script>

<style scoped>
</style>
