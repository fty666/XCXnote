<template>
  <div class="body">
    <div class="title">正在为加盟商""进行订货</div>
    <!--搜索-->
    <div class="flex sou">
      <div class="fonts">商品ID：</div>
      <div>
        <el-input v-model="input" class="pian" size="medium" style="width: 150px" placeholder="请输入内容"></el-input>
      </div>
      <div class="fonts" style="margin-left: 20px">商品名称：</div>
      <div>
        <el-input v-model="input" class="pian" size="medium" style="width: 180px" placeholder="请输入内容"></el-input>
      </div>
      <div  style="margin: 5px 0px 0px 50px">
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      </div>
      <div style="margin: 5px 0px 0px 20px">
        <el-button  size="small" class="buttons2" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="tables">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width:80%"
        border>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          label="商品编号"
          align="center"
          prop="name"
          min-width="125">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品图片"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="width: 120px;">
              <el-button size="small" style="background-color: rgba(0, 153, 153, 1);color: white">查询仓库</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--表格二-->
    <div class="tables">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width:80%"
        border>
        <el-table-column
          type="selection"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          label="平台仓库编号"
          align="center"
          prop="name"
          min-width="125">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="地址"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="address"
          label="库存"
          align="center"
          min-width="120"
          show-overflow-tooltip>
          
        </el-table-column>
      </el-table>
    </div>
    <!--数量-->
    <div class="flex inputs">
      <div style="line-height: 35px">输入数量：</div>
      <div><el-input v-model="input"  size="medium" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <!--按钮-->
    <div class="flex">
      <div  style="margin: 30px 0px 0px 33%">
        <el-button class="buttons buttons2"  >确认订货</el-button>
      </div>
      <div style="margin: 30px 0px 0px 10%">
        <router-link to="/join/join">
        <el-button class="buttons">返回</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return{
        input:'',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }]
      }
    }
  }
</script>

<style scoped>
  .title{
    font-size: 16px;
    text-align: left;
    margin: 40px 0px 0px 16%;
  }
  .sou{
    margin: 20px 0px 0px 16%;
  }
  .fonts{
    line-height: 40px;
  }
  .pian{
    margin-left: 20px;
  }
  .tables{
    margin: 30px 0px 0px 18%;
  }
  .inputs{
    margin: 50px 0px 0px 38%;
  }
  .buttons{
    width: 140px;
  }
</style>
