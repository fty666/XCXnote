<template>
  <div style="height:auto;margin-bottom: 30px">
    <el-steps direction="vertical">
      <el-step v-for="(item,index) in flowInfo" :key="index" :title="item.content + item.time"></el-step>
    </el-steps>
  </div>
</template>

<script>
  export default {
    name: "flowInfo",
    data() {
      return {
        flowInfo: []
      }
    },
    methods: {
      getFlow() {
        this._getData('/api/v1/trans/getTransInfo', {
          order_code: sessionStorage.getItem('oderCode')
        }, data => {
          this.flowInfo = data.list;
        })
      }
    },
    created() {
      this.getFlow()
    }
  }
</script>

<style scoped>

</style>
