<template>
  <div class="body">
    <router-link to="/warehouse/warehouseManage">
      <div class="clos" style="margin-left: 13px">返回列表</div>
    </router-link>
    <!--头部-->
    <div class="flex" style="margin-top: 30px;">
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
    <div class="search flex">
      <!--编号-->
      <div class="flex">
        <div class="search1">商品编号:</div>
        <div class="search2">
          <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <!--名称-->
      <div class="flex">
        <div class="search1">商品名称:</div>
        <div class="search2">
          <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <!--按钮-->
      <div class="right flex">
        <div class="btn2">
          <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
          border>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="62">
          </el-table-column>
          <el-table-column
            label="商品编号"
            align="center"
            min-width="170">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品图片"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="商品名称"
            align="center"
            min-width="280"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="name"
            label="库存"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="更新时间"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="库存操作"
            align="center"
            min-width="100"
            show-overflow-tooltip>
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
        width="34%"
        center>
        <div class="xiu" style="height: 250px">
          <div class="edit">修改库存</div>
          <div class="addFont">商品名称：</div>
  
          <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 53.5%;margin: 0px 0px 0px 20%"
            border>
            <el-table-column
              align="center"
              label="现有库存"
              min-width="60">
            </el-table-column>
            <el-table-column
              label="修改为"
              align="center"
              min-width="100"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="input" size="small"></el-input>
              </template>
            </el-table-column>
          </el-table>
          
          <div class="flex">
            <div class="logBtn1" style="margin: 30px 0px 0px 20%">
              <el-button size="medium" type="primary" class="buttons">提交</el-button>
            </div>
            <div class="logBtn2" style="margin: 30px 0px 0px 20px">
              <el-button size="medium" class="buttons">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        input: '',
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
          address: '上海市'
        }],
        multipleSelection: [],
        centerDialogVisible: false
      };
    },
    methods: {
      edit() {
        this.centerDialogVisible = true;
      }
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
    margin-left: 50px;
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
  
  /*表格*/
  .tables1 {
    width: 100px;
    height: 30px;
    color: black;
    border: 1px solid #333;
    margin: 20px 0px 0px 80px;
    line-height: 30px;
    text-align: center;
  }
  
  .tables2 {
    width: 150px;
    height: 30px;
    color: black;
    border: 1px solid #333;
    margin: 20px 0px 0px 0px;
    line-height: 30px;
    text-align: center;
  }
</style>
