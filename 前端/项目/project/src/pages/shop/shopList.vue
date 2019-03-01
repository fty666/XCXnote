<template>
	<div class="body">
      <!--头部-->
      <div class="flex" style="margin-top: 60px;">
          <div class="state flex" style="background-color:rgba(0, 153, 153, 1);">
            <div class="state2" style="color: white">全部商品</div>
            <div class="state3" style="color: white">(1000)</div>
          </div>
          <div class="state flex">
            <div class="state2">已上架</div>
            <div class="state3">(1000)</div>
          </div >
          <div class="state flex">
            <div class="state2">已下架</div>
            <div class="state3">(1000)</div>
          </div>
          <div class="state flex">
            <div class="state2">经销商酒</div>
            <div class="state3">(1000)</div>
          </div>
      </div>
      <!--搜索-->
      <div class="search flex">
        <!--编号-->
        <div class="flex">
          <div class="search1">编号:</div>
          <div class="search2">
            <el-input   v-model="input"  size="small"  placeholder="请输入内容"></el-input>
          </div>
        </div>
        <!--名称-->
        <div class="flex">
          <div class="search1">名称:</div>
          <div class="search2">
            <el-input   v-model="input"  size="small"  placeholder="请输入内容"></el-input>
          </div>
        </div>
        <!--商品分类-->
        <div class="flex">
          <div class="search1">商品分类:</div>
          <div class="search2">
            <el-select v-model="value" size="small" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--按钮-->
          <div class="right flex">
            <div class="btn">
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <div class="btn2">
              <el-button type="primary" icon="el-icon-refresh">重置</el-button>
            </div>
          </div>
      </div>
      <!--表格-->
      <div>
        <div class="right tou">
            <div class="tou1">批量删除</div>
            <div class="tou1">显示条数</div>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="日期"
              width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </div>
	</div>

</template>

<script>
    export default {
      data() {
        return {
          input:'',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }],
          value: '',
          tableData3: [{
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
          multipleSelection: []
        };
      },
        methods: {
          //多选删除
          toggleSelection(rows) {
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable.clearSelection();
            }
          },
          handleSelectionChange(val) {
            this.multipleSelection = val;
          }
        }
    }
</script>

<style scoped>
  /*搜索*/
  .search{
    width: 95%;
    height: 60px;
    margin-left: 10px;
    margin-top: 30px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .search1{
    font-size: 15px;
    margin-left: 15px;
    line-height: 65px;
    /*color: #ddd;*/
    margin-left: 20px;
  }
  .search2{
    height: 30px;
    width: 150px;
    margin-left: 50px;
    padding-top: 15px;
  }
  .btn{
    width: 100px;
    height: 40px;
    margin-left: 10px;
    padding-top: 11px;
  }
  .btn2{
    width: 100px;
    height: 40px;
    margin-left: 10px;
    padding-top: 11px;
  }
  /*表格*/
  .tou{
    background-color: #ddd;
    width: 100%;
    height: 60px;
    margin-top: 30px;
  }
  .tou1{
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
