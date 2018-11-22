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
        prop="couponPrice"
        label="优惠金额"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="conditions"
        label="优惠条件"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="couponDetails"
        label="优惠详情"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
        sortable
        align="center"
        min-width="120">
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button type="warning"  @click="select(scope.$index,scope.row)">查看</el-button>
          <el-button type="warning"  @click="update(scope.$index,scope.row)">修改</el-button>
          <el-button type="danger" @click="deletes(scope.$index,scope.row.couponId)">删除</el-button>
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




  </div>
</template>

<script>
  export default {
    methods: {
      deletes(index,val){
        console.log(val);
        this.$http //列表加载
          .post(this.url + "MicroPlatform/coupon/deleteCoupon", {
            couponId:val,
            start: 1
          })
          .then(
            resp => {
              if(resp.state==1){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.getList()
              }else{
                this.$message(resp.message)
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
        this.dialogTableVisible=true
        this.commodityBox=val;
        console.log( this.commodityBox)

      },
      add(){
        this.dialogTableVisible1=true
        this.listData="";
      },
      update(index,val){
        console.log(val);
        this.dialogTableVisible1=true
        this.listData=val;
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
          .post(this.url + "MicroPlatform/coupon/getReduction", {
            // page:this.page,
            // pageSize: this.pageSize,
            // couponType: "",
            // couponStatus: "",
            // 销货单号
            shopCode:sessionStorage.getItem('shopCode')
          })
          .then(
            resp => {
              console.log(resp)
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
