<template>
  <!--配货-->
  <div>
    <div class="xiu" style="height: 300px">
      <div class="edit">发起配货</div>
      <div class="flex addInput">
        <div class="Paddfont">选择配货方：</div>
        <div>
          <el-select v-model="value" size="medium" placeholder="请选择" style="width: 90%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="flex addInput">
        <div class="Paddfont">分成比例：</div>
        <div>
          <el-input v-model="input" style="width: 40%" size="medium"></el-input>
        </div>
      </div>
      <div class="flex addInput">
        <div class="Paddfont">配货款：</div>
        <div>
          <el-input v-model="input" size="medium" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="flex">
        <div class="logBtn1" style="margin: 30px 0px 0px 20%">
          <el-button size="medium" class="buttons" type="primary">提交</el-button>
        </div>
        <div class="logBtn2" style="margin: 30px 0px 0px 20px" @click="esc()">
          <el-button size="medium" class="buttons">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "allocationGoods",
    data() {
      return {
        value: '',
        options: [],
        input: ''
      }
    },
    methods: {
      esc() {
        this.$emit('closealloction')
      }
    }
  }
</script>

<style scoped>

</style>
