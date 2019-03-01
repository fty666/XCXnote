<template>
  <div class="body">
    <!--头部样式-->
    <div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;用户搜索TOP10</div>
    <!--表格-->
    <div class="bian">
      <div class="Wtable">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            width="200"
            label="操作">
            <template slot-scope="scope">
              <div class="flex">
                <div style="color: #0099ce;padding-left: 80px" @click="edit(scope.row.id)">修改</div>
              </div>
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
                <el-input v-model=" input" size="small" style="width: 120px"></el-input>
              </div>
            </div>
            <div class="flex">
              <div class="edit1" style="margin:25px 0px 0px 15px">商品名称：</div>
              <div class="edit2" style="margin: 18px 0px 0px 0px">
                <el-input v-model="input" size="small" style="width: 150px"></el-input>
              </div>
            </div>
            <div>
              <el-button size="mini" class="el-icon-search" type="primary" style="margin:18px 0px 0px 20px;width: 80px">搜索</el-button>
            </div>
          </div>
          <!--表格-->
          <div style="margin: 30px 0px 0px 20px">
            <el-table
              ref="multipleTable"
              :data="tableData"
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
          <!--按钮-->
          <div class="flex">
            <div class="logBtn1" style="margin: 40px 0px 40px 200px">
              <el-button  type="primary" style="width: 100px">提交</el-button>
            </div>
            <div class="logBtn2" style="margin: 40px 0px 40px 20px">
              <el-button  style="width: 100px">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    
    <!--热门搜索设置-->
    <!--头部样式-->
    <div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;热门搜索设置</div>
    <!--表格-->
    <div class="bian" style="height: auto">
      <div class="flex">
        <div class="ju">输入内容：</div>
        <div class="ju2">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div class="ju2">
          <el-button type="primary" class="buttons">添加</el-button>
        </div>
      </div>
      <div class="sequence" style="width: 80%;">
        <div class="flex" style="width: 200px">
          <div class="font">拉菲</div>
          <div class="font2">删除</div>
        </div>
        <div class="flex" style="width: 200px">
          <div class="font">拉菲</div>
          <div class="font2">删除</div>
        </div>
        <div class="flex" style="width: 200px">
          <div class="font">拉菲</div>
          <div class="font2">删除</div>
        </div>
        <div class="flex" style="width: 200px">
          <div class="font">拉菲</div>
          <div class="font2">删除</div>
        </div>
        <div class="flex" style="width: 200px">
          <div class="font">拉菲</div>
          <div class="font2">删除</div>
        </div>
        <div class="flex" style="width: 200px">
          <div class="font">拉菲</div>
          <div class="font2">删除</div>
        </div>
        <div class="flex" style="width: 200px">
          <div class="font">拉菲</div>
          <div class="font2">删除</div>
        </div>
        <div class="flex" style="width: 200px">
          <div class="font">拉菲</div>
          <div class="font2">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        input: '',
        centerDialogVisible: false,
        multipleSelection: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      edit() {
        this.centerDialogVisible = true;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style scoped>
  .bian {
    height: 500px;
    width: 99.90%;
    border: 1px solid #ddd;
  }
  .Wtable {
    width: 70%;
    margin-left: 200px;
    margin-top: 20px;
  }
  .ju{
      margin: 80px 0px 0px 200px;
  }
  .ju2{
    margin: 70px 0px 0px 50px;
  }
  
  /*删除*/
  .font{
    margin: 20px 0px 0px 80px;
    font-size: 16px;
    color: black;
  }
  .font2{
    margin: 20px 0px 0px 30px;
    color: #3399FF;
    line-height: 60px;
  }
</style>
