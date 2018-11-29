<style scoped>

</style>


<template>
  <div style="width:100%;">
    <div class="tableFunc">
      <div class="addBox">
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
          <el-button type="warning"  @click="select(scope.$index,scope.row)">查看</el-button>
          <el-button type="warning"  @click="update(scope.$index,scope.row)">通过</el-button>
          <!--<el-button type="danger" @click="deletes(scope.$index,scope.row)">删除</el-button>-->
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
      <div class="titleBox" style="overflow: hidden">
        <div>
          <label class="titleText">管理团队:</label>
          <div class="listBox">
            {{commodityBox.items_admin}}
          </div>
        </div>
        <div>
          <label class="titleText">资质证明:</label>
          <div class="listBox">
            {{commodityBox.items_aptitude_introduce}}
          </div>
        </div>
        <div>
          <label class="titleText">回报介绍:</label>
          <div class="listBox">
            {{commodityBox.items_earnings_introduce}}
          </div>
        </div>
        <div>
          <label class="titleText">项目介绍:</label>
          <div class="listBox">
            {{commodityBox.items_introduce}}
          </div>
        </div>
        <div>
          <label class="titleText">项目理念:</label>
          <div class="listBox">
            {{commodityBox.items_idea}}
          </div>
        </div>
        <div>
          <label class="titleText">过往业绩:</label>
          <div class="listBox">
            {{commodityBox.items_formerly}}
          </div>
        </div>
        <div>
          <label class="titleText">回报方案:</label>
          <div class="listBox">
            <img :src="imggerUrl+commodityBox.items_earnings_photo" alt="">
          </div>
        </div>
        <div>
          <label class="titleText">资质证明:</label>
          <div class="listBox">
            <img :src="imggerUrl+commodityBox.items_aptitude_photo" alt="">
          </div>
        </div>
        <div>
          <label class="titleText">管理团队:</label>
          <div class="listBox">
            {{commodityBox.items_admin}}
          </div>
        </div>

      </div>
    </el-dialog>
    <el-dialog title="添加商品" :visible.sync="dialogTableVisible1"
               :center="true"
               width="25%">
      <div>

        <add-classification  @close="close" :addDate="listData"></add-classification>
      </div>
    </el-dialog>




  </div>
</template>

<script>
  import addClassification from './addClassification'
  export default {
    components: {
      addClassification
    },
    methods: {
      deletes(inde,val){
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
        // this.dialogTableVisible=true
        // this.commodityBox=val;
        this.$http //列表加载
          .post(this.url + "adminInternal/selectItems", {
            id:val.id
          })
          .then(
            resp => {
              console.log(resp)
              if(resp.state==1){
                this.commodityBox=resp.data;
                this.dialogTableVisible=true
                // this.$message({
                //   message: '删除成功',
                //   type: 'success'
                // });
                // this.getList()
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
        this.dialogTableVisible1=true
        this.listData="";
      },
      update(index,val){
        this.$http //列表加载
          .post(this.url + "adminInternal/updateItems", {
            number:val.items_number
          })
          .then(
            resp => {
              console.log(resp)
              if(resp.state==1){
                // this.commodityBox=resp.data;
                // this.dialogTableVisible=true
                this.$message({
                  message: '通过成功',
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
          .post(this.url + "adminInternal/selectItemsByNumber", {
            page:this.page,
            pageSize:this.pageSize,
            number:"",
            type:""

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
      }
    },

    data() {
      return {
        listData:[],
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
        dialogTableVisible1:false,
        // 分页
        total: 20,
        page: 1,
        pageSize: 20,
        currentPage1:1,
        // 参数设置
        commodityBox:[],
        tableData:[],
        isUse:""
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
  .tableFunc{
    height: 40px;
  }

  img{
    width:100px;
  }
</style>
