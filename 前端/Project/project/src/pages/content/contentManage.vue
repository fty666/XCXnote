<template>
  <div class="body">
    <!--分类管理-->
    <div class="tou">
      <div class="font">分类banner/图标管理</div>
    </div>
    <div class="table">
      <div class="Tpic">
        <el-select v-model="value" placeholder="请选择">
          
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="Tpic" style="width: 100%">
        <div class="Tpic1">
          <upali class="img_cha" ref="aliComponent" @getUrl="imgUrl6($event, 1)" :fileNumber="1"
                 :imgWidth="250" :imgHeight="150"
                 :defaultImg="photo6"></upali>
        </div>
        <div class="flex" style="margin-left: 50px">
          <div style="margin-top: 100px" @click="save6">
            <el-button class="buttons2">&nbsp;&nbsp;&nbsp;保存图片&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </div>
      </div>
      <!--二级分类-->
      <div class="Rfont">二级分类</div>
      <div class="Rtable">
        <div>
          <el-table
            ref="multipleTable"
            :data="Roptions"
            tooltip-effect="dark"
            style="width: 60%"
            border>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="60">
            </el-table-column>
            <el-table-column
              label="名称"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                <div>
                  <el-select v-model="scope.row.Rname" placeholder="请选择">
                    <el-option
                      v-for="item in Roptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              min-width="80">
              <template slot-scope="scope">
                <div style="color: #0099ce;" @click="returns(scope.row)">保存</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import upali from '@/components/upload-ali'
  export default {
    name: "",
    data() {
      return {
        options: [
          {
            value: '推荐分类',
            label: '推荐分类'
          },
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
        Roptions: [],
        Rimg: '',
        value: '',
        photo6: "",
      }
    },
    watch: {
      value(v, o) {
        this.getTwo(v);
      }
    },
    methods: {
      imgUrl6(e) {
        this.photo6 = e[0];
      },
      save6() {
        var type = '';
        if (this.value == "洋酒") {
          type = 3;
        }
        if (this.value == "葡萄酒") {
          type = 4;
        }
        if (this.value == "酒具周边") {
          type = 6;
        }
        if (this.value == "红酒套装") {
          type = 5;
        }
        if (this.value == "推荐分类") {
          type = 2;
        }
        this._getData('/api/v1/slideshow/getGroupBanner', {
            type: type,
          },
          data => {
            //没有添加过的banner
            if (data.length == '0' || data.length == 0) {
              this._getData('/api/v1/slideshow/create', {
                  type: type,
                  url: this.photo6,
                },
                data => {
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  });
                  this.photo6 = '';
                  this.value = '';
                  this.Roptions = [];
                })
            } else {
              //修改banner图片
              this._getData('/api/v1/slideshow/edit', {
                  id: data[0].id,
                  type: type,
                  url: this.photo6,
                },
                data => {
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  });
                  this.photo6 = '';
                  this.value = '';
                  this.Roptions = [];
                })
            }
          })
        
      },
      btns(img, id) {
        this._getData('/api/v1/slideshow/create', {
            type: 1,
            url: img,
            goods_id: id
          },
          data => {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
          })
      },
      RimgUrl(e) {
        this.Rimg = e[0];
      },
      //  获取二级分类
      getTwo(v) {
        if (this.value == '推荐分类') {
          this._getData('/api/v1/goods_group/index', {}, data => {
            this.Roptions = data;
          })
        } else if (this.value == '') {
        } else {
          this._getData('/api/v1/goods_group/getSub', {
            group_name: this.value
          }, data => {
            this.Roptions = data;
          })
        }
      },
      //  二级分类保存排序
      returns(val) {
        this._getData('/api/v1/goods_group/create', {
          name: val.Rname,
          group_name: this.value,
          sort: val.id,
          img: val.img
        }, data => {
          this.$message({
            type: 'success',
            message: '排序成功'
          });
        })
      }
    },
    components: {
      upali
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
  
  .Tpic {
    margin: 20px 0px 15px 20px;
    display: flex;
    width: 40%;
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
</style>
