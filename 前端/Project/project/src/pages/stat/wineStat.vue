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
    <div v-if="wine==true">
      <wine></wine>
    </div>
    <div v-if="set==true">
      <combo></combo>
    </div>
    <div v-if="Nwine==true">
      <nowine></nowine>
    </div>
  </div>
</template>

<script>
  import wine from '@/components/shopState/wine'
  import nowine from '@/components/shopState/noWine'
  import combo from '@/components/shopState/combo'
  
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
    components: {
      wine,
      combo,
      nowine
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
      }
    },
    created() {
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
