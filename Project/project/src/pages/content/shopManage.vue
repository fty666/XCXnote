<template>
  <div class="body">
    <!--头部样式-->
    <div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;首页橱窗商品位管理</div>
    <!--表格-->
    <div class="bian">
      <div class="Wtable">
        <el-table
          :data="tableData"
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
                <img :src="imggerUrl+scope.row.list_img"  class="imgs">
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
              <div style="color: #0099ce;" @click="edit(scope.row.id)">修改</div>
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
        width="35%"
        center>
        <div class="xiu" style="height: auto">
          <div class="edit" style="background-color: rgba(0, 153, 153, 1)">选择商品</div>
          <!--搜索-->
          <div class="flex">
            <div class="flex">
              <div class="edit1" style="margin:25px 0px 0px 55px">商品ID：</div>
              <div class="edit2" style="margin: 18px 0px 0px 0px">
                <el-input v-model="input" size="small" style="width: 120px"></el-input>
              </div>
            </div>
            <div class="flex">
              <div class="edit1" style="margin:25px 0px 0px 15px">商品名称：</div>
              <div class="edit2" style="margin: 18px 0px 0px 0px">
                <el-input v-model="input" size="small" style="width: 150px"></el-input>
              </div>
            </div>
            <div>
              <el-button size="mini" class="el-icon-search" type="primary" style="margin:18px 0px 0px 20px;width: 80px">
                搜索
              </el-button>
            </div>
          </div>
          <!--表格-->
          <div style="margin: 30px 0px 0px 20px">
            <el-table
              ref="multipleTable"
              :data="tableData1"
              tooltip-effect="dark"
              border
              style="width: 95%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="日期"
                align="center"
                min-width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
          <!--按钮-->
          <div class="flex">
            <div class="logBtn1" style="margin: 40px 0px 40px 200px">
              <el-button type="primary" style="width: 100px">提交</el-button>
            </div>
            <div class="logBtn2" style="margin: 40px 0px 40px 20px">
              <el-button style="width: 100px">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
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
    <!--猜你喜欢-->
    <!--头部样式-->
    <!--<div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;猜你喜欢管理</div>-->
    <!--&lt;!&ndash;表格&ndash;&gt;-->
    <!--<div class="bian">-->
    <!--<div class="Wtable">-->
    <!--<el-table-->
    <!--:data="tableData2"-->
    <!--border-->
    <!--style="width: 100%">-->
    <!--<el-table-column-->
    <!--prop="date"-->
    <!--label="日期"-->
    <!--width="180">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="name"-->
    <!--label="姓名"-->
    <!--width="180">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="address"-->
    <!--label="地址">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="address"-->
    <!--align="center"-->
    <!--width="200"-->
    <!--label="操作">-->
    <!--<template slot-scope="scope">-->
    <!--<div class="flex">-->
    <!--<div style="color: #0099ce;padding-left: 80px" @click="edit(scope.row.id)">修改</div>-->
    <!--</div>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->
    <!--</div>-->
    <!--修改-->
    <!--<div>-->
    <!--<el-dialog-->
    <!--title=""-->
    <!--:visible.sync="centerDialogVisible"-->
    <!--width="35%"-->
    <!--center>-->
    <!--<div class="xiu" style="height: auto">-->
    <!--<div class="edit" style="background-color: rgba(0, 153, 153, 1)">选择商品</div>-->
    <!--&lt;!&ndash;搜索&ndash;&gt;-->
    <!--<div class="flex">-->
    <!--<div class="flex">-->
    <!--<div class="edit1" style="margin:25px 0px 0px 55px">商品ID：</div>-->
    <!--<div class="edit2" style="margin: 18px 0px 0px 0px">-->
    <!--<el-input v-model=" input" size="small" style="width: 120px"></el-input>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="flex">-->
    <!--<div class="edit1" style="margin:25px 0px 0px 15px">商品名称：</div>-->
    <!--<div class="edit2" style="margin: 18px 0px 0px 0px">-->
    <!--<el-input v-model="input" size="small" style="width: 150px"></el-input>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div>-->
    <!--<el-button size="mini" class="el-icon-search" type="primary" style="margin:18px 0px 0px 20px;width: 80px" @click="search">-->
    <!--搜索-->
    <!--</el-button>-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;表格&ndash;&gt;-->
    <!--<div style="margin: 30px 0px 0px 20px">-->
    <!--<el-table-->
    <!--ref="multipleTable"-->
    <!--:data="tableData3"-->
    <!--tooltip-effect="dark"-->
    <!--border-->
    <!--style="width: 95%"-->
    <!--@selection-change="handleSelectionChange">-->
    <!--<el-table-column-->
    <!--type="selection"-->
    <!--width="55">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--label="日期"-->
    <!--width="120">-->
    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="name"-->
    <!--label="姓名"-->
    <!--width="120">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="address"-->
    <!--label="地址"-->
    <!--show-overflow-tooltip>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->
    <!--&lt;!&ndash;按钮&ndash;&gt;-->
    <!--<div class="flex">-->
    <!--<div class="logBtn1" style="margin: 40px 0px 40px 25%">-->
    <!--<el-button type="primary" style="width: 100px">提交</el-button>-->
    <!--</div>-->
    <!--<div class="logBtn2" style="margin: 40px 0px 40px 20px">-->
    <!--<el-button style="width: 100px">取消</el-button>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</el-dialog>-->
    <!--</div>-->
  
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
        totals: 20,
        input: '',
        centerDialogVisible: false,
        multipleSelection: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }],
        tableData1:[{}],
        tableData2:[{}],
        tableData3:[{}],
      }
    },
    methods: {
      //获取列表
      getOrder() {
        this._getData('/api/v1/goods/index', {
          page: this.page,
          pageSize: this.pageSize,
          sort:1
        }, data => {
          console.log(data);
          this.tableData = data.data;
          this.totals = data.total;
        })
      },
      edit() {
        this.centerDialogVisible = true;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getOrder();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getOrder();
      },
    },
    created(){
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
  
  /*.Wtable {*/
  /*width: 70%;*/
  /*margin-left: 200px;*/
  /*margin-top: 20px;*/
  /*}*/
</style>
