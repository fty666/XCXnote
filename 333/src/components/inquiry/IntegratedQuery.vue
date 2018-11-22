<style scoped>

</style>


<template>
  <div style="width:100%;">
    <div class="tableFunc">
      <div>
        <span class="titleText">日&emsp;&emsp;期</span>
        <el-date-picker
          v-model="dataTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          @change='changeData'
          format="yyyy-MM-dd HH:ss:mm"
          value-format="yyyy-MM-dd HH:ss:mm"
          end-placeholder="结束日期" size="mini">
        </el-date-picker>

      </div>
      <div>
        <span class="titleText">委托单号</span>
        <el-select v-model="orderNo" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in orderNoBox"
            :key="index"
            :label="item.OrderNo"
            :value="item.OrderNo">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="titleText">到&ensp;站&ensp;场</span>
        <el-select v-model="toYard" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in toYardBox"
            :key="index"
            :label="item.FromYard"
            :value="item.FromYard">
          </el-option>
        </el-select>
      </div>


    </div>
    <div class="tableFunc">
      <div>
        <span class="titleText">过衡方式</span>
        <el-select v-model="weightType" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in weightTypeBox"
            :key="index"
            :label="item.weightTypeName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="titleText">泵房名称</span>
        <el-select v-model="weightHouseID" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in weightHousebox"
            :key="index"
            :label="item.HouseName"
            :value="item.CODE">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="titleText">出&ensp;站&ensp;场</span>
        <el-select v-model="fromYard" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in fromYardBox"
            :key="index"
            :label="item.ToYard"
            :value="item.ToYard">
          </el-option>
        </el-select>
      </div>

    </div>
    <div class="tableFunc">
      <div>
        <span class="titleText">车&ensp;牌&ensp;号</span>
        <el-select v-model="carno" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in carNoBox"
            :key="index"
            :label="item.CarNo"
            :value="item.CarNo">
          </el-option>
        </el-select>

      </div>
      <div>
        <span class="titleText">车&ensp;帮&ensp;号</span>
        <el-select v-model="sideno" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in sideNoBox"
            :key="index"
            :label="item.SideNo"
            :value="item.SideNo">
          </el-option>
        </el-select>

      </div>
      <div>
        <span class="titleText">车&emsp;&emsp;队</span>
        <el-select v-model="teamname" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in teamnameBox"
            :key="index"
            :label="item.Name"
            :value="item.ID">
          </el-option>
        </el-select>
      </div>

    </div>
    <div class="tableFunc">
      <div>
        <span class="titleText">仓储单位</span>
        <el-select v-model="yardID" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in yardIDBox"
            :key="index"
            :label="item.YardName"
            :value="item.YardCode">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="titleText">计划名称</span>
        <el-select v-model="planname" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in plannameBox"
            :key="index"
            :label="item.PlanName"
            :value="item.PlanName">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="titleText">操&ensp;作&ensp;人</span>
        <el-select v-model="tarename" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in tarenameBox"
            :key="index"
            :label="item.UserName"
            :value="item.UserName">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="tableFunc">
      <div>
        <span class="titleText">贷&emsp;&emsp;主</span>
        <el-select v-model="ownerCode" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in OwnerBox"
            :key="index"
            :label="item.OwnerName"
            :value="item.OwnerName">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="titleText">货&emsp;&emsp;类</span>
        <el-select v-model="goodType" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in goodTypeBox"
            :key="index"
            :label="item.goodName"
            :value="item.goodName">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="titleText">货&emsp;&emsp;名</span>
        <el-input v-model="goodType" placeholder="请输入内容"></el-input>
      </div>

    </div>
    <div class="tableFunc tableFuncs tableFunc1">
      <div style="width: 163px;">
        <!--<span class="titleText">回皮方式</span>-->
        <!--<template>-->
          <!--<el-radio v-model="radio" label="1">皮重</el-radio>-->
          <!--<el-radio v-model="radio" label="2">毛重</el-radio>-->
        <!--</template>-->
        <template>
          <!--<template>-->
            <!--<el-radio v-model="isTare" label="0">回皮</el-radio>-->
            <!--<el-radio v-model="isTare" label="1">所有</el-radio>-->
          <!--</template>-->
          <el-checkbox v-model="radio">未回皮车辆</el-checkbox>
        </template>
      </div>
      <div>
        <span class="titleText titleTexts">去重方式</span>
        <template>
          <el-radio v-model="isTare" label="1">皮重</el-radio>
          <el-radio v-model="isTare" label="0">毛重</el-radio>
        </template>

      </div>

      <div class="btnBox">
        <el-button type="primary" @click="getList">查询</el-button>
      </div>

    </div>
    <div v-if="tb1">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 98%;margin:20px auto 10px auto;">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          :index="indexMethod"
          width="60">
        </el-table-column>
        <el-table-column
          prop="orderno"
          label="委托单号"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="planname"
          label="计划名称"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="teamname"
          label="车队"
          sortable
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="carno"
          label="车牌号"
          sortable
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="sideno"
          label="车帮好"
          sortable
          align="center"
          min-width="80">
        </el-table-column>
      </el-table>
    </div>
    <div v-if="tb2">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 98%;margin:20px auto 10px auto;">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          :index="indexMethod"
          width="60">
        </el-table-column>
        <el-table-column
          prop="orderno"
          label="委托单号"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="planname"
          label="计划名称"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="teamname"
          label="车队"
          sortable
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="carno"
          label="车牌号"
          sortable
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="sideno"
          label="车帮好"
          sortable
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="orderno"
          label="皮重"
          sortable
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="CreateTime"
          label="皮重时间"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="wareWeightHouseID"
          label="皮重磅房"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="tarename"
          label="皮重操作人"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
      </el-table>
    </div>
    <div class="block pageBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[20, 50,100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total='total'>
      </el-pagination>
    </div>


  </div>
