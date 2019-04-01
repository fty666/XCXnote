<template>
  <div>
    <div class="xiu" style="height: 250px">
      <div class="edit">修改订单归属</div>
      <div class=" addInput">
        <div class="Paddfont" style="width: 60%;margin: 20px 0px 20px 10px;text-align: left">将此订单的归属修改为：</div>
        <div>
          <el-select v-model="consignerType" size="medium" placeholder="请选择" style="width: 70%;margin-left: 50px">
            <el-option label="平台" value="1"></el-option>
            <el-option label="经销商" value="3"></el-option>
          </el-select>
        </div>
      </div>
      <div class="flex">
        <div class="logBtn1" style="margin: 30px 0px 0px 80px" @click="submit()">
          <el-button size="medium" class="buttons" type="primary">提交</el-button>
        </div>
        <div class="logBtn2" style="margin: 30px 0px 0px 20px" @click="esc()">
          <el-button size="medium" class="buttons">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "affiliationGoods",
    data() {
      return {
        consignerType: ''
      }
    },
    methods: {
      submit() {
        this.$confirm('是否修改此归属?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var datas = {};
          datas.id = this.deliverGood.id;
          if (this.consignerType == 3) {
            datas.consignerType = 3;
            datas.userCode = this.deliverGood.user_code;
          } else {
            datas.consignerType = 1;
          }
          this._getData('/api/v1/order/editBelong', datas,
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.$emit('getOrder');
              this.$emit('closeAff');
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      esc() {
        this.$emit('closeAff')
      }
    },
    props: ['deliverGood'],
    created() {
      console.log(this.deliverGood)
    }
  }
</script>

<style scoped>

</style>
