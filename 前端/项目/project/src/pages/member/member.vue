<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户ID：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      
      <div class="font">用户手机号：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入手机号码"></el-input>
      </div>
      
      <div class="font">昵称：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入昵称"></el-input>
      </div>
      
      <div class="font">注册时间：</div>
      <div class="input">
        <el-date-picker
          v-model="value6"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 400px">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2">
        <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1">导出数据</div>
      <div class="head1">批量删除</div>
      <div class="head1">显示条数</div>
      <div class="head1">排列方式</div>
    </div>
    <div>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        border>
        <el-table-column
          type="index"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          property="date"
          label="分类名称"
          align="center"
          width="350">
        </el-table-column>
        <el-table-column
          property="date"
          label="分类名称"
          align="center"
          width="350">
        </el-table-column>
        <el-table-column
          property="date"
          label="分类名称"
          align="center"
          width="350">
        </el-table-column>
        <el-table-column
          property="name"
          label="商品数量"
          align="center"
          width="220">
        </el-table-column>
        <el-table-column
          property="address"
          width="300"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <router-link to="/member/memberInfo">
              <div class="flex">
                <div style="color: #0099ce;padding-left: 125px">查看</div>
              </div>
            </router-link>
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
        value6: '',
        value7: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      };
    }
  }
</script>

<style scoped>
</style>
