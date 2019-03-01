<template>
  <div class="body" style="text-align: left">
    <div class="tops">商品编号：</div>
    <!--第一行-->
    <div class="flex">
      <div class="flex">
        <div class="xin">*</div>
        <div class="fen">商品分类：</div>
      </div>
      <div class="selec">
        <el-select v-model="value" class="inputs" size="medium" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      
      <div class="flex">
        <div class="xin" style="margin-left: 200px">*</div>
        <div class="fen">二级分类：</div>
      </div>
      <div class="selec">
        <el-select v-model="value" class="inputs" size="medium" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <!--第二行-->
    <div class="flex">
      <div class="flex">
        <div class="xin">*</div>
        <div class="fen">商品名称：</div>
      </div>
      <div class="selec">
        <el-select v-model="value" class="inputs" size="medium" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      
      <div class="flex">
        <div class="xin" style="margin-left: 200px">*</div>
        <div class="fen">商品标签：</div>
      </div>
      <div>
        <div class="selec">
          <el-select v-model="value" class="inputs" size="medium" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="ti">使用逗号或空格分割每个标签</div>
      </div>
    </div>
    <!--第三行-->
    <div class="flex">
      <div class="flex">
        <div class="xin">*</div>
        <div class="fen">商品类型：</div>
      </div>
      <div class="selec">
        <el-select v-model="value" class="inputs2" size="medium" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      
      <div class="flex">
        <div class="xin" style="margin-left: 230px">*</div>
        <div class="fen">品牌：</div>
      </div>
      <div class="selec">
        <el-select v-model="value" class="inputs2" size="medium" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <!--第四行-->
    <div class="flex">
      <div class="flex">
        <div class="xin" style="margin-left: 60px">*</div>
        <div class="fen">产地：</div>
      </div>
      <div class="selec">
        <el-select v-model="value" class="inputs2" size="medium" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <!--第五行-->
    <div class="flex">
      <div class="flex">
        <div class="xin" style="margin-left: 60px">*</div>
        <div class="fen">规格：</div>
      </div>
      <div class="flex">
        <div>
          <el-input v-model="input" size="medium" style="width:130px;margin: 20px 0px 0px 18px"></el-input>
        </div>
        <div class="selec" style="margin-left: 0px">
          <el-select v-model="value" style="width:50px" size="medium" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!--第六行 图片-->
    <div class="flex">
      <div class="flex">
        <div class="xin" style="margin-left: 30px">*</div>
        <div class="fen">商品图片：</div>
      </div>
      <div class="flex">
      </div>
    </div>
    <!--第七行-->
    <div class="flex">
      <div class="fen" style="margin-left: 30px">印象标签：</div>
      <div>
        <div class="selec">
          <el-input v-model="input" style="width: 1000px;" size="medium" placeholder="请输入内容"></el-input>
        </div>
        <div class="ti">使用逗号或空格分割每个标签</div>
      </div>
    </div>
    <!--第八行-->
    <div class="flex">
      <div class="flex">
        <div class="fen">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市场价：</div>
      </div>
      <div class="selec">
        <el-input v-model="input" class="inputs2" size="medium" placeholder="请输入内容"></el-input>
      </div>
      
      <div class="flex">
        <div class="xin" style="margin-left: 30px">*</div>
        <div class="fen">会员价：</div>
      </div>
      <div class="selec">
        <el-input v-model="input" class="inputs2" size="medium" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <!--第九行-->
    <div class="flex">
      <div class="flex">
        <div class="xin">*</div>
        <div class="fen" style="margin-top: 30px">
          <el-checkbox v-model="checked3" label="是否成为经销商酒"></el-checkbox>
        </div>
      </div>
      <div class="fen">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经销商价：</div>
      <div class="selec" style="width: 80px">
        <el-input v-model="input" style="width: 80px" size="medium"></el-input>
      </div>
      <div class="fen" style="margin-left: 30px">经销商最低购入数：</div>
      <div class="selec" style="width: 80px">
        <el-input v-model="input" class="inputs2" size="medium" placeholder="请输入内容"></el-input>
      </div>
      <div class="fen" style="margin-left: 130px">经销商可申请回购天数：</div>
      <div class="selec" style="width: 80px">
        <el-input v-model="input" style="width: 80px" size="medium" ></el-input>
      </div>
    </div>
    <!--第十行-->
    <div class="flex">
      <div class="flex">
        <div class="fen">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可获取积分：</div>
      </div>
      <div class="selec">
        <el-input v-model="input" class="inputs2" size="medium"></el-input>
      </div>
    </div>
    <!--第十一行-->
    <div class="flex">
      <div class="flex">
        <div class="xin">*</div>
        <div class="fen">上架数量：</div>
      </div>
      <div class="selec">
        <el-input v-model="input" class="inputs2" size="medium" placeholder="请输入内容"></el-input>
      </div>
    
      <div class="flex">
        <div class="xin" style="margin-left: 30px">*</div>
        <div class="fen">前台销量：</div>
      </div>
      <div class="selec">
        <el-input v-model="input" class="inputs2" size="medium" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <!--第十二行-->
    <div class="flex">
      <div class="flex">
        <div class="xin" style="margin-left: 30px">*</div>
        <div class="fen">缺货提醒阈值：</div>
      </div>
      <div class="selec">
        <el-input v-model="input" class="inputs2" size="medium"></el-input>
      </div>
    </div>
    <!--按钮-->
    <div class="flex" style="margin: 80px 0px 80px 0px">
      <div class="btn" style="margin-left: 250px">
        <el-button type="primary" class="buttons">添加商品</el-button>
      </div>
      <div class="btn2" style="margin-left: 100px">
        <el-button class="buttons">重置表单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        input: '',
        checked3: '',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  }
</script>

<style scoped>
  .tops {
    margin: 20px 0px 0px 30px;
  }
  
  .inputs {
    width: 350px;
  }
  
  .inputs2 {
    width: 180px;
  }
  
  .fen {
    margin: 25px 0px 0px 5px;
  }
  
  .selec {
    width: 300px;
    margin: 20px 0px 0px 15px;
  }
  
  .xin {
    color: red;
    margin: 28px 0px 0px 30px;
  }
  
  .ti {
    margin: 0px 0px 0px 14px;
    font-size: 13px;
    color: #9999;
  }
</style>
