<template>
  <div class="body">
    <router-link to="/join/join">
      <div class="clos">返回列表</div>
    </router-link>
    <div class="flex xiu" style="height: 800px;margin-top: 30px">
      <!--订单记录-->
      <div class="head" style="margin-top: 0px">
        <div class="Jfont">&nbsp;&nbsp;&nbsp;&nbsp;库存详情</div>
        <div class="flex" style="margin-top: 10px;">
          <div :class="['state','Mouse', 'flex',sum==true?'Xbj':'']" @click="Xsum()">
            <div class="state2">全部商品</div>
            <div class="state3">({{this.winState.all}})</div>
          </div>
          <div :class="['state','Mouse', 'flex',month==true?'Xbj':'']" style="margin-left: 0px" @click="Xmonth()">
            <div class="state2">酒类商品</div>
            <div class="state3">({{this.winState.yes}})</div>
          </div>
          <div :class="['state','Mouse', 'flex',day==true?'Xbj':'']" style="margin-left: 0px" @click="Xday()">
            <div class="state2">非酒类商品</div>
            <div class="state3">({{this.winState.no}})</div>
          </div>
        </div>
        <!--搜索-->
        <div class="flex whiteT bianju">
          <div class="font">商品编号：</div>
          <div class="input">
            <el-input v-model="goodsId" style="width: 180px" placeholder="输入商品编号"></el-input>
          </div>
          
          <div class="font" style="margin-left: 10%;">商品名称：</div>
          <div class="input">
            <el-input v-model="goodsName" style="width: 180px" placeholder="输入商品名称"></el-input>
          </div>
          
          <!--按钮-->
          <div class="btn" style="margin-left: 15%" @click="search()">
            <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
          </div>
          <div class="btn2" style="margin-left: 5px" @click="res()">
            <el-button class="btnbj" size="small" icon="el-icon-refresh">重置</el-button>
          </div>
        
        </div>
        <!--表格头-->
        <div class="head right bianju Mouse">
          <div class="head1" @click="exportFunc('joinList','加盟商列表')">导出表格</div>
        </div>
        <!--表格-->
        <div class="bianju" id="joinList">
          <el-table
            ref="multipleTable"
            :data="stockInfo"
            tooltip-effect="dark"
            style="width: 100%"
            border>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="55">
            </el-table-column>
            <el-table-column
              label="商品编号"
              align="center"
              sortable
              prop="goodsId"
              min-width="140">
            </el-table-column>
            <el-table-column
              prop="name"
              label="商品图片"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                <div><img :src="imggerUrl+scope.row.list_img" class="imgs"></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="goods_name"
              label="商品名称"
              align="center"
              min-width="192">
            </el-table-column>
            <el-table-column
              prop="goods_num"
              label="总实际库存"
              align="center"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="num"
              label="加盟商库存"
              sortable
              align="center"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="dealer_num"
              label="经销商库存"
              sortable
              align="center"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="update_time"
              label="更新时间"
              align="center"
              min-width="130">
            </el-table-column>
          </el-table>
          <div class="pag">
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
        <!--补货-->
        <div>
          <el-dialog
            title=""
            :visible.sync="centerDialogVisible"
            width="35%"
            center>
            <div class="xiu">
              <div class="edit" style="background-color: rgba(0, 153, 153, 1);">补货</div>
              <div class="flex">
                <div class="edit1" style="margin-left: 20%">补充数量：</div>
                <div class="edit2">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
              </div>
              <div class="flex">
                <div class="logBtn1" style="margin-left: 25%">
                  <el-button size="medium" class="buttons" style="background-color: rgba(0, 153, 153, 1);color: white;">
                    提交
                  </el-button>
                </div>
                <div class="logBtn2">
                  <el-button size="medium" class="buttons">取消</el-button>
                </div>
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        centerDialogVisible: false,
        input: '',
        value: '',
        //  库存信息
        stockInfo: [],
        //参数
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 20,
        goodsName: '',
        goodsId: '',
        winState: {},
        //背景选择
        sum: true,
        month: false,
        day: false,
        wines: '',
      }
    },
    methods: {
      //获取信息
      getStock() {
        var datas = {};
        this.getMessag(datas);
      },
      //获取信息
      getMessag(datas) {
        datas.page = this.page;
        datas.pageSize = this.pageSize;
        datas.warehouseId = sessionStorage.getItem('joinId');
        this._getData('/api/v1/alliance/getGoods', datas, data => {
          this.stockInfo = data.data;
          this.totals = data.total;
        })
      },
      add() {
        this.centerDialogVisible = true;
      },
      //获取统计
      getState() {
        this._getData('/api/v1/alliance/countStock', {
          id: sessionStorage.getItem('joinId')
        }, data => {
          this.winState = data;
        })
      },
      //  搜索
      search() {
        var data = {};
        if (this.goodsId != '') {
          data.goodsId = this.goodsId;
        }
        if (this.goodsName != '') {
          data.goodsName = this.goodsName;
        }
        this._getData('/api/v1/alliance/getGoods', {
          warehouseId: sessionStorage.getItem('joinId'),
          page: this.page,
          pageSize: this.pageSize,
          goodsId: data.goodsId,
          goodsName: data.goodsName
        }, data => {
          this.stockInfo = data.data;
          this.totals = data.total;
        })
      },
      //重置
      res() {
        this.goodsId = '';
        this.goodsName = '';
        this.getStock()
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.goodsId != '' || this.goodsName != '') {
          this.search();
        } else if (this.wines != '') {
          var datas = {wine: this.wines};
          this.getMessag(datas);
        } else {
          this.getStock()
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.goodsId != '' || this.goodsName != '') {
          this.search();
        } else if (this.wines != '') {
          var datas = {wine: this.wines};
          this.getMessag(datas);
        } else {
          this.getStock()
        }
      },
      //  选择背景
      Xsum() {
        this.wines = '';
        this.getStock();
        this.select(1);
      },
      Xmonth() {
        this.wines = '1';
        var datas = {wine: 1};
        this.getMessag(datas);
        this.select(2);
      },
      Xday() {
        this.wines = '2';
        var datas = {wine: 2};
        this.getMessag(datas);
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
      this.getStock();
      this.getState();
    }
  }
</script>

<style scoped>
  .clos {
    text-align: left;
    width: 130px;
    height: 30px;
    border: 1px solid black;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
    margin: 30px 0px 0px 0px;
  }
  
  .Jfont {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    line-height: 50px;
  }
  
  .bianju {
    width: 98%;
    margin-left: 10px
  }
</style>
