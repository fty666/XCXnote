<template>
  <div>
    <!--表格-->
    <div class="head flex">
      <div class="font">会员统计</div>
      <div class="head1" style="margin-left: 47%">导出数据</div>
      <div :class="['head1',yday==true?'bj':'']" style="margin-right: 0px" @click="Xyday()">
        昨天
      </div>
      <div :class="['head1',Qday==true?'bj':'']" style="margin-right: 0px" @click="XQday()">最近7天</div>
      <div :class="['head1',Tday==true?'bj':'']" @click="XTday()">最近30天</div>
    </div>
    <div class="Tabless">
      <div class="tables">
        <el-table
          :data="State"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="销售排名"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="sum_num"
            label="销售数量"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="num_percent"
            min-width="180"
            align="center"
            label="数量比例">
          </el-table-column>
          <el-table-column
            prop="sum_price"
            min-width="180"
            align="center"
            label="销售金额">
          </el-table-column>
          <el-table-column
            prop="price_percent"
            min-width="183"
            align="center"
            label="金额比例">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        //统计
        State: [],
        //酒品统计
        wine: true,
        Nwine: false,
        set: false,
        //  时间统计
        yday: true,
        Qday: false,
        Tday: false
      }
    },
    methods: {
      //获取统计
      getState() {
        this._getData('/api/v1/data_statistics/yesterdayGoods', {id: 1},
          data => {
            this.State = data;
          })
      },
      //  背景选择
      Xwine() {
        this.select(1);
      },
      XNwine() {
        this.select(2)
      },
      Xset() {
        this.select(3);
      },
      select(flg) {
        this.wine = false;
        this.Nwine = false;
        this.set = false;
        switch (flg) {
          case 1:
            this.wine = true;
            break;
          case 2:
            this.Nwine = true;
            break;
          case 3:
            this.set = true;
            break;
        }
      },
      
      //  时间选择
      Xyday() {
        this.Sselect(1);
        this.getState();
      },
      XQday() {
        this.Sselect(2);
        this._getData('/api/v1/data_statistics/old7Goods', {
            id: 1
          },
          data => {
            this.State = data;
          })
      },
      XTday() {
        this.Sselect(3)
        this._getData('/api/v1/data_statistics/old30Goods', {
            id: 1
          },
          data => {
            this.State = data;
          })
      },
      Sselect(flg) {
        this.yday = false;
        this.Qday = false;
        this.Tday = false;
        switch (flg) {
          case 1:
            this.yday = true;
            break;
          case 2:
            this.Qday = true;
            break;
          case 3:
            this.Tday = true;
            break;
        }
      },
    },
    created() {
      this.getState()
    }
  }
</script>

<style scoped>
  .bj {
    color: white;
    background-color: rgba(0, 153, 153, 1);
  }
  .font {
    text-align: left;
    margin: 0px 0px 0px 30px;
    color: black;
    font-weight: 700;
    font-size: 16px;
  }
</style>
