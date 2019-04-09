<template>
  <div class="table sequence">
    <div class="ban">添加Banner图片</div>
    <div class="Tpic">
      <div class="Tpic1">
        <upali class="img_cha" ref="aliComponent" @getUrl="imgUrl1($event, 1)" :fileNumber="1"
               :imgWidth="250" :imgHeight="150"
               :defaultImg="photo"></upali>
      </div>
      <div style="margin-left: 30px">
        <div style="margin-top: 30px">
          <div>链接商品编号：</div>
          <el-input v-model="gid1" style="width: 150px" size="small"></el-input>
        </div>
        <div style="margin-top: 10px" @click="save()">
          <el-button class="buttons2">&nbsp;&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;&nbsp;</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import upali from '@/components/upload-ali'
  export default {
    name: "addBanner",
    data() {
      return {
        photo: "",
        gid1: "",
      }
    },
    components:{
      upali
    },
    methods: {
      imgUrl1(e) {
        this.photo = e[0];
      },
      save() {
        this.btns(this.photo, this.gid1)
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
            })
            this.$emit('Bclose');
            this.$emit('Binfos');
          })
      },
    }
  }
</script>

<style scoped>
  .ban{
    background-color: rgba(51, 153, 255, 1);
    text-align: center;
    width: 100%;
    height: 42px;
    font-size: 17px;
    line-height: 40px;
    color: white;
  }
  .Tpic {
    margin: 20px 0px 15px 100px;
    display: flex;
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

</style>
