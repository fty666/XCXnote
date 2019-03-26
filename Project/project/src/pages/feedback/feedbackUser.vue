<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户账户：</div>
      <div class="input2">
        <el-input v-model="filter.mobile" style="margin-top: 10px;width: 150px" placeholder="输入用户账户"></el-input>
      </div>
      
      <div class="font">反馈类型：</div>
      <div class="input2">
        <el-select v-model="filter.type" style="margin-top: 10px;width: 180px" placeholder="请选择">
          <el-option
            v-for="item in options"
            size="small"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      
      <div class="font">反馈时间：</div>
      <div class="input">
        <el-date-picker
          v-model="filter.start_time"
          style="width: 135px;"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      
      <div class="font" style="margin-left: 2%">至</div>
      <div class="input" style="margin-left: 1%">
        <el-date-picker
          v-model="filter.end_time"
          value-format="yyyy-MM-dd"
          style="width: 135px;"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <!--按钮-->
      <div class="font" style="margin-left: 20px">
        <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
        <el-button class="buttons3" icon="el-icon-refresh" @click="reset">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1" style="cursor: pointer" @click="openExcel('alertData','用户反馈查看列表')">导出数据</div>
      <!--<div class="head1">排列方式</div>-->
    </div>
    <div id="alertData">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="70">
        </el-table-column>
        <el-table-column
          prop="user_code"
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
          show-overflow-tooltip>
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
          align="center"
          min-width="160">
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        // 表单数组
        filter: {
          page: 1,
          pageSize: 20,
        },
        //页码参数
        currentPage4: 1,
        totals: 20,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        tableData3: [{}],
        multipleSelection: []
      }
    },
    methods: {
      getList() {
        this._getData('/api/v1/user_feedback/index', this.filter,
          data => {
            console.log(data.data);
            this.tableData3 = data.data;
            this.totals = data.total;
          })
      },
      reset() {
        this.filter = {};
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
        this.getService();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getService();
      },
    },
    created() {
      this.getList();
    }
  }
</script>

<style scoped>
</style>
