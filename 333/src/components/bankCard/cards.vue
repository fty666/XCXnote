<template>
  <el-form :model="commodityBoxs" status-icon :rules="rules2" ref="commodityBoxs" label-width="100px" class="demo-ruleForm">
    <el-form-item label="拥有者" prop="owner">
      <el-input  v-model="commodityBoxs.owner" ></el-input>
    </el-form-item>
    <el-form-item label="银行卡号" prop="card_no">
      <el-input  v-model.number="commodityBoxs.card_no" ></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="ID_card">
     <el-input  v-model="commodityBoxs.ID_card" ></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input  v-model="commodityBoxs.mobile" ></el-input>
    </el-form-item>
    <el-form-item label="银行" prop="bank">
      <el-input  v-model="commodityBoxs.bank" ></el-input>
    </el-form-item>

    <el-form-item>
    <el-button type="primary" @click="submitForm('commodityBoxs')">提交</el-button>
    <el-button @click="resetForm('commodityBoxs')">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
    data() {
      // 金额
      var owner = (rule, value, callback) => {
        if (value==='') {
          callback(new Error('不能为空'));
        } else {
          callback();
        }
      };
      return {
        commodityBoxs:{
          // 商品价格
          owner:"",
          // 银行卡号
          card_no:"",
          // 身份证号
          ID_card:"",
          // 手机
          mobile:"",
          // 银行
          bank:"",

        },
        rules2: {
          // 商品价格
          owner: [
            { validator: owner, trigger: 'blur' }
          ],
          // 条件
          card_no: [
            { validator: owner, trigger: 'blur' }
          ],
          // //详情 dataTime
          ID_card: [
            { validator: owner, trigger: 'blur' }
          ],
          mobile: [
            { validator: owner, trigger: 'blur' }
          ],
          bank: [
            { validator: owner, trigger: 'blur' }
          ]
        }

      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.commodityBoxs.shop_code=sessionStorage.getItem('shopCode')
            this.$http //列表加载
              .post(this.url + "MicroPlatform/shop/insertCard",this.commodityBoxs)
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
    }
  }
</script>

<style scoped>

</style>
