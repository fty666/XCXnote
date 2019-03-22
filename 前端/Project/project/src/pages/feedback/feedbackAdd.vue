<template>
  <div class="body">
    <!--头部样式-->
    <div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;反馈类型设置</div>
    <!--规则-->
    <div class="bian flex">
      <!--输入内容-->
      <div class="flex" style="width: 40%;margin-top:60px">
        <div class="flex" style="text-align: left">
          <div class="ju">输入内容：</div>
          <div class="ju2">
            <el-input v-model="content" placeholder="请输入内容"></el-input>
          </div>
          <div class="ju2">
            <el-button class="buttons2" @click="add">添加</el-button>
          </div>
        </div>
      </div>
      <!--表格-->
      <div style="width: 50%;margin-top:70px;">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="sort"
            label="优先级"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            prop="content"
            label="名称"
            align="center"
            min-width="200px">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <div style="color: #0099ce;" @click="del(scope.row.id)">删除</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--客服设置-->
    <div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;客服信息设置</div>
    <div class="bian flex" style="height: 280px;">
      <!--输入内容-->
      <div class="flex" style="width: 30%;margin:10px 0px 0px 100px">
        <div class="flex">
          <div class="font">客服电话:</div>
          <div class="inpu">
            <el-input size="small" v-model="filter.mobile" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="flex">
          <div class="font">意见反馈群:</div>
          <div class="inpu">
            <el-input size="small" v-model="filter.suggestion" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="flex">
          <div class="font">邮箱:</div>
          <div class="inpu">
            <el-input size="small" v-model="filter.email" placeholder="请输入内容"></el-input>
          </div>
          <div style="margin: 10px 0px 50px 50px;">
            <el-button size="small"
                       class="buttons"
                       style="background-color:rgba(0, 153, 153, 1);color: white "
                       @click="addSubmit()">保存
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        // 客服信息设置数组
        filter:{},
        // 反馈类型输入内容
        content: '',
        textarea: '',
        value: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }]
      }
    },
    methods: {
      //  获取列表
      getList() {
        this._getData('/api/v1/feedback_type/index', {
            page: this.page,
            pageSize: this.pageSize
          },
          data => {
            console.log(data)
            this.tableData = data;
            this.totals = data.total;
          })
      },
      // 添加内容
      add() {
        this._getData('/api/v1/feedback_type/create', {
            content: this.content
          },
          data => {
            console.log(data);
            if (data.state == 1) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
            }
            this.getList();
            this.content = ''
          },)
      },
      // 删除反馈项
      del(val) {
        console.log(val);
        this.$confirm('是否删除此反馈', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/feedback_type/delete',
            {id: val},
            data => {
              this.$message({
                type: "success",
                message: '操作成功'
              })
              this.getList();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      addSubmit() {
        //检查是否填写完整
        if (!this.filter.mobile) {
          this.$message({
            message: '请填写客服电话!',
            type: 'warning'
          });
          return false;
        }
        if (!this.filter.suggestion) {
          this.$message({
            message: '请填写意见反馈群信息!',
            type: 'warning'
          });
          return false;
        }
        
        if (!this.filter.email) {
          this.$message({
            message: '请填写邮箱!',
            type: 'warning'
          });
          return false;
        }
        
        //客服信息设置保存
        this._getData('/api/v1/services/save',
          this.filter,
          data => {
            console.log(data)
            this.$message({
              message: '新增成功',
              type: 'success'
            });
            this.filter = {};
          },)
        
      },
      edit() {
        this.centerDialogVisible = true;
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
  .bian {
    height: 500px;
    width: 99.90%;
    border: 1px solid #ddd;
  }
  
  .ju {
    margin: 80px 0px 0px 20px;
  }
  
  .ju2 {
    margin: 70px 0px 0px 15px;
  }
  
  .font {
    margin: 0px 0px 0px 40px;
    font-size: 15px;
    color: black;
  }
  
  .inpu {
    margin: 12px 0px 0px 20px;
  }
</style>
