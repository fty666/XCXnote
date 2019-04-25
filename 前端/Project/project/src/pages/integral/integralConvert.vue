<template>
  <div class="body">
    <!--签到赠送积分设置-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签到赠送积分设置</div>
    </div>
    <div class="flex xiu" style="height: 300px">
      <div>
        <el-form :model="addList" :rules="rules" ref="addList">
          <div class="flex dfont" style="margin-top: 35px">
            <div class="qian">新用户注册赠送积分：</div>
            <div>
              <el-form-item prop="new_user_integral">
                <el-input v-model="addList.new_user_integral" size="small"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="flex dfont">
            <div class="qian">每日签到赠送积分：</div>
            <div>
              <el-form-item prop="everyday_integral">
                <el-input v-model="addList.everyday_integral" size="small"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="flex dfont">
            <div class="qian">连续一周签到赠送积分：</div>
            <div>
              <el-form-item prop="week_integral">
                <el-input v-model="addList.week_integral" size="small"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="flex dfont">
            <div class="qian">邀请每个好友可获得积分：</div>
            <div>
              <el-form-item prop="friend_integral">
                <el-input v-model="addList.friend_integral" size="small"></el-input>
              </el-form-item>
            </div>
            <div @click="sign('addList')">
              <el-button class="buttons2" style="margin:0px 0px  80px 50px" size="small">确认修改</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    
    <!--订单抵现规则-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单抵现规则</div>
    </div>
    <div class="flex xiu" style="height: 100px">
      <div style="margin: 5px 0px 0px 100px">
        <div class="flex dfont">
          <div class="qian">订单抵扣比例：</div>
          <div>
            <el-input v-model="integral" size="small" style="width: 150px"></el-input>
          </div>
          <div class="qian" style="margin-left: 10px">积分=1元</div>
          <div @click="deposit()">
            <el-button class="buttons2" style="margin:0px 0px  80px 50px" size="small">确认修改</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--商城添加-->
    <inteshop></inteshop>
  </div>
</template>

<script>
  import inteshop from '@/components/inteShoping'
  export default {
    data() {
      return {
        //  积分
        integral: '',
        //一周签到
        addList: {
          new_user_integral: "",
          everyday_integral: '',
          week_integral: '',
          friend_integral: ''
        },
        rules: {
          new_user_integral: [{
            required: true, message: '请输入注册赠送积分', trigger: 'blur'
          },
          ],
          everyday_integral: [
            {required: true, message: '请输入签到积分', trigger: 'blur'},
          ],
          week_integral:
            [{
              required: true, message: '请输入连续签到一周积分', trigger: 'blur'
            },
            ],
          friend_integral:
            [
              {required: true, message: '请输入邀请好友积分', trigger: 'blur'},
            ],
        },
      }
    },
    components:{
      inteshop
    },
    methods: {
      //签到积分设置
      sign(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._getData('/api/v1/integral/sign', this.addList, data => {
              this.addList = {};
              this.$message({
                type: 'success',
                message: '添加成功'
              });
            })
          } else {
            return false;
          }
        });
      },
      //订单抵现规则
      deposit() {
        var reg = /[0-9]\d*/;
        console.log(reg.test(this.integral))
        if (this.integral == '' || reg.test(this.integral) == false) {
          this.$message.error('请输入数字类型积分设置');
        } else {
          this._getData('/api/v1/integral/realise', {
            integral: this.integral,
          }, data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.integral = '';
          })
        }
      },
    },
    created() {
    }
  }
</script>

<style scoped>
  .dfont {
    margin: 30px 0px 0px 20px;
    width: 100%;
    height: 30px;
    font-size: 14px;
  }
  
  .futext {
    margin: 20px 0px 0px 20px;
    width: 95%;
  }
  
  /*退款信息*/
  .tui {
    width: 95%;
    height: 250px;
    margin: 10px 0px 0px 10px;
    border: 1px solid #ddd;
  }
  
  .qian {
    margin-top: 10px;
  }
  
  .fonts {
    font-size: 15px;
    margin: 25px 0px 0px 100px;
  }
  
  .inpu {
    margin: 16px 0px 0px 40px;
    width: 500px;
  }
  
  .cfont {
    color: deepskyblue;
    margin-left: 10px
  }
  
  .bian {
    width: 500px;
    margin: 10px 0px 0px 30%;
  }
  
  .input {
    width: 200px;
  }
  
  .button3 {
    width: 150px;
    margin-left: 10%;
  }
  
  .imgBox {
    width: 100px;
    height: 100px;
    margin: auto;
  }
  
  .imgBox img {
    width: 100%;
    height: 100%;
  }

</style>
