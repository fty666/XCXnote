<style scoped>

</style>


<template>
  <div style="width:100%;">
    <div class="tableFunc">
      <div class="addBox">
        <el-button type="primary" @click="add">新增</el-button>
      </div>
      <div>
        <div style="margin-right: 20px;">
          <span>项目编号</span>
          <div style="display: inline-block">
            <el-input v-model="number"></el-input>
          </div>
        </div>
        <el-button type="primary" @click="getList">查询</el-button>
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
        prop="items_name"
        label="项目名称"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="items_number"
        label="项目编号"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="items_contacts_phone"
        label="发起人电话"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="items_contacts"
        label="发起人姓名"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="funding_start_money"
        label="起金额"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="funding_count_money"
        label="众筹总金额"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="items_type"
        label="项目类型"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="funding_type"
        label="众筹类型"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="items_site"
        label="项目地点"
        sortable
        align="center"
        min-width="120">
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center" width="340">
        <template slot-scope="scope">
          <el-button type="warning"  @click="select(scope.$index,scope.row)">发布</el-button>
          <el-button type="warning"  @click="update(scope.$index,scope.row)">拒绝</el-button>
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
    <!-- 弹出层开始 -->
    <el-dialog title="项目详情" :visible.sync="dialogTableVisible"
               :center="true"
               width="25%">
      <add-order></add-order>
      <!--<div class="titleBox" style="overflow: hidden">-->
        <!--<div>-->
          <!--<label class="titleText">销售人员:</label>-->
          <!--<div>-->
            <!--<el-select v-model="userList" placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in listData"-->
                <!--:key="item.value"-->
                <!--:label="item.admin_name"-->
                <!--:value="item.id">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</div>-->
        <!--</div>-->

      <!--</div>-->
      <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="update">确 定</el-button>-->
  <!--</span>-->
    </el-dialog>




  </div>
</template>

<script>
  import addOrder from './addOrder.vue'
  export default {
    components: {
      addOrder
    },
    methods: {
      deletes(inde,val){
        console.log(val)
        this.$http //列表加载
          .post(this.url + "MicroPlatform/foodgoods/deleteFoodsClass", {
            foodClassId:val.classId
          })
          .then(
            resp => {
              if(resp.state==1){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.getList()
              }

            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      close(){
        this.dialogTableVisible1=false
        this.getList()
      },
      // 查看详情
      select(index,val){
        this.$http //列表加载
          .post(this.url + "adminInternal/releaseFlag", {
            number:this.commodityBox.items_number
          })
          .then(
            resp => {
              console.log(resp)
              if(resp.state==1){
                this.$message({
                  message: '发布成功',
                  type: 'success'
                });
                this.getList()
              }

            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );


      },
      add(){
        this.dialogTableVisible=true
        this.listData="";
      },
      update(index,val){
        this.$http //列表加载
          .post(this.url + "adminInternal/rejectFlag", {
            number:val.items_number,
            id:this.userList
          })
          .then(
            resp => {
              console.log(resp)
              if(resp.state==1){
                this.$message({
                  message: '拒绝成功',
                  type: 'success'
                });
                this.getList()
              }

            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
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
      getList(){
        this.$http //列表加载
          .post(this.url + "adminInternal/selectItemsReleaseByItemsNumber", {
            page:this.page,
            pageSize:this.pageSize,
            number:""

          })
          .then(
            resp => {
              this.tableData = resp.data.PageInfo.list;
              this.total =resp.data.PageInfo.total;

            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      getSelect(){
        this.$http //列表加载
          .post(this.url + "/adminInternal/selectXiaoShouList", {
            // page:this.page,
            // pageSize:this.pageSize,
            // number:""

          })
          .then(
            resp => {
              console.log(resp)
              this.listData=resp.data;
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
      }
    },

    data() {
      return {
        listData:[],
        number:"",
        commoditySelect:[
          {
            name:"已审核",
            id:1
          },
          {
            name:"未审核",
            id:0
          },
          {
            name:"已拒绝",
            id:2
          },
          {
            name:"已禁用",
            id:3
          },
          {
            name:"已下架",
            id:4
          },
          {
            name:"全部",
            id:""
          }
        ],
        //弹出框初始化
        dialogTableVisible:false,
        // 分页
        total: 20,
        page: 1,
        pageSize: 20,
        currentPage1:1,
        // 参数设置
        commodityBox:[],
        tableData:[],
        userList:""
      }
    },
    created() {
      // 获取列表方法调用
      this.getList();
      this.getSelect()






    }
  }
</script>
<style scoped>
  .tableFunc{
    height: 40px;
  }

  img{
    width:100px;
  }
  .titleBox>div{
    border-bottom: 0;
  }
</style>
