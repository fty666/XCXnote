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
a{
  color:black;
  text-decoration:none;
}
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
.spaces{
  display: flex;
  justify-content: space-between;
}
.Xbj {
  background-color: rgba(0, 153, 153, 1);
  color: white;
}
.body{
  width: 82%;
  margin-left: 40px;
}
.Tabless{
  border: 1px solid #ddd;
  height:auto;
  margin-bottom:150px;
}
.tou{
  background-color: #ddd;
  width: 98.2%;
  height: 60px;
  margin-top: 30px;
}

.buttons{
  width: 100px;
}
.buttons2{
  background-color: rgba(0, 153, 153, 1);
  color: white
}
.buttons3{
  background-color: rgb(77,205,204);
  color: white;
}

.btnbj{
  width: 80px;
  color: white;
  background-color: rgba(0, 153, 153, 1);
}
/*操作样式*/
.operate{
  color: deepskyblue;
}
/*返回样式*/
.clos {
  text-align: left;
  width: 130px;
  height: 30px;
  border: 1px solid black;
  font-size: 15px;
  text-align: center;
  line-height: 30px;
  margin: 30px 0px 0px 0px;
}
.backfont {
  text-align: left;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  line-height: 50px;
  margin-left: 20px;
}
/*选择样式*/
.bj{
  background-color:rgba(134, 134, 134, 1);
  color: white
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
  margin-left: 15px;
  line-height: 60px;
  font-size: 13px;
  color: #999999;
}
.font2 {
  text-align: left;
  margin: 15px 0px 0px 30px;
  color: black;
  font-weight: 700;
  font-size: 16px;
}
.input{
  margin-top: 9px;
  width: 120px;
  height: 20px;
  font-size: 13px;
}
.Xinput{
  margin-top: 15px;
  width: 120px;
  height: 20px;
  font-size: 13px;
}
/*遮罩层*/
.Paddfont{
  width: 25%;
  text-align: right;
  margin: 10px 0px 0px 15px;
}
.addFont {
  margin: 10px 0px 0px 15px;
}

.addInput {
  margin: 10px 0px 0px 15px;
}
/*搜索边框*/
.Wserch{
  height: 140px;
}
.Fsearch{
  width: 65%;
}
.search{
  width: 95%;
  height: 60px;
  margin-left: 10px;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.search1{
  font-size: 15px;
  margin-left: 15px;
  line-height: 65px;
  /*color: #ddd;*/
  margin-left: 20px;
}
.search2{
  height: 30px;
  width: 150px;
  margin-left: 50px;
  padding-top: 15px;
}
/*页码*/
.pag{
  margin: 10px 10px 0px 0px;
  text-align: right
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
.imgs{
  width: 150px;
  height: 150px;
}
/*修改样式完*/
</style>
