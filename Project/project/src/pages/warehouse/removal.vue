<template>
  <div class="body">
    <router-link to="/warehouse/warehouseManage">
      <div class="clos">返回列表</div>
    </router-link>
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div class="state flex" style="background-color:rgba(0, 153, 153, 1);">
        <div class="state2" style="color: white">全部商品</div>
        <div class="state3" style="color: white">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">酒类商品</div>
        <div class="state3">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">非酒类商品</div>
        <div class="state3">(1000)</div>
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
        <el-input v-model="type" placeholder="输入操作类型"></el-input>
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
      <div class="head1">导出数据</div>
      <!--<div class="head1" @click="batch()">批量删除</div>-->
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="runList"
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
        runList: []
      }
    },
    methods: {
      //入库管理
      getRun() {
        var datas = {};
        this.runInfo(datas);
      },
      runInfo(datas) {
        datas.page = this.page;
        datas.pageSize = this.pageSize;
        this._getData('/api/v1/delivery_warehouse/index', datas,
          data => {
            console.log(data)
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
          datas.start_time = this.setimes[0];
          datas.end_time = this.setimes[1];
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
        this.getService();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getService();
      },
      //  查看退款信息
      look() {
        this.$router.push({name: 'RefundInfo'})
      }
    },
    created() {
      this.getRun();
    }
  }
</script>

<style scoped>
</style>
