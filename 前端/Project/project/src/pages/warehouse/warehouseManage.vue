<template>
  <div class="body">
    <div class="flex whiteT">
      <div class="font">仓库编号：</div>
      <div class="input">
        <el-input v-model="id" style="width: 150px" placeholder="请输入仓库编号"></el-input>
      </div>
      
      <div class="font" style="margin-left: 50px">名称：</div>
      <div class="input">
        <el-input v-model="name" style="width: 250px" placeholder="请输入仓库名"></el-input>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left:30%" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" style="margin-left: 5px" @click="res()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    <!--表格头-->
    <div class="head join">
      <div class="head1" style="margin-left: 20px" @click="manage()">
        <div class="flex" style="width: 200px">
          <div><img src="@/img/add.png" class="addimg" alt=""></div>
          <div class="Mouse" style="width: 70px">&nbsp;&nbsp;添加仓库</div>
        </div>
      </div>
      <div class="head1 Mouse" style="margin-right: 50px" @click="batch()">批量删除</div>
    </div>
    <!--表格-->
    <div>
      <el-table
        ref="multipleTable"
        :data="wareList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
          min-width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="仓库编号"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="city"
          align="center"
          min-width="250"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="linkman"
          label="联系人"
          align="center"
          min-width="117">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="250"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <div class="Mouse" style="color: #0099ce;padding-left: 8px" @click="inven(scope.row)">库存</div>
              <div class="Mouse" style="color: #0099ce;padding-left: 8px" @click="bank(scope.row.id)">入库管理</div>
              <div class="Mouse" style="color: #0099ce;padding-left: 4px" @click="removal(scope.row.id)">出库管理</div>
              <div class="Mouse" style="color: #0099ce;padding-left: 4px" @click="edit(scope.row)">编辑</div>
              <div class="Mouse" style="color: #0099ce;padding-left: 4px" @click="del(scope.row.id)">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pag">
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
    name: "",
    data() {
      return {
        multipleSelection: '',
        //页码参数
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 20,
        wareList: [],
        id: '',
        name: ''
      }
    },
    methods: {
      //查看库存
      getWare() {
        this._getData('/api/v1/warehouse/index', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          this.wareList = data.data;
          this.totals = data.total;
        })
      },
      //搜索
      search() {
        this.page=1;
        var data = {};
        if (this.id != '') {
          data.id = this.id;
        }
        if (this.name != '') {
          data.name = this.name;
        }
        this._getData('/api/v1/warehouse/index', {
          page: this.page,
          pageSize: this.pageSize,
          id: data.id,
          name: data.name
        }, data => {
          this.wareList = data.data;
          this.totals = data.total;
        })
      },
      Xpag(){
        var data = {};
        if (this.id != '') {
          data.id = this.id;
        }
        if (this.name != '') {
          data.name = this.name;
        }
        this._getData('/api/v1/warehouse/index', {
          page: this.page,
          pageSize: this.pageSize,
          id: data.id,
          name: data.name
        }, data => {
          this.wareList = data.data;
          this.totals = data.total;
        })
      },
      //重置
      res() {
        this.pag=1;
        this.id = '';
        this.name = '';
        this.getWare();
      },
      //删除
      del(val) {
        this.$confirm('是否删除此库存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/warehouse/delete', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getWare();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //选择
      handleSelectionChange(val) {
        var datas='';
        for (let i = 0; i < val.length; i++) {
          datas += val[i].id + ',';
        }
        this.multipleSelection=datas;
      },
      batch() {
        this.$confirm('是否删除这些库存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/warehouse/batchDelete', {
              ids: this.multipleSelection,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.multipleSelection='';
              this.getWare();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.id != '' || this.name != '') {
          this.Xpag();
        } else {
          this.getWare();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.id != '' || this.name != '') {
          this.Xpag();
        } else {
          this.getWare();
        }
      },
      manage() {
        this.$router.push({name: 'editWare', params: {add: true}})
      },
      //  库存信息
      inven(val) {
        sessionStorage.setItem('inventory', val.id)
        this.$router.push({name: 'inventoryInfo'})
      },
      //  编辑
      edit(val) {
        sessionStorage.setItem('editList', JSON.stringify(val))
        this.$router.push({name: 'editWare'})
      },
      //  入库管理
      bank(val) {
        sessionStorage.setItem('wareId', val);
        this.$router.push({name: 'ruBank'})
      },
      //出库管理
      removal(val) {
        sessionStorage.setItem('wareId', val);
        this.$router.push({name: 'removal'})
      }
    },
    created() {
      this.getWare();
    }
  }
</script>

<style scoped>
</style>
