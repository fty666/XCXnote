<template>
  <div class="body">
    <!--banner管理-->
    <div class="tou">
      <div class="font">首页banner管理</div>
    </div>
    <div class="table sequence">
      <div class="Tpic">
        <div class="Tpic1"></div>
        <div style="margin-left: 10px">
          <div class="font1">1</div>
          <div style="margin-top: 15px">
            <el-button class="buttons2">上传图片</el-button>
          </div>
          <div style="margin-top: 10px">
            <el-button class="buttons2">&nbsp;&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </div>
      </div>
  
      <div class="Tpic">
        <div class="Tpic1"></div>
        <div style="margin-left: 10px">
          <div class="font1">2</div>
          <div style="margin-top: 15px">
            <el-button class="buttons2">上传图片</el-button>
          </div>
          <div style="margin-top: 10px">
            <el-button class="buttons2">&nbsp;&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </div>
      </div>
  
      <div class="Tpic">
        <div class="Tpic1"></div>
        <div style="margin-left: 10px">
          <div class="font1">3</div>
          <div style="margin-top: 15px">
            <el-button class="buttons2">上传图片</el-button>
          </div>
          <div style="margin-top: 10px">
            <el-button class="buttons2">&nbsp;&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </div>
      </div>
  
      <div class="Tpic">
        <div class="Tpic1"></div>
        <div style="margin-left: 10px">
          <div class="font1">4</div>
          <div style="margin-top: 15px">
            <el-button class="buttons2">上传图片</el-button>
          </div>
          <div style="margin-top: 10px">
            <el-button class="buttons2">&nbsp;&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </div>
      </div>
  
      <div class="Tpic">
        <div class="Tpic1"></div>
        <div style="margin-left: 10px">
          <div class="font1">5</div>
          <div style="margin-top: 15px">
            <el-button class="buttons2">上传图片</el-button>
          </div>
          <div style="margin-top: 10px">
            <el-button class="buttons2">&nbsp;&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </div>
      </div>
    </div>
    
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
        <div class="Tpic1"></div>
        <div class="flex" style="margin-left: 50px">
          <div style="margin-top: 100px">
            <el-button class="buttons2">上传图片</el-button>
          </div>
          <div style="margin-top: 100px">
            <el-button class="buttons2">&nbsp;&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;&nbsp;</el-button>
          </div>
        </div>
      </div>
      <!--二级分类-->
      <div class="Rfont">二级分类</div>
      <div class="Rtable">
        <div>
          <el-table
            ref="multipleTable"
            :data="tableData3"
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
                 <el-select v-model="value" placeholder="请选择">
                   <el-option
                     v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
               </div>
              </template>
            </el-table-column>
            <el-table-column
              label="图标"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                <div class="flex">
                    <div class="Rpic"></div>
                    <div class="Rfont2">上传</div>
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
  export default {
    name: "",
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        value: '',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }],
      }
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
    width: 30%;
  }
  .Tpic1 {
    width: 250px;
    height: 150px;
    border: 1px solid black;
  }
  .font1{
    margin: 13px 0px 0px 20px;
    font-size: 25px;
    text-align: left
  }
  .Rfont{
    margin: 10px 0px 30px 20px;
    text-align: left;
  }
  .Rtable{
    margin: 10px 0px 30px 50px;
  }
  .Rpic{
    width: 100px;
    height: 100px;
    margin-left:5%;
    border: 1px solid black;
  }
  .Rfont2{
    margin: 30px 0px 0px 30px;
    color: #0099ce;
  }
</style>
