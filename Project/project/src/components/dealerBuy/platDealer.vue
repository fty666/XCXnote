<template>
  <div>
    <div class="flex whiteT">
      <div class="font">账号：</div>
      <div class="input">
        <el-input v-model="user_mobile" placeholder="输入账号"></el-input>
      </div>
      
      <div class="font">名称：</div>
      <div class="input">
        <el-input v-model="goods_name" placeholder="输入商品名称"></el-input>
      </div>
      
      <div class="font">购入日期：</div>
      <div class="input">
        <el-date-picker
          v-model="start_time"
          style="width: 150px;"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      
      <div class="font" style="margin-left: 4%">至</div>
      <div class="input" style="margin-left: 2%">
        <el-date-picker
          v-model="end_time"
          value-format="yyyy-MM-dd"
          style="width: 150px;"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left:10%" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    <!--表格头  平台强制回购 -->
    <div class="head join">
      <div class="head1" style="margin-left: 20px" @click="manage()">回购规则设置</div>
    </div>
    <!--表格-->
    <div>
      <el-table
        ref="multipleTable"
        :data="Pterrace"
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
          prop="user_id"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="user_mobile"
          label="账号"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          label="商品信息"
          min-width="200"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.order_detail" :key="index">
              <div style="border: 1px solid #ddd">
                {{item.goods_name}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品单价"
          align="center"
          min-width="97">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.order_detail" :key="index">
              <div style="border: 1px solid #ddd">
                {{item.price}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品可获得积分"
          align="center"
          min-width="130">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.order_detail" :key="index">
              <div style="border: 1px solid #ddd">
                {{item.integral}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="购入时间"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          label="购入数量"
          align="center"
          min-width="80">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.order_detail" :key="index">
              <div style="border: 1px solid #ddd">
                {{item.num}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="day"
          label="购入天数"
          align="center"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="80"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="color: #0099ce;" @click="force(scope.row)">强制回购</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pag">
        <el-pagination
          @size-change="PhandleSizeChange"
          @current-change="PhandleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total=totals>
        </el-pagination>
      </div>
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
              <el-input v-model="Hday" placeholder="请输入天数"></el-input>
            </div>
          </div>
          <div class="flex">
            <div class="logBtn1" style="margin-left: 35%;">
              <el-button size="medium" type="primary" @click="submit()">提交</el-button>
            </div>
            <div class="logBtn2">
              <el-button size="medium">取消</el-button>
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
        centerDialogVisible: false,
        //页码参数
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 10,
        Hday: '',
        Pterrace: [],
        user_mobile: '',
        goods_name: '',
        start_time: '',
        end_time: ''
      }
    },
    methods: {
      manage() {
        this.centerDialogVisible = true;
      },
      //获取平台强制回购
      getdealer() {
        this._getData('/api/v1/dealer/buyback', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          console.log(data)
          this.Pterrace = data.data;
          this.totals = data.total;
        })
      },
      //每页显示多少数据
      PhandleSizeChange(val) {
        this.pageSize = val;
        if (this.goods_name != '' || this.user_mobile != '' || this.start_time != '' || this.end_time != '') {
          this.search();
        } else {
          this.getdealer();
        }
      },
      //第几页
      PhandleCurrentChange(val) {
        this.page = val;
        if (this.goods_name != '' || this.user_mobile != '' || this.start_time != '' || this.end_time != '') {
          this.search();
        } else {
          this.getdealer();
        }
      },
      //回购规则设置天数
      submit() {
        this._getData('/api/v1/buyback_record/buybackTime', {
            time: this.Hday,
          },
          data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.getdealer();
            this.centerDialogVisible = false;
          })
      },
      //强制回购
      force(val) {
        this.$confirm('是否强制回购商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < val.order_detail.length; i++) {
            this._getData('/api/v1/buyback_record/coerce', {
              user_code: val.user_code,
              order_code: val.order_code,
              goodsId: val.order_detail[i].goodsId,
              num: val.order_detail[i].num,
              price: val.order_detail[i].price,
            }, data => {
            })
          }
          this.$message({
            type: 'success',
            message: '操作成功'
          });
          this.getdealer();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //搜索
      search() {
        var data = {};
        if (this.goods_name != '') {
          data.goods_name = this.goods_name;
        }
        if (this.user_mobile != '') {
          data.user_mobile = this.user_mobile;
        }
        if (this.start_time != '') {
          data.start_time = this.start_time;
        }
        if (this.end_time != '') {
          data.end_time = this.end_time;
        }
        data.page = this.page;
        data.pageSize = this.pageSize;
        //获取平台
        this._getData('/api/v1/dealer/buyback', data, data => {
          console.log(data)
          this.Pterrace = data.data;
          this.totals = data.total;
        })
      },
      res() {
        this.goods_name = '';
        this.user_mobile = '';
        this.user_mobile = '';
        this.start_time = ''
        this.end_time = '';
        this.getdealer();
      }
    },
    created() {
      this.getdealer();
    }
  }
</script>

<style scoped>
</style>
