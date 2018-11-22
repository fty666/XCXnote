<template>
  <div class="commodity">
    <div class="tableFunc">
      <div>
        <span>取现金额:</span>
      <div>
        <el-input v-model="price"></el-input>
      </div>
        元
        <!--<el-button type="primary" @click="add">新增银行卡</el-button>-->
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
          <el-button type="warning"  @click="update(scope.$index,scope.row)">选择</el-button>
          <!--<el-button type="danger" @click="deletes(scope.$index,scope.row.couponId)">删除</el-button>-->
        </template>
      </el-table-column>


    </el-table>







 <!---->
    <!--<el-dialog title="银行卡列表" :visible.sync="asd"-->
               <!--:center="true"-->
               <!--width="30%">-->
      <!--<div>-->
        <!--<card  @close="close" :addDate="listData"></card>-->
      <!--</div>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  export default {

    data() {

      return {
        price:1,
        asd: false,
        page: 1,
        pageSize: 10000,
        tableData: [],
        listData: [],
      }
    },
    props: [
      'addDate'
    ],
    watch:{
      addDate:function(val,oldVal){
        if(val==""){
          this.type=1;
          console.log("我么有数据")
          this.$refs["commodityBoxs"].resetFields();
          this.commodityBoxs.couponPrice="";
          this.commodityBoxs.conditions="";
          this.commodityBoxs.couponDetails="";
          this.commodityBoxs.startTime="";
          this.commodityBoxs.endTime="";
        }else{
          this.type=2;
          console.log("我是有数据的")
          this.commodityBoxs=val
          this.dataTime = [val.startTime,val.endTime];
        }
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
      changeData(val) {
        console.log(val);
        if (val == "" || val == null) {
          this.commodityBoxs.startTime = "";
          this.commodityBoxs.endTime = "";
        } else {
          this.commodityBoxs.startTime = val[0];
          this.commodityBoxs.endTime = val[1];
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.commodityBoxs.shopCode=sessionStorage.getItem('shopCode')
            if(this.type==1){
              this.$http //列表加载
                .post(this.url + "MicroPlatform/coupon/insertCoupon",this.commodityBoxs)
                .then(
                  resp => {
                    console.log(resp)
                    if(resp.state==1){
                      this.$message({
                        message: '保存成功',
                        type: 'success'
                      });
                      this.$emit('close')
                    }
                  },
                  response => {
                    this.$message({
                      message: response.status + ",服务器繁忙请稍后再试！",
                      type: "error"
                    });
                  }
                );
            }else{
              this.commodityBoxs.start=1;
              this.$http //列表加载
                .post(this.url + "MicroPlatform/coupon/updateCoupon",this.commodityBoxs)
                .then(
                  resp => {
                    console.log(resp)
                    if(resp.state==1){
                      this.$message({
                        message: '保存成功',
                        type: 'success'
                      });
                      this.$emit('close')
                    }
                  },
                  response => {
                    this.$message({
                      message: response.status + ",服务器繁忙请稍后再试！",
                      type: "error"
                    });
                  }
                );
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      update(index,val){
        console.log(val);
        if(this.price){
          this.$http //列表加载
            .post(this.url + "MicroPlatform/shop/withdraw", {
              card_no:val.card_no,
              price:this.price,
              owner:val.owner,
              shopCode: sessionStorage.getItem('shopCode')
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
        }

      },
      // add(){
      //   this.asd=true;
      // }
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
