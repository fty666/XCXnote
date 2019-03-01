<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-left: 40px;*/
}
a{text-decoration:none}
.flex{
  display: flex;
  flex-wrap: wrap;
}
.right{
  display: flex;
  flex-direction:  row-reverse;
}
.join{
  display: flex;
  justify-content: space-between;
}
.sequence{
  display: flex;
  flex-wrap: wrap;
}
.body{
  width: 100%;
  margin-left: 40px;
}

.tou{
  background-color: #ddd;
  width: 100%;
  height: 60px;
  margin-top: 30px;
}

.buttons{
  width: 100px;
}

.btnbj{
  width: 80px;
  color: white;
  background-color: rgba(0, 153, 153, 1);
}
/*头部样式*/
.state{
  width: 120px;
  height: 30px;
  margin-left: 10px;
  border: 1px solid black;
  text-align: center;
}
.state2{
  font-size: 10px;
  margin-left: 22px;
  line-height: 30px;
}
.state3{
  font-size: 10px;
  line-height: 30px;
  color: red;
}

/*表格上背景颜色*/
.head{
  width: 100%;
  height: 50px;
  background-color:rgba(242, 242, 242, 1);
  margin-top: 20px;
}
.head1{
  width: 90px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
  background-color: white;
  margin-top: 10px;
  margin-right: 10px;
  line-height: 30px;
  font-size: 13px;
}
.addimg{
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-left: 3px;
}

/*搜索样式*/
.whiteT{
  background-color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 60px;
  margin-top: 30px;
  border-radius: 10px;
  border: 1px solid #ddd;
}
.font{
  margin-left: 33px;
  line-height: 60px;
  font-size: 13px;
  color: #999999;
}
.input{
  margin-left: 10px;
  margin-top: 9px;
  width: 150px;
  height: 20px;
}
.btn{
  width: 100px;
  height: 40px;
  margin-left: 340px;
  padding-top: 11px;
}
.btn2{
  width: 100px;
  height: 40px;
  margin-left: 10px;
  padding-top: 11px;
}
/*搜索样式完*/

/*修改样式*/
.edit{
  background-color:rgba(51, 153, 255, 1) ;
  text-align: center;
  width: 100%;
  height: 42px;
  font-size: 17px;
  line-height: 40px;
  color: white;
}
.edit1{
  margin-top: 50px;
  margin-left: 90px;
}
.edit2{
  margin-top: 40px;
  margin-left: 15px;
}
.logBtn1{
  margin-top: 51px;
  margin-left: 140px;
}
.logBtn2{
  margin-top: 51px;
  margin-left: 20px;
}
.xiu{
  border: 1px solid #ddd;
  height: 240px;
}
/*修改样式完*/
</style>
