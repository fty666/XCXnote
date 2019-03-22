<template>
  <!--发货-->
  <div>
    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="34%"
      center>
      <div class="xiu" style="height: auto;">
        <div class="edit">发货操作</div>
        <div class="address">收货地址：{{this.orderInfo[0].address}}</div>
        <div class="flex addInput">
          <div class="addFont">物流公司：</div>
          <div>
            <el-select v-model="value" size="medium" placeholder="请选择" style="width: 50%">
              <el-option
                v-for="item in trans_company"
                :key="item.id"
                :label="item.name"
                :value="item.shortName">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="flex addInput">
          <div class="addFont">物流单号：</div>
          <div class="">
            <el-input v-model="input" size="medium" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="addFont" style="margin-left: 30px">选择发货仓库：</div>
        <div style="margin: 10px 0px 0px 30px;">
          <el-table
            :data="orderInfo[0].goods_info"
            border
            style="width: 80%">
            <el-table-column
              prop="goods_name"
              label="商品名称"
              align="center"
              min-width="180">
            </el-table-column>
            <el-table-column
              label="选择库存"
              align="center"
              min-width="250">
              <template slot-sope="scope">
                <el-select v-model="value" size="medium" placeholder="请选择" style="width: 93%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="flex">
          <div class="logBtn1" style="margin: 30px 0px 0px 33%">
            <el-button size="medium" type="primary">提交</el-button>
          </div>
          <div class="logBtn2" style="margin: 30px 0px 0px 20px">
            <el-button size="medium">取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
  <!--配货-->
  <div>
    <el-dialog
      title=""
      :visible.sync="sendPicking"
      width="30%"
      center>
      <div class="xiu" style="height: 300px">
        <div class="edit">发起配货</div>
        <div class="flex addInput">
          <div class="Paddfont">选择配货方：</div>
          <div>
            <el-select v-model="value" size="medium" placeholder="请选择" style="width: 90%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="flex addInput">
          <div class="Paddfont">分成比例：</div>
          <div>
            <el-input v-model="input" style="width: 40%" size="medium"></el-input>
          </div>
        </div>
        <div class="flex addInput">
          <div class="Paddfont">配货款：</div>
          <div>
            <el-input v-model="input" size="medium" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="flex">
          <div class="logBtn1" style="margin: 30px 0px 0px 20%">
            <el-button size="medium" class="buttons" type="primary">提交</el-button>
          </div>
          <div class="logBtn2" style="margin: 30px 0px 0px 20px">
            <el-button size="medium" class="buttons">取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
  <!--修改归属-->
  <div>
    <el-dialog
      title=""
      :visible.sync="belong"
      width="30%"
      center>
      <div class="xiu" style="height: 250px">
        <div class="edit">修改订单归属</div>
        <div class=" addInput">
          <div class="Paddfont" style="width: 60%;margin: 20px 0px 20px 10px;text-align: left">将此订单的归属修改为：</div>
          <div>
            <el-select v-model="consignerType" size="medium" placeholder="请选择" style="width: 70%;margin-left: 50px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
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
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "orderState",
    methods: {
      //修改归属
      submit() {
        this._getData('/api/v1/order/editBelong', {
          id: this.editinfo.id,
          consignerType: this.consignerType,
          userCode: this.editinfo.user_code
        }, data => {
          this.getOrder();
          this.belong = false;
          this.$message({
            type: 'success',
            message: '操作成功'
          });
        })
      },
      esc() {
        this.belong = false;
      },
      //  订单发货
      send(val) {
        console.log(val)
        //查看订单
        this._getData('/api/v1/order/index', {
          order_code: val.order_code,
        }, data => {
          console.log(data)
          this.orderInfo = data.data;
        })
        //选择库存
        this._getData('/api/v1/order/getWarehouse', {
          id: val.id,
        }, data => {
          console.log(data)
          this.inventory = data;
        })
        //查看物流
        this._getData('/api/v1/trans_company/index', {
        }, data => {
          console.log(data)
          this.trans_company = data;
        })
        this.centerDialogVisible = true;
      },
      //  发起配货
      picking() {
        this.sendPicking = true;
      },
    }
  }
</script>

<style scoped>

</style>
