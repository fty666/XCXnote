<template>
  <div class="body">
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div :class="['state','flex',wine==true?'bj':'']" @click="Xwine()">
        <div class="state2">酒品统计</div>
      </div>
      <div :class="['state','flex',Nwine==true?'bj':'']" @click="XNwine()" style="margin-left: 0px">
        <div class="state2">非酒品统计</div>
      </div>
      <div :class="['state','flex',set==true?'bj':'']" @click="Xset()" style="margin-left: 0px">
        <div class="state2">套餐统计</div>
      </div>
    </div>
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
    <div style="border: 1px solid #ddd;height: 800px;">
      <div class="tables">
        <el-table
          :data="tableData3"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="销售排名"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="商品名称"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="销售数量"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            min-width="180"
            align="center"
            label="数量比例">
          </el-table-column>
          <el-table-column
            prop="address"
            min-width="180"
            align="center"
            label="销售金额">
          </el-table-column>
          <el-table-column
            prop="address"
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
        input: '',
        value1: '',
        value6: '',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }],
        //酒品统计
        wine: true,
        Nwine: false,
        set: false,
      //  时间统计
        yday:true,
        Qday:false,
        Tday:false
      }
    },
    methods: {
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
      Xyday(){
        this.Sselect(1)
      },
      XQday(){
        this.Sselect(2);
      },
      XTday(){
        this.Sselect(3)
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
    }
  }
</script>

<style scoped>
  .font {
    text-align: left;
    margin: 0px 0px 0px 30px;
    color: black;
    font-weight: 700;
    font-size: 16px;
  }
  
  .tables {
    width: 92%;
    margin: 40px 0px 0px 4.5%;
  }
  
  .yday {
    border: 0px solid #ddd;
    background-color: rgba(0, 153, 153, 1);
    color: white;
    height: 32px;
    margin-left: 50px;
    margin-right: 0px;
  }
  
  .bj {
    color: white;
    background-color: rgba(0, 153, 153, 1);
  }
</style>
