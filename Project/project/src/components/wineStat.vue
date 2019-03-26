<template>
  <!--数量-->
  <div class="flex" style="margin-top: 20px;">
    <div class="state flex" style="background-color:rgba(0, 153, 153, 1);">
      <div class="state2" style="color: white">全部商品</div>
      <div class="state3" style="color: white">({{this.WList.allCount}})</div>
    </div>
    <div class="state flex">
      <div class="state2">酒类商品</div>
      <div class="state3">({{this.WList.wine}})</div>
    </div>
    <div class="state flex">
      <div class="state2">非酒类商品</div>
      <div class="state3">({{this.WList.noWine}})</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "wineStat",
    data() {
      return {
        WList: {},
      }
    },
    methods: {
      //  查看酒品
      wineList() {
        this._getData('/api/v1/goods/wineOrNoStatistics', {}, data => {
          console.log(data)
          this.WList = data;
        })
      }
    },
    created() {
      this.wineList();
    }
  }
</script>

<style scoped>

</style>
