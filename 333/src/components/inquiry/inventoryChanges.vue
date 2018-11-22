<style scoped>

</style>


<template>
  <div style="width:100%;">
    <div class="tableFunc">
      <div class="addBox">
        <el-button type="primary" @click="addbtn">新增</el-button>
      </div>
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
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="warning"  @click="update(scope.$index,scope.row)">修改</el-button>
          <el-button type="danger" @click="deletes(scope.$index,scope.row.ID)">删除</el-button>
        </template>
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
    <!-- 弹出层开始 -->
    <el-dialog title="库存管理" :visible.sync="dialogTableVisible"
    width="25%">
      <div class="titleBox" style="overflow: hidden;padding:20px;">
        <div>
          <span class="titleText">货场</span>
          <el-input v-model="addYardName" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span class="titleText">货名</span>
          <el-input v-model="addGoodsName" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span class="titleText">数量</span>
          <el-input v-model="addStock" placeholder="请输入内容"></el-input>
        </div>
        <div style="text-align: center">
          <el-button type="warning" size="mini" @click="add">保存</el-button>

        </div>

      </div>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    methods: {
      update(index,val){
        this.type=2;
        console.log(val)
        this.updateBox=val;
        this.dialogTableVisible=true;
        this.addYardName=this.updateBox.YardName
        this.addGoodsName=this.updateBox.GoodsName,
        this.addStock=this.updateBox.Stock

      },
      deletes(index,val){
        this.$http //列表加载
          .post(this.url + "weight/goods/updateGoods",{
            status:0,
            id:val
          })
          .then(
            resp => {
              if(resp.state==1){
                this.$message({
                  message: '删除成功'
                });
                this.getList()
              }
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      clear(){
        this.addYardName=""
        this.addGoodsName=""
        this.addStock=""
      },
      // 新增
      addbtn(){
        this.clear()
        this.type=1;
        this.dialogTableVisible=true

      },
      // 保存
      add(){
        if(this.type==1){
          this.$http //列表加载
            .post(this.url + "weight/goods/addGoods",{
              yardName:this.addYardName,
              goodsName:this.addGoodsName,
              stock:this.addStock,
              goodsCode:"",
              yardCode:""
            })
            .then(
              resp => {
                if(resp.state==1){
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.dialogTableVisible=false
                  this.getList()
                  this.clear()
                }
              },
              response => {
                this.$message({
                  message: response.status + ",服务器繁忙请稍后再试！",
                  type: "error"
                });
              }
            );
        }else{
          this.$http //列表加载
            .post(this.url + "weight/goods/updateGoods ",{
              yardName:this.addYardName,
              goodsName:this.addGoodsName,
              stock:this.addStock,
              goodsCode:"",
              yardCode:"",
              id:this.updateBox.ID
            })
            .then(
              resp => {
                if(resp.state==1){
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.dialogTableVisible=false
                  this.getList()
                  this.clear()
                }
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
        updateBox:[],
        type:1,
        //弹出框初始化
        dialogTableVisible:false,
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
        yardCode:"",
        addYardName:"",
        addGoodsName:"",
        addStock:""






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
