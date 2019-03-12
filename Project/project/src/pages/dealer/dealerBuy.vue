<template>
  <div class="body">
    <!--回购-->
    <div class="flex" style="margin-top: 30px;">
      <div :class="[ 'state','flex', dealer==true?'bj':'']" @click="dealerInfo()">
        <div class="state2">平台强制回购</div>
      </div>
      <div :class="[ 'state','flex', members==true?'bj':'']" @click="member()" style="margin-left: 0px">
        <div class="state2">经销商申请回购</div>
      </div>
    </div>
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">账号：</div>
      <div class="input">
        <el-input v-model="input" placeholder="输入账号"></el-input>
      </div>
      
      <div class="font">名称：</div>
      <div class="input">
        <el-input v-model="input" placeholder="输入商品名称"></el-input>
      </div>
      
      <div class="font">购入日期：</div>
      <div class="input">
        <el-date-picker
          v-model="value1"
          style="width: 150px;"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      
      <div class="font" style="margin-left: 4%">至</div>
      <div class="input" style="margin-left: 2%">
        <el-date-picker
          v-model="value1"
          style="width: 150px;"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left:10%">
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px">
        <el-button class="buttons3" size="small" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    <!--表格头  平台强制回购 -->
    <div v-if="dealer==true">
      <div class="head join">
        <div class="head1" style="margin-left: 20px" @click="manage()">回购规则设置</div>
        <div class="head1">显示条数</div>
      </div>
      <!--表格-->
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          border>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            label="用户ID"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="账号"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="商品信息"
            min-width="200"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品单价"
            align="center"
            min-width="97">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品可获得积分"
            align="center"
            min-width="130">
          </el-table-column>
          <el-table-column
            prop="name"
            label="购入时间"
            align="center"
            min-width="130">
          </el-table-column>
          <el-table-column
            prop="name"
            label="购入数量"
            align="center"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="购入天数"
            align="center"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            align="center"
            min-width="80"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="color: #0099ce;" @click="del(scope.row.id)">强制回购</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--回购规则-->
      <div>
        <el-dialog
          title=""
          :visible.sync="centerDialogVisible"
          width="35%"
          center>
          <div class="xiu">
            <div class="edit">回购规则设置</div>
            <div class="flex">
              <div class="edit1" style="margin-left: 20%">强制回购期限：</div>
              <div class="edit2">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="flex">
              <div class="logBtn1" style="margin-left: 35%;">
                <el-button size="medium" type="primary">提交</el-button>
              </div>
              <div class="logBtn2">
                <el-button size="medium">取消</el-button>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
    <!--经销商申请回购-->
    <div v-else>
      <div class="head join">
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
           width="55">
          </el-table-column>
          <el-table-column
            label="申请时间"
            min-width="120"
            align="center"
            prop="address">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户ID"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            label="账号"
            min-width="130"
            align="center"
            prop="address">
          </el-table-column>
          <el-table-column
            label="商品信息"
            min-width="150"
            align="center"
            prop="address">
          </el-table-column>
          <el-table-column
            label="商品单价"
            min-width="80"
            align="center"
            prop="address">
          </el-table-column>
          <el-table-column
            label="商品可获得积分"
            min-width="130"
            align="center"
            prop="address">
          </el-table-column>
          <el-table-column
            label="购入时间"
            min-width="120"
            align="center"
            prop="address">
          </el-table-column>
          <el-table-column
            label="回购数量"
            min-width="80"
            align="center"
            prop="address">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="106"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="flex">
                <div style="color: #0099ce;" @click="del(scope.row.id)">&nbsp;&nbsp;通过</div>
                <div style="color: #0099ce;" @click="del(scope.row.id)">&nbsp;&nbsp;驳回</div>
              </div>
            </template>
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
        input: '',
        value1: '',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }],
        multipleSelection: [],
        centerDialogVisible: false,
        //  经销商信息选择
        dealer: true,
        members: false
      }
    },
    methods: {
      manage() {
        this.centerDialogVisible = true;
      },
      //经销商信息
      dealerInfo() {
        this.dealer = true;
        this.members = false;
      },
      //  会员信息
      member() {
        this.dealer = false;
        this.members = true;
      }
    }
  }
</script>

<style scoped>
</style>
