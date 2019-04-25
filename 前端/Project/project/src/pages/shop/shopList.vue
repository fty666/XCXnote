<template>
  <div class="body">
    <!--头部-->
    <div class="flex" style="margin-top: 60px;">
      <div :class="['state','Mouse', 'flex',sum==true?'Xbj':'']" @click="Xsum()">
        <div class="state2 ">全部</div>
        <div class="state3">({{this.stateList.allCount}})</div>
      </div>
      <div :class="['state','Mouse', 'flex',month==true?'Xbj':'']" style="margin-left: 0px" @click="Xmonth()">
        <div class="state2">已上架</div>
        <div class="state3">({{this.stateList.goodsUp}})</div>
      </div>
      <div :class="['state', 'Mouse','flex',day==true?'Xbj':'']" style="margin-left: 0px" @click="Xday()">
        <div class="state2">已下架</div>
        <div class="state3">({{this.stateList.goodsDown}})</div>
      </div>
      <div :class="['state', 'Mouse','flex',bshop==true?'Xbj':'']" style="margin-left: 0px" @click="Xshop()">
        <div class="state2">经销商酒</div>
        <div class="state3">({{this.stateList.dealer}})</div>
      </div>
    </div>
    <div class="search flex">
      <!--编号-->
      <div class="flex">
        <div class="search1">编号:</div>
        <div class="search2">
          <el-input v-model="bid" size="small" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <!--名称-->
      <div class="flex">
        <div class="search1">名称:</div>
        <div class="search2">
          <el-input v-model="goods_name" size="small" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <!--商品分类-->
      <div class="flex">
        <div class="search1">商品分类:</div>
        <div class="search2">
          <el-select v-model="id" size="small" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--按钮-->
      <div class="right flex" style="margin-left: 6%">
        <div class="btn2">
          <el-button class="buttons3" icon="el-icon-refresh" @click="rest()">重置</el-button>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        </div>
      </div>
    </div>
    <!--表格-->
    <div>
      <div class="right tou Mouse">
        <div class="tou1" @click="batch()">批量删除</div>
      </div>
      <el-table
        ref="multipleTable"
        :data="shopList"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          min-width="55">
        </el-table-column>
        <el-table-column
          label="商品编号"
          prop="id"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="goods_img"
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
          label="商品名称"
          align="center"
          prop="goods_name"
          min-width="120">
        </el-table-column>
        <el-table-column
          label="价格"
          align="center"
          min-width="120">
          <template slot-scope="scope">
            <div>市场价：{{scope.row.original_price}}</div>
            <div>会员价：{{scope.row.member_price}}</div>
            <div>经销商价：{{scope.row.trade_price}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="可获取积分"
          align="center"
          prop="integral"
          min-width="100">
        </el-table-column>
        <el-table-column
          label="销量"
          align="center"
          prop="order_detail_sum"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="库存数量"
          align="center"
          prop="num"
          min-width="60">
        </el-table-column>
        <el-table-column
          label="前台销量"
          align="center"
          prop="salesVolume"
          min-width="60">
        </el-table-column>
        <el-table-column
          label="上架数量"
          align="center"
          min-width="120">
          <template slot-scope="scope">
            <div style="margin-bottom: 20px">数量：{{scope.row.num}}</div>
            <div>
              修改：
              <el-input @blur="modify(scope.row)" v-model="scope.row.input" style="width: 90px" size="small"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="100"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="sequence">
              <div style="color: #0099ce;padding-left: 10px" class="Mouse" @click="stand(scope.row)">
                <div v-if="scope.row.status=='下架'">上架</div>
                <div v-else>下架</div>
              </div>
              <div style="color: #0099ce;padding-left: 8px" class="Mouse" @click="look(scope.row.id)">查看</div>
              <div style="color: #0099ce;padding-left: 10px" class="Mouse" @click="modifyShop(scope.row)">修改</div>
              <div style="color: #0099ce;padding-left: 8px" class="Mouse" @click="del(scope.row.id)">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pag">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-sizes="[20, 50, 100]"
          layout="total, prev, pager, next"
          :total=totals>
        </el-pagination>
      </div>
    </div>
    <!-- 修改商品弹窗 -->
    <el-dialog
      title="修改商品"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <XiuGai @gets="getShop" @closY="closes" @HXsum="Xsum" :goods="xShop" :dialogVisible="dialogVisible"></XiuGai>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      </span>
    </el-dialog>
    <!-- 修改商品弹窗 结束 -->
  </div>
</template>

<script>
  import XiuGai from '@/components/xiugai'
  
  export default {
    components: {
      XiuGai
    },
    data() {
      return {
        xShop: {},                    // 要修改的商品详情
        dialogVisible: false,        // 修改商品弹窗
        options: [],
        multipleSelection: [],
        shopList: [],     //商品列表
        page: 1,
        pageSize: 10,
        bid: '',
        goods_name: '',
        id: '',
        totals: 10,
        stateList: [],  //统计参数
        //背景选择
        sum: true,
        month: false,
        day: false,
        bshop: false,
        Status:'',
        isDeal:''
      };
    },
    methods: {
      // 弹窗关闭前回调
      handleClose() {
        this.dialogVisible = false;
      },
      // 修改商品
      modifyShop(row) {
        this.xShop = row;
        this.dialogVisible = true;
      },
      //多选删除
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //  查看商品详情
      look(val) {
        sessionStorage.setItem('ids', val);
        this.$router.push({name: 'shopInfo'})
      },
      //  查看商品列表
      getShop() {
        this._getData('/api/v1/goods/index', {page: this.page, pageSize: this.pageSize}, data => {
          this.shopList = data.data;
          this.totals = data.total;
          this.getState();
        })
      },
      //  上下架
      stand(val) {
        var ti = '';
        if (val.status == '下架') {
          ti = '上架'
        } else {
          ti = '下架'
        }
        if (ti == '上架') {
          this.$confirm('是否' + ti + '此商品?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._getData('/api/v1/goods/goodsUp', {
                id: val.id,
              },
              data => {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                if(this.Status!=''){
                  let datas = {
                    page: this.page,
                    pageSize: this.pageSize,
                    status: 1
                  }
                  this.condition(datas);
                }else{
                  this.getShop();
                }
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        } else {
          this.$confirm('是否' + ti + '此商品?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._getData('/api/v1/goods/goodsDown', {
                id: val.id,
              },
              data => {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                this.getShop();
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      },
      //  删除
      del(val) {
        this.$confirm('是否删除此商品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/goods/delete', {id: val}, data => {
            this.$message({
              type: "success",
              message: '操作成功'
            })
            this.getShop();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //  获取商品分类
      gclass() {
        this._getData('/api/v1/goods_group/index', {}, data => {
          var all={
            id:'',
            name:'全部分类'
          };
          data.push(all);
          this.options = data;
        })
      },
      //  搜索
      search() {
        var data = {};
        this.page=1;
        if (this.id != '') {
          data.goods_groupId = this.id;
        };
        if (this.goods_name != '') {
          data.goods_name = this.goods_name;
        };
        if (this.bid != '') {
          data.id = this.bid;
        }
        data.page =this.page;
        data.pageSize = this.pageSize;
        this._getData('/api/v1/goods/index', {
          page: data.page,
          pageSize: data.pageSize,
          goods_groupId: data.goods_groupId,
          goods_name: data.goods_name,
          id: data.id
        }, data => {
          this.shopList = data.data;
          this.totals = data.total;
        })
      },
      //  重置
      rest() {
        this.id = "";
        this.goods_groupId = "";
        this.goods_name = "";
        this.bid = '';
        this.page=1;
        this.getShop();
      },
      //关闭修改页面
      closes() {
        this.dialogVisible = false;
      },
      //批量删除
      batch() {
        var ids = '';
        var len = this.multipleSelection.length;
        if (len==0) {
          this.$message({
            type: 'info',
            message: '请勾选要删除的数据'
          });
          return false;
        } else {
          for (var i = 0; i < len; i++) {
            ids = ids + this.multipleSelection[i].id + ',';
          }
          this.$confirm('是否删除这些商品', '提示', {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: 'warning'
          }).then(() => {
            this._getData('/api/v1/goods/batchDelete', {ids: ids}, data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getShop();
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      },
      //获取统计
      getState() {
        this._getData('/api/v1/goods/goodsUpDownStatistics', {}, data => {
          this.stateList = data;
        })
      },
      //修改上架
      modify(val) {
        var editNum = '';
        if (val.input != '') {
          if (isNaN(val.input)) {
            this.$message({
              type: 'info',
              message: '修改失败，请输入正确数字'
            })
            return false;
          }
          editNum = val.input;
        } else {
          editNum = val.num;
        }
        this.$confirm('是否修改上架数量?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/goods/editNum', {
              id: val.id,
              num: editNum
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this._getData('/api/v1/goods/index', {page: this.page, pageSize: this.pageSize}, data => {
                this.shopList = data.data;
                this.totals = data.total;
                this.getState();
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //编辑
      edit(val) {
        this.$router.push({name: 'addShop'})
      },
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.id != '' || this.goods_name != '' || this.bid != '') {
          this.search()
        }else if(this.Status!=''){
          let datas = {
            page: this.page,
            pageSize: this.pageSize,
            status: this.Status
          };
          this.condition(datas);
        }else if(this.isDeal!=''){
          let datas = {
            page: this.page,
            pageSize: this.pageSize,
            is_dealer: this.isDeal
          };
          this.condition(datas);
        } else {
          this.getShop();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.id != '' || this.goods_name != '' || this.bid != '') {
          var data = {};
          if (this.id != '') {
            data.goods_groupId = this.id;
          };
          if (this.goods_name != '') {
            data.goods_name = this.goods_name;
          };
          if (this.bid != '') {
            data.id = this.bid;
          }
          data.page =this.page;
          data.pageSize = this.pageSize;
          this._getData('/api/v1/goods/index', {
            page: data.page,
            pageSize: data.pageSize,
            goods_groupId: data.goods_groupId,
            goods_name: data.goods_name,
            id: data.id
          }, data => {
            this.shopList = data.data;
            this.totals = data.total;
          })
        }else if(this.Status!=''){
          let datas = {
            page: this.page,
            pageSize: this.pageSize,
            status: this.Status
          };
          this.condition(datas);
        }else if(this.isDeal!=''){
          let datas = {
            page: this.page,
            pageSize: this.pageSize,
            is_dealer: this.isDeal
          };
          this.condition(datas);
        } else {
          this.getShop();
        }
      },
      //  选择全部
      Xsum() {
        this.select(1);
        this.isDeal='';
        this.Status='';
        this.getShop();
      },
      Xmonth() {
        let datas = {
          page: this.page,
          pageSize: this.pageSize,
          status: 2
        };
        this.Status=2;
        this.condition(datas);
        this.select(2);
      },
      Xday() {
        let datas = {
          page: this.page,
          pageSize: this.pageSize,
          status: 1
        }
        this.Status=1;
        this.condition(datas);
        this.select(3);
      },
      Xshop() {
        let datas = {
          page: this.page,
          pageSize: this.pageSize,
          is_dealer: 1
        };
        this.Status='';
        this.isDeal=1;
        this.condition(datas);
        this.select(4);
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
      },
      //  按条件搜索
      condition(datas) {
        this._getData('/api/v1/goods/index', datas, data => {
          this.shopList = data.data;
          this.totals = data.total;
          this.getState();
        })
      }
    },
    created() {
      this.getShop();
      this.gclass();
      this.getState()
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
    margin-left: 20px;
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
 
</style>
