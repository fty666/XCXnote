<template>
  <div class="body">
    <router-link to="/warehouse/warehouseManage">
      <div class="clos" style="margin-left: 13px">返回列表</div>
    </router-link>
    <!--头部-->
    <div class="flex">
      <div :class="['state','Mouse', 'flex',sum==true?'Xbj':'']" @click="Xsum()">
        <div class="state2">全部商品</div>
        <!--<div class="state3">(1000)</div>-->
      </div>
      <div :class="['state','Mouse', 'flex',month==true?'Xbj':'']" style="margin-left: 0px" @click="Xmonth()">
        <div class="state2">酒类商品</div>
      </div>
      <div :class="['state','Mouse', 'flex',day==true?'Xbj':'']" style="margin-left: 0px" @click="Xday()">
        <div class="state2">非酒类商品</div>
      </div>
    </div>
    <!--搜索-->
    <div class="search flex">
      <!--编号-->
      <div class="flex">
        <div class="search1">商品编号:</div>
        <div class="search2">
          <el-input v-model="goodsId" size="small" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <!--名称-->
      <div class="flex">
        <div class="search1">商品名称:</div>
        <div class="search2">
          <el-input v-model="goodsName" size="small" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <!--按钮-->
      <div class="right flex">
        <div class="btn2" @click="res()">
          <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="btn" @click="search()">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </div>
    </div>
    <!--表格-->
    <div>
      <div class="right tou">
        <div class="tou1 Mouse" @click="batch()">批量删除</div>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="inventoryList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border>
          <el-table-column
            type="selection"
            align="center"
            width="62">
          </el-table-column>
          <el-table-column
            label="商品编号"
            prop="goodsId"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品图片"
            align="center"
            min-width="180">
            <template slot-scope="scope">
              <img :src="imggerUrl+scope.row.list_img" class="imgs">
            </template>
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            align="center"
            min-width="280"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="num"
            label="库存"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="update_time"
            label="更新时间"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            label="库存操作"
            align="center"
            min-width="100"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="color: #0099ce;" class="Mouse" @click="edit(scope.row)">修改</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pags">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total=totals>
          </el-pagination>
        </div>
      </div>
    </div>
    <!--修改-->
    <div>
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        width="34%"
        center>
        <div class="xiu" style="height: 250px">
          <div class="edit">修改库存</div>
          <div class="addFont">商品名称：</div>
          
          <el-table
            ref="multipleTable"
            :data="editList"
            tooltip-effect="dark"
            style="width: 53.5%;margin: 0px 0px 0px 20%"
            border>
            <el-table-column
              align="center"
              prop="num"
              label="现有库存"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="修改为"
              align="center"
              min-width="100"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="editNum" size="small"></el-input>
              </template>
            </el-table-column>
          </el-table>
          
          <div class="flex">
            <div class="logBtn1" style="margin: 30px 0px 0px 20%" @click="submit()">
              <el-button size="medium" type="primary" class="buttons">提交</el-button>
            </div>
            <div class="logBtn2" style="margin: 30px 0px 0px 20px" @click="esc()">
              <el-button size="medium" class="buttons">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goodsId: '',
        goodsName: '',
        inventoryList: [],
        multipleSelection: '',
        centerDialogVisible: false,
        //页码参数
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 20,
        editList: [],
        editNum: '',
        //背景选择
        sum: true,
        month: false,
        day: false,
        wine: ''
      };
    },
    methods: {
      //获取库存
      getInventory() {
        var datas = {};
        this.getInfo(datas);
      },
      getInfo(datas) {
        var inventory = sessionStorage.getItem('inventory');
        datas.warehouseId = inventory,
          datas.page = this.page,
          datas.pageSize = this.pageSize
        this._getData('/api/v1/warehouse_goods/goods', datas, data => {
          this.inventoryList = data.data;
          this.totals = data.total;
        })
      },
      //修改
      edit(val) {
        this.editList[0] = val;
        this.centerDialogVisible = true;
      },
      submit() {
        console.log(this.editList)
        this.$confirm('是否修改此库存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/warehouse_goods/editNum', {
              warehouse_goods_id: this.editList[0].id,
              warehouse_goods_num: this.editNum,
              goods_id: this.editList[0].goodsId,
              warehouse_goods_stock: this.editList[0].num,
              operator: sessionStorage.getItem('userID')
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getInventory();
              this.centerDialogVisible = false;
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      esc() {
        this.centerDialogVisible = false;
      },
      handleSelectionChange(val) {
        console.log(val)
        for (var i = 0; i < val.length; i++) {
          this.multipleSelection += val[i].id + ',';
        }
      },
      batch() {
        this.$confirm('是否删除这些商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/warehouse/batchDelete', {
              ids: this.multipleSelection,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getInventory();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //搜索
      search() {
        var datas = {};
        if (this.goodsId != '') {
          datas.goodsId = this.goodsId;
        }
        if (this.goodsName != '') {
          data.goodsName = this.goodsName;
        }
        this.getInfo(datas);
      },
      res() {
        this.goodsId = '';
        this.goodsName = '';
        this.getInventory();
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.goodsName != '' || this.goodsId != '') {
          this.submit();
        } else {
          this.getInventory();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.goodsName != '' || this.goodsId != '') {
          this.submit();
        } else {
          this.getInventory();
        }
      },
      //  选择背景
      Xsum() {
        this.select(1);
      },
      Xmonth() {
        this.select(2);
      },
      Xday() {
        this.select(3);
      },
      select(flag) {
        this.sum = false;
        this.month = false;
        this.day = false;
        this.bshop = false;
        switch (flag) {
          case 1:
            this.sum = true;
            break;
          case 2:
            this.month = true;
            break;
          case 3:
            this.day = true;
            break;
          case 4:
            this.bshop = true;
            break;
        }
      }
    },
    created() {
      this.getInventory();
    }
  }
</script>

<style scoped>
  /*搜索*/
  .search {
    width: 95%;
    height: 60px;
    margin-left: 10px;
    margin-top: 30px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .search1 {
    font-size: 15px;
    margin-left: 15px;
    line-height: 65px;
    /*color: #ddd;*/
    margin-left: 20px;
  }
  
  .search2 {
    height: 30px;
    width: 150px;
    margin-left: 50px;
    padding-top: 15px;
  }
  
  .btn {
    width: 100px;
    height: 40px;
    margin-left: 10px;
    padding-top: 11px;
  }
  
  .btn2 {
    width: 100px;
    height: 40px;
    margin-left: 10px;
    padding-top: 11px;
  }
  
  /*表格*/
  .tou {
    background-color: #ddd;
    width: 100%;
    height: 60px;
    margin-top: 30px;
  }
  
  .tou1 {
    width: 90px;
    height: 30px;
    border: 1px solid black;
    text-align: center;
    background-color: white;
    margin-top: 15px;
    margin-right: 10px;
    line-height: 30px;
  }
  
  /*表格*/
  .tables1 {
    width: 100px;
    height: 30px;
    color: black;
    border: 1px solid #333;
    margin: 20px 0px 0px 80px;
    line-height: 30px;
    text-align: center;
  }
  
  .tables2 {
    width: 150px;
    height: 30px;
    color: black;
    border: 1px solid #333;
    margin: 20px 0px 0px 0px;
    line-height: 30px;
    text-align: center;
  }
</style>
