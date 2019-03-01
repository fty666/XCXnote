<template>
	<div class="body">
    <!--表头-->
    <div class="tou">
      <div class="font">二级分类管理</div>
    </div>
    <!--选择分类-->
    <div class="table">
      <div class="flex">
        <div class="class">商品分类：</div>
        <div class="class1">
          <el-select v-model="value"  style="width: 450px" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="flex">
          <div class="add">
            <el-input v-model="input"  placeholder="请输入内容"></el-input>
          </div>
          <div class="add1">
            添加二级分类
          </div>
      </div>
      <!--表格-->
      <div class="biao">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          border
          style="width: 70%">
          <el-table-column
            type="index"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            property="date"
            label="分类名称"
            align="center"
            width="350">
          </el-table-column>
          <el-table-column
            property="name"
            label="商品数量"
            align="center"
            width="297">
          </el-table-column>
          <el-table-column
            property="address"
            width="300"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <div class="flex">
                <div style="color: #0099ce;padding-left: 90px" @click="edit(scope.row)">修改</div>
                <div style="color: #0099ce;padding-left: 30px" @click="del(scope.row.id)">删除</div>
              </div>
            </template>>
          </el-table-column>
        </el-table>
      </div>
      
      <!--修改-->
      <div >
        <el-dialog
          title=""
          :visible.sync="centerDialogVisible"
          width="25%"
          center>
          <div class="xiu">
            <div class="edit">修改分类名称</div>
            <div class="flex">
              <div class="edit1">修改为：</div>
              <div class="edit2">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="flex">
              <div class="logBtn1"> <el-button size="medium"  type="primary">提交</el-button></div>
              <div class="logBtn2"> <el-button size="medium">取消</el-button></div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
	</div>
</template>

<script>
    export default {
        name: "",
      data() {
        return {
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }],
          value: '',
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
          }],
          centerDialogVisible:false,
          input:''
        }
      },
      methods:{
          edit:function (){
            this.centerDialogVisible=true
          }
      }
    }
</script>

<style scoped>
  .font{
    font-size: 18px;
    color: black;
    line-height: 64px;
    text-align: left;
    margin-left: 20px;
  }
  /*表格*/
  .table{
    border: 1px solid #ddd;
    height: 500px;
  }
  .class{
    margin-top: 40px;
    margin-left: 360px;
  }
  .class1{
    margin-top: 30px;
    margin-left: 30px;
  }
  .add{
    margin-left: 500px;
    margin-top: 30px;
    width: 185px;
    height: 30px;
  }
  .add1{
    width: 124px;
    height: 40px;
    background-color:rgba(0, 153, 153, 1) ;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    margin-left: 25px;
    margin-top: 30px;
    font-size: 14px;
    color: white;
  }
  .biao{
    margin-top: 50px;
    margin-left: 220px;
  }
</style>
