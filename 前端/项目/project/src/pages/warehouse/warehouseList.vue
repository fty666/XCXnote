<template>
  <div class="body">
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
        <el-input v-model="input" placeholder="输入商品编号"></el-input>
      </div>
      
      <div class="font">商品名称：</div>
      <div class="input">
        <el-input v-model="input" placeholder="输入商品名称"></el-input>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 400px">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2">
        <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1">导出数据</div>
      <div class="head1">显示条数</div>
      <div class="head1">排列方式</div>
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
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          width="250"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <div style="color: #0099ce;padding-left: 50px" @click="look(scope.row.id)">查看</div>
              <div style="color: #0099ce;padding-left: 50px" @click="eidt(scope.row.id)">修改</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div>
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
    <!--查看-->
    <div>
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="xiu" style="height: auto">
          <div class="edit" style="background-color: rgba(26, 188, 156, 1);">回购规则设置</div>
          <div>
            <template>
              <el-table
                :data="tableData3"
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
              </el-table>
            </template>
          </div>
          <div style="margin-top: 10px;">
            <template>
              <el-table
                :data="tableData3"
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
              </el-table>
            </template>
          </div>
          <div class="logBtn1" style="margin-bottom: 20px;margin-left: 200px;margin-top: 30px">
            <el-button style="width: 125px">返回</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <!--修改-->
    <div>
      <el-dialog
        title=""
        :visible.sync="editshop"
        width="30%"
        center>
        <div class="xiu" style="height: auto">
          <div class="edit" style="background-color: rgba(26, 188, 156, 1);">回购规则设置</div>
          <div style="margin: 20px 0px 10px 20px;">商品名称：</div>
          <div>
            <template>
              <el-table
                :data="tableData3"
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
              </el-table>
            </template>
          </div>
          <div class="flex" style="margin: 0px 0px 30px 30px ;">
            <div class="logBtn1"> <el-button size="medium" style="width: 100px" type="primary">提交</el-button></div>
            <div class="logBtn2"> <el-button size="medium" style="width: 100px">取消</el-button></div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        input: '',
        value1: '',
        value6: '',
        //页码参数
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 20,
        //查看
        centerDialogVisible: false,
        //修改
        editshop: false,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀 1518 弄'
        }],
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
      //  查看标签
      look() {
        this.centerDialogVisible = true;
      },
      eidt() {
        this.editshop = true;
      }
    }
  }
</script>

<style scoped>
</style>
