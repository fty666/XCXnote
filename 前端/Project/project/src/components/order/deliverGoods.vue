<template>
  <!--发货-->
  <div>
    <div class="xiu" style="height: auto;">
      <div class="edit">发货操作</div>
      <div class="address" style="margin: 5px 0px 0px 30px">收货地址：{{this.orderInfo.address}}</div>
      <div class="flex addInput">
        <div class="addFont">物流公司：</div>
        <div>
          <el-select v-model="shortName" size="medium" placeholder="请选择" style="width: 50%">
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
          <el-input type="number" v-model="transNO" size="medium" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="addFont" style="margin-left: 30px">选择发货仓库：</div>
      <div style="margin: 10px 0px 0px 30px;">
        <el-table
          :data="recommend"
          border
          style="width: 90%">
          <el-table-column
            label="商品名称"
            align="center"
            min-width="180">
            <template slot-scope="scope">
            {{scope.row.suggest[0].goodsId || Xname}}
            </template>
          </el-table-column>
          <el-table-column
            label="推荐库存"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <div>
                {{scope.row.suggest[0].warehouseName}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="选择库存"
            align="center"
            min-width="200">
            <template slot-scope="scope">
              <el-select v-model="scope.row.wgId" size="medium" placeholder="请选择" style="width: 93%">
                <el-option
                  v-for="item in (scope.row.sort)"
                  :key="item.wgId"
                  :label="item.warehouseName"
                  :value="item.wgId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex" style="margin-bottom:20px ">
        <div class="logBtn1" style="margin: 30px 0px 0px 33%" @click="Fsubmit()">
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
        shortName:'',
        transNO:'',
        trans_company: '',
        value:'',
        input: '',
        options: [],
        recommend:[],
        orderCode:'',
      }
    },
    methods: {
      //查看推荐产库
      getInventory() {
        this._getData('/api/v1/order/getWarehouse', {
            id: this.orderInfo.id,
          },
          data => {
            console.log(data)
            this.recommend=
              [
                {
                "suggest": [
                  {
                    "wgId": 1,
                    "warehouseId": 1,
                    "goodsId": 1,
                    "reduceStock": 10,
                    "warehouseName": "天津",
                    "warehouseCity": "天津"
                  }
                ],
                "sort": [
                  {
                    "orderCode": "1000001361988388",
                    "wgId": 1,
                    "goodsId": 1,
                    "buyNum": 10,
                    "stock": "100",
                    "warehouseId": 1,
                    "warehouseCity": "天津",
                    "warehouseName": "天津",
                    "distance": "74769"
                  },
                  {
                    "orderCode": "1000001361988388",
                    "wgId": 3,
                    "goodsId": 1,
                    "buyNum": 10,
                    "stock": "100",
                    "warehouseId": 2,
                    "warehouseCity": "北京",
                    "warehouseName": "北京",
                    "distance": "162723"
                  },
                  {
                    "orderCode": "1000001361988388",
                    "wgId": 5,
                    "goodsId": 1,
                    "buyNum": 10,
                    "stock": "100",
                    "warehouseId": 3,
                    "warehouseCity": "上海",
                    "warehouseName": "上海",
                    "distance": "1144840"
                  },
                  {
                    "orderCode": "1000001361988388",
                    "wgId": 6,
                    "goodsId": 1,
                    "buyNum": 10,
                    "stock": "100",
                    "warehouseId": 4,
                    "warehouseCity": "上海",
                    "warehouseName": "上海",
                    "distance": "1144840"
                  }
                ]
                },
                {
                  "suggest":
                    [{
                      "wgId": 4,
                      "warehouseId": 2,
                      "goodsId": 2,
                      "reduceStock": 10,
                      "warehouseName": "北京",
                      "warehouseCity": "北京"
                    }],
                  "sort": [
                    {
                      "orderCode": "1000001361988388",
                      "wgId": 2,
                      "goodsId": 2,
                      "buyNum": 10,
                      "stock": "4",
                      "warehouseId": 1,
                      "warehouseCity": "天津",
                      "warehouseName": "天津",
                      "distance": "74769"
                    },
                    {
                      "orderCode": "1000001361988388",
                      "wgId": 4,
                      "goodsId": 2,
                      "buyNum": 10,
                      "stock": "100",
                      "warehouseId": 2,
                      "warehouseCity": "北京",
                      "warehouseName": "北京",
                      "distance": "162723"
                    }
                  ]
                },
              ]
   
          })
      },
      //查看物流
      trans() {
        //查看物流
        this._getData('/api/v1/trans_company/index', {}, data => {
          this.trans_company = data;
        })
      },
      esc() {
        this.$emit('closeSend');
      },
    //  发货
      Fsubmit(){
        var datas=[];
        var pac=[];
        for(let i=0;i<this.recommend.length;i++){
          var oneData={};
          this.orderCode=this.recommend[i].sort[0].orderCode;
          oneData.wgId=this.recommend[i].wgId;
          oneData.goodsId=this.recommend[i].suggest[0].goodsId;
          oneData.reduceStock=this.recommend[i].suggest[0].reduceStock;
          oneData.shortName=this.shortName;
          oneData.transNO=this.transNO;
          pac.push(oneData)
        }
        datas.package=pac;
        datas.orderCode=this.orderCode;
        datas.operator=sessionStorage.getItem('userID');
        console.log(datas);
        this._getData('/api/v1/order/send',datas,
          data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.esc();
          })
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
