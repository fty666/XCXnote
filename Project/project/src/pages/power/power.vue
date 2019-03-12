<template>
  <div class="body">
    <!--表格头-->
    <div class="head join">
      <router-link to="/power/addPower">
        <div class="head1 flex" style="margin-left: 20px">
          <div><img src="@/img/add.png" class="addimg"></img></div>
          <div style="font-size: 11px">&nbsp;添加账号</div>
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
          type="index"
          label="ID"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          label="登录名"
          align="center"
          min-width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="密码"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="手机"
          align="center"
          min-width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="权限"
          align="center"
          min-width="197">
        </el-table-column>
        <el-table-column
          prop="name"
          label="添加时间"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="修改时间"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="100"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <router-link to="/power/editPower">
                <div style="color: #0099ce;padding-left: 10px" @click="edit(scope.row)">编辑</div>
              </router-link>
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
