<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[20, 50, 100]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total=totals>
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        //页码参数
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 20
      }
    },
    method:{
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getService();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getService();
      },
    }
  }
</script>

<style scoped>
</style>
