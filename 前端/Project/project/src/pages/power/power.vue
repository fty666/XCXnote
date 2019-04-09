<template>
  <div class="body">
    <!--表格头-->
    <div class="head join">
      <div class="head1 flex Mouse" style="margin-left: 20px">
        <div><img src="@/img/add.png" class="addimg"></div>
        <div style="font-size: 11px" @click="addAccount">&nbsp;添加账号</div>
      </div>
      <div class="head1 flex Mouse" style="margin-left: 20px">
        <div style="font-size: 11px" @click="batchDel()">&nbsp;批量删除</div>
      </div>
    </div>
    <!--表格-->
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
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
          prop="id"
          label="管理员id"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="account"
          label="登录名"
          align="center"
          min-width="120">
        </el-table-column>
        
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"
          min-width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="account"
          label="权限"
          align="center"
          min-width="197">
          <template slot-scope="scope">
            <div class="sequence">
              <div v-for="(item,index) in scope.row.user_auth" style="width: 26%;">
                {{item}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="添加时间"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="update_time"
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
              <!--<router-link to="/power/editPower">-->
              <div class="Mouse" style="color: #0099ce;padding-left: 10px" @click="edit(scope.row)">编辑</div>
              <!--</router-link>-->
              <div class="Mouse" style="color: #0099ce;padding-left: 10px" @click="del(scope.row.id)">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--添加账号-->
      <el-dialog
        title="添加账号"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
        :before-close="close">
        <edit-power @close="close" @getLists="getList" :static="static" ref="lookref"></edit-power>
      </el-dialog>
      <!--编辑-->
      <el-dialog
        title="编辑账号"
        :visible.sync="centerDialogVisible1"
        width="30%"
        center
        :before-close="close">
        <edit-power @close="close" @getLists="getList" :static="static" :onlyInfo="onlyInfo" ref="lookref"></edit-power>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import editPower from './editPower'
  
  export default {
    components: {
      editPower
    },
    name: "",
    data() {
      return {
        input: '',
        tableData: [],
        onlyInfo: [],
        static: '',
        authBox: [],
        multipleSelection: [],
        centerDialogVisible: false,
        centerDialogVisible1: false
      }
    },
    methods: {
      // 获取列表方法
      getList() {
        this._getData('/api/v1/user_admin/index', {},
          data => {
            console.log(data)
            this.tableData = data.data;
          })
      },
      // 编辑
      edit(val) {
        console.log(val);
        this.static = '1';
        this.centerDialogVisible1 = true;
        this.onlyInfo = val;
      },
      // 添加账号
      addAccount() {
        this.static = '2';
        this.centerDialogVisible = true;
      },
      //删除权限
      del(val) {
        this.$confirm('是否删除此管理员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/user_admin/delete', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getList();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //批量删除
      batchDel() {
        var batchId = '';
        for (let i = 0; i < this.multipleSelection.length; i++) {
          batchId += this.multipleSelection[i].id + ',';
        }
        this.$confirm('是否删除这些管理员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/user_admin/batchDelete', {
              ids: batchId,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getList();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      close() {
        this.centerDialogVisible = false;
        this.centerDialogVisible1 = false;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    created() {
      this.getList();
    }
  }
</script>

<style scoped>
</style>
