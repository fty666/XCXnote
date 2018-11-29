<template>
<div style="margin: 0 auto;padding-top: 20px;">
  <h3 style="text-align: center;margin-bottom: 20px;">商家信息</h3>
  <el-form :model="shpoModel" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="商家名称:" prop="ShopName">
      <el-input v-model="shpoModel.ShopName"  auto-complete="off"></el-input>
      <!--<span>{{shpoModel.ShopName}}</span>-->
    </el-form-item>
    <el-form-item label="商家标签:" prop="level">
      <el-input  v-model="shpoModel.shop_tip" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商家电话:" prop="mobile">
      <el-input v-model.number="shpoModel.mobile"></el-input>
    </el-form-item>
    <el-form-item label="起送金额:" prop="mobile">
      <el-input v-model.number="shpoModel.transMoney"></el-input>
    </el-form-item>
    <el-form-item label="配送金额:" prop="mobile">
      <el-input v-model.number="shpoModel.initialMoney"></el-input>
    </el-form-item>
    <el-form-item label="人均金额:" prop="mobile">
      <el-input v-model.number="shpoModel.avgMoney"></el-input>
    </el-form-item>
    <el-form-item label="商家描述:" prop="description">
      <el-input v-model.number="shpoModel.description"></el-input>
    </el-form-item>
    <el-form-item label="商家地址:" prop="shop_addr">
      <el-input v-model.number="shpoModel.shop_addr"></el-input>
    </el-form-item>
    <el-form-item label="商家详情:" prop="shop_detail">
      <el-input v-model.number="shpoModel.shop_detail"></el-input>
    </el-form-item>
    <el-form-item label="商家LOGO:" prop="shop_detail">
      <div class="touxiang f-l">
        <div class="tu f-l">
          <a href="#">
            <img :src="'http://jiaoyuvideo.oss-cn-beijing.aliyuncs.com/' + shpoModel.logo" height="100%" width="100%" />
            <input type="file"
                   @change="upAli($event)"
                   accept="image/jpg,image/png,image/gif,image/jpeg"img
                   class="img1" />
          </a>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import co from 'co'
  import OSS from 'ali-oss'
  export default {
    data() {

      var validateShopName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('内容不能为空'));
        } else {

          callback();
        }
      };

      return {
        shopName:"",
        mobile:"",
        shpoModel:{},
        rules2: {
          ShopName: [
            { validator: validateShopName, trigger: 'blur' }
          ],
          description: [
            { validator: validateShopName, trigger: 'blur' }
          ],
          level: [
            { validator: validateShopName, trigger: 'blur' }
          ],
          mobile: [
            { validator: validateShopName, trigger: 'blur' }
          ],
          shop_addr: [
            { validator: validateShopName, trigger: 'blur' }
          ],
          shop_detail: [
            { validator: validateShopName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.shpoModel.reduction="";
        if(this.shpoModel.ShopName!=this.shopName){
          this.shpoModel.shop_name=this.shpoModel.ShopName
          this.shpoModel.ShopName=this.shopName
          this.shpoModel.isshop_name="Y"
        }else{
          this.shpoModel.isshop_name="N"
          this.shpoModel.shop_name=""
        }
        if(this.mobile!=this.shpoModel.mobile){
          this.shpoModel.istel="Y"
        } else{
          this.shpoModel.istel="N"
        }
        console.log(this.shpoModel)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http //列表加载
              .post(this.url + "MicroPlatform/shop/updateInfoByCode",this.shpoModel)
              .then(
                resp => {
                  console.log(resp)
                  if(resp.state==1){
                    this.$message({
                      message: '添加成功',
                      type: 'success'
                    });
                    this.getList();
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
          _this.shpoModel.logo = result.name;
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
      // 获取列表方法
      getList(){
        this.$http //列表加载
          .post(this.url + "MicroPlatform/shop/getOutShopByCode", {
            shop_code:sessionStorage.getItem('shopCode'),
          })
          .then(
            resp => {
              this.shopName=resp.data.ShopName;
              this.shpoModel=resp.data;
              this.mobile=resp.data.mobile
              console.log(this.shpoModel)
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
    created(){
      this.getList()
    }
  }
</script>

<style scoped>
.touxiang{
  width: 200px;
}
</style>
