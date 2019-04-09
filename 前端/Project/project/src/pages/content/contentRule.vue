<template>
  <div class="body">
    <!--头部样式-->
    <div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;规则提示弹窗管理</div>
    <!--规则-->
    <div class="bian">
      <!--下拉-->
      <div class="selec">
        <el-select v-model="type" style="width: 500px" placeholder="回购规则提示文字">
          <el-option label="积分规则" value="1"></el-option>
          <el-option label="经销商规则" value="2"></el-option>
          <el-option label="回购规则" value="3"></el-option>
          <el-option label="经销商余额" value="4"></el-option>
          <el-option label="邀请规则" value="5"></el-option>
        </el-select>
      </div>
      <!--文字-->
      <div class="bj">
        <div class="spaces">
          <div class="font">规则：</div>
          <div class="font" style="margin-right: 30px">
            <el-button class="buttons" @click="add()">添加</el-button>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="ruleList"
          tooltip-effect="dark"
          style="width: 100%"
          border>
          <el-table-column
            prop="sort"
            label="排序"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            min-width="80"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <div class="flex">
                <div class="Mouse" style="color: #0099ce;" @click="del(scope.row.id)">
                  &nbsp;&nbsp;&nbsp;&nbsp; 删除&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div class="Mouse" style="color: #0099ce;" @click="edit(scope.row)">修改</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--添加-->
      <div>
        <el-dialog
          title="规则提示管理"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <div>
            <el-input v-model="addList.sort" placeholder="输入排序默认为1"></el-input>
          </div>
          <div style="margin-top: 10px">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="addList.content">
            </el-input>
          </div>
          <!--按钮-->
          <div style="text-align: left; margin: 20px 0px 0px 50px;" @click="save()">
            <el-button class="buttons2">&nbsp;&nbsp;&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </el-dialog>
      </div>
      <!--修改-->
      <div>
        <el-dialog
          title="修改规则提示管理"
          :visible.sync="centeredit"
          width="30%"
          center>
          <div>
            <el-input v-model="modification.sort" placeholder="输入排序默认为1"></el-input>
          </div>
          <div style="margin-top: 10px">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="modification.content">
            </el-input>
          </div>
          <!--按钮-->
          <div style="text-align: left; margin: 20px 0px 0px 50px;" @click="editRul()">
            <el-button class="buttons2">&nbsp;&nbsp;&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        // 积分规则
        type: '',
        ruleList: [],
        addList: {
          content: '',
          sort: '',
        },
        modification: {},
        textarea: '',
        options: [],
        value: '',
        centerDialogVisible: false,
        centeredit: false
      }
    },
    watch: {
      type(v, o) {
        this.getInfo();
      },
      modification(v, o) {
        this.getInfo();
      }
    },
    methods: {
      //  获取积分规则
      getInfo() {
        this._getData('/api/v1/rule/show', {
            type: this.type
          }, data => {
            this.ruleList = data;
          })
      },
      //删除
      del(val) {
        this.$confirm('是否删除此规则?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/rule/delete', {
              id: val,
            }, data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getInfo();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //  保存修改
      edit(val) {
        console.log(val);
        this.modification = val;
        this.centeredit = true;
      },
      //  添加
      add() {
        this.centerDialogVisible = true;
      },
      //  修改
      editRul() {
        this._getData('/api/v1/rule/edit', this.modification,
          data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.centeredit = false;
            this.getInfo();
          })
      },
      //  保存
      save() {
        if (this.type == '') {
          this.$message({
            type: 'info',
            message: '请选择规则'
          });
          return false;
        }
        if (this.addList.sort == '') {
          this.addList.sort = 1;
        }
        if (this.addList.content == '') {
          this.$message({
            type: 'info',
            message: '请填写内容'
          });
          return false;
        }
        this.addList.type = this.type;
        this._getData('/api/v1/rule/create', this.addList,
          data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.centerDialogVisible = false;
            this.getInfo();
          })
      }
    },
    created() {
    },
  }
</script>

<style scoped>
  .bian {
    height: auto;
    width: 99.90%;
    border: 1px solid #ddd;
  }
  
  .selec {
    margin: 50px 0px 0px 50px;
    text-align: left;
  }
  
  .bj {
    width: 50%;
    height: auto;
    color: black;
    margin: 20px 0px 150px 50px;
    background-color: rgba(242, 242, 242, 1);
  }
  
  .rul {
    text-align: left;
    margin: 0px 0px 15px 0px;
    font-size: 14px;
  }
  
  .font {
    text-align: left;
    margin: 20px 0px 0px 20px;
    color: #333;
  }
  
  .txt {
    width: 31%;
    height: 150px;
    margin: 5px 0px 0px 50px;
  }
</style>
