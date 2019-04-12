<template>
  <div class="body">
    <!--头部-->
    <div class="spaces whiteT kuan">
      <div style="width: 80%">
        <div class="font1">当前订单转态：{{this.order.status}}</div>
        <div class="flex">
          <div class="bian Mouse" @click="remark()">备注订单</div>
          <div class="bian Mouse" @click="editAff()">修改归属</div>
          <div class="bian Mouse" v-if="this.order.status=='待收货' || this.order.status=='完成'">订单退款</div>
          <!--待发货-->
          <div class="bian Mouse" v-if="this.order.status=='待发货'">发货</div>
          <div class="bian Mouse" v-if="this.order.status=='待发货'" @click="takeGood()">修改收货信息</div>
          <div class="bian Mouse" v-if="this.order.status=='待发货'" @click="refund()">订单退款</div>
        </div>
      </div>
      <!--修改收货地址-->
      <div>
        <el-dialog
          title=""
          :visible.sync="takeCenter"
          width="30%"
          center>
          <div class="bjb">修改收货地址</div>
          <div>
            <el-form :model="ruleForm" :rules="takeRelus" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="收货姓名" prop="consignee">
                <el-input v-model="ruleForm.consignee"></el-input>
              </el-form-item>
              <el-form-item label="收货手机" prop="mobile">
                <el-input v-model.number="ruleForm.mobile"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input type="textarea" v-model="ruleForm.address"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="takeFalse()">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
      </div>
      <!--备注订单-->
      <div>
        <el-dialog
          title=""
          :visible.sync="markCenter"
          width="30%"
          center>
          <div class="bjb">备注订单</div>
          <div>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <div class="flex">
            <div style="margin: 20px 0px 0px 30%">
              <el-button type="primary" @click="Tremark()">提交</el-button>
            </div>
            <div style="margin: 20px 0px 0px 18px">
              <el-button type="info" @click="Tesc()">取消</el-button>
            </div>
          </div>
        </el-dialog>
      </div>
      <!--返回列表-->
      <router-link to="/order/orderList" v-if="orderManag==1">
        <div class="bian" style="margin: 40px 20px 0px 0px">返回列表</div>
      </router-link>
      <router-link to="/integral/getIntegral" v-if="orderManag==2">
        <div class="bian" style="margin: 40px 20px 0px 0px">返回列表</div>
      </router-link>
      <router-link to="/integral/getConversion" v-if="orderManag==3">
        <div class="bian" style="margin: 40px 20px 0px 0px">返回列表</div>
      </router-link>
      <router-link to="/member/memberInfo" v-if="orderManag==4">
        <div class="bian" style="margin: 40px 20px 0px 0px">返回列表</div>
      </router-link>
      <router-link to="/dealer/dealerInfo" v-if="orderManag==5">
        <div class="bian" style="margin: 40px 20px 0px 0px">返回列表</div>
      </router-link>
      <router-link to="/dealer/dealerAudit" v-if="orderManag==6">
        <div class="bian" style="margin: 40px 20px 0px 0px">返回列表</div>
      </router-link>
    </div>
    <!--选择信息-->
    <div class="flex" style="margin-top: 30px;">
      <div :class="[ 'state','flex', dealer==true?'bj':'']" @click="dealerInfo()">
        <div class="state2">订单信息</div>
      </div>
      <div :class="[ 'state','flex', members==true?'bj':'']" @click="member()" style="margin-left: 0px">
        <div class="state2">收货信息</div>
      </div>
    </div>
    <!--订单信息-->
    <div v-if="dealer==true">
      <orderInfo ref="headerChild" v-on:orderInfos="orderInfos"></orderInfo>
    </div>
    <!--收货信息-->
    <div v-else>
      <div class="head">
        <div class="backfont"> 物流信息</div>
      </div>
      <div class="flex xiu" style="height: 140px;width: 100%">
        <div class="sfont">
          收货地址：{{this.addInfo.address}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import orderInfo from '@/components/order/orderInfo'
  
  export default {
    data() {
      var phone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('手机号输入有误'));
          return false;
        } else {
          callback();
        }
      };
      return {
        dealer: true,
        members: false,
        orderManag: false,
        order: {},
        ruleForm: {
          mobile: '',
          consignee: '',
          address: ''
        },
        takeRelus: {
          consignee: [
            {required: true, message: '请输入收货人姓名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请填写收货地址', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请填写手机号', trigger: 'blur'},
            {type: 'number', message: '年龄必须为数字值', trigger: 'blur'},
            {validator: phone, trigger: 'blur'}
          ],
        },
        //操作
        markCenter: false,
        textarea: '',
        takeCenter: false,
        addInfo: {}
      }
    },
    components: {
      orderInfo
    },
    methods: {
      orderInfos(orderInfos) {
        this.order = orderInfos;
      },
      //经销商信息
      dealerInfo() {
        this.dealer = true;
        this.members = false;
      },
      //  会员信息
      member() {
        this.dealer = false;
        this.members = true;
      },
      //  页面跳转
      skip(val) {
        switch (val) {
          case '订单管理':
            this.orderManag = '1';
            break;
          case'已领取积分订单':
            this.orderManag = '2';
            break;
          case'已兑换积分订单':
            this.orderManag = '3';
            break;
          case'会员信息':
            this.orderManag = '4';
            break;
          case'经销商信息':
            this.orderManag = '5';
            break;
          case '资质审核':
            this.orderManag='6';
            break;
        }
      },
      // 修改归属
      editAff() {
        this.$confirm('是否修改此订单归属?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/order/editBelong', {
              id: this.order.id,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //订单退款
      refund() {
        this.$confirm('是否退款此订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/order/refund', {
              id: this.order.id,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //  备注订单
      remark() {
        this.markCenter = true;
      },
      Tremark() {
        this._getData('/api/v1/order/editRemark', {
            orderCode: this.order.order_code,
            remark: this.textarea
          },
          data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.Tesc();
          })
      },
      Tesc() {
        this.markCenter = false;
      },
      //  修改收货地址
      takeGood() {
        this.takeCenter = true;
      },
      //  提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.id = this.order.id;
            this._getData('/api/v1/order/editAddress', this.ruleForm,
              data => {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                this.takeFalse();
                this.getInfos();
              })
          } else {
            return false;
          }
        });
      },
      takeFalse() {
        this.takeCenter = false;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //  获取订单
      getInfos() {
        this._getData('/api/v1/order/show', {
          id: sessionStorage.getItem('orderId'),
        }, data => {
          if (data.invoice != null) {
            this.bill = true;
          }
          this.addInfo = data;
        })
      }
    },
    created() {
      this.skip(sessionStorage.getItem('page'));
      this.getInfos();
    }
  }
</script>
<style scoped>
  .bjb {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: rgba(51, 153, 255, 1);
    border: none;
    font-size: 18px;
    color: #FFFFFF;
  }
  
  .kuan {
    background-color: rgba(255, 204, 204, 0.498039215686275);
    height: 110px;
    border: 1px solid rgba(255, 204, 204, 1);
  }
  
  .font1 {
    text-align: left;
    margin: 20px 0px 0px 30px;
    font-size: 16px;
    color: black;
    font-weight: 600;
  }
  
  .bian {
    text-align: left;
    width: 100px;
    height: 30px;
    border: 1px solid black;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
    margin: 20px 0px 0px 30px;
    background-color: rgba(255, 255, 255, 1);
  }
  
  .sfont {
    margin: 20px 0px 0px 20px;
    text-align: left;
    font-size: 15px;
  }
</style>
