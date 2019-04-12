<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT" style="height: 120px">
      <div class="sequence" style="width: 71%;">
        <div class="font" style="margin-left: 50px">ID：</div>
        <div class="input">
          <el-input v-model="id" style="width: 150px" placeholder="输入ID"></el-input>
        </div>
        
        <div class="font" style="margin-left: 12%">账号：</div>
        <div class="input">
          <el-input v-model="mobile" style="width: 150px" placeholder="输入账号"></el-input>
        </div>
        
        <div class="font" style="margin-left: 12%">昵称：</div>
        <div class="input">
          <el-input v-model="nickname" style="width: 150px" placeholder="输入昵称"></el-input>
        </div>
        
        <div class="font" style="margin-left: 6%">地区：</div>
        <div class="input">
          <el-input v-model="district" style="width: 150px" placeholder="输入地区"></el-input>
        </div>
        
        <div class="font" style="margin-left: 10%">提交时间：</div>
        <div class="input">
          <el-date-picker
            v-model="start_time"
            style="width: 140px;"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        
        <div class="font" style="margin-left: 25px">至</div>
        <div class="input">
          <el-date-picker
            v-model="end_time"
            style="width: 140px;margin-left: 15px"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      
      </div>
      <!--按钮-->
      <div class="btn" style="margin-left: 88px;margin-top: 30px" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px;margin-top: 30px" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    
    <!--表格头部-->
    <div class="head right">
    </div>
    <!--表格-->
    <div>
      <el-table
        ref="multipleTable"
        :data="auditList"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @sort-change='sortChange'
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          label="申请时间"
          align="center"
          sortable
          prop="create_time"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="user_id"
          label="用户ID"
          align="center"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="user_mobile"
          label="账号"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="district"
          label="所属地区"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="身份"
          align="center"
          min-width="105">
        </el-table-column>
        <el-table-column
          prop="status"
          label="审核状态"
          align="center"
          sortable="custom"
          min-width="102">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <div class="Mouse" style="color: #0099ce;padding-left: 5px" @click="infos(scope.row)">详情</div>
              <div v-if="scope.row.status=='驳回'">
                <div style="color: #0099ce;padding-left: 5px">已驳回</div>
              </div>
              <div v-if="scope.row.status=='通过'">
                <div style="color: #0099ce;padding-left: 5px">已通过</div>
              </div>
              <div v-if="scope.row.status=='申请'" class="flex">
                <div class="Mouse" style="color: #0099ce;padding-left: 5px" @click="pass(scope.row.user_id)">通过</div>
                <div class="Mouse" style="color: #0099ce;padding-left: 5px" @click="down(scope.row)">驳回</div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pags">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total=totals>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //页码参数
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 20,
        auditList: [],
        //搜索条件
        id: '',
        mobile: '',
        nickname: '',
        district: '',
        start_time: '',
        end_time: '',
        //  排序
        Status: 'desc'
      }
    },
    methods: {
      //获取审核
      getAudit() {
        var datas = {};
        this.getInfos(datas)
      },
      getInfos(datas) {
        datas.page = this.page;
        datas.pageSize = this.pageSize;
        this._getData('/api/v1/dealer_goods/examine', datas, data => {
          this.auditList = data.data;
          this.totals = data.total;
        })
      },
      //通过
      pass(val) {
        this.$confirm('是否通过此审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/dealer/pass', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getAudit();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //拒绝
      down(val) {
        this.$confirm('是否拒绝此审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/dealer/reject', {
              userCode: val.user_code,
              createTime: val.create_time
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getAudit();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      infos(val) {
        sessionStorage.setItem('userCode', val.user_code);
        sessionStorage.setItem('dealerId', val.user_id);
        sessionStorage.setItem('page', '资质审核');
        this.$router.push({name: 'auditInfo'})
      },
      //  搜索
      search() {
        var datas = {};
        if (this.id != '') {
          datas.id = this.id;
        }
        if (this.mobile != '') {
          datas.mobile = this.mobile;
        }
        if (this.nickname != '') {
          datas.nickname = this.nickname;
        }
        if (this.district != '') {
          datas.district = this.district;
        }
        if (this.start_time != '') {
          datas.start_time = this.start_time;
        }
        if (this.end_time != '') {
          datas.end_time = this.end_time;
        }
        this.getInfos(datas);
      },
      //  重置
      res() {
        this.id = '';
        this.mobile = '';
        this.nickname = '';
        this.district = '';
        this.start_time = '';
        this.end_time = '';
        this.getAudit();
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.id != '' || this.mobile != '' || this.nickname != '' || this.district != '' || this.start_time != '' || this.end_time != '') {
          this.search();
        } else {
          this.getAudit();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.id != '' || this.mobile != '' || this.nickname != '' || this.district != '' || this.start_time != '' || this.end_time != '') {
          this.search();
        } else {
          this.getAudit();
        }
      },
      sortChange(column, prop, order) {
        if (this.Status == 'asc') {
          this.Status = 'desc';
        } else {
          this.Status = 'asc';
        }
        var datas = {};
        datas.order_status = this.Status;
        this.getInfos(datas);
      },
    },
    created() {
      this.getAudit();
    }
  }
</script>

<style scoped>
</style>
