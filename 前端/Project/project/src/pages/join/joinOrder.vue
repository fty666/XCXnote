<template>
  <div class="body">
    <div class="title">正在为加盟商"&nbsp;&nbsp;&nbsp;&nbsp;{{this.joinInfo.name}}&nbsp;&nbsp;&nbsp;&nbsp;"进行订货</div>
    <!--搜索-->
    <div class="flex sou">
      <div class="fonts">商品ID：</div>
      <div>
        <el-input v-model="gid" class="pian" size="medium" style="width: 150px" placeholder="请输入内容"></el-input>
      </div>
      <div class="fonts" style="margin-left: 20px">商品名称：</div>
      <div>
        <el-input v-model="goods_name" class="pian" size="medium" style="width: 180px" placeholder="请输入内容"></el-input>
      </div>
      <div style="margin: 5px 0px 0px 50px" @click="search()">
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      </div>
      <div style="margin: 5px 0px 0px 20px" @click="res()">
        <el-button size="small" class="buttons2" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="tables">
      <el-table
        ref="multipleTable"
        :data="shopList"
        tooltip-effect="dark"
        style="width:80%"
        border>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          label="商品编号"
          align="center"
          prop="id"
          min-width="125">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品图片"
          align="center"
          min-width="150">
          <template slot-scope="scope">
            <div>
              <img :src="imggerUrl+scope.row.list_img" class="imgs">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center"
          min-width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="width: 120px;" @click="query(scope.row.id)">
              <el-button size="small" style="background-color: rgba(0, 153, 153, 1);color: white">查询仓库</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag" style="margin:50px 15% 0px 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 25, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total=totals>
      </el-pagination>
    </div>
    
    <!--表格二-->
    <div class="tables">
      <el-table
        ref="multipleTable"
        :data="inventory"
        tooltip-effect="dark"
        style="width:80%"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          label="平台仓库编号"
          align="warehouseId"
          prop="name"
          min-width="125">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="city"
          label="地址"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="num"
          label="库存"
          align="center"
          min-width="120"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <!--数量-->
    <div class="flex inputs">
      <div style="line-height: 35px">输入数量：</div>
      <div>
        <el-input v-model="num" size="medium" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <!--按钮-->
    <div class="flex">
      <div style="margin: 30px 0px 0px 33%" @click="submit()">
        <el-button class="buttons buttons2">确认订货</el-button>
      </div>
      <div style="margin: 30px 0px 0px 10%">
        <router-link to="/join/join">
          <el-button class="buttons">返回</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: '',
        joinInfo: {},
        //页码参数
        page: 1,
        pageSize: 5,
        currentPage4: 1,
        totals: 5,
        shopList: [],
        inventory:[],
        submitData:'',
        multipleSelection: [],
        goods_name:'',
        gid:''
      }
    },
    methods: {
      //查询商品
      getShop() {
        this._getData('/api/v1/goods/index', {
          page: this.page,
          pageSize: this.pageSize
        }, data => {
          console.log(data)
          this.shopList = data.data;
          this.totals = data.total;
        })
      },
      //查询库存
      query(val) {
        this._getData('/api/v1/alliance/getWarehouseByGoodsId', {
          id: val
        }, data => {
          console.log(data)
          this.inventory=data;
          this.submitData=val;
        })
      },
      handleSelectionChange(val) {
        if(val.length>1) {
          this.$message({
            type: 'info',
            message: '请选择选择一个进行添加'
          });
          this.multipleSelection = val;
          return false;
        }else{
          this.multipleSelection = val;
        }
      },
      //提交数据
      submit(){
        if(this.multipleSelection.length>1 || this.multipleSelection.length==0){
          this.$message({
            type: 'info',
            message: '请选择添加'
          });
          return false;
        } else if(this.num==''){
          this.$message({
            type: 'info',
            message: '请填写数量'
          });
          return false;
        }else{
          this._getData('/api/v1/alliance/orderGoods', {
            allianceWarehouseId:this.joinInfo.id,
            lack:this.joinInfo.lack,
            warehouseId:this.multipleSelection[0].warehouseId,
            goodsId:this.multipleSelection[0].goodsId,
            num:this.num
          }, data => {
            this.getShop();
            this.$message({
              type: 'success',
              message: '订货成功'
            });
          })
        }
      },
      //搜索
      search(){
        var data={};
        if(this.gid!=''){
          data.gid=this.gid;
        }
        if(this.goods_name!=''){
          data.goods_name=this.goods_name;
        }
        this._getData('/api/v1/goods/index', {
          page: this.page,
          pageSize: this.pageSize,
          id:data.gid,
          goods_name:data.goods_name
        }, data => {
          console.log(data)
          this.shopList = data.data;
          this.totals = data.total;
        })
      },
      //重置
      res(){
        this.gid='';
        this.goods_name='';
        this.getShop();
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getShop();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getShop();
      },
    },
    created() {
      this.getShop();
      this.joinInfo=JSON.parse( sessionStorage.getItem("joinInfo"))
      console.log(this.joinInfo)
    }
  }
</script>

<style scoped>
  .title {
    font-size: 16px;
    text-align: left;
    margin: 40px 0px 0px 16%;
  }
  
  .sou {
    margin: 20px 0px 0px 16%;
  }
  
  .fonts {
    line-height: 40px;
  }
  
  .pian {
    margin-left: 20px;
  }
  
  .tables {
    margin: 30px 0px 0px 18%;
  }
  
  .inputs {
    margin: 50px 0px 0px 38%;
  }
  
  .buttons {
    width: 140px;
  }
</style>
