<template>
  <div class="body">
    <router-link to="/warehouse/warehouseManage">
      <div class="clos Mouse">返回列表</div>
    </router-link>
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div :class="['state','Mouse', 'flex',sum==true?'Xbj':'']" @click="Xsum()">
        <div class="state2">全部商品</div>
        <!--<div class="state3" style="color: white">(1000)</div>-->
      </div>
      <div :class="['state','Mouse', 'flex',month==true?'Xbj':'']" style="margin-left: 0px" @click="Xmonth()">
        <div class="state2">酒类商品</div>
      </div>
      <div :class="['state','Mouse', 'flex',day==true?'Xbj':'']" style="margin-left: 0px" @click="Xday()">
        <div class="state2">非酒类商品</div>
      </div>
    </div>
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">商品编号：</div>
      <div class="input">
        <el-input v-model="goods_id" placeholder="输入商品编号"></el-input>
      </div>
      
      <div class="font">操作类型：</div>
      <div class="input">
        <el-select v-model="type" placeholder="操作类型">
          <el-option label="用户下单" value="1"></el-option>
          <el-option label="编辑库存" value="2"></el-option>
        </el-select>
      </div>
      
      <div class="font">操作时间：</div>
      <div class="input">
        <el-date-picker
          v-model="stimes"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 20%" @click="submit()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1 Mouse" @click="exportFunc('ruBank','入库管理清单')">导出数据</div>
      <div class="head1 Mouse" @click="batch()">批量删除</div>
    </div>
    <div id="ruBank">
      <el-table
        ref="multipleTable"
        :data="runList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
          align="center"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          label="商品编号"
          min-width="100"
          prop="goods_id"
          align="center">
        </el-table-column>
        <el-table-column
          label="商品图片"
          align="center"
          min-width="120">
          <template slot-scope="scope">
            <img :src="imggerUrl+scope.row.list_img" class="imgs">
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_name"
          align="center"
          label="商品名称"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="order_code"
          align="center"
          label="订单号"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="stock"
          align="center"
          label="库存信息"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          label="操作类型"
          min-width="100">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作信息"
          min-width="200">
          <template slot-scope="scope">
            <div>{{scope.row.account}}</div>
            <div>{{scope.row.create_time}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total=totals>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        goods_id: '',
        stimes: '',
        type: '',
        //页码参数
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 20,
        multipleSelection: '',
        runList: [],
        //背景选择
        sum: true,
        month: false,
        day: false,
        Wine: ''
      }
    },
    methods: {
      //入库管理
      getRun() {
        var datas = {};
        this.runInfo(datas);
      },
      runInfo(datas) {
        datas.warehouse_id = sessionStorage.getItem('wareId')
        datas.page = this.page;
        datas.pageSize = this.pageSize;
        this._getData('/api/v1/put_warehouse/index', datas,
          data => {
            this.runList = data.data;
            this.totals = data.total;
          })
      },
      handleSelectionChange(val) {
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
              this.getRun();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //搜索
      submit() {
        var datas = {};
        if (this.goods_id != '') {
          datas.goods_id = this.goods_id;
        }
        if (this.type != '') {
          datas.type = this.type;
        }
        if (this.stimes != '') {
          datas.start_time = this.stimes[0];
          datas.end_time = this.stimes[1];
        }
        this.runInfo(datas);
      },
      res() {
        this.goods_id = '';
        this.type = '';
        this.stimes = '';
        this.getRun();
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.goods_id != '' || this.type != '' || this.stimes != '') {
          this.submit();
        } else if (this.Wine != '') {
          var datas = {wine: this.Wine};
          this.runInfo(datas)
        } else {
          this.getRun();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.goods_id != '' || this.type != '' || this.stimes != '') {
          this.submit();
        } else if (this.Wine != '') {
          var datas = {wine: this.Wine};
          this.runInfo(datas)
        } else {
          this.getRun();
        }
      },
      //  查看退款信息
      look() {
        this.$router.push({name: 'RefundInfo'})
      },
      //  选择背景
      Xsum() {
        this.getRun();
        this.Wine = '';
        this.select(1);
      },
      Xmonth() {
        var datas = {wine: 1};
        this.Wine = 1;
        this.runInfo(datas);
        this.select(2);
      },
      Xday() {
        var datas = {wine: 2};
        this.Wine = 2;
        this.runInfo(datas);
        this.select(3);
      },
      select(flag) {
        this.sum = false;
        this.month = false;
        this.day = false;
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
        }
      }
    },
    created() {
      this.getRun();
    }
  }
</script>

<style scoped>
</style>
