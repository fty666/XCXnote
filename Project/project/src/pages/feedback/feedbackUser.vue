<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户账户：</div>
      <div class="input2">
        <el-input v-model="input" style="margin-top: 10px;width: 180px"  placeholder="输入用户账户"></el-input>
      </div>
      
      <div class="font">反馈类型：</div>
      <div class="input2">
        <el-select v-model="value"  style="margin-top: 10px;width: 180px" placeholder="请选择">
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
          v-model="value6"
          style="width: 220px"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 10%">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2">
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
          label="用户账户"
          align="center"
          min-width="170">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
          align="center"
          min-width="162">
        </el-table-column>
        <el-table-column
          prop="address"
          min-width="120"
          align="center"
          label="反馈类型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="反馈内容"
          align="center"
          min-width="300">
        </el-table-column>
        <el-table-column
          prop="name"
          label="图片"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="反馈时间"
          align="center"
          min-width="120">
        </el-table-column>
      </el-table>
    </div>
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
  </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return{
        input:'',
        value1:'',
        value6:'',
        //页码参数
        page: 1,
        pageSize: 20,
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
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }],
        inputs2:'',
        multipleSelection: []
      }
    },
    methods: {
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
    }
  }
</script>

<style scoped>
</style>
