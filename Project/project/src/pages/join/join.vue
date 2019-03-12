<template>
  <div class="body">
    <!--搜索-->
    <div class="flex whiteT">
      <div class="font">用户ID：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入ID"></el-input>
      </div>
      
      <div class="font">名称：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入名称"></el-input>
      </div>
      
      <div class="font">地区：</div>
      <div class="input">
        <el-input v-model="input" placeholder="请输入地区"></el-input>
      </div>
      
      <!--按钮-->
      <div class="btn">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2">
        <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      </div>
    
    </div>
    <!--表格头-->
    <div class="head join">
      <router-link to="/join/addJoin">
        <div class="head1 flex" style="margin-left: 20px">
          <div><img src="@/img/add.png" class="addimg"></img></div>
          <div style="font-size: 11px">&nbsp;添加加盟商</div>
        </div>
        <div class="right">
          <div class="head1">导出数据</div>
          <div class="head1">批量删除</div>
        </div>
      </router-link>
    </div>
    <!--表格-->
    <div>
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
          align="center"
          min-width="90">
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
          min-width="150">
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
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="lack"
          label="有缺货商品"
          align="center"
          min-width="95">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="111"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="sequence" style="width: 120px">
              <div style="color: #0099ce;padding-left: 15px" @click="stock(scope.row.id)">库存</div>
              <div style="color: #0099ce;padding-left: 10px" @click="edit(scope.row)">编辑</div>
              <div style="color: #0099ce;padding-left: 16.5px" @click="order(scope.row.id)">订货</div>
              <div style="color: #0099ce;padding-left: 10px" @click="del(scope.row.id)">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        input: '',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }],
        multipleSelection: [],
        //参数
        joinList:[],
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 20
      }
    },
    methods: {
      //查看加盟商
      getJoin() {
        this._getData('/api/v1/alliance/index', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          this.joinList=data.data;
          this.totals=data.total;
          console.log(data)
        })
      },
      //库存
      stock(val) {
        this.$router.push({name: 'joinStock'})
        sessionStorage.setItem('joinId', val);
      },
      //订货
      order() {
        this.$router.push({name: 'joinOrder'})
      },
      //编辑
      edit() {
        this.$router.push({name: 'editJoin'});
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    created(){
      this.getJoin();
    }
  }
</script>

<style scoped>
</style>
