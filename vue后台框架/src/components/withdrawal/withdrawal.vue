<style scoped>

</style>


<template>
  <div style="width:100%;">
    <div class="tableFunc">
      <div class="addBox">
        <el-button type="primary" @click="add">提现</el-button>
      </div>
      <div>
        金额:
        <span>{{payAccount}}</span>(元)
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
        prop="owner"
        label="拥有着"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="card_no"
        label="银行卡号"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="shop_code"
        label="商家编号"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="price"
        label="金额"
        sortable
        align="center"
        min-width="120">
      </el-table-column>

      <el-table-column
        prop="shop_name"
        label="商铺名"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        sortable
        align="center"
        min-width="120">
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

    <el-dialog title="银行卡列表" :visible.sync="dialogTableVisible1"
               :center="true"
               width="80%">
      <div>
        <card-list  @close="close" :addDate="listData"></card-list>
      </div>
    </el-dialog>




  </div>
</template>

<script>
  import cardList from './cardList'
  export default {
    components: {
      cardList
    },
    watch:{
      dialogTableVisible1:function(val,oldVal){
        this.getList()
      }
    },
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
          .post(this.url + "MicroPlatform/shop/getWithdrawal", {
            page:this.page,
            pageSize: this.pageSize,
            status: "",
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
      },
      getAccount(){
        this.$http //列表加载
          .post(this.url + "MicroPlatform/shop/getPayAccount", {
            // page:this.page,
            // pageSize: this.pageSize,
            // status: "",
            // 销货单号
            shopCode:sessionStorage.getItem('shopCode')
          })
          .then(
            resp => {
              console.log(resp)
              this.payAccount=resp.data.payAccount
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
        payAccount:0,
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
      this.getAccount()
      // this.getyardName();
      // this.getgoodsName();






    }
  }
</script>
<style scoped>
  .tableFunc{
    height: 40px;
  }
  .tableFunc span{
    display: inline-block;margin: 0 10px;
  }


  img{
    width:100px;
  }
</style>