</template>

<script>
  export default {
    methods: {
      inquire(){

      },
      ClassGroupClick(row){
        this.$http //列表加载
          .post(this.url + "inventory/QueryInvClassRecord", {
            groupID:row,
            accountId: this.accountIdVal
          })
          .then(
            resp => {
              this.ClassRecordArray=resp.data
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      //分页
      handleSizeChange(val) {
        //每页数量
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        //分页
        this.page = val;

        this.getList();
      },
      //分页结束
      //序号
      indexMethod(index) {
        return index + 1 + (this.page - 1) * this.pageSize;
      },
      //改变日期
      changeData(val) {
        if (val == "" || val == null) {
          this.StartTimeVal = "";
          this.EndTimeVal = "";
        } else {
          this.StartTimeVal = val[0];
          this.EndTimeVal = val[1];
        }
      },
      //获取车牌号
      changeSelect2() {
        this.$http //列表加载
          .post(this.url + "weight/record/selectCarNoRecord")
          .then(
            resp => {
              this.carNoBox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      //获取车帮号
      sideNoList() {
        this.$http //列表加载
          .post(this.url + "weight/record/selectSideNoRecord")
          .then(
            resp => {
              this.sideNoBox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      // 获取操作人
      tarenameSelect(){
        this.$http //列表加载
          .post(this.url + "weight/comprehensive/selectUser")
          .then(
            resp => {
              this.tarenameBox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      // 获取泵房名称
      weightHouse(){
        this.$http //列表加载
          .post(this.url + "weight/comprehensive/selectWeightHouse")
          .then(
            resp => {
              console.log(resp.data)
              this.weightHousebox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      // 获取委托单号
      orderNoSelect(){
        this.$http //列表加载
          .post(this.url + "weight/comprehensive/selectOrderNo")
          .then(
            resp => {
              this.orderNoBox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      // 获取到站场
      toYardSelect(){
        this.$http //列表加载
          .post(this.url + "weight/comprehensive/selectFromYard")
          .then(
            resp => {
              this.toYardBox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      // 获取到站场
      fromYardSelect(){
        this.$http //列表加载
          .post(this.url + "weight/comprehensive/selectToYard")
          .then(
            resp => {
              this.fromYardBox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      // 获取车牌号
      carnoSelect(){
        this.$http //列表加载
          .post(this.url + "weight/comprehensive/selectCarNo")
          .then(
            resp => {
              this.carnoBox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      // 获取计划名称
      plannameSelect(){
        this.$http //列表加载
          .post(this.url + "weight/comprehensive/selectPlanName")
          .then(
            resp => {
              this.plannameBox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      // 获取仓储单位
      yardIDSelect(){
        this.$http //列表加载
          .post(this.url + "weight/comprehensive/selectYard")
          .then(
            resp => {
              console.log(resp.data);
              this.yardIDBox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      // 获取货主
      OwnerSelect(){
        this.$http //列表加载
          .post(this.url + "weight/comprehensive/selectOwner")
          .then(
            resp => {
              console.log(resp.data);
              this.OwnerBox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      // 获取车队
      teamnameSelect(){
        this.$http //列表加载
          .post(this.url + "weight/comprehensive/selectOwner")
          .then(
            resp => {
              this.teamnameBox=resp.data;
            },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },

      // 获取列表方法
      getList(){
        console.log(this.radio)
        console.log(this.isTare)
        if(this.radio==false){
          this.radios=""
        }else{
          this.radios=1;
        }
        this.$http //列表加载
          .post(this.url + "weight/comprehensive/selectAll", {
            isTare:this.isTare,
            taretime:this.StartTimeVal,
            endtime:this.EndTimeVal,
            planname:this.planname,
            teamname:this.teamname,
            orderNo:this.orderNo,
            yardID:this.yardID,
            ownerCode:this.ownerCode,
            carno:this.carno,
            toYard:this.toYard,
            fromYard:this.fromYard,
            goodType:this.goodType,
            sideno:this.sideno,
            weightType:this.weightType,
            weightHouseID:this.weightHouseID,
            code:this.weightHouseID,
            goodName:this.goodName,
            tarename:this.tarename,
            pager:this.page,
            pagerSize:this.pageSize,
            ownerName:this.owner,
            tareweight:this.radios

          })
          .then(
            resp => {
              console.log(resp.data)
              this.tableData = resp.data.data;
              if(this.isTare=="0"){
                this.tb1=true
                this.tb2=false
              }else{
                this.tb1=false
                this.tb2=true
              }
              // if(this.radio=="1" && this.isTare=="1"){
              //   this.tb1=true
              //   this.tb2=false
              // }
              this.total = resp.data.number;

        },
            response => {
              this.$message({
                message: response.status + ",服务器繁忙请稍后再试！",
                type: "error"
              });
            }
          );
      },
      getDate(){
        let newTime = new Date();
        let mytime =
          newTime.getHours() +
          ":" +
          (newTime.getMinutes() < 10
            ? "0" + newTime.getMinutes()
            : newTime.getMinutes()) +
          ":" +
          (newTime.getSeconds() < 10
            ? "0" + newTime.getSeconds()
            : newTime.getSeconds());
        let newYear = newTime.getFullYear();
        let newMonth =
          newTime.getMonth() + 1 < 10
            ? "0" + Number(newTime.getMonth() + 1)
            : Number(newTime.getMonth() + 1);
        let newData =
          newTime.getDate() < 10 ? "0" + newTime.getDate() : newTime.getDate();
        let contentTime =
          newYear +
          "-" +
          newMonth +
          "-01" +
          " 00:00:00 - " +
          newYear +
          "-" +
          newMonth +
          "-" +
          newData +
          " " +
          mytime;
        this.StartTimeVal = newYear + "-" + newMonth + "-01" + " 00:00:00";
        this.EndTimeVal = newYear + "-" + newMonth + "-" + newData + " " + mytime;
        this.dataTime = [this.StartTimeVal, this.EndTimeVal];
      }
    },

    data() {
      return {
        tb1:true,
        tb2:false,
        // 分页
        total: 20,
        page: 1,
        pageSize: 20,
        // 参数设置
        currentPage1: 1,
        tableData:[],
        // carNoBox:[],
        // carNo:"",
        // sideNoBox:[],
        // sideNo:"",
        StartTimeVal:"",
        EndTimeVal:"",
        radio:false,
        radios:"",
        // 去重方式选择
        isTare:"1",
        // 未回皮车辆
        checked:true,
        seen: false,
        // 参数设置
        currentPage1: 1,
        storeName: "",
        dataTime: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10)
        ],
        //计划名称
        planname:"",
        plannameBox:[],
        //车队名称
        teamname:"",
        teamnameBox:[],
        // 委托单号
        orderNo:"",
        orderNoBox:[],
        //仓储单位ID
        yardID:"",
        yardIDBox:[],
        //委托单号
        ownerCode:"",
        //车牌号码
        carno:"",
        carNoBox:"",
        //到站场
        toYard:"",
        toYardBox:[],
        //发站场
        fromYard:"",
        fromYardBox:[],
        // 货主
        Owner:"",
        OwnerBox:[],
        //货类
        goodType:"",
        goodTypeBox:[
          {
            goodName:"煤炭"
          },
          {
            goodName:"焦炭"
          },
          {
            goodName:"有色矿"
          },
          {
            goodName:"矿石"
          },
          {
            goodName:"其他"
          }


        ],
        //车帮号
        sideno:"",
        sideNoBox:[],
        //过衡方式
        weightType:"",
        weightTypeBox:[
          {
            weightTypeName:"标准",
            id:0
          },
          {
            weightTypeName:"配对",
            id:1
          }
        ],
        //泵房Code
        weightHouseID:"",
        weightHousebox:[],
        //泵房代码
        code:"",
        //货名
        goodName:"",
        // 操作人
        tarename:"",
        tarenameBox:[],

      }
    },
    created() {
      this.getDate();
      // this.gateIDList();
      this.sideNoList();
// 获取列表方法调用
      this.getList();
      this.changeSelect2();
      // 获取操作人
      this.tarenameSelect();
      //获取泵房名称
      this.weightHouse();
      // 获取委托单号
      this.orderNoSelect();
      //获取到站场
      this.toYardSelect()
      //获取发站场
      this.fromYardSelect()
      //获取车牌号
      // this.carnoSelect()
      //获取计划名称
      this.plannameSelect()
      //获取仓储单位
      this.yardIDSelect()
      //获取货主
      this.OwnerSelect()
      //获取车队
      this.teamnameSelect()






    }
  }
</script>
