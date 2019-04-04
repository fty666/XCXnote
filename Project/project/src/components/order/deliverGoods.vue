<template>
  <!--发货-->
  <div>
    <div class="xiu" style="height: auto;">
      <div class="edit">发货操作</div>
      <div class="address" style="margin: 5px 0px 0px 30px">收货地址：{{this.orderInfo.address}}</div>
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
          :data="orderInfo.goods_info"
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
          <!--<el-table-column-->
            <!--prop="goods_name"-->
            <!--label=""-->
            <!--align="center"-->
            <!--min-width="180">-->
          <!--</el-table-column>-->
        </el-table>
      </div>
      <div class="flex" style="margin-bottom:20px ">
        <div class="logBtn1" style="margin: 30px 0px 0px 33%">
          <el-button size="medium" type="primary">提交</el-button>
        </div>
        <div class="logBtn2" style="margin: 30px 0px 0px 20px" @click="esc()">
          <el-button size="medium">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "deliverGoods",
    data() {
      return {
        value: '',
        trans_company: '',
        input: '',
        options: [],
      }
    },
    methods: {
      getInventory() {
        this._getData('/api/v1/order/getWarehouse', {
            id: this.orderInfo.id,
          },
          data => {
            console.log(data)
          })
      },
      trans() {
        //查看物流
        this._getData('/api/v1/trans_company/index', {}, data => {
          this.trans_company = data;
        })
      },
      esc() {
        this.$emit('closeSend');
      }
    },
    props: ['orderInfo'],
    created() {
      this.trans();
      this.getInventory();
      console.log('订单发货')
    }
  }
</script>

<style scoped>

</style>
