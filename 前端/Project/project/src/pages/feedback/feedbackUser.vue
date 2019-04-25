<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户账户：</div>
      <div class="input2">
        <el-input v-model="mobile" style="margin-top: 10px;width: 150px" placeholder="输入用户账户"></el-input>
      </div>
      
      <div class="font">反馈类型：</div>
      <div class="input2">
        <el-select v-model="type" style="margin-top: 10px;width: 180px" placeholder="请选择">
          <el-option
            v-for="item in options"
            size="small"
            :key="item.id"
            :label="item.content"
            :value="item.content">
          </el-option>
        </el-select>
      </div>
      
      <div class="font">反馈时间：</div>
      <div class="input">
        <el-date-picker
          v-model="Stimes"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <!--按钮-->
      <div class="font" style="margin-left: 15%">
        <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button class="buttons3" icon="el-icon-refresh" @click="reset">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1" style="cursor: pointer" @click="openExcel('alertData','用户反馈查看列表')">导出数据</div>
    </div>
    <div id="alertData">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change='sortChange'
        border>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="70">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="用户账户"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
          min-width="162">
        </el-table-column>
        <el-table-column
          prop="type"
          min-width="100"
          align="center"
          label="反馈类型"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="content"
          label="反馈内容"
          align="center"
          min-width="250">
        </el-table-column>
        <el-table-column
          prop="name"
          label="图片"
          align="center"
          min-width="180">
          <template slot-scope="scope">
            <div>
              <img :src="imggerUrl+scope.row.img" class="imgs">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="反馈时间"
          sortable
          align="center"
          min-width="160">
        </el-table-column>
      </el-table>
    </div>
    <div class="pag">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 50, 100]"
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
        // 表单数组
        page: 1,
        pageSize: 20,
        mobile: '',
        type: "",
        Stimes: '',
        //页码参数
        totals: 20,
        options: [],
        value: '',
        tableData3: [{}],
        multipleSelection: [],
        Ftype: 'desc'
      }
    },
    methods: {
      getList() {
        var datas = {};
        this.getInfos(datas);
      },
      getInfos(datas) {
        datas.page = this.page;
        datas.pageSize = this.pageSize;
        this._getData('/api/v1/user_feedback/index', datas,
          data => {
            this.tableData3 = data.data;
            this.totals = data.total;
          })
      },
      //反馈类型
      getFeed() {
        this._getData('/api/v1/feedback_type/index', {},
          data => {
            console.log(data);
            this.options = data;
          })
      },
      search() {
        this.page = 1;
        var datas = {};
        if (this.mobile != '') {
          datas.mobile = this.mobile;
        }
        if (this.type != '') {
          datas.type = this.type;
        }
        if (this.Stimes != null) {
          if (this.Stimes != '') {
            datas.start_time = this.Stimes[0];
            datas.end_time = this.Stimes[1];
          }
        }
        this.getInfos(datas);
      },
      Xpag() {
        var datas = {};
        if (this.mobile != '') {
          datas.mobile = this.mobile;
        }
        if (this.type != '') {
          datas.type = this.type;
        }
        if (this.Stimes != null) {
          if (this.Stimes != '') {
            datas.start_time = this.Stimes[0];
            datas.end_time = this.Stimes[1];
          }
        }
        this.getInfos(datas);
      },
      reset() {
        this.page = 1;
        this.mobile = '';
        this.type = "";
        this.Stimes = '';
        this.getList();
      },
      //导出EXCEL/exportFunc为elxel.js里方法
      openExcel(val, name) {
        this.exportFunc(val, name)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.mobile != '' || this.type != "" || this.Stimes != '') {
          this.Xpag();
        } else {
          this.getService();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.mobile != '' || this.type != "" || this.Stimes != '') {
          this.Xpag();
        } else {
          this.getService();
        }
      },
      sortChange(column, prop, order) {
        var datas = {};
        if (column.prop == 'type') {
          if (this.Ftype == 'asc') {
            this.Ftype = 'desc';
          } else {
            this.Ftype = 'asc';
          }
          datas.order_type = this.Ftype;
          this.getInfos(datas);
        }
      }
    },
    created() {
      this.getList();
      this.getFeed();
    }
  }
</script>

<style scoped>
</style>
