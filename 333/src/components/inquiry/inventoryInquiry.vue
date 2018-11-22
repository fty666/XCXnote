<style scoped>

</style>


<template>
  <div style="width:100%;">
    <div class="tableFunc">
      <div>
        <span class="titleText">货场名称</span>
        <el-select v-model="yardCode" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in yardName"
            :key="index"
            :label="item.YardName"
            :value="item.YardName">
          </el-option>
        </el-select>

      </div>
      <div>
        <span class="titleText">商品名称</span>
        <el-select v-model="goodsCode" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in goodsName"
            :key="index"
            :label="item.GoodsName"
            :value="item.GoodsName">
          </el-option>
        </el-select>
      </div>

      <div >
        <el-button type="primary" @click="getList">查询</el-button>
      </div>

    </div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 98%;margin:20px auto 10px auto;">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        :index="indexMethod"
        width="60">
      </el-table-column>
      <el-table-column
        prop="YardName"
        label="货场"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="GoodsName"
        label="货名"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="Stock"
        label="数量"
        sortable
        align="center"
        min-width="120">
      </el-table-column>


    </el-table>
    <div class="block pageBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[20, 50,100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total='total'>
      </el-pagination>
    </div>


  </div>
</template>

<script>
  export default {
    methods: {
      ClassGroupClick(row){
        console.log(row)
        this.$http //列表加载
          .post(this.url + "inventory/QueryInvClassRecord", {
            groupID:row,
            accountId: this.accountIdVal
          })
          .then(
            resp => {
              this.ClassRecordArray=resp.data
              console.log(resp.data)
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      //分页
      handleSizeChange(val) {
        //每页数量
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        //分页
        this.page = val;

        this.getList();
      },
      //分页结束
      //序号
      indexMethod(index) {
        return index + 1 + (this.page - 1) * this.pageSize;
      },

      //获取货场名称
      getyardName() {
        this.$http //列表加载
          .post(this.url + "weight/goods/selectYard")
          .then(
            resp => {
              this.yardName=resp.data
              // this.storeNameArray=resp.data.PageInfo.list
              console.log(resp.data)
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      //获取商品名称
      getgoodsName() {
        this.$http //列表加载
          .post(this.url + "weight/goods/selectShopName")
          .then(
            resp => {
              console.log(resp.data)
              this.goodsName=resp.data
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      // 获取列表方法
      getList(){
        this.$http //列表加载
          .post(this.url + "weight/goods/selectAllgoods", {
            pager:this.page,
            pagerSize: this.pageSize,
            yardName: this.yardCode,
            // 销货单号
            goodsName: this.goodsCode,
            ClassID: "",
            goodsCode:"",
            //开始时间
            // yardCode: this.yardCode,
          })
          .then(
            resp => {
              this.tableData = resp.data.data;
              this.total = resp.data.number;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      }
    },

    data() {
      return {
        // 分页
        total: 20,
        page: 1,
        pageSize: 20,
        // 参数设置
        currentPage1: 1,
        tableData:[],
        yardName:[],
        goodsName:[],
        goodsCode:"",
        yardCode:""

      }
    },
    created() {
// 获取列表方法调用
      this.getList();
      this.getyardName();
      this.getgoodsName();






    }
  }
</script>
