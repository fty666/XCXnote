<template>
  <div class="body" style="width: 98%;margin-left: 10px">
    <!--经销商库存-->
    <div class="head">
      <div class="backfont"> 申请酒款</div>
    </div>
    <div class="flex xiu" style="height:auto">
      <el-table
        :data="auditList"
        border
        style="width: 100%;margin-bottom: 25px">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="goods.id"
          label="商品编号"
          align="center"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品图片"
          align="center"
          min-width="180">
          <template slot-scope="scope">
            <img :src="imggerUrl+scope.row.goods.list_img"class="imgs">
          </template>
        </el-table-column>
        <el-table-column
          prop="goods.goods_name"
          align="center"
          min-width="265"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="goods.integral"
          label="商品可获得积分"
          align="center"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="name"
          label="价格"
          align="center"
          min-width="203">
            <template slot-scope="scope">
              <div>进货价：{{scope.row.goods.prime_price}}</div>
              <div>会员价：{{scope.row.goods.member_price}}</div>
              <div>原价：{{scope.row.goods.original_price}}</div>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <!--按钮-->
    <div class="flex" v-if="pass==true">
      <div class="font" style="margin: 42px 0px 50px 40%">
        <el-button class="buttons"  style="background-color: rgba(0, 153, 153, 1);color: white" @click="Tpass()">通过</el-button>
      </div>
      <div style="margin: 50px 0px 100px 60px">
        <el-button class="buttons" @click="Tfalse()" >驳回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        auditList: [],
        value: '',
        pass:false
      }
    },
    methods:{
      getAudit(){
        this._getData('/api/v1/dealer_goods/dealerGoods', {
            userCode: sessionStorage.getItem('userCode'),
          },
          data => {
            if(data[0].status !='通过'){
              this.pass=true;
            }
            this.auditList=data;
          })
      },
      Tpass(){
        this.$confirm('是否通过此审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/dealer/pass', {
              id:sessionStorage.getItem('dealerId'),
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
      Tfalse(){
        this.$confirm('是否拒绝此审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/dealer/reject', {
              id:sessionStorage.getItem('dealerId'),
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
      }
    },
    created(){
      this.getAudit();
    }
  }
</script>

<style scoped>
</style>
