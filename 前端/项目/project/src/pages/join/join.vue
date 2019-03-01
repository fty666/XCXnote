<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户ID：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入ID"></el-input>
      </div>
      
      <div class="font">名称：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入名称"></el-input>
      </div>
      
      <div class="font">地区：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入地区"></el-input>
      </div>
      
      <!--按钮-->
      <div class="btn">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2">
        <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    <!--表格头-->
    <div class="head join">
      <router-link to="/join/addJoin">
        <div class="head1 flex" style="margin-left: 20px">
          <div><img src="@/img/add.png" class="addimg"></img></div>
          <div style="font-size: 11px">&nbsp;添加加盟商</div>
        </div>
        <div class="right">
          <div class="head1">导出数据</div>
          <div class="head1">批量删除</div>
        </div>
      </router-link>
    </div>
    <!--表格-->
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="sequence" style="width: 120px">
              <div style="color: #0099ce;padding-left: 20px" @click="stock(scope.row)">库存</div>
              <div style="color: #0099ce;padding-left: 10px" @click="edit(scope.row)">编辑</div>
              <div style="color: #0099ce;padding-left: 20px" @click="del(scope.row.id)">订货</div>
              <div style="color: #0099ce;padding-left: 10px" @click="del(scope.row.id)">删除</div>
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
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    methods: {
      //库存
      stock() {
        this.$router.push({name: 'joinStock'})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style scoped>
</style>
