<template>
  <div class="body">
    <!--banner管理-->
    <div class="tou">
      <div class="font">首页banner管理</div>
    </div>
    <div class="table">
      <el-table
        :data="bannerList"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="图片"
          align="center"
          min-width="200">
          <template slot-scope="scope">
            <div>
              <img :src="imggerUrl+scope.row.url" class="imgs">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_id"
          align="center"
          label="商品ID"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          label="编辑"
          min-width="120">
          <template slot-scope="scope">
            <div class="flex">
              <div class="addFont" style="margin-left: 66px" @click="edit(scope.row)">编辑</div>
              <div class="addFont" style="margin-left: 10px" @click="del(scope.row.id)">删除</div>
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
          <div class="edit">修改Banner管理</div>
          <div class="flex">
            <div class="edit1" style="margin-left:20%">链接商品编号：</div>
            <div class="edit2" style="margin-left: 0px">
              <el-input v-model="Gid" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="flex">
            <div style="margin: 80px 0px 0px 22%">图片：</div>
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
</template>

<script>
  import upali from '@/components/upload-ali'
  
  export default {
    data() {
      return {
        bannerList: [],
        centerDialogVisible: false,
        editInfo: [],
        Gid: '',
        editphoto: ''
      }
    },
    watch: {},
    methods: {
      getBanner() {
        this._getData('/api/v1/slideshow/homePageBanner', {}, data => {
          console.log(data)
          this.bannerList = data;
        })
      },
      edit(val) {
        this.editInfo = val;
        this.centerDialogVisible = true;
      },
      del(val) {
        this.$confirm('是否删除此banner图?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/slideshow/delete', {
              id: val,
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getBanner();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      esc(){
        this.centerDialogVisible = false;
      },
      submit() {
        if (this.Gid == '') {
          this.Gid = this.editInfo.goods_id;
        }
        if (this.editphoto == '') {
          this.editphoto = this.editInfo.url;
        }
        this.$confirm('是否修改该分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('/api/v1/slideshow/edit', {
              id: this.editInfo.id,
              url: this.editphoto,
              goods_id: this.Gid
            },
            data => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.centerDialogVisible = false;
              this.getBanner();
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
        // }
      },
      editimgUrl1(e) {
        this.editphoto = e[0];
      },
    },
    components: {
      upali
    },
    created() {
      this.getBanner();
    }
  }
</script>

<style scoped>
  .imgs {
    width: 400px;
    height: 200px;
  }
  
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
  
  .Tpic {
    margin: 20px 0px 15px 20px;
    display: flex;
    width: 30%;
  }
  
  .Tpic1 {
    width: 250px;
    height: 150px;
    border: 1px solid black;
  }
  
  .font1 {
    margin: 10px 0px 0px 20px;
    font-size: 25px;
    text-align: left
  }
  
  .Rfont {
    margin: 10px 0px 30px 20px;
    text-align: left;
  }
  
  .Rtable {
    margin: 10px 0px 30px 50px;
  }
  
  .Rpic {
    width: 100px;
    height: 100px;
    margin-left: 5%;
    border: 1px solid black;
  }
  
  .Rfont2 {
    margin: 30px 0px 0px 30px;
    color: #0099ce;
  }
  
  .addFont {
    color: deepskyblue;
    font-size: 17px;
  }
</style>
