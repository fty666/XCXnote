<template>
  <div class="commodity">
    <el-form :model="commodityBoxs" status-icon :rules="rules2" ref="commodityBoxs" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分类名称" prop="goodsName">
        <el-input  v-model="commodityBoxs.className" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('commodityBoxs')">提交</el-button>
        <el-button  @click="$emit('close')">关闭</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  export default {
    data() {
      // 商品名称
      var goodsName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('商品名称不能为空'));
        } else {
          callback();
        }
      };
      return {
        type:1,
        commodityBoxs:{
          // 商品名称
          className:""
        },
        rules2: {
          // 商品名称
          goodsName: [
            { validator: goodsName, trigger: 'blur' }
          ]
        }

      }
    },
    props: [
      'addDate'
    ],
    watch:{
      addDate:function(val,oldVal){
        if(val==""){
          this.type=1;
          this.commodityBoxs.className=""
        }else{
          this.commodityBoxs=val;
          this.type=2;
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.type==1){
                this.commodityBoxs.shop_code=sessionStorage.getItem('shopCode')
                this.$http //列表加载
                  .post(this.url + "MicroPlatform/foodgoods/insertFoodsClass",  this.commodityBoxs)
                  .then(
                    resp => {
                      console.log(resp)
                      if(resp.state==1){
                        this.$message({
                          message: '添加成功',
                          type: 'success'
                        });
                        this.commodityBoxs.className=""
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
                  .post(this.url + "MicroPlatform/foodgoods/updateFoodsClass",
                  {
                    className:this.commodityBoxs.className,
                      foodClassId:this.commodityBoxs.classId
                  }
                )
                  .then(
                    resp => {
                      console.log(resp)
                      if(resp.state==1){
                        this.$message({
                          message: '添加成功',
                          type: 'success'
                        });
                        this.$emit('close')
                        this.commodityBoxs.className=""
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
      }
    },
    created(){
      if(this.addDate==undefined || this.addDate=="" || this.addDate==null){
        this.type=1;
        this.commodityBoxs.className="";
      }else{
        this.type=2;
        this.commodityBoxs=this.addDate;
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
