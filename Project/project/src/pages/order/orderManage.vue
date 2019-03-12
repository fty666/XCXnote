<template>
  <div class="body">
    <!--数量-->
    <div class="flex" style="margin-top: 20px;">
      <div class="state flex" style="background-color:rgba(0, 153, 153, 1);">
        <div class="state2" style="color: white">全部商品</div>
        <div class="state3" style="color: white">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">未配货</div>
        <div class="state3">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">已配货</div>
        <div class="state3">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">已发货</div>
        <div class="state3">(1000)</div>
      </div>
    </div>
    <!--搜索-->
    <div class="flex whiteT Wserch">
      <div class="Fsearch sequence">
        <div class="flex" style="width: 90%">
          <div class="font" style="margin-left: 60px">订单号：</div>
          <div class="input">
            <el-input v-model="input" placeholder="请输入订单号"></el-input>
          </div>
          
          <div class="font" style="margin-left: 30px">用户名：</div>
          <div class="input">
            <el-input v-model="input" placeholder="输入用户名"></el-input>
          </div>
          
          <div class="font">商品名称：</div>
          <div class="input">
            <el-input v-model="input" placeholder="请输入昵称"></el-input>
          </div>
        </div>
        
        <div class="font" style="margin-left: 60px">选择地区：</div>
        <div class="input">
          <el-input v-model="input" placeholder="请输入昵称"></el-input>
        </div>
        
        <div class="font" style="margin-left: 20px">提交时间：</div>
        <div class="input">
          <el-date-picker
            v-model="value6"
            style="width: 200px"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </div>
      </div>
      
      
      <!--按钮-->
      <div class="btn" style="margin: 40px 0px 0px 40px">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin: 40px 0px 0px 40px">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="head right">
      <div class="head1">导出数据</div>
      <div class="head1">批量删除</div>
      <div class="head1">显示条数</div>
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
          type="selection"
          min-width="55">
        </el-table-column>
        <el-table-column
          label="订单号"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单提交时间"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          min-width="120"
          label="申请配货时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品信息"
          align="center"
          min-width="237">
        </el-table-column>
        <el-table-column
          prop="name"
          label="配货来源"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="联系方式"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="配货转态"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="110"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <div style="color: #0099ce;padding-left: 20px" @click="sendpicking(scope.row.id)">发起配货</div>
              <div style="color: #0099ce;padding-left: 20px" @click="del(scope.row.id)">更改配货</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--发起配货-->
    <!--配货-->
    <div>
      <el-dialog
        title=""
        :visible.sync="picking"
        width="30%"
        center>
        <div class="xiu" style="height: 300px">
          <div class="edit">发起配货</div>
          <div class="flex addInput">
            <div class="Paddfont">选择配货方：</div>
            <div>
              <el-select v-model="value" size="medium" placeholder="请选择" style="width: 90%">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex addInput">
            <div class="Paddfont">分成比例：</div>
            <div>
              <el-input v-model="input" style="width: 40%" size="medium"></el-input>
            </div>
          </div>
          <div class="flex addInput">
            <div class="Paddfont">配货款：</div>
            <div>
              <el-input v-model="input" size="medium" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="flex">
            <div class="logBtn1" style="margin: 30px 0px 0px 22%">
              <el-button size="medium" class="buttons" type="primary">提交</el-button>
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
    name: "",
    data() {
      return {
        input: '',
        value1: '',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }],
        multipleSelection: [],
        picking: false
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //  发起配货
      sendpicking() {
        this.picking = true;
      }
    }
  }
</script>

<style scoped>
</style>
