<template>
  <div class="commodity">
    <el-form :model="commodityBoxs" status-icon :rules="rules2" ref="commodityBoxs" label-width="100px" class="demo-ruleForm">
      <el-form-item label="优惠价格" prop="couponPrice">
        <el-input  v-model="commodityBoxs.couponPrice" ></el-input>
      </el-form-item>
      <el-form-item label="优惠条件" prop="conditions">
        <el-input  v-model.number="commodityBoxs.conditions" ></el-input>
      </el-form-item>
      <el-form-item label="优惠详情" prop="couponDetails">
        <el-input  v-model="commodityBoxs.couponDetails" ></el-input>
      </el-form-item>
      <el-form-item label="优惠时间" prop="dataTime">
        <div class="dataBox">
          <el-date-picker
            v-model="dataTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            @change='changeData'
            format="yyyy-MM-dd HH:ss:mm"
            value-format="yyyy-MM-dd HH:ss:mm"
            end-placeholder="结束日期" size="mini">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('commodityBoxs')">提交</el-button>
        <el-button  @click="$emit('close')">关闭</el-button>
        <el-button @click="resetForm('commodityBoxs')">重置</el-button>
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
      var couponPrice = (rule, value, callback) => {
        if (value==='') {
          callback(new Error('优惠价格不能为空'));
        } else {
          callback();
        }
      };
      //商品条件
      var conditions = (rule, value, callback) => {
        if (value==='') {
          callback(new Error('优惠详情不能为空'));
        } else {
          callback();
        }
      };
      // 商品详情
      var couponDetails = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('商品详情不能为空'));
        } else {
          callback();
        }
      };
      return {
        dataBox:[],
        type:1,
        dataTime: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10)
        ],
        commodityBoxs:{
          // 商品价格
          couponPrice:"",
          // 商品条件
          conditions:"",
          // 商品详情
          couponDetails:"",
          // 开始时间
          startTime:"",
          // 结束时间
          endTime:"",

        },
        rules2: {
          // 商品价格
          couponPrice: [
            { validator: couponPrice, trigger: 'blur' }
          ],
          // 条件
          conditions: [
            { validator: conditions, trigger: 'blur' }
          ],
          //详情 dataTime
          couponDetails: [
            { validator: couponDetails, trigger: 'blur' }
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
      }
    },
    created(){
      if(this.addDate==undefined || this.addDate=="" || this.addDate==null){
        this.type=1;
        //计算当前月份
        let newTime = new Date();
        let mytime =
          newTime.getHours() +
          ":" +
          (newTime.getMinutes() < 10
            ? "0" + newTime.getMinutes()
            : newTime.getMinutes()) +
          ":" +
          (newTime.getSeconds() < 10
            ? "0" + newTime.getSeconds()
            : newTime.getSeconds());
        console.log(mytime);
        let newYear = newTime.getFullYear();
        let newMonth =
          newTime.getMonth() + 1 < 10
            ? "0" + Number(newTime.getMonth() + 1)
            : Number(newTime.getMonth() + 1);
        let newData =
          newTime.getDate() < 10 ? "0" + newTime.getDate() : newTime.getDate();
        let contentTime =
          newYear +
          "-" +
          newMonth +
          "-01" +
          " 00:00:00 - " +
          newYear +
          "-" +
          newMonth +
          "-" +
          newData +
          " " +
          mytime;
        this.commodityBoxs.startTime = newYear + "-" + newMonth + "-01" + " 00:00:00";
        this.commodityBoxs.endTime = newYear + "-" + newMonth + "-" + newData + " " + mytime;
        this.dataTime = [this.commodityBoxs.startTime, this.commodityBoxs.endTime];
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
  .dataBox{
    width: 207px;
  }
</style>
