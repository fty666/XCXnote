<template>
  <div class="body">
    <!--数量管理-->
    <div class="flex" style="margin-top: 20px;">
      <div class="state flex" style="background-color:rgba(0, 153, 153, 1);">
        <div class="state2" style="color: white">全部商品</div>
        <div class="state3" style="color: white">{{this.orderStatus}}</div>
      </div>
      <div class="state flex">
        <div class="state2">待付款</div>
        <div class="state3">{{this.orderStatus}}</div>
      </div>
      <div class="state flex">
        <div class="state2">待发货</div>
        <div class="state3">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">已发货</div>
        <div class="state3">{{this.orderStatus}}</div>
      </div>
      <div class="state flex">
        <div class="state2">已完成</div>
        <div class="state3">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">已关闭</div>
        <div class="state3">(1000)</div>
      </div>
      <div class="state flex">
        <div class="state2">平台订单</div>
        <div class="state3">(1000)</div>
      </div>
    </div>
    <!--搜索-->
    <div class="flex whiteT" style="height: 120px">
      <div class="sequence" style="width: 75%;">
        <div class="font">订单类型：</div>
        <div class="input">
          <el-input v-model="input" placeholder="输入配货单号"></el-input>
        </div>
        
        <div class="font" style="margin-left: 4%">选择地区：</div>
        <div class="input">
          <el-input v-model="input" placeholder="输入用户名"></el-input>
        </div>
        
        <div class="font" style="margin-left: 3%">提交时间：</div>
        <div class="input">
          <el-date-picker
            v-model="value1"
            style="width: 140px;"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        
        <div class="font" style="margin-left: 25px">至</div>
        <div class="input">
          <el-date-picker
            v-model="value1"
            style="width: 140px;margin-left: 5px"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        
        <div class="font">商品名称：</div>
        <div class="input">
          <el-input v-model="input" placeholder="输入商品名称"></el-input>
        </div>
        
        <div class="font" style="margin-left: 5%">订单编号：</div>
        <div class="input">
          <el-input v-model="input" placeholder="输入订单编号"></el-input>
        </div>
        
        <div class="font" style="margin-left: 5%">商品名称：</div>
        <div class="input">
          <el-input v-model="input" placeholder="输入商品名称"></el-input>
        </div>
      </div>
      <!--按钮-->
      <div class="btn" style="margin-left:5%;margin-top: 30px">
        <el-button type="primary"  icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px;margin-top: 30px">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表头-->
    <div class="head right">
      <div class="head1">批量删除</div>
      <div class="head1">导出订单</div>
      <div class="head1">显示条数</div>
      <div class="head1">排序方式</div>
    </div>
    <!--表格-->
    <div>
      <el-table
        ref="multipleTable"
        :data="orderList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
          min-width="55">
        </el-table-column>
        <el-table-column
          label="所属地区"
          prop="consigner_type"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="订单类型"
          prop="type"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="order_code"
          label="订单编号"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          label="提交时间"
          prop="create_time"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          label="商品信息"
          prop="goods_info"
          align="center"
          min-width="147">
        </el-table-column>
        <el-table-column
          label="实付款"
          prop="payment_price"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="支付方式"
          prop="mode"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="用户账户"
          prop="user_mobile"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          label="订单状态"
          prop="status"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="150"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="sequence">
              <div style="color: #0099ce;padding-left: 10px" @click="infos(scope.row.id)">查看订单</div>
              <div style="color: #0099ce;padding-left: 5px" @click="send(scope.row.id)">订单发货</div>
              <div style="color: #0099ce;padding-left: 10px" @click="picking(scope.row.id)">发起配货</div>
              <div style="color: #0099ce;padding-left: 5px" @click="editBelong(scope.row.id)">修改归属</div>
              <div style="color: #0099ce;padding-left: 10px" @click="send(scope.row.id)">订单退款</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag">
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
    <!--发货-->
    <div>
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        width="34%"
        center>
        <div class="xiu" style="height: 350px">
          <div class="edit">发货操作</div>
          <div class="address">收货地址：胡慧，154645645445，天津市滨海新区</div>
          <div class="flex addInput">
            <div class="addFont">物流公司：</div>
            <div>
              <el-select v-model="value" size="medium" placeholder="请选择" style="width: 50%">
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
            <div class="addFont">物流单号：</div>
            <div class="">
              <el-input v-model="input" size="medium" placeholder="请输入内容"></el-input>
            
            </div>
          </div>
          <div class="addFont" style="margin-left: 30px">选择发货仓库：</div>
          <div style="margin: 10px 0px 0px 30px;">
            <el-select v-model="value" size="medium" placeholder="请选择" style="width: 93%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="flex">
            <div class="logBtn1" style="margin: 30px 0px 0px 33%">
              <el-button size="medium" type="primary">提交</el-button>
            </div>
            <div class="logBtn2"  style="margin: 30px 0px 0px 20px">
              <el-button size="medium">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!--配货-->
    <div>
      <el-dialog
        title=""
        :visible.sync="sendPicking"
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
            <div >
              <el-input v-model="input" style="width: 40%" size="medium"></el-input>
            </div>
          </div>
          <div class="flex addInput">
            <div class="Paddfont">配货款：</div>
            <div >
              <el-input v-model="input" size="medium" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="flex">
            <div class="logBtn1" style="margin: 30px 0px 0px 20%">
              <el-button size="medium" class="buttons" type="primary">提交</el-button>
            </div>
            <div class="logBtn2"  style="margin: 30px 0px 0px 20px">
              <el-button size="medium" class="buttons">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!--修改归属-->
    <div>
      <el-dialog
        title=""
        :visible.sync="belong"
        width="30%"
        center>
        <div class="xiu" style="height: 250px">
          <div class="edit">修改订单归属</div>
          <div class=" addInput">
            <div class="Paddfont" style="width: 60%;margin: 20px 0px 20px 10px;text-align: left">将此订单的归属修改为：</div>
            <div>
              <el-select v-model="value" size="medium" placeholder="请选择" style="width: 70%;margin-left: 50px">
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
            <div class="logBtn1" style="margin: 30px 0px 0px 80px">
              <el-button size="medium" class="buttons" type="primary">提交</el-button>
            </div>
            <div class="logBtn2"  style="margin: 30px 0px 0px 20px">
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: '',
        multipleSelection: [],
        //订单退货
        centerDialogVisible: false,
      //  发起配货
        sendPicking:false,
      //  修改归属
        belong:false,
      //  订单退款
        orderState:false,
        //页码参数
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 20,
        orderList:[],
        orderStatus:[]
      }
    },
    methods: {
      //查看订单详情
      getOrder(){
        this._getData('/api/v1/order/index', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          console.log(data)
          this.orderList = data.data;
          this.totals = data.total;
        })
      },
      Status(){
        this._getData('/api/v1/order/status', {}, data => {
          console.log(data)
          this.orderStatus = data.data;
        })
      },
      //查看订单详情
      infos() {
        this.$router.push({name: 'orderInfo'})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //  订单发货
      send() {
        this.centerDialogVisible = true;
      },
    //  发起配货
      picking(){
        this.sendPicking=true;
      },
    //  修改归属
      editBelong(){
        this.belong=true;
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getOrder();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getOrder();
      },
    },
    created(){
      this.getOrder();
      this.Status();
    }
  }
</script>

<style scoped>
  .address {
    margin: 20px 0px 0px 25px;
  }
  
</style>
