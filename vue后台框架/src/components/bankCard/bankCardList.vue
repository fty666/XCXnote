<template>
  <div class="commodity">
    <div class="tableFunc">
      <div>
        <el-button type="primary" @click="add">新增银行卡</el-button>
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
        label="拥有人"
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
        prop="ID_card"
        label="身份证号"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="bank"
        label="开户行"
        sortable
        align="center"
        min-width="120">
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <!--<el-button type="warning"  @click="select(scope.$index,scope.row)">查看</el-button>-->
          <!--<el-button type="warning"  @click="update(scope.$index,scope.row)">选择</el-button>-->
          <el-button type="danger" @click="deletes(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>





    <!---->
    <el-dialog title="银行卡列表" :visible.sync="dialogTableVisible1"
    :center="true"
    width="30%">
    <div>
    <card  @close="close" :addDate="listData"></card>
    </div>
    </el-dialog>
  </div>
</template>

<script>
  import card from './cards'
  export default {
    components: {
      card
    },
    data() {

      return {
        price:1,
        dialogTableVisible1: false,
        page: 1,
        pageSize: 10000,
        tableData: [],
        listData: [],
      }
    },
    methods:{
      close(){
        this.dialogTableVisible1=false
        this.getList()
      },
      indexMethod(index) {
        return index + 1 + (this.page - 1) * this.pageSize;
      },
      getList() {
        this.$http //列表加载
          .post(this.url + "MicroPlatform/shop/getCardByCode", {
            // page:this.page,
            // pageSize: this.pageSize,
            // status: "",
            // 销货单号
            cid:"",
            shop_code: sessionStorage.getItem('shopCode')
          })
          .then(
            resp => {
              console.log(resp)
              this.tableData=resp.data;
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
      deletes(index,val){
        console.log(val)
        this.$http //列表加载
          .post(this.url + "MicroPlatform/shop/deleteCard", {
            card_id:val.cid,
          })
          .then(
            resp => {
              if(resp.state==1){
                this.$message({
                  message: '提现成功',
                  type: 'success'
                });
                this.$emit('close')
              }else{
                this.$message({
                  message: resp.message,
                  type: 'success'
                });
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
        this.dialogTableVisible1=true;
      }
    },
    created(){
      console.log(1111)
      this.getList()

    }
  }
</script>

<style scoped>
  .tableFunc{
    margin-bottom: 20px;
    height: 40px;
  }
  .asd{
    position: absolute;
    width: 30%;
    /*height: 60%;*/
    background: #fff;
    top:20%;
    left: 40%;
  }
  .commodity{
    width: 100%;
    text-align: center;
  }
  /*.dataBox{*/
  /*width: 207px;*/
  /*}*/
</style>
