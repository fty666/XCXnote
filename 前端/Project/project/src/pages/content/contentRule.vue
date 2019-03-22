<template>
  <div class="body">
    <!--头部样式-->
    <div class="head" style="text-align: left;font-weight: 700;font-size: 16px;line-height: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;规则提示弹窗管理</div>
    <!--规则-->
    <div class="bian">
      <!--下拉-->
      <div class="selec">
        <el-select v-model="type" style="width: 500px" placeholder="回购规则提示文字">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!--文字-->
      <div class="bj">
        <div class="font" v-model="sort">积分规则：</div>
      </div>
      <!--输入框-->
      <div class="txt">
        <el-input
          type="textarea"
          style="height: 150px"
          :rows="6"
          placeholder="请输入内容"
          v-model="content">
        </el-input>
      </div>
      <!--按钮-->
      <div style="text-align: left; margin: 20px 0px 0px 50px;">
        <el-button style="background-color:rgba(0, 153, 153, 1);color: white; ">保存修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        // 积分规则
        type:1,
        content:'',
        sort:'',
        textarea: '',
        options: [{
          value: '选项1',
          label: '积分规则'
        }, {
          value: '选项2',
          label: '经销商规则'
        }, {
          value: '选项3',
          label: '回购规则'
        }, {
          value: '选项4',
          label: '经销商余额'
        }, {
          value: '选项5',
          label: '邀请规则'
        }],
        value: ''
      }
    },
    methods: {
      //  获取积分规则
      getInfo() {
        this._getData('/api/v1/rule/show',{
            type:1
          },
          data => {
            console.log(data)
            // this.orderInfo = data;
          })
      },
      edit() {
        this.centerDialogVisible = true;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    created(){
      this.getInfo();
    },
  }
</script>

<style scoped>
  .bian {
    height: 600px;
    width: 99.90%;
    border: 1px solid #ddd;
  }
  .selec{
    margin:50px 0px 0px 50px;
    text-align: left;
  }
  .bj{
    width: 31%;
    height: 200px;
    margin: 20px 0px 0px 50px;
    background-color: rgba(242, 242, 242, 1);
  }
  .font{
    text-align: left;
    margin: 20px 0px 0px 20px;
    color: #333;
  }
  .txt{
    width: 31%;
    height: 150px;
    margin: 20px 0px 0px 50px;
  }
</style>
