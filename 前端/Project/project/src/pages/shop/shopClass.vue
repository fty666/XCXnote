<template>
  <div class="body">
    <!--表头-->
    <div class="tou">
      <div class="font">二级分类管理</div>
    </div>
    <!--选择分类-->
    <div class="table" style="height:auto;">
      <div class="flex">
        <div class="class">商品分类：</div>
        <div class="class1">
          <el-select v-model="value" style="width: 450px;margin-left: 5px">
            <el-option
              v-for="item in options"
              :key="item.index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="flex" style="margin-left:25% ">
        <div style="margin-top: 40px ">分类名：</div>
        <div style="margin: 30px 0px 0px 50px">
          <el-input v-model="name" style="width: 450px;" placeholder="请输入分类"></el-input>
        </div>
      </div>
      <div class="flex" style="margin-left:25% ">
        <div style="margin-top: 40px ">分类图片：</div>
        <div style="margin: 30px 0px 0px 50px">
          <upali class="img_cha" ref="aliComponent" @getUrl="imgUrl1($event, 1)" :fileNumber="1"
                 :imgWidth="120" :imgHeight="120"
                 :defaultImg="photo"></upali>
        </div>
        <div class="add1 Mouse" style="text-align: center" @click="addClass()">
          添加二级分类
        </div>
      </div>
      
      <!--表格-->
      <div class="biao">
        <el-table
          ref="singleTable"
          :data="classList"
          highlight-current-row
          border
          style="width: 90%;margin-bottom: 30px">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            property="name"
            label="分类名称"
            align="center"
            min-width="193">
          </el-table-column>
          <el-table-column
            label="分类图片"
            align="center"
            min-width="150">
            <template slot-scope="scope">
              <div>
                <img :src="imggerUrl+scope.row.img" class="imgs">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            property="goods_count"
            label="商品数量"
            align="center"
            min-width="130">
          </el-table-column>
          <el-table-column
            min-width="130"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <div class="flex">
                <div class="Mouse" style="color: #0099ce;padding-left: 25px" @click="edit(scope.row)">修改</div>
                <div class="Mouse" style="color: #0099ce;padding-left: 10px" @click="del(scope.row)">删除</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--修改-->
      <div>
        <el-dialog
          title=""
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <div class="xiu" style="height: 400px">
            <div class="edit">修改分类名称</div>
            <div class="flex">
              <div class="edit1" style="margin-left:20%">修改为：</div>
              <div class="edit2" style="margin-left: 0px">
                <el-input v-model="Xgname" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="flex">
              <div style="margin: 80px 0px 0px 22%">分类图片：</div>
              <div style="margin: 30px 0px 0px 50px">
                <upali class="img_cha" ref="aliComponent" @getUrl="editimgUrl1($event, 1)" :fileNumber="1"
                       :imgWidth="120" :imgHeight="120"
                       :defaultImg="editphoto"></upali>
              </div>
            </div>
            <div class="flex" style="margin-left: 0%">
              <div class="logBtn1" style="margin-left: 35%" @click="submit()">
                <el-button size="medium" type="primary">提交</el-button>
              </div>
              <div class="logBtn2">
                <el-button size="medium" @click="esc()">取消</el-button>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import upali from '@/components/upload-ali'
  
  export default {
    data() {
      return {
        options: [
          {
            value: '洋酒',
            label: '洋酒'
          }, {
            value: '葡萄酒',
            label: '葡萄酒'
          }, {
            value: '酒具周边',
            label: '酒具周边'
          }, {
            value: '红酒套装',
            label: '红酒套装'
          }],
        value: '洋酒',
        name: '',
        classList: [],
        centerDialogVisible: false,
        input: '',
        //修改的内容
        Xgname: '',
        editphoto: '',
        photo: '',
      }
    },
    watch: {
      value(v, o) {
        this.gclass();
      }
    },
    components: {
      upali
    },
    methods: {
      //添加分类
      addClass() {
        if (this.value == '' || this.name == '' || this.photo == '') {
          this.$message({
            showClose: true,
            message: '请完善分类信息',
            type: 'error'
          });
        } else {
          this.$confirm('是否添加该分类', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._getData('/api/v1/goods_group/create', {
                name: this.name,
                group_name: this.value,
                img: this.photo
              },
              data => {
                this.gclass();
                this.name = '';
                this.photo = '';
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
        }
      },
      //获取分类
      gclass() {
        this._getData('/api/v1/goods_group/getSub', {group_name: this.value}, data => {
          this.classList = data;
        })
      },
      //修改
      edit: function (val) {
        this.centerDialogVisible = true;
        this.eid = val;
        this.editphoto = this.eid.img
        this.Xgname = this.eid.name
        console.log(this.eid);
      },
      //删除
      del(val) {
        if (parseInt(val.goods_count) != 0) {
          this.$message({
            showClose: true,
            message: '该分类下有商品不能删除',
            type: 'error'
          });
        } else {
          this.$confirm('是否删除该分类', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._getData('/api/v1/goods_group/delete', {
                id: val.id
              },
              data => {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                this.gclass();
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      },
      esc() {
        this.centerDialogVisible = false;
      },
      //  提交
      submit(val) {
        this.$confirm('是否修改此分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.Xgname == '' || this.Xgname == null || this.editphoto == '' || this.editphoto == null) {
            this.$message({
              type: 'info',
              message: '修改信息不能为空'
            });
            return false;
          }
          this._getData('/api/v1/goods_group/edit', {
              id: this.eid.id,
              name: this.Xgname,
              img: this.editphoto
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.gclass();
              this.centerDialogVisible = false;
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
        
      },
      imgUrl1(e) {
        this.photo = e[0];
      },
      editimgUrl1(e) {
        this.editphoto = e[0];
      },
    },
    created() {
      this.gclass();
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
  
  /*表格*/
  .table {
    width: 98%;
    border: 1px solid #ddd;
    height: 500px;
  }
  
  .class {
    margin-top: 40px;
    margin-left: 25%;
  }
  
  .class1 {
    margin-top: 30px;
    margin-left: 30px;
  }
  
  .add {
    margin-left: 35%;
    margin-top: 30px;
    width: 185px;
    height: 30px;
  }
  
  .add1 {
    width: 124px;
    height: 40px;
    background-color: rgba(0, 153, 153, 1);
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    margin-left: 15%;
    margin-top: 50px;
    font-size: 14px;
    color: white;
  }
  
  .biao {
    margin-top: 50px;
    margin-left: 20%;
  }
</style>
