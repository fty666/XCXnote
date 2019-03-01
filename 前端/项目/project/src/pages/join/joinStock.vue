<template>
  <div class="body">
    <router-link to="/join/join">
      <div class="clos">返回列表</div>
    </router-link>
    <div class="flex xiu" style="height: 800px;margin-top: 30px">
      <!--订单记录-->
      <div class="head" style="margin-top: 0px">
        <div class="Jfont" >&nbsp;&nbsp;&nbsp;&nbsp;库存详情</div>
  
        <!--数量-->
        <div class="flex" style="margin-top: 20px;">
          <div class="state flex" style="background-color:rgba(0, 153, 153, 1);">
            <div class="state2" style="color: white">全部商品</div>
            <div class="state3" style="color: white">(1000)</div>
          </div>
          <div class="state flex">
            <div class="state2">酒类商品</div>
            <div class="state3">(1000)</div>
          </div >
          <div class="state flex" style="width: 130px">
            <div class="state2" >非酒类商品</div>
            <div class="state3">(1000)</div>
          </div>
        </div>
        <!--搜索-->
        <div class="flex whiteT bianju" >
          <div class="font">商品编号：</div>
          <div class="input">
            <el-input v-model="input"  placeholder="请输入商品编号"></el-input>
          </div>
    
          <div class="font">商品名称：</div>
          <div class="input">
            <el-input v-model="input"  placeholder="输入商品名称"></el-input>
          </div>
          
          <!--按钮-->
          <div class="btn" style="margin-left: 5px">
            <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
          </div>
          <div class="btn2" style="margin-left: 5px">
            <el-button class="btnbj" size="small" icon="el-icon-refresh">重置</el-button>
          </div>
  
        </div>
        <!--表格头-->
        <div class="head right bianju" >
          <div class="head1">批量删除</div>
          <div class="head1">导出订单</div>
          <div class="head1">显示条数</div>
          <div class="head1">排序方式</div>
        </div>
        <!--表格-->
        <div class="bianju">
          <el-table
            ref="multipleTable"
            :data="tableData"
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
                  <div style="color: #0099ce;padding-left: 60px" @click="del(scope.row.id)">查看订单</div>
                  <div style="color: #0099ce;padding-left: 20px" @click="del(scope.row.id)">删除订单</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
        input:'',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: ''
      }
    }
  }
</script>

<style scoped>
  .clos {
    text-align: left;
    width: 130px;
    height: 30px;
    border: 1px solid black;
    font-size: 15px;
    text-align: center;
    line-height: 30px;
    margin: 30px 0px 0px 0px;
  }
  
  .Jfont {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    line-height: 50px;
  }
  
  .bianju{
    width: 98%;
    margin-left: 10px
  }
</style>
