<template>
  <div class="body">
    <!--签到赠送积分设置-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签到赠送积分设置</div>
    </div>
    <div class="flex xiu" style="height: 200px">
      <div>
        <div class="flex dfont" style="margin-top: 35px">
          <div class="qian">新用户注册赠送积分：</div>
          <div>
            <el-input v-model="input" size="small"></el-input>
          </div>
        </div>
        <div class="flex dfont">
          <div class="qian">每日签到赠送积分：</div>
          <div>
            <el-input v-model="input" size="small"></el-input>
          </div>
        </div>
        <div class="flex dfont">
          <div class="qian">连续一周签到赠送积分：</div>
          <div>
            <el-input v-model="input" size="small"></el-input>
          </div>
        </div>
        <div class="flex dfont">
          <div class="qian">邀请每个好友可获得积分：</div>
          <div>
            <el-input v-model="input" size="small"></el-input>
          </div>
          <div>
            <el-button class="buttons2" style="margin:0px 0px  80px 50px" size="small">确认修改</el-button>
          </div>
        </div>
      </div>
    </div>
    
    <!--订单抵现规则-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单抵现规则</div>
    </div>
    <div class="flex xiu" style="height: 100px">
      <div style="margin: 5px 0px 0px 100px">
        <div class="flex dfont">
          <div class="qian">订单抵扣比例：</div>
          <div>
            <el-input v-model="input" size="small" style="width: 50px"></el-input>
          </div>
          <div class="qian" style="margin-left: 10px">积分=1元</div>
          <div>
            <el-button class="buttons2" style="margin:0px 0px  80px 50px" size="small">确认修改</el-button>
          </div>
        </div>
      </div>
    </div>
    
    <!--积分商城列表-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积分商城列表</div>
    </div>
    <div class="xiu" style="height: 200px">
      <div class="flex" style="margin: 20px 0px 10px 60px;">
        <div class="state flex" style="width: 150px">
          <div class="state2" @click="adds()">从商城中添加商品</div>
        </div>
        <div class="state flex" style="width: 150px">
          <router-link to="/integral/addIntehral">
            <div class="state2">新添加商品</div>
          </router-link>
        </div>
      </div>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
           type="index"
            label="序号"
           align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="date"
            label="商品编号"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品图片"
            align="center"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            min-width="200"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="name"
            label="库存数量"
            align="center"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="所需积分"
            align="center"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="所需金额"
            align="center"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="已兑换数量"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="130">
            <template slot="">
              <div class="sequence" >
                <div style="color: deepskyblue;margin-left: 10px">设为推荐</div>
                <div style="color: deepskyblue;margin-left: 10px">修改</div>
                <div style="color: deepskyblue;margin-left: 10px">设为热门</div>
                <div style="color: deepskyblue;margin-left: 10px">删除</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  
    <div>
      <el-dialog
        title=""
        :visible.sync="addshop"
        width="45%"
        center>
          <div>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                type="selection"
                align="center"
                width="60">
              </el-table-column>
              <el-table-column
                prop="date"
                label="商品编号"
                align="center"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品图片"
                align="center"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="address"
                align="center"
                min-width="150"
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="name"
                label="库存数量"
                align="center"
                min-width="80">
              </el-table-column>
            </el-table>
          </div>
        <div class="flex">
          <div class="flex" style="margin: 30px 0px 10px 10%">
            <div style="line-height:30px">兑换方式：</div>
            <div><el-input v-model="input" style="width: 100px" size="small"></el-input>
            </div>
          </div>
          <div class="flex" style="margin: 30px 0px 10px 5px">
            <div style="line-height:30px">积分+</div>
            <div>
              <el-input v-model="input" style="width: 60px" size="small" ></el-input>
            </div>
          </div>
          <div class="flex" style="margin: 30px 0px 10px 5%">
            <div style="line-height:30px">兑换上架数量：</div>
            <div>
              <el-input v-model="input" style="width: 60px" size="small" ></el-input>
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
        textarea: '',
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
        value: '',
        //  备注订单
        centerDialogVisible: false,
        input: '',
        addshop:false
      }
    },
    methods: {
      //修改备注信息
      remark() {
        this.centerDialogVisible = true;
      },
      esc() {
        this.centerDialogVisible = false;
      },
      adds(){
        this.addshop=true;
      }
    }
  }
</script>

<style scoped>
  .dfont {
    margin: 30px 0px 0px 20px;
    width: 100%;
    height: 10px;
    font-size: 14px;
  }
  
  .futext {
    margin: 20px 0px 0px 20px;
    width: 95%;
  }
  
  /*退款信息*/
  .tui {
    width: 95%;
    height: 250px;
    margin: 10px 0px 0px 10px;
    border: 1px solid #ddd;
  }
  
  .qian {
    margin-top: 10px;
  }
  
  .fonts {
    font-size: 15px;
    margin: 25px 0px 0px 100px;
  }
  
  .inpu {
    margin: 16px 0px 0px 40px;
    width: 500px;
  }
</style>
