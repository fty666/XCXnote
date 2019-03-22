<template>
  <div class="body">
    <router-link to="/shop/shopList">
      <div class="clos">返回列表</div>
    </router-link>
    <!--商品信息-->
    <div class="tou">
      <div class="font">商品信息</div>
    </div>
    <div class="table">
      <!--第一行-->
      <div class="han" style="margin-top: 20px">
        <div class="Tfont" style="width: 15%;">商品编号:&nbsp;&nbsp;&nbsp;&nbsp;{{sid}}</div>
        <div class="Tfont" style="width: 80%;">商品名称:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.goods_name}}</div>
      </div>
      <!--第二行-->
      <div class="han">
        <div class="Tfont">类型:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.genre1}}</div>
        <div class="Tfont">品种:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.genre3}}</div>
        <div class="Tfont">品牌:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.genre7}}</div>
        <div class="Tfont">产地:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.genre2}}</div>
      </div>
      <!--第三行-->
      <div class="han">
        <div class="Tfont">规格:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.genre5}}</div>
        <div class="Tfont">年份:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.genre6}}</div>
        <div class="Tfont">包装:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.genre8}}</div>
      </div>
      <!--第四行-->
      <div class="han">
        <div class="Tfont" style="width: 8%;line-height: 100px">商品图片:</div>
        <div class="Tfont">
          <img :src="imggerUrl+shopInfo.list_img" class="imgs">
        </div>
      </div>
      <!--第五行-->
      <div class="han">
        <div class="Tfont" style="width: 8%;line-height: 100px">商品详情:</div>
        <div class="Tfont">
          <img :src="imggerUrl+shopInfo.details_img" class="Tpic">
        </div>
      </div>
      <!--第六行-->
      <div class="han">
        <div class="Tfont">市场价:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.original_price}}</div>
        <div class="Tfont">会员价:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.member_price}}</div>
        <div class="Tfont">经销商价:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.trade_price}}</div>
        <div class="Tfont" style="width: 20%;">经销商最低购入数:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.genre8}}</div>
        <div class="Tfont">可获取积分:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.integral}}</div>
      </div>
      <!--第七行-->
      <div class="han">
        <div class="Tfont">上架数量:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.num}}</div>
        <div class="Tfont">前台销量:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.salesVolume}}</div>
      </div>
      <!--第八行-->
      <div class="han" style="margin-bottom: 50px;">
        <div class="Tfont">库存数量:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.num}}</div>
        <div class="Tfont">实际销量:&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.salesVolume}}</div>
      </div>
    </div>
    <!--商品评价-->
    <div class="tou">
      <div class="font">商品评价</div>
    </div>
    <div class="table">
      <div>
        <el-table
          :data="commonts"
          style="width: 100%"
          border>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            prop="user.mobile"
            label="用户账户"
            min-width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="user.nickname"
            label="昵称"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="grade"
            label="描述相符"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="grade1"
            label="物流服务"
            align="center"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="grade2"
            label="服务态度"
            align="center"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="content"
            label="评价详情"
            align="center"
            min-width="150">
          </el-table-column>
          <el-table-column
            label="图片"
            align="center"
            min-width="150">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.img.split(',')" :key="index">
                <img :src="imggerUrl+item" class="imgs">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="评价时间"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="显示状态"
            align="center"
            min-width="80">
            <template slot-scope="scope">
              <div v-if="scope.row.status=='显示'" style="color: deepskyblue" @click="hidden(scope.row.id)">禁止显示</div>
              <div v-else style="color: deepskyblue" @click="show(scope.row.id)">显示</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="80">
            <template slot-scope="scope">
              <div style="color: #0099ce;" @click="returns(scope.row)">回复</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pags" style="margin:30px 50px 30px 0px">
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
      </div>
    </div>
    <!--修改-->
    <div>
      <el-dialog
        title=""
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="xiu">
          <div class="edit">回复评价</div>
          <div style="width: 90%;margin:15px 0px 0px 25px;">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <div style="margin: 5px 0px 0px 20px;color: #ddd;">注：回复内容会在前台显示。</div>
          <div class="flex">
            <div class="logBtn1" style="margin:15px 0px 0px 25%">
              <el-button size="medium" type="primary">提交</el-button>
            </div>
            <div class="logBtn2" style="margin:15px 0px 0px 10%">
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
    data() {
      return {
        input: '',
        centerDialogVisible: false,
        textarea: '',
        //商品id
        sid: "",
        shopInfo: {},
        commonts: [],
        //页码参数
        page: 1,
        pageSize: 20,
        currentPage4: 1,
        totals: 20
      };
    },
    methods: {
      //获取商品信息
      getInfo() {
        this._getData('/api/v1/goods/show', {id: sessionStorage.getItem('ids')}, data => {
          console.log(data)
          this.shopInfo = data;
        })
      },
      //获取商品评论
      getComment() {
        this._getData('/api/v1/comment/goodsComment', {id: sessionStorage.getItem('ids')}, data => {
          console.log(data)
          this.commonts = data;
        })
      },
      //每页显示多少数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getComment();
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        this.getComment();
      },
      //显示
      show(val) {
        this.$confirm('是否显示此评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/comment/commentUp', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getComment();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //隐藏评论
      hidden(val) {
        console.log(val)
        this.$confirm('是否禁止显示此评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/comment/commentDown', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getComment();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      returns() {
        this.centerDialogVisible = true;
      }
    },
    created() {
      this.sid = this.$route.params.id;
      this.getInfo();
      this.getComment();
    }
  }
</script>

<style scoped>
  .font {
    font-size: 18px;
    color: black;
    line-height: 64px;
    text-align: left;
    margin-left: 20px;
  }
  
  .table {
    width: 98%;
    border: 1px solid #ddd;
    height: auto;
  }
  
  /*字体设置*/
  .han {
    width: 100%;
    display: flex;
  }
  
  .Tfont {
    margin: 15px 0px 0px 50px;
    font-size: 14px;
    width: 15%;
    text-align: left;
  }
  
  .Tpic {
    width: 150px;
    height: 450px;
    border: 1px solid #ddd;
    margin-left: 10px;
  }
</style>
