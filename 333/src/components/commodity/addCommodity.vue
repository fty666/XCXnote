<template>
  <div>
    <div class="flex-start line">
      <div class="title">用户名</div>
      <el-input v-model="email" placeholder="请输入邮箱" clearable></el-input>
    </div>
    <div class="flex-start line">
      <div class="title">登录账户</div>
      <el-input v-model="email"></el-input>
    </div>
    <div class="flex-start line">
      <div class="title">身份类型</div>
      <el-select v-model="selectInput" slot="prepend" placeholder="请选择" @change="indexSelect01">
        <el-option label="内勤专员" value="1"></el-option>
        <el-option label="财务专员" value="2"></el-option>
        <el-option label="销售专员" value="3"></el-option>
      </el-select>
    </div>
    <div class="flex-start line">
      <div class="title">部门</div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in selectInput2"
          :key="item.id"
          :label="item.admin_department_name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button type="info" icon="el-icon-plus" circle @click="addDepart"></el-button>
    </div>
  </div>
</template>

<script>
  let emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  export default {
    name: "addAuthority",
    data() {
      return {
        email: '',
        selectInput: '',
        selectInput2: '',    //部门
        value: '',   //根据身份类型选择对应部门
        dialogFormVisible5: false,
      }
    },
    methods: {
      // 添加admin父组件调用此方法
      add() {
        if ((!this.email) || (!this.selectInput) || (!this.value)) {
          this.$message.error('请填写完整!');
          // this.$emit('addError','1')
          return;
        }
        if (this.email == "" || !emailReg.test(this.email)) {
          this.$message.error('请输入正确的邮箱!');
          // this.$emit('addError',1)
          return;
        }
        this._getData('internal/add', {
          name: this.email,
          email: this.email,
          job: this.selectInput,     //职位:0超级;1内勤;2财务;3销售;
          department: this.value,     //部门 1：内勤 2：财务 3：销售一组.....12：销售十组
        }, data => {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          //关闭页面
          this.$emit('close')
        });
      },
      //二级联动
      indexSelect01() {
        this._getData('internal/departmentList', {
          flag: this.selectInput,
        }, data => {
          this.selectInput2 = data;
          console.log(this.selectInput)
          console.log(this.selectInput2)
        });
      },
      //添加部门名称
      addDepart() {
        if (this.selectInput == '') {
          this.$message({
            type: 'success',
            message: '请选择身份类型'
          });
        } else {
          this.$prompt('请输入部门名称', '添加部门', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({value}) => {
            console.log(value)
            if (!value) {
              this.$message.error('部门名称不能为空!');
            } else {
              this._getData('internal/addDepartment', {
                name: value,
                flag: this.selectInput,
              }, data => {
                console.log(data)
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        }
      }
    }
  }
</script>

<style scoped>
  .title {
    width: 80px;
  }

  .line {
    margin-bottom: 10px;
  }

  .el-input {
    width: 60%;
  }
</style>
