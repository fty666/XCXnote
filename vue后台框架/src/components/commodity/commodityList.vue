<style scoped>

</style>


<template>
  <div style="width:100%;">
    <div class="tableFunc">
      <div>
        <el-button type="primary" @click="add">新增</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 98%;margin:20px auto 10px auto;">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        :index="indexMethod"
        width="60">
      </el-table-column>
      <el-table-column
        prop="admin_name"
        label="用户名"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="admin_email"
        label="登录账号"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="admin_password"
        label="登录密码"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="admin_department_name"
        label="部门名称"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <!--组件-->
      <el-table-column
        label="身份类型"
        sortable
        align="center"
        min-width="120">
        <template slot-scope="scope">
        <span>
        {{scope.row.admin_job_flag|filters}}
        </span>
        </template>
      </el-table-column>
      <!--组件完-->
      <el-table-column fixed="right" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button type="warning" @click="select(scope.$index,scope.row)">删除</el-button>
          <!--<el-button type="warning"  @click="update(scope.$index,scope.row)">修改</el-button>-->
          <!--<el-button v-if="scope.row.isUse==4||scope.row.isUse==2" type="danger" @click="shelves(scope.row)"> {{scope.row.is_use|filters1}}</el-button>-->
        </template>
      </el-table-column>


    </el-table>
    <div class="block pageBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[20, 50,100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total='total'>
      </el-pagination>
    </div>
    <el-dialog title="添加人员" :visible.sync="dialogTableVisible1"
               :center="true"
               width="25%">
      <div>
        <addCommodity @close="close" :addDate="listData"></addCommodity>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import addCommodity from './addCommodity'

  export default {
    components: {
      addCommodity
    },
    filters: {
      // 上下架状态过滤器
      filters: function (arg) {
        if (arg == 1) {
          return "内勤"
        } else if (arg == 2) {
          return "财务"
        } else if (arg == 3) {
          return "销售"
        }
      },
      filters1: function (arg) {
        if (arg == 1) {
          return "已审核"
        } else if (arg == 0) {
          return "商家"
        } else if (arg == 2) {
          return "已拒绝"
        } else if (arg == 3) {
          return "已禁用"
        } else if (arg == 4) {
          return "已下架"
        }
      }
    },
    methods: {
      shelves(val) {
        console.log(val);
        var isUse = 0;
        this.$http //列表加载
          .post(this.url + "MicroPlatform/goods/deleteGoods", {
            goodsId: val.id,
            isUse: isUse
          })
          .then(
            resp => {
              if (resp.state == 1) {
                this.$message({
                  message: '下架成功',
                  type: 'success'
                });
                this.getList()
              }
              console.log(resp)
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      close() {
        this.dialogTableVisible1 = false
        this.getList()
      },
      // 查看详情
      select(index, val) {
        this.$http //列表加载
          .post(this.url + "admin/delect", {
            id: val.id
          })
          .then(
            resp => {
              if (resp.state == 1) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.getList()
              }
              // this.tableData = resp.data.PageInfo.list;
              // this.total =resp.data.PageInfo.total;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );

      },
      add() {
        this.dialogTableVisible1 = true
        this.listData = "";
      },
      //分页
      handleSizeChange(val) {
        //每页数量
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        //分页
        this.page = val;

        this.getList();
      },
      //分页结束
      //序号
      indexMethod(index) {
        return index + 1 + (this.page - 1) * this.pageSize;
      },


      // 获取列表方法
      getList() {
        // 获取权限管理列表
        this._getData('internal/adminList', {
          id: 1,
          email: '',
          flag: '',
          page:1,
          pageSize: 25,
        }, data => {
          console.log(data)
          this.tableData = data.PageInfo.list;
          this.total = data.PageInfo.total
        });
      }
    },

    data() {
      return {
        listData: [],
        commoditySelect: [
          {
            name: "已审核",
            id: 1
          },
          {
            name: "未审核",
            id: 0
          },
          {
            name: "已拒绝",
            id: 2
          },
          {
            name: "已禁用",
            id: 3
          },
          {
            name: "已下架",
            id: 4
          },
          {
            name: "全部",
            id: ""
          }
        ],
        //弹出框初始化
        dialogTableVisible: false,
        dialogTableVisible1: false,
        // 分页
        total: 20,
        page: 1,
        pageSize: 20,
        currentPage1: 1,
        // 参数设置
        commodityBox: [],
        tableData: [],
        isUse: ""
      }
    },
    created() {
      // 获取列表方法调用
      this.getList();
      // this.getyardName();
      // this.getgoodsName();


    }
  }
</script>
<style scoped>
  .add-commodity {

  }

  img {
    width: 100px;
  }
</style>
