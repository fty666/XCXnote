<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户ID：</div>
      <div class="input">
        <el-input v-model="id" placeholder="请输入ID"></el-input>
      </div>
      
      <div class="font">名称：</div>
      <div class="input">
        <el-input v-model="name" placeholder="请输入名称"></el-input>
      </div>
      
      <div class="font">地区：</div>
      <div class="input">
        <el-input v-model="district" placeholder="请输入地区"></el-input>
      </div>
      
      <!--按钮-->
      <div class="btn" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    <!--表格头-->
    <div class="head join">
      <router-link to="/join/addJoin">
        <div class="head1 flex" style="width:120px;margin-left: 20px">
          <div><img src="@/img/add.png" class="addimg"></img></div>
          <div style="font-size: 11px;color: black">&nbsp;添加加盟商</div>
        </div>
      </router-link>
      <div class="right">
        <div class="head1 Mouse" @click="exportFunc('listTable','加盟商列表')">导出数据</div>
        <div class="head1 Mouse" @click="batch()">批量删除</div>
      </div>
    </div>
    <!--表格-->
    <div id="listTable">
      <el-table
        ref="multipleTable"
        :data="joinList"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          min-width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="加盟商ID"
          sortable
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="district"
          label="所属地区"
          align="center"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="name"
          label="加盟商名称"
          align="center"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="fee"
          label="加盟费用"
          align="center"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="divide"
          label="分成比例"
          align="center"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="time"
          label="加盟时间"
          sortable
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="lack"
          label="有缺货商品"
          sortable
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="111"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="sequence" style="width: 120px">
              <div style="color: #0099ce;padding-left: 15px" class="Mouse" @click="stock(scope.row.warehouseId)">库存
              </div>
              <div style="color: #0099ce;padding-left: 10px" class="Mouse" @click="edit(scope.row)">编辑</div>
              <div style="color: #0099ce;padding-left: 16.5px" class="Mouse" @click="order(scope.row)">订货</div>
              <div style="color: #0099ce;padding-left: 10px" class="Mouse" @click="del(scope.row.id)">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pag">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-sizes="[20, 50, 100]"
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
        input: '',
        ids: '',
        //参数
        joinList: [],
        page: 1,
        pageSize: 20,
        totals: 20,
        id: '',
        name: '',
        district: ''
      }
    },
    methods: {
      //查看加盟商
      getJoin() {
        this._getData('/api/v1/alliance/index', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          this.joinList = data.data;
          this.totals = data.total;
        })
      },
      //库存
      stock(val) {
        this.$router.push({name: 'joinStock'})
        sessionStorage.setItem('joinId', val);
      },
      //订货
      order(val) {
        sessionStorage.setItem('joinInfo', JSON.stringify(val));
        this.$router.push({name: 'joinOrder'});
      },
      //编辑
      edit(val) {
        sessionStorage.setItem('edits', JSON.stringify(val))
        this.$router.push({name: 'editJoin'});
      },
      //搜索
      search() {
        this.page = 1;
        var data = {};
        if (this.id != '') {
          data.id = this.id;
        }
        if (this.name != '') {
          data.name = this.name;
        }
        if (this.district != '') {
          data.district = this.district;
        }
        this._getData('/api/v1/alliance/index', {
          page: this.page,
          pageSize: this.pageSize,
          id: data.id,
          name: data.name,
          district: data.district
        }, data => {
          this.joinList = data.data;
          this.totals = data.total;
        })
      },
      //重置
      res() {
        this.page = 1;
        this.id = '';
        this.name = '';
        this.district = '';
        this.getJoin();
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.id != '' || this.name != '' || this.district != '') {
          this.search();
        } else {
          this.getJoin();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.id != '' || this.name != '' || this.district != '') {
          var data = {};
          if (this.id != '') {
            data.id = this.id;
          }
          if (this.name != '') {
            data.name = this.name;
          }
          if (this.district != '') {
            data.district = this.district;
          }
          this._getData('/api/v1/alliance/index', {
            page: this.page,
            pageSize: this.pageSize,
            id: data.id,
            name: data.name,
            district: data.district
          }, data => {
            this.joinList = data.data;
            this.totals = data.total;
          })
        } else {
          this.getJoin();
        }
      },
      //删除
      del(val) {
        this.$confirm('是否删除此加盟商?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/alliance/delete', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getJoin();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //批量删除
      batch() {
        this.$confirm('是否批量删除这些加盟商?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/alliance/batchDelete', {
              ids: this.ids,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getJoin();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleSelectionChange(val) {
        var ids = '';
        for (let i = 0; i < val.length; i++) {
          ids += val[i].id + ',';
        }
        this.ids = ids;
      }
    },
    created() {
      this.getJoin();
    }
  }
</script>

<style scoped>
</style>
