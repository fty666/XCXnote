<template>
	<div>
    <!--积分商城列表-->
    <div class="head">
      <div class="backfont"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积分商城列表</div>
    </div>
    <div class="xiu" style="height: 200px">
      <div class="flex" style="margin: 20px 0px 10px 60px;">
        <div class="state flex" style="width: 150px">
          <div class="state2" @click="adds()">从商城中添加商品</div>
        </div>
      </div>
      <div>
        <el-table
          :data="integralShop"
          border
          style="width: 100%;">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="id"
            label="商品编号"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品图片"
            align="center"
            min-width="120">
            <template slot-scope="scope">
              <div>
                <img :src="imggerUrl+scope.row.list_img" class="imgs">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="goods_name"
            align="center"
            min-width="200"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="num"
            label="库存数量"
            align="center"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="Integral"
            label="所需积分"
            align="center"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="money"
            label="所需金额"
            align="center"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="sale"
            label="已兑换数量"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="130">
            <template slot-scope="scope">
              <div class="sequence">
                <div class="cfont Mouse" v-if="scope.row.sort==0" @click="recommend(scope.row.id)">
                  设为推荐
                </div>
                <div class="cfont Mouse" v-if="scope.row.sort==1" @click="escRecommend(scope.row.id)">
                  取消推荐
                </div>
                <div class="cfont Mouse" @click="edit(scope.row.id)">修改</div>
                <div class="cfont Mouse" v-if="scope.row.likes==0 || scope.row.likes==null" @click="hot(scope.row.id)">
                  设为热门
                </div>
                <div class="cfont Mouse" v-if="scope.row.likes==1" @click="escHot(scope.row.id)">
                  取消热门
                </div>
                <div class="cfont Mouse" @click="del(scope.row.id)">删除</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pag" style="margin-bottom: 30px">
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
    <!--商城中添加-->
    <div>
      <el-dialog
        title=""
        :visible.sync="addshop"
        width="45%"
        center>
        <div>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              width="60">
              <template slot-scope="scope">
                <el-radio v-model="addShopBox.goodsId" :label="scope.row.id"></el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="商品编号"
              align="center"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="商品图片"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                <div class="imgBox">
                  <img :src="imggerUrl+scope.row.list_img" alt="">
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="goods_name"
              align="center"
              min-width="150"
              label="商品名称">
            </el-table-column>
            <el-table-column
              prop="num"
              label="库存数量"
              align="center"
              min-width="80">
            </el-table-column>
          </el-table>
          <div class="pag" style="margin-bottom: 30px">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total=totalss>
            </el-pagination>
          </div>
        </div>
        <div class="flex">
          <div class="flex" style="margin: 30px 0px 10px 10%">
            <div style="line-height:30px">兑换方式：</div>
            <div>
              <el-input v-model="addShopBox.Integral" style="width: 100px" size="small"></el-input>
            </div>
          </div>
          <div class="flex" style="margin: 30px 0px 10px 5px">
            <div style="line-height:30px">积分+</div>
            <div>
              <el-input v-model="addShopBox.money" style="width: 60px" size="small"></el-input>
            </div>
            <div style="line-height:30px">元</div>
          </div>
          <div class="flex" style="margin: 30px 0px 10px 5%">
            <div style="line-height:30px">兑换上架数量：</div>
            <div>
              <el-input v-model="addShopBox.num" style="width: 60px" size="small"></el-input>
            </div>
          </div>
          <div class="flex" style="margin: 30px 0px 10px 5%">
            <div>
              <el-button type="primary" @click="addShop()">确 认</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!--修改-->
    <div>
      <el-dialog
        title="修改商品信息"
        :visible.sync="editshop"
        width="35%"
        center>
        <div class="flex">
          <el-form :model="editList" :rules="editRules" ref="editList">
            <div class="bian">
              <el-form-item label="所需积分" prop="Integral">
                <el-input v-model.number="editList.Integral" clearable class="input"></el-input>
              </el-form-item>
            </div>
            <div class="bian">
              <el-form-item label="所需金额" prop="money">
                <el-input v-model.number="editList.money" clearable class="input"></el-input>
              </el-form-item>
            </div>
            <div class="bian">
              <el-form-item label="兑换上架数量" prop="num">
                <el-input v-model.number="editList.num" clearable class="input"></el-input>
              </el-form-item>
            </div>
            <div class="bian">
              <el-form-item>
                <el-button type="primary" class="button3" @click="editSub('editList')">提交</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
      name: "inteShoping",
      data() {
        var phone = (rule, value, callback) => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            callback();
          }
        };
        return {
          //从商品中添加
          tableData: [],
          //添加商品规则
          addShopBox: {
            goodsId: 1,
            Integral: 0,
            money: 0,
            num: 0,
          },
          addshop: false,
          editshop: false,
          //  积分
          integral: '',
          //积分商品
          integralShop: [],
          editIds: '',
          //页码参数
          page: 1,
          pageSize: 20,
          currentPage4: 1,
          totals: 20,
          totalss: 20,
          //获取商品页码
          shopGoods: {
            page: 1,
            pageSize: 10
          },
          //修改
          editList: {
            Integral: '',
            money: '',
            num: ''
          },
          editRules: {
            Integral: [{
              required: true, message: '请输入注册赠送积分', trigger: 'blur'
            },
              {validator: phone, trigger: 'blur'}
            ],
            money: [
              {required: true, message: '请输入签到积分', trigger: 'blur'},
              {validator: phone, trigger: 'blur'}
            ],
            num:
              [{
                required: true, message: '请输入连续签到一周积分', trigger: 'blur'
              },
                {validator: phone, trigger: 'blur'}
              ],
            friend_integral:
              [
                {required: true, message: '请输入邀请好友积分', trigger: 'blur'},
                {validator: phone, trigger: 'blur'}
              ],
          },
        }
      },
      methods: {
        //积分商品列表
        getIntegral() {
          this._getData('/api/v1/integral_goods/index', {
            page: this.page,
            pageSize: this.pageSize
          }, data => {
            console.log(data)
            this.integralShop = data.data;
            this.totals = data.total;
          })
        },
        //每页显示多少数据
        handleSizeChange(val) {
          this.pageSize = val;
          this.getIntegral();
        },
        //第几页
        handleCurrentChange(val) {
          this.page = val;
          this.getIntegral();
        },
        handleSizeChange1(val) {
          this.shopGoods.pageSize = val;
          this.gettableData();
        },
        //第几页
        handleCurrentChange1(val) {
          this.shopGoods.page = val;
          this.gettableData();
        },
        //设为推荐
        recommend(val) {
          this.$confirm('是否设为推荐?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._getData('/api/v1/integral_goods/setSort', {
                id: val
              },
              data => {
                this.getIntegral();
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        },
        escRecommend(val) {
          this.$confirm('是否取消推荐?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._getData('/api/v1/integral_goods/unSort', {
                id: val
              },
              data => {
                this.getIntegral();
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        },
        //设为热门
        hot(val) {
          this.$confirm('是否设为热门?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._getData('/api/v1/integral_goods/setLike', {
                id: val
              },
              data => {
                this.getIntegral();
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        },
        //取消热门
        escHot(val) {
          this.$confirm('是否取消热门?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._getData('/api/v1/integral_goods/unLike', {
                id: val
              },
              data => {
                this.getIntegral();
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        },
        //  修改
        edit(val) {
          this.editIds = val;
          this.editshop = true;
        },
        editSub(formName) {
          this.editList.id = this.editIds;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this._getData('/api/v1/integral_goods/edit', this.editList, data => {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
                this.editshop = false;
              })
            } else {
              return false;
            }
          });
        },
        //获取所有商品
        adds() {
          this.addshop = true;
        },
        gettableData() {
          this._getData('/api/v1/goods/index', this.shopGoods, data => {
            this.tableData = data.data;
            this.totalss = data.total;
          })
        },
        //添加积分商品
        addShop() {
          this._getData('/api/v1/integral_goods/create', this.addShopBox, data => {
            if (data.state == 1) {
              this.$message({
                type: 'success',
                message: data.message
              });
              this.addShopBox.goodsId = 1;
              this.addShopBox.Integral = 0;
              this.addShopBox.money = 0;
              this.addShopBox.num = 0;
              this.addshop = false;
              this.getIntegral();
            } else {
              this.$message({
                type: 'warning',
                message: data.message
              });
            }
          })
        }
      },
      created() {
        this.getIntegral();
        this.gettableData();
      }
    }
</script>

<style scoped>
  .dfont {
    margin: 30px 0px 0px 20px;
    width: 100%;
    height: 30px;
    font-size: 14px;
  }
  
  .futext {
    margin: 20px 0px 0px 20px;
    width: 95%;
  }
  
  /*退款信息*/
  .tui {
    width: 95%;
    height: 250px;
    margin: 10px 0px 0px 10px;
    border: 1px solid #ddd;
  }
  
  .qian {
    margin-top: 10px;
  }
  
  .fonts {
    font-size: 15px;
    margin: 25px 0px 0px 100px;
  }
  
  .inpu {
    margin: 16px 0px 0px 40px;
    width: 500px;
  }
  
  .cfont {
    color: deepskyblue;
    margin-left: 10px
  }
  
  .bian {
    width: 500px;
    margin: 10px 0px 0px 30%;
  }
  
  .input {
    width: 200px;
  }
  
  .button3 {
    width: 150px;
    margin-left: 10%;
  }
  
  .imgBox {
    width: 100px;
    height: 100px;
    margin: auto;
  }
  
  .imgBox img {
    width: 100%;
    height: 100%;
  }

</style>
