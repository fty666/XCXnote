<template>
  <div class="commodity">
    <el-form :model="commodityBox" status-icon :rules="rules2" ref="commodityBox" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input  v-model="commodityBox.name" ></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="Email">
        <el-input  v-model.number="commodityBox.Email" ></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="job">
        <!--<el-input  v-model="commodityBox.goodsDetails" ></el-input>-->
        <el-select v-model="commodityBox.job" placeholder="请选择">
          <el-option
            v-for="item in jobBox"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="commodityBox.department" placeholder="请选择">
          <el-option
            v-for="item in departmentBox"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('commodityBox')">提交</el-button>
        <el-button  @click="$emit('close')">关闭</el-button>
        <el-button @click="resetForm('commodityBox')">重置</el-button>
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
      var Email = (rule, value, callback) => {
        if (!value) {
          callback(new Error('账号不能为空'));
        } else {
          callback();
        }
      };
      // 商品名称
      var name = (rule, value, callback) => {
        if (!value) {
          callback(new Error('商品名称不能为空'));
        } else {
          callback();
        }
      };
      //折扣
      var job = (rule, value, callback) => {
        if (!value) {
          callback(new Error('职位不能为空'));
        } else {
          callback();
        }
      };
      // 最大购买量
      var department = (rule, value, callback) => {
        if (!value) {
          callback(new Error('部门不能为空'));
        } else {
          callback();
        }
      };
      return {
        // userData:{},
        commodityBox:{
          // 商品名称
          name:"",
          // 商品价格
          Email:"",
          // 折扣
          job:"",
          // 商家详情
          department:"",
        },
        jobBox:[
          {
            label:"内勤",
            value:1
          },
          {
            label:"财务",
            value:2
          },
          {
            label:"销售",
            value:3
          }
        ],
        departmentBox:[
          {
            label:"内勤部",
            value:1
          },
          {
            label:"财务部",
            value:2
          },
          {
            label:"销售部",
            value:3
          },
        ],
        rules2: {
          // 商品名称
          name: [
            { validator: name, trigger: 'blur' }
          ],
          // 商品价格
          Email: [
            { validator: Email, trigger: 'blur' }
          ],
          //折扣
          job: [
            { validator: job, trigger: 'change' }
          ],
          //商品详情
          department: [
            { validator: department, trigger: 'change' }
          ],
        }

      }
    },
    props: [
      'addDate'
    ],
    watch:{
      addDate:function(val,oldVal){
        console.log(val)
        if(val==""){
          console.log(1111);
          this.$refs['commodityBox'].resetFields();
        }else{
          this.commodityBox.price=val.price
          this.commodityBox.discount=val.discount
          this.commodityBox.maxnum=val.maxnum
          this.commodityBox.minnum=val.minnum
          this.commodityBox.img=val.img
          this.commodityBox.goodsName=val.goods_name;
          this.commodityBox.goodsDetails=val.goods_details;
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.commodityBox.img!=""){
              this.commodityBox.shopCode=sessionStorage.getItem('shopCode')
              this.$http //列表加载
                .post(this.url + "admin/add", this.commodityBox)
                .then(
                  resp => {
                    console.log(resp)
                    if(resp.state==1){
                      this.$message({
                        message: '上传成功',
                        type: 'success'
                      });
                      this.$emit('close')
                      this.$refs['commodityBox'].resetFields();

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
              this.$message.error('请上传图片');
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
        console.log(11111)
      }else{
        console.log(2222)
        this.commodityBox=this.addDate;
        this.commodityBox.price=this.addDate.price
        this.commodityBox.discount=this.addDate.discount
        this.commodityBox.maxnum=this.addDate.maxnum
        this.commodityBox.minnum=this.addDate.minnum
        this.commodityBox.img=this.addDate.img
        this.commodityBox.goodsName=this.addDate.goods_name;
        this.commodityBox.goodsDetails=this.addDate.goods_details;
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
