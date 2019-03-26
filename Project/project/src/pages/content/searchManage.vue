<template>
  <div class="body">
    <!--头部样式-->
    <div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;用户搜索TOP10</div>
    <!--表格-->
    <div class="bian">
      <div class="Wtable">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          border
          style="width: 95%">
          <el-table-column
            type="index"
            label="排名"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            label="内容"
            prop="content"
            align="center"
            min-width="425">
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作"
            align="center"
            min-width="150">
            <template slot-scope="scope">
              <div style="color: deepskyblue" @click="edit(scope.row)">添加至热门搜索</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
    <!--热门搜索设置-->
    <!--头部样式-->
    <div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;热门搜索设置</div>
    <!--表格-->
    <div class="bian" style="height: auto">
      <div class="flex">
        <div class="ju">输入内容：</div>
        <div class="ju2">
          <el-input v-model="filter.content" placeholder="请输入内容"></el-input>
        </div>
        <div class="ju2">
          <el-button  class="buttons buttons2" @click="addnew">添加</el-button>
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
        filter:[],
        centerDialogVisible: false,
        multipleSelection: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
      //获取列表
      getOrder() {
        this._getData('/api/v1/user_search/userTop10', {
          page: this.page,
          pageSize: this.pageSize,
        }, data => {
          console.log(data);
          this.tableData = data;
          this.totals = data.total;
        })
      },
      //添加至热门搜索
      edit(val) {
        console.log(555);
        this.$confirm('是否将' + val.content + '添加至热门搜索?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/user_search/createHot', {
              content: val.content,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功',
              });
              this.getOrder();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
        
      },
      // 添加
      addnew(){
        this._getData('/api/v1/user_search/createHot',this.filter, {
        
        }, data => {
          this.shopList = data.data;
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    created(){
      this.getOrder()
    }
  }
</script>

<style scoped>
  .bian {
    height: 550px;
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
