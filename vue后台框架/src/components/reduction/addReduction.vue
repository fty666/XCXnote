<template>
  <div class="commodity">
    <el-form :model="commodityBox" status-icon :rules="rules2" ref="commodityBox" label-width="100px" class="demo-ruleForm">
      <el-form-item label="满减条件" prop="full">
        <el-input  v-model="commodityBox.full" ></el-input>
      </el-form-item>
      <el-form-item label="满减价格" prop="reductionPrice">
        <el-input  v-model.number="commodityBox.reductionPrice" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('commodityBox')">提交</el-button>
        <el-button  @click="$emit('close')">关闭</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import co from 'co'
  import OSS from 'ali-oss'
  export default {
    data() {
      // 金额
      var full = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('满减条件不能为空'));
        } else {
          callback();
        }
      };
      // 商品详情
      var reductionPrice = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('满减金额详情不能为空'));
        } else {
          callback();
        }
      };
      return {
        type:1,
        commodityBox:{
          // 满减条件
          full:"",
          // 满减价格
          reductionPrice:""

        },
        rules2: {
          // 商品名称
          full: [
            { validator: full, trigger: 'blur' }
          ],
          // 商品价格
          reductionPrice: [
            { validator: reductionPrice, trigger: 'blur' }
          ],

        }

      }
    },
    props: [
      'addDate'
    ],
    watch:{
      addDate:function(val,oldVal){
        this.commodityBox.full="",
          this.commodityBox.reductionPrice=""
        if(val==""){
          this.type=1;

        }else{
          this.type=2;
          this.commodityBox=val;
        }
      }
    },
    methods:{
      upAli (e) {
        var _this = this;
        var file = e.srcElement.files[0];
        if (file == undefined) {
          return false;
        }
        var fName = file.name,
          suffix = fName.substr(fName.lastIndexOf(".")),
          nda = 'user-herder' + Date.parse(new Date()) / 1000,
          storeAs = nda + suffix;
        var client = new OSS.Wrapper({
          region: 'oss-cn-beijing',
          accessKeyId: 'LTAI8ygujYgDvLJ9',
          accessKeySecret: 'nLrO1bpn9IOpEu0tt0zyAaChc22j0c',
          bucket: 'jiaoyuvideo'
        });
        client.multipartUpload(storeAs, file).then(function (result) {
          console.log(result);
          _this.commodityBox.img = result.name;
          _this.$message({
            message: '上传成功',
            type: 'success'
          });
        }).catch(function (err) {
          console.log(err);
          _this.$message({
            message: '服务器繁忙，请稍后再试',
            type: 'error'
          });
        });

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.type==1){this.$http //列表加载
                .post(this.url + "MicroPlatform/coupon/insertReduction", {
                  full:this.commodityBox.full,
                  reductionPrice:this.commodityBox.reductionPrice,
                  shop_code:sessionStorage.getItem('shopCode'),
                })
                .then(
                  resp => {
                    console.log(resp)
                    if(resp.state==1){
                      this.$message({
                        message: '添加成功',
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
                this.$http //列表加载
                  .post(this.url + "MicroPlatform/coupon/updateReduction",this.commodityBox)
                  .then(
                    resp => {
                      console.log(resp)
                      if(resp.state==1){
                        this.$message({
                          message: '添加成功',
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
      }
    },
    created(){
      if(this.addDate==undefined || this.addDate=="" || this.addDate==null){
        this.type=1;
      }else{
        this.type=2;
        this.commodityBox=this.addDate;
      }
    }
  }
</script>

<style scoped>
  h3,li{
    text-align: center;
  }
  h3{
    margin: 20px;
  }
  div{
    display: inline-block;
  }
  li{
    margin-bottom: 10px;
  }
  .commodity{
    width: 100%;
    text-align: center;
  }
</style>
