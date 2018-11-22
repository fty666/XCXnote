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
        <span class="titleText">进出类型</span>
        <el-select v-model="outInType" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in outInTypeSelect"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="tableFunc">
      <div>
        <span class="titleText">车&ensp;牌&ensp;号</span>
        <el-select v-model="carNo" filterable clearable placeholder="请选择" size="mini">
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
        <el-select v-model="sideNo" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in sideNoBox"
            :key="index"
            :label="item.SideNo"
            :value="item.SideNo">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="titleText">通行标志</span>
        <el-select v-model="permit" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in permitSelect"
            :key="index"
            :label="item.Name"
            :value="item.ID">
          </el-option>
        </el-select>
      </div>

    </div>
    <div class="tableFunc">
      <div>
        <span class="titleText">卡&emsp;&emsp;口</span>
        <el-select v-model="gateID" filterable clearable placeholder="请选择" size="mini">
          <el-option
            v-for="(item,index) in gateIDBox"
            :key="index"
            :label="item.GateName"
            :value="item.ID">
          </el-option>
        </el-select>
      </div>

      <div class="btnBox">
        <el-button type="primary" @click="getList">查询</el-button>
      </div>

    </div>
    <el-table
      :data="tableData"
      border
      stripe
      @current-change="tableList"
      style="width: 98%;margin:20px auto 10px auto;">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        :index="indexMethod"
        width="60">
      </el-table-column>
      <el-table-column
        prop="GateID"
        label="卡口号"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="CarNo"
        label="车牌号码"
        sortable
        align="center"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="OutInType"
        label="出入类别"
        sortable
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        label="创建时间"
        sortable
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="Permit"
        label="是否允许通行"
        sortable
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="IsCustoms"
        label="是否关联海关"
        sortable
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="YH"
        label="报文状态"
        sortable
        align="center"
        min-width="120">
      </el-table-column>

    </el-table>
    <!--<div class="block pageBox">-->
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage1"-->
        <!--:page-sizes="[20, 50,100]"-->
        <!--:page-size="5"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total='total'>-->
      <!--</el-pagination>-->
    <!--</div>-->


  </div>
</template>

<script>
  export default {
    methods: {
      tableList(val) {
        if(val.IsCustoms=="是"){
          this.$alert('已发送', {
            confirmButtonText: '确定',
          });
        }
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
        console.log(val);
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
      //获取卡口号
      gateIDList() {
        this.$http //列表加载
          .post(this.url + "weight/record/selectGateName")
          .then(
            resp => {
              this.gateIDBox=resp.data;
              console.log(resp.data)
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
              console.log(resp.data)
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
        this.$http //列表加载
          .post(this.url + "weight/record/carRecord", {
            pager:this.page,
            pagerSize: this.pageSize,
            carNo: this.carNo,
            outInType: this.outInType,
            gateID: this.gateID,
            permit: this.permit,
            sideNo: this.sideNo,
            //开始时间
            startTime: this.StartTimeVal,
            //结束时间
            endTime: this.EndTimeVal,
          })
          .then(
            resp => {
              this.tableData = resp.data.data;
              for(var i=0;i<resp.data.data.length;i++) {
                if (resp.data.data[i].Permit == true) {
                  resp.data.data[i].Permit = "允许通行"
                } else {
                  resp.data.data[i].Permit = "禁止通行"
                }
                if (resp.data.data[i].OutInType == true) {
                  resp.data.data[i].OutInType = "出"
                } else {
                  resp.data.data[i].OutInType = "入"
                }
                if (resp.data.data[i].IsCustoms == true) {
                  resp.data.data[i].IsCustoms = "是"
                  this.$set(resp.data.data[i], 'YH',"已发送")
                } else {
                  resp.data.data[i].IsCustoms = "否"
                  this.$set(resp.data.data[i], 'YH',"")
                }
              }

              this.tableData = resp.data.data;
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
        console.log(mytime);
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
        tableData:[],
        outInTypeSelect:[
          {
            name:"出门",
            id:0
          },
          {
            name:"入门",
            id:1
          }
        ],
        permitSelect:[
          {
            name:"禁止通行",
            id:0
          },
          {
            name:"允许通行",
            id:1
          }
        ],
        //车牌号数组
        carNoBox:[],
        //车帮号数组
        sideNoBox:[],
        //卡口号数组,
        gateIDBox:[],
        // 去重方式选择
        radio: "1",
        // 未回皮车辆
        checked: true,
        // 参数设置
        currentPage1: 1,
        storeName: "",
        dataTime: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10)
        ],
        // 分页
        total: 20,
        page: 1,
        pageSize: 10,
        carNo:"",
        outInType:1,
        gateID:"",
        permit:"",
        sideNo:"",

      }
    },
    created() {
      this.getDate();
      this.gateIDList();
      this.sideNoList();
// 获取列表方法调用
      this.getList();
      this.changeSelect2();






    }
  }
</script>
