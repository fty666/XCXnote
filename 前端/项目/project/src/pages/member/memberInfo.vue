<template>
  <div class="body">
    <router-link to="/member/member">
      <div class="clos">返回列表</div>
    </router-link>
    <!--用户信息-->
    <div class="head">
      <div class="font"> 用户信息</div>
    </div>
    <div class="flex xiu" style="height: 120px">
      <div class="sequence" style="width: 90%;margin: 30px 0px 0px 0px">
        <div class="flex pian" style="margin-left: 30px">
          <div>用户ID：</div>
          <div>高级会员</div>
        </div>
        <div class="flex pian">
          <div>用户账号：</div>
          <div>高级会员</div>
        </div>
        <div class="flex pian">
          <div>注册时间：</div>
          <div>高级会员</div>
        </div>
        <div class="flex pian">
          <div>所属地区：</div>
          <div>高级会员</div>
        </div>
        <div class="flex " style="margin-left: 30px">
          <div>昵称：</div>
          <div>高级会员</div>
        </div>
        <div class="flex" style="margin-left: 265px">
          <div>生日：</div>
          <div>高级会员</div>
        </div>
        <div class="flex" style="margin-left: 280px">
          <div>性别：</div>
          <div>高级会员</div>
        </div>
      </div>
      <div class="imgs"></div>
    </div>
    
    <!--统计信息-->
    <div class="head">
      <div class="font"> 统计信息</div>
    </div>
    <div class="flex xiu" style="height: 120px">
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
      </el-table>
    </div>
    
    <!--收货地址-->
    <div class="head">
      <div class="font"> 收货地址</div>
    </div>
    <div class="flex xiu" style="height: 200px">
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
      </el-table>
    </div>
    
    <!--订单记录-->
    <div class="head">
      <div class="font"> 订单记录</div>
    </div>
    <div class="flex xiu" style="height: 200px">
      <div class="flex sou">
        <div style="margin-top: 10px">订单类型：</div>
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              size="small"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="btn" style="margin: -8px 0px 0px 40px">
          <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
        </div>
      </div>
      <div style="width: 100%">
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
        </el-table>
      </div>
    </div>
    
    <!--积分记录-->
    <div class="head">
      <div class="font"> 积分记录</div>
    </div>
    <div class="flex xiu" style="height: 200px">
      <div style="width: 100%">
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
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
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
  
  .font {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    line-height: 50px;
  }
  
  /*用户信息*/
  .imgs {
    border: 1px solid #ddd;
    width: 80px;
    height: 80px;
    margin-top: 20px;
  }
  
  .pian {
    margin-left: 250px;
  }
  
  .sou {
    width: 100%;
    height: 50px;
    padding: 20px 0px 0px 35px;
    font-size: 15px;
    color: #999999;;
  }
</style>
