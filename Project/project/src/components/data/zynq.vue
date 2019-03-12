<template>
	<div class="flex">
    <div class="head1" style="margin-left: 15%">导出数据</div>
    <div :class="['head1',yday==true?'bj':'']" style="margin-right: 0px" @click="Xyday()">
      昨天
    </div>
    <div :class="['head1',Qday==true?'bj':'']" style="margin-right: 0px" @click="XQday">最近7天</div>
    <div :class="['head1',Tday==true?'bj':'']" @click="XTday()">最近30天</div>
    <div class="head1" style="width: 150px;border: 1px solid #ddd">
      <el-date-picker
        v-model="value1"
        style="width: 150px"
        type="date"
        size="mini"
        placeholder="选择日期">
      </el-date-picker>
    </div>
	</div>
</template>

<script>
    export default {
        name: "",
      data() {
        return {
          //选择
          yday: true,
          Qday: false,
          Tday: false
        }
      },
      methods: {
        //选择背景
        Xyday() {
          this.Tselect(1);
        },
        XQday() {
          let data = this.Tselect(2);
        },
        XTday() {
          this.Tselect(3);
        },
        Tselect(flag) {
          this.yday = false;
          this.Qday = false;
          this.Tday = false;
          switch (flag) {
            case 1:
              this.yday = true;
              break;
            case 2:
              this.Qday = true;
              break;
            case 3:
              this.Tday = true;
              break;
          }
        }
      }
    }
</script>

<style scoped>
  .bj {
    background-color: rgba(0, 153, 153, 1);
    color: white;
  }
</style>
