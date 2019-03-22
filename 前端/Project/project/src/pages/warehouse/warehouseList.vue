<template>
  <div class="body">
    <div>
      <state></state>
    </div>
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">商品编号：</div>
      <div class="input">
        <el-input v-model="id" placeholder="输入商品编号"></el-input>
      </div>
      
      <div class="font">商品名称：</div>
      <div class="input">
        <el-input v-model="goods_name" placeholder="输入商品名称"></el-input>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 40%" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1">导出数据</div>
      <div class="head1">排列方式</div>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="wareList"
        tooltip-effect="dark"
        style="width: 100%"
        border>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="商品编号"
          min-width="120"
          align="center">
        </el-table-column>
        <el-table-column
          label="商品图片"
          align="center"
          min-width="150">
          <template slot-scope="scope">
            <div>
              <img :src="imggerUrl+scope.row.list_img" class="imgs">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          align="center"
          min-width="187"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="num"
          label="总实际库存"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="pingtaiStock"
          label="平台总库存"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="allianceStock"
          label="加盟商总库存"
          align="center"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <div style="color: #0099ce;padding-left: 18px" @click="look(scope.row)">查看</div>
              <div style="color: #0099ce;padding-left: 10px" @click="eidt(scope.row)">修改</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pag">
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
    <!--查看-->
    <div>
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        width="40%"
        center>
        <div class="xiu" style="height: auto">
          <div class="edit" style="background-color: rgba(26, 188, 156, 1);">回购规则设置</div>
          <div>
            <template>
              <el-table
                :data="lookWare"
                border
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="平台"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="仓库名"
                  align="center"
                  min-width="180">
                </el-table-column>
                <el-table-column
                  prop="warehouse_goods_stock"
                  align="center"
                  min-width="150"
                  label="库存数量">
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div style="margin-top: 10px;">
            <template>
              <el-table
                :data="lookWare"
                border
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="加盟商"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="allianceId"
                  label="仓库名"
                  align="center"
                  min-width="180">
                </el-table-column>
                <el-table-column
                  prop="allianceStock"
                  align="center"
                  min-width="150"
                  label="库存数量">
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div class="logBtn1" style="margin-bottom: 20px;margin-left: 40%;margin-top: 30px">
            <el-button style="width: 125px" @click="returns()">返回</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <!--修改-->
    <div>
      <el-dialog
        title=""
        :visible.sync="editshop"
        width="40%"
        center>
        <div class="xiu" style="height: auto">
          <div class="edit" style="background-color: rgba(26, 188, 156, 1);">回购规则设置</div>
          <div style="margin: 20px 0px 10px 20px;">商品名称：{{this.lookWare.goods_name}}</div>
          <div>
            <template>
              <el-table
                :data="lookWare.warehouse_goods"
                border
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="仓库名"
                  align="center"
                  min-width="86">
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="地址"
                  min-width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="warehouse_goods_stock"
                  label="现有库存"
                  align="center"
                  min-width="100">
                </el-table-column>
                <el-table-column
                  label="修改为"
                  align="center"
                  min-width="120">
                  <template slot-scope="scope">
                    <div>
                      <el-input v-model="scope.row.editNum" @blur="editInfo(scope.row)" size="small"></el-input>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div class="flex" style="margin: 0px 0px 30px 20px ;">
            <div class="logBtn2" @click="editEsc()">
              <el-button size="medium" style="width: 100px;margin-left: 130px;">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import state from '@/components/wineStat'
  
  export default {
    name: "",
    data() {
      return {
        //页码参数
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 10,
        //查看
        centerDialogVisible: false,
        //修改
        editshop: false,
        wareList: [],
        lookWare: [],
        //搜索
        id: '',
        goods_name: '',
      }
    },
    components: {
      state
    },
    methods: {
      //查看仓库
      getWare() {
        this._getData('/api/v1/goods/warehouse', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          this.wareList = data.data;
          this.totals = data.total;
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.getWare();
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getWare();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getWare();
      },
      //搜索
      search() {
        var data = {};
        if (this.id != '') {
          data.id = this.id;
        }
        if (this.goods_name != '') {
          data.goods_name = this.goods_name;
        }
        this._getData('/api/v1/goods/warehouse', {
          page: this.page,
          pageSize: this.pageSize,
          id: data.id,
          goods_name: data.goods_name
        }, data => {
          this.wareList = data.data;
          this.totals = data.total;
        })
      },
      //重置
      res() {
        this.id = '';
        this.goods_name = '';
        this.getWare();
      },
      //修改
      editInfo(val) {
        console.log(val)
        this.$confirm('是否修改此库存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/warehouse_goods/editNum', {
            warehouse_goods_id: val.id,
            warehouse_goods_num: val.editNum,
            goodsId: val.goodsId,
            warehouse_goods_stock:val.warehouse_goods_stock,
            operator:''
          }, data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.getWare();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //取消修改
      editEsc() {
        this.editshop = false;
      },
      //  查看标签
      look(val) {
        this.lookWare = val.warehouse_goods;
        this.centerDialogVisible = true;
      },
      //返回
      returns() {
        this.centerDialogVisible = false;
      },
      eidt(val) {
        this.lookWare = val;
        this.editshop = true;
      },
    },
    created() {
      this.getWare();
    }
  }
</script>

<style scoped>
</style>
