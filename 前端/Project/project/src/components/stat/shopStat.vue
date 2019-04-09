<template>
  <div class="body" style="width: 99.8%;margin-left: 0px">
    <div class="flex whiteT">
      <div class="font">编号：</div>
      <div class="Xinput">
        <el-input v-model="id" size="small" placeholder="输入编号"></el-input>
      </div>
      
      <div class="font">名称：</div>
      <div class="Xinput">
        <el-input v-model="goods_name" size="small" placeholder="输入名称"></el-input>
      </div>
      
      <div class="font">商品分类：</div>
      <div class="flex">
        <div class="search2">
          <el-select v-model="goods_groupId" size="small" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      
      <!--按钮-->
      <div class="btn" style="margin-left: 20%" @click="search()">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="btn2" @click="rest()">
        <el-button class="buttons3" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <div style="margin-top: 20px">
      <el-table
        :data="shopList"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="id"
          label="商品编号"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="商品图片"
          min-width="180">
          <template slot-scope="scope">
            <div>
              <img :src="imggerUrl+scope.row.list_img" class="imgs">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_name"
          min-width="250"
          align="center"
          label="商品名称">
        </el-table-column>
        <el-table-column
          min-width="180"
          align="center"
          label="价格">
          <template slot-scope="scope">
            <div>市场价：{{scope.row.original_price}}</div>
            <div>会员价：{{scope.row.member_price}}</div>
            <div>经销商价：{{scope.row.trade_price}}</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          align="center"
          label="成本价">
          <template slot-scope="scope">
            <div>
              <el-input v-model="scope.row.editCost"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          min-width="100"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <div style="color:deepskyblue" class="Mouse" @click="save(scope.row)">保存</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        id: '',
        goods_groupId: '',
        goods_name: '',
        options: [],
        //页码参数
        page: 1,
        pageSize: 10,
        currentPage4: 1,
        totals: 20,
        shopList: []
      }
    },
    methods: {
      getShop() {
        this._getData('/api/v1/goods/index', {
            page: this.page,
            pageSize: this.pageSize
          },
          data => {
            console.log(data)
            this.shopList = data.data;
            this.totals = data.total;
          })
      },
      //  获取商品分类
      gclass() {
        this._getData('/api/v1/goods_group/index', {}, data => {
          this.options = data;
        })
      },
      //  搜索
      search() {
        var data = {};
        if (this.goods_groupId != '') {
          data.goods_groupId = this.goods_groupId;
        }
        ;
        if (this.goods_name != '') {
          data.goods_name = this.goods_name;
        }
        ;
        if (this.id != '') {
          data.id = this.id;
        }
        data.page = this.page;
        data.pageSize = this.pageSize;
        this._getData('/api/v1/goods/index', {
          page: data.page,
          pageSize: data.pageSize,
          goods_groupId: data.goods_groupId,
          goods_name: data.goods_name,
          id: data.id
        }, data => {
          this.shopList = data.data;
          this.totals = data.total;
        })
      },
      //  重置
      rest() {
        this.id = "";
        this.goods_groupId = "";
        this.goods_name = "";
        this.getShop();
      },
      //修改成本价
      save(val) {
        console.log(val)
        this.$confirm('是否修改成本价?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/goods/primePrice', {
              id: val.id,
              prime_price: val.editCost
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getShop();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleSizeChange(val) {
        this.pageSize = val;
        if (this.id != '' || this.goods_name != '' || this.bid != '') {
          this.search()
        } else {
          this.getShop();
        }
      },
      //第几页
      handleCurrentChange(val) {
        this.page = val;
        if (this.id != '' || this.goods_name != '' || this.bid != '') {
          this.search()
        } else {
          this.getShop();
        }
      },
    },
    created() {
      this.getShop();
      this.gclass();
    }
  }
</script>

<style scoped>
</style>
