<template>
  <div class="body">
    <!--头部样式-->
    <div class="spaces head">
      <div class="Fheads">&nbsp;&nbsp;&nbsp;&nbsp;首页橱窗商品位管理</div>
      <div v-if="six==true" @click="add()">
        <el-button style="margin: 6px 50px 0px 0px">添加橱窗</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="bian">
      <div class="Wtable">
        <el-table
          :data="showCase"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="橱窗位"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="id"
            label="商品编号"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            min-width="180"
            label="商品图片">
            <template slot-scope="scope">
              <div>
                <img :src="imggerUrl+scope.row.list_img" class="imgs">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="goods_name"
            align="center"
            min-width="252"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            min-width="100"
            label="操作">
            <template slot-scope="scope">
              <div style="color: #0099ce;" @click="del(scope.row.id)">取消橱窗位</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
    <!--修改-->
    <div>
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        width="45%"
        center>
        <div class="xiu" style="height: auto">
          <div class="edit" style="background-color: rgba(0, 153, 153, 1)">选择商品</div>
          <!--搜索-->
          <div class="flex">
            <div class="flex">
              <div class="edit1" style="margin:25px 0px 0px 15px">商品ID：</div>
              <div class="edit2" style="margin: 18px 0px 0px 0px">
                <el-input v-model="id" size="small" style="width: 120px"></el-input>
              </div>
            </div>
            <div class="flex">
              <div class="edit1" style="margin:25px 0px 0px 15px">商品名称：</div>
              <div class="edit2" style="margin: 18px 0px 0px 0px">
                <el-input v-model="goodsName" size="small" style="width: 150px"></el-input>
              </div>
            </div>
            <div @click="search()">
              <el-button size="mini" class="el-icon-search" type="primary" style="margin:18px 0px 0px 10px;width: 70px">
                搜索
              </el-button>
            </div>
            <div @click="res()">
              <el-button size="mini" class="el-icon-refresh" style="margin:18px 0px 0px 10px;width: 70px">
                重置
              </el-button>
            </div>
          </div>
          <!--表格-->
          <div style="margin: 30px 0px 0px 20px">
            <el-table
              ref="multipleTable"
              :data="commonShop"
              tooltip-effect="dark"
              border
              style="width: 95%">
              <el-table-column
                type="selection"
                width="55">
                <template slot-scope="scope">
                  <el-radio v-model="goodsId" :label="scope.row.id"></el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="id"
                label="编号"
                align="center"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                align="center"
                label="商品名称"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="goods_img"
                align="center"
                label="商品图片"
                min-width="150">
                <template slot-scope="scope">
                  <img :src="imggerUrl+scope.row.list_img" class="imgs">
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
          <!--按钮-->
          <div class="flex">
            <div class="logBtn1" style="margin: 40px 0px 40px 200px" @click="submit()">
              <el-button type="primary" style="width: 100px">提交</el-button>
            </div>
            <div class="logBtn2" style="margin: 40px 0px 40px 20px" @click="cancel()">
              <el-button style="width: 100px">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  
  </div>

</template>

<script>
  export default {
    name: "",
    data() {
      return {
        //页码参数
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 10,
        centerDialogVisible: false,
        multipleSelection: [],
        commonShop: [],
        showCase: [],
        goodsId: '',
        six: false,
        id: '',
        goodsName: ''
      }
    },
    methods: {
      //获取列表
      getOrder() {
        this._getData('/api/v1/goods/index', {
          // page: this.page,
          // pageSize: this.pageSize,
          sort: 1
        }, data => {
          console.log(data);
          this.showCase = data.data;
          if (data.total < 6) {
            this.six = true;
          }
        })
      },
      getCommon() {
        this._getData('/api/v1/goods/index', {
          sort: 0
        }, data => {
          console.log(data);
          this.commonShop = data.data;
          this.totals = data.total;
        })
      },
      add() {
        this.getCommon();
        this.centerDialogVisible = true;
      },
      submit() {
        this.$confirm('是否添加此商品橱窗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/goods/edit', {
            id: this.goodsId,
            sort: 1
          }, data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.getOrder();
            this.centerDialogVisible = false;
            this.$router.push({name: 'shopManage'})
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      search() {
        var datas = {};
        if (this.id != '') {
          datas.id = this.id;
        }
        if (this.goodsName != '') {
          datas.goods_name = this.goodsName;
        }
        datas.sort = 0;
        this._getData('/api/v1/goods/index', datas, data => {
          this.commonShop = data.data;
          this.totals = data.total;
        })
      },
      cancel() {
        this.centerDialogVisible = false;
      },
      res() {
        this.id = '';
        this.goodsName = '';
        this.getCommon();
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.id != '' || this.goodsName != '') {
          this.getCommon();
        } else {
          this.getOrder();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.id != '' || this.goodsName != '') {
          this.getCommon();
        } else {
          this.getOrder();
        }
      },
      //  取消橱窗位
      del(val) {
        this.$confirm('是否取消此商品橱窗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/goods/edit', {
            id: val,
            sort: 0
          }, data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.getOrder();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    created() {
      this.getOrder()
    }
  }
</script>

<style scoped>
  .bian {
    /*height: 500px;*/
    width: 99.90%;
    /*border: 1px solid #ddd;*/
  }
  
  .Fheads {
    text-align: left;
    font-weight: 700;
    font-size: 16px;
    line-height: 50px;
    width: 80%;
  }
  
  /*.Wtable {*/
  /*width: 70%;*/
  /*margin-left: 200px;*/
  /*margin-top: 20px;*/
  /*}*/
</style>
